<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Server;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\ChannelController;
use App\Http\Controllers\PostController;

Route::post('/servers', [ServerController::class, 'store']);

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            // MODIFICACIÓN: Trae los servidores donde eres dueño O donde eres miembro invitado
            'servers' => Server::where('owner_id', auth()->id())
                ->orWhereHas('members', function ($query) {
                    $query->where('user_id', auth()->id());
                })
                ->with('channels')
                ->get(),
        ]);
    })->name('dashboard');

    // Rutas de Canales
    Route::post('/servers/{serverId}/channels', [ChannelController::class, 'store'])->name('channels.store');
    
    // Rutas de Mensajes (Posts)
    Route::get('/channels/{channel}/posts', [PostController::class, 'index'])->name('posts.index');
    Route::post('/channels/{channel}/posts', [PostController::class, 'store'])->name('posts.store');
});

require __DIR__ . '/settings.php';