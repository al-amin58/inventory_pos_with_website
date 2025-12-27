<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\DashboardController;



/**---------webstie system start------------ **/
    
    Route::get('/', [WebsiteController::class, "index"]);
    Route::get('/activate-account/{encryptedId}', [AuthController::class, 'activateAccount']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot-password', [AuthController::class, 'sendReset']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);
    Route::post('/verify-otp', [AuthController::class, 'verifyOtp']);
    Route::middleware(['auth:sanctum', 'permission:customer'])->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/dashboard/stats', [CustomerController::class, 'stats']);

        Route::get('/profile', [CustomerController::class, 'profile']);
        Route::put('/profile', [CustomerController::class, 'updateProfile']);
        Route::put('/profile/password', [CustomerController::class, 'updatePassword']);

        Route::get('/orders', [CustomerController::class, 'orders']);
        Route::get('/orders/{order}/invoice', [CustomerController::class, 'invoice']);
        Route::post('/orders/{order}/return', [CustomerController::class, 'returnRequest']);

        Route::get('/addresses', [CustomerController::class, 'addresses_index']);
        Route::post('/addresses', [CustomerController::class, 'addresses_store']);
        Route::delete('/addresses/{address}', [CustomerController::class, 'addresses_destroy']);

        Route::get('/wishlist', [CustomerController::class, 'wishlist_index']);
        Route::post('/wishlist', [CustomerController::class, 'wishlist_add']);
        Route::delete('/wishlist/{id}', [CustomerController::class, 'wishlist_remove']);

        

    });


    /**---------pos system start------------ **/

   
    Route::post('/staff-login', [AuthController::class, 'staffLogin']);

    Route::middleware(['auth:sanctum', 'admin.only'])->prefix('admin')->group(function () {
        Route::post('/logout', [AuthController::class, 'staffLogout']);
        
        Route::middleware(['permission:view-dashboard'])->group(function () {
            Route::get('/dashboard', [DashboardController::class, 'index']);
           
        });


    });


    

    