<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Customer extends Model
{
    protected $fillable = ['label', 'address','user_id', 'full_name',
        'phone',];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
