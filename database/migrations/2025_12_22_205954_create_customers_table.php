<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('full_name');
            $table->string('phone', 20);
            $table->text('address');
            $table->string('label')->nullable();
            $table->timestamps();
        });

         Schema::create('wishlist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedBigInteger('product_id');
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });

         Schema::create('activity', function (Blueprint $table) {
            $table->id();
            $table->string('message');
            $table->timestamps();
        });

         Schema::create('stats', function (Blueprint $table) {
            $table->id();
            $table->integer('total_orders')->default(0);
            $table->decimal('wallet_balance', 10, 2)->default(0);
            $table->timestamps();
        });
         Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('status')->default('pending');
            $table->decimal('total', 10, 2);
            $table->boolean('return_requested')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
        Schema::dropIfExists('wishlist');
        Schema::dropIfExists('activity');
        Schema::dropIfExists('stats');
        Schema::dropIfExists('orders');
    }
};
