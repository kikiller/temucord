<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use Illuminate\Http\Request;

class ChannelController extends Controller
{
    public function index($serverId)
    {
        $channels = Channel::where('server_id', $serverId)
            ->orderBy('created_at')
            ->get();

        return response()->json([
            'status' => 'success',
            'channels' => $channels,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'server_id' => 'required|exists:servers,id',
            'created_by' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
        ]);

        $channel = Channel::create([
            'server_id' => $request->server_id,
            'created_by' => $request->created_by,
            'name' => strtolower(
                str_replace(' ', '-', $request->name)
            ),
            'type' => 'open',
        ]);

        return response()->json([
            'status' => 'success',
            'channel' => $channel,
        ], 201);
    }
}