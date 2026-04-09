<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'id' => 1,
                'name' => 'Admin',
                'color' => '#FF0000',
                'permissions' => ['manage_server', 'kick_members']
            ],
            [
                'id' => 2,
                'name' => 'Moderador',
                'color' => '#00FF00',
                'permissions' => ['manage_messages']
            ],
            [
                'id' => 3,
                'name' => 'User',
                'color' => '#808080',
                'permissions' => []
            ]
        ], 200);
    }
}