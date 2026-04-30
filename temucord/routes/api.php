<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\StatusController;
// Agregamos esta línea para que Laravel encuentre el controlador que creamos
use App\Http\Controllers\Api\AuthController; 

Route::get('/status', [StatusController::class, 'index']);

// Ahora Laravel ya sabe que AuthController se refiere al que está en la carpeta Api
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

