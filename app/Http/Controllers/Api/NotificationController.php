<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'id' => 1,
                'type' => 'mention',
                'message' => 'Admin_Temu te mencionó en #general',
                'read' => false,
                'created_at' => now()->diffForHumans()
            ],
            [
                'id' => 2,
                'type' => 'friend_request',
                'message' => 'Nuevo seguidor: User_Morelia',
                'read' => true,
                'created_at' => 'hace 2 horas'
            ]
        ], 200);
    }
}