<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Server;
use App\Http\Controllers\ServerController;
use App\Http\Controllers\ChannelController;

Route::post('/servers', [ServerController::class, 'store']);

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            // AQUÍ ESTÁ LA CLAVE: Agregamos ->with('channels') para que Inertia reciba los canales
            'servers' => Server::where('owner_id', auth()->id())->with('channels')->get(),
        ]);
    })->name('dashboard');

    Route::post('/servers/{serverId}/channels', [ChannelController::class, 'store'])->name('channels.store');
});

require __DIR__ . '/settings.php';