<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\StatusController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServerController;
use App\Http\Controllers\Api\ChannelController;

Route::get('/status', [StatusController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| SERVERS
|--------------------------------------------------------------------------
*/

Route::get('/servers', [ServerController::class, 'index']);
Route::post('/servers', [ServerController::class, 'store']);

/*
|--------------------------------------------------------------------------
| CHANNELS
|--------------------------------------------------------------------------
*/

Route::get(
    '/servers/{serverId}/channels',
    [ChannelController::class, 'index']
);

Route::post(
    '/channels',
    [ChannelController::class, 'store']
);

use App\Http\Controllers\PostController;

/*
|--------------------------------------------------------------------------
| POSTS
|--------------------------------------------------------------------------
*/

Route::get(
    '/channels/{channelId}/posts',
    [PostController::class, 'index']
);

Route::post(
    '/channels/{channelId}/posts',
    [PostController::class, 'store']
);