<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Server;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function store(Request $request, $serverId)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:open,closed',
            'description' => 'nullable|string'
        ]);

        $server = Server::findOrFail($serverId);

        Channel::create([
            'server_id' => $server->id,
            'created_by' => $request->user()->id,
            'name' => strtolower(str_replace(' ', '-', $validated['name'])),
            'type' => $validated['type'],
            'description' => $validated['description'] ?? null,
        ]);

        return back()->with('success', 'Canal creado exitosamente');
    }
}