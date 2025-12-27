<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;




Route::view('/{any}', 'app')->where('any', '.*');

require __DIR__.'/settings.php';
