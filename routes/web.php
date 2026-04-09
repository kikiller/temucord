<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\Api\ServerController;
use App\Http\Controllers\Api\ChannelController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\NotificationController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
Route::get('/api/servers', [ServerController::class, 'index']);
Route::get('/api/channels', [ChannelController::class, 'index']);
Route::get('/api/users', [UserController::class, 'index']);
Route::get('/api/messages', [MessageController::class, 'index']);   
Route::get('/api/roles', [RoleController::class, 'index']);
Route::get('/api/notifications', [NotificationController::class, 'index']);