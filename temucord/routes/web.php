<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Server;
use App\Http\Controllers\ServerController;

Route::post('/servers', [ServerController::class, 'store']);

Route::get('/', function () {
    return Auth::check()
        ? redirect()->route('dashboard')
        : redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard', [
            'servers' => Server::where('owner_id', auth()->id())->get(),
        ]);
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
