<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServerController extends Controller
{
    public function index()
    {
        $servers = Server::with('owner')->get();

        return response()->json([
            'status' => 'success',
            'servers' => $servers,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'owner_id' => 'required|exists:users,id',
            'image' => 'nullable|image|max:4096',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {

            $imagePath = $request->file('image')->store(
                'servers',
                'public'
            );
        }

        $server = Server::create([
            'owner_id' => $request->owner_id,
            'name' => $request->name,
            'invite_code' => Str::random(10),
            'image' => $imagePath,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Servidor creado correctamente',
            'server' => $server,
        ], 201);
    }
}