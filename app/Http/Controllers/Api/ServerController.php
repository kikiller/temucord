<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ServerController extends Controller
{
    public function index()
{
    return response()->json([  // Primer corchete (la lista)
    [                      // Segundo corchete (el primer objeto)
        'id' => 1, 
        'name' => 'General', 
        'description' => 'Servidor principal'
    ],
    [                      // El segundo objeto
        'id' => 2, 
        'name' => 'Gaming', 
        'description' => 'Espacio para jugar'
    ]
], 200);
}
}