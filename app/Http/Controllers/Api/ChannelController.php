<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function index()
    {
        return response()->json([
            [
                'id' => 101,
                'name' => 'general',
                'type' => 'text',
                'server_id' => 1
            ],
            [
                'id' => 102,
                'name' => 'voz-gaming',
                'type' => 'voice',
                'server_id' => 2
            ]
        ], 200);
    }
}