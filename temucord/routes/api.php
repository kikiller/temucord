<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\StatusController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServerController;
use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\FriendController;
use App\Http\Controllers\Api\DirectMessageController;

Route::get('/direct-messages', [DirectMessageController::class, 'index']);
Route::post('/direct-messages', [DirectMessageController::class, 'store']);

/*
|--------------------------------------------------------------------------
| FRIENDS / NOTIFICATIONS
|--------------------------------------------------------------------------
*/

Route::get('/notifications', [FriendController::class, 'notifications']);

Route::get('/friend-requests', [FriendController::class, 'requests']);

Route::post('/friend-requests', [FriendController::class, 'sendRequest']);

Route::post('/friend-requests/{id}/accept', [FriendController::class, 'accept']);

Route::post('/friend-requests/{id}/reject', [FriendController::class, 'reject']);

Route::get('/friends', [FriendController::class, 'friends']);

Route::get('/status', [StatusController::class, 'index']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/users/search', [FriendController::class, 'searchUsers']);

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