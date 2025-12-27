<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Barryvdh\DomPDF\Facade\Pdf;


class CustomerController extends Controller
{
    public function profile(Request $request){
        return response()->json($request->user());
    }

    public function updateProfile(Request $request){
        $user = $request->user();

        $data = $request->validate([
            'name' => 'string|max:255',
            'email' => ['email','max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => ['string','max:20', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if(!empty($data['password'])){
            $data['password'] = Hash::make($data['password']);
        }else{
            unset($data['password']);
        }

        $user->update($data);

        return response()->json($user);
    }

    public function updatePassword(Request $request){
        $user = $request->user();

        $data = $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if(!Hash::check($data['current_password'], $user->password)){
            return response()->json(['message' => 'Current Password is incorrect'], 422);
        }

        $user->update([
            'password' => Hash::make($data['password'])
        ]);

        return response()->json(['message' => 'Password update successfully']);
    }

    public function orders(Request $request){
        $orders = $request->user()->orders()->latest()->get();
        return response()->json($orders);
    }

    public function invoice($orderId, Request $request){
        $order = $request->user()->orders()->findOrFail($orderId);
        $pdf = Pdf::loadView('invoices.order', ['order' => $order]);
        return $pdf->download("order_{$order->id}.pdf");
    }

    public function returnRequest($orderId, Request $request){
       $order = $request->user()->orders()->findOrFail($orderId);
        if($order->status !== 'delivered'){
            return response()->json(['message' => 'Cannot request return before delivery'], 422);
        }
        $order->update(['return_requested' => true]);
        return response()->json(['message' => 'Return requested successfully']);
    }

    public function addresses_index(Request $request){
        return response()->json($request->user()->addresses);
    }

    public function addresses_store(Request $request){
        $data = $request->validate([
            'full_name' => 'required|string|max:100',
            'phone'     => 'required|string|max:20',
            'label' => 'nullable|string|max:50',
            'address' => 'required|string|max:255',
        ]);
        $address = $request->user()->addresses()->create($data);
        return response()->json($address);
    }

    public function addresses_destroy(Request $request, $id){
        $address = $request->user()->addresses()->findOrFail($id);
        $address->delete();
        return response()->json(['message' => 'Address deleted']);
    }

    public function wishlist_index(Request $request){
        return response()->json($request->user()->wishlist()->get());
    }

    public function wishlist_add(Request $request){
        $data = $request->validate(['product_id' => 'required|exists:products,id']);
        $request->user()->wishlist()->attach($data['product_id']);
        return response()->json(['message' => 'Added to wishlist']);

    }

    public function wishlist_remove(Request $request, $id){
        $request->user()->wishlist()->detach($id);
        return response()->json(['message' => 'Removed from wishlist']);
    }

    public function stats(Request $request){
        $user = $request->user();
        return response()->json([
            'total_orders' => $user->orders()->count(),
            'wallet_balance' => $user->wallet_balance ?? 0,
            'recent_activity' => $user->orders()->latest()->take(5)->get()
        ]);
    }

}
