<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index($channelId)
    {
        $channel = Channel::findOrFail($channelId);

        // Traemos los mensajes con sus relaciones preparadas para el futuro
        $posts = $channel->posts()
            ->with(['user:id,username', 'attachments', 'reactions'])
            ->oldest()
            ->get();

        return response()->json($posts);
    }

    public function store(Request $request, $channelId)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|exists:users,id',
        ]);

        $channel = Channel::findOrFail($channelId);

        $post = Post::create([
            'channel_id' => $channel->id,
            'user_id' => $validated['user_id'],
            'content' => $validated['content'],
        ]);

        return response()->json(
            $post->load([
                'user:id,username',
                'attachments',
                'reactions'
            ])
        );
    }
}