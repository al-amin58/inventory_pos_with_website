<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Mail;
use App\Mail\ActivateAccountMail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;



use function Symfony\Component\Clock\now;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate input
        $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string|min:8',
            "remember" => 'boolean',
        ]);

        // Find user by email OR phone
        $user = User::where('email', $request->identifier)
            ->orWhere('phone', $request->identifier)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'Please activate your account first'], 403);
        }

        if($user->type !== 'customer' ){
            return response()->json([
                'message' => 'Access denied. Customer account required.'    
            ],);
        }

        // Generate token
        $tokenName = $request->remember ? 'remember_token' : 'token';
        $token = $user->createToken($tokenName)->plainTextToken;



        return response()->json([
            'token' => $token,
            'user' => $user,
            'token_type' => 'Bearer',
        ], 200);
    }


    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'identifier' => [
                'required',
                'string',
                'unique:users,email',
                'unique:users,phone',
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()
            ],
        ]);

        $identifier = $data['identifier'];

        $email = null;
        $phone = null;

        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            $email = $identifier;
        } else {
            if (!preg_match('/^[0-9]{11}$/', $identifier)) {
                return response()->json([
                    'errors' => [
                        'identifier' => ['Phone number must be 11 digits']
                    ]
                ], 422);
            }

            $phone = $identifier;
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $email,
            'phone' => $phone,
            'password' => bcrypt($data['password']),
            'is_active' => $email ? false : true,
        ]);

        $user->roles()->attach(
            Role::where('name', 'customer')->first()
        );

        if ($email) {
            Mail::to($email)->send(new ActivateAccountMail($user));
        }

        return response()->json([
            'message' => 'User registered successfully. ' .
                ($email ? 'Please check your email to activate account.' : 'You can login now.')
        ], 201);
    }


    public function logout(Request $request){
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $token = $user->currentAccessToken();
        if ($token && $token->name === 'token') {

            $token->delete();

            return response()->json([
                'message' => 'Customer logged out successfully'
            ]);
        }
        // if ($user) {
        //     $user->currentAccessToken()->delete();
        //     return response()->json(['message' => 'Logged out Successfully']);
        // }
        return response()->json(['message' => 'Unauthenticated.'], 401);
    }

    public function activateAccount($encryptedId)
    {
        try{
            $userId = Crypt::decryptString($encryptedId);
        }catch(\Exception $e){
            return redirect(config('app.url') . '/');
        }


        $user = User::find($userId);


        if (!$user) {
            return redirect(config('app.url') . '/');
        }

        if ($user->is_active) {
            return redirect(config('app.url') . '/');
        }

        $user->update([
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        return redirect(config('app.url') . '/login');
    }

     public function sendReset(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string', // email or phone
        ]);

        $identifier = $request->identifier;
        $user = User::where('email', $identifier)
                    ->orWhere('phone', $identifier)
                    ->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Email case
        if ($user->email && filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            $token = Str::random(64);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['email' => $user->email],
                [
                            'email' => $user->email,
                            'token' => $token, 
                            'phone' => null, 
                            'created_at' => now()
                        ]
            );


            // send email
            $link = url("/reset-password?token=$token&email={$user->email}");

            Mail::send('emails.reset-password', ['link' => $link], function ($message) use ($user) {
                $message->to($user->email)
                        ->subject('Password Reset Request');
            });

            return response()->json(['message' => 'Password reset link sent to email']);
        }

        // Phone case
        if ($user->phone && preg_match('/^\+?\d+$/', $identifier)) {
            $otp = rand(100000, 999999);

            DB::table('password_reset_tokens')->updateOrInsert(
                ['phone' => $user->phone],
                ['phone' => $user->phone, 'token' => $otp, 'email' => null, 'created_at' => now()]
            );

            // send SMS via provider (placeholder)
            // SmsService::send($user->phone, "Your OTP is $otp");

            return response()->json(['message' => 'OTP sent to phone']);
        }

        return response()->json(['message' => 'Invalid identifier'], 400);
    }

     public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|string|confirmed|min:6',
        ]);

        $record = DB::table('password_reset_tokens')
                    ->where('email', $request->email)
                    ->where('token', $request->token)
                    ->first();

        if (!$record || Carbon::parse($record->created_at)->addMinutes(60)->isPast()) {
            return response()->json(['message' => 'Token invalid or expired'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password successfully reset']);
    }

     public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string',
            'password' => 'required|string|confirmed|min:6',
        ]);

        $record = DB::table('password_reset_tokens')
                    ->where('phone', $request->phone)
                    ->where('token', $request->otp)
                    ->first();

        if (!$record || Carbon::parse($record->created_at)->addMinutes(10)->isPast()) {
            return response()->json(['message' => 'OTP invalid or expired'], 400);
        }

        $user = User::where('phone', $request->phone)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        DB::table('password_reset_tokens')->where('phone', $request->phone)->delete();

        return response()->json(['message' => 'Password successfully reset']);
    }

     public function staffLogin(Request $request)
    {
 
        $request->validate([
            'identifier' => 'required|string',
            'password' => 'required|string|min:8',
            "remember" => 'boolean',
        ]);

        $key = Str::lower($request->identifier).'|'.$request->ip();

         // 🔐 brute-force protection

        if(RateLimiter::tooManyAttempts($key, 3)){
            return response()->json([
                'message' => 'Too many login attempts. Try again later.'
            ], 429);
        }

   
        $user = User::where('email', $request->identifier)
            ->orWhere('phone', $request->identifier)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password) || !$user->is_active || $user->type !== 'staff') {
            RateLimiter::hit($key, 60); // 1 minute lock
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        RateLimiter::clear($key);

        $user->tokens()->delete();
      
        
        $admin_token = $user->createToken('admin_token', ['admin-access'])->plainTextToken;



        return response()->json([
            'admin_token' => $admin_token,
            'user' => $user,
            'token_type' => 'Bearer',
        ], 200);
    }

    public function staffLogout(Request $request){
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated']);
        }
        $admin_token = $user->currentAccessToken();

        if($admin_token && $admin_token->name === "admin_token"){
            $admin_token->delete();

            return response()->json([
                 'message' => 'Staff logged out successfully'
            ]);
        }
        return response()->json(['message' => 'Invalid token type.'], 401);
    }

}
