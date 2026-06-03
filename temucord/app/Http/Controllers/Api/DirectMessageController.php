<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\DirectMessage;
use Illuminate\Http\Request;

class DirectMessageController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');
        $friendId = $request->query('friend_id');

        $messages = DirectMessage::where(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $userId)
                ->where('receiver_id', $friendId);
        })
        ->orWhere(function ($query) use ($userId, $friendId) {
            $query->where('sender_id', $friendId)
                ->where('receiver_id', $userId);
        })
        ->orderBy('created_at')
        ->get();

        return response()->json([
            'status' => 'success',
            'messages' => $messages
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
        ]);

        $message = DirectMessage::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'message' => $request->message,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => $message
        ], 201);
    }
}