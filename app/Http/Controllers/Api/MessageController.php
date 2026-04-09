<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'id' => 501,
                'content' => '¡Hola a todos en Temucord!',
                'user_id' => 1,
                'channel_id' => 101,
                'timestamp' => '2026-04-09 10:00:00'
            ],
            [
                'id' => 502,
                'content' => '¿Alguien para una partida de Minecraft?',
                'user_id' => 2,
                'channel_id' => 102,
                'timestamp' => '2026-04-09 10:05:00'
            ]
        ], 200);
    }
}