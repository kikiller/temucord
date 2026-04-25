<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Server;

class ServerController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('servers', 'public');
        }

        Server::create([
            'name' => $request->name,
            'owner_id' => auth()->id(),
            'image' => $imagePath,
        ]);

        return back();
    }

}