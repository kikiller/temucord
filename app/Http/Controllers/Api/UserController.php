<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'id' => 1,
                'username' => 'Gabriel85',
                'email' => 'gabriel@morelia.it',
                'status' => 'online'
            ],
            [
                'id' => 2,
                'username' => 'Admin_Temu',
                'email' => 'admin@temucord.com',
                'status' => 'busy'
            ]
        ], 200);
    }
}