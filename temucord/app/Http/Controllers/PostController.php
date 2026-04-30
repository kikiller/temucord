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
        ]);

        $channel = Channel::findOrFail($channelId);

        $post = Post::create([
            'channel_id' => $channel->id,
            'user_id' => auth()->id(),
            'content' => $validated['content'],
        ]);

        // Retornamos el mensaje creado junto con el usuario y relaciones vacías
        return response()->json($post->load(['user:id,username', 'attachments', 'reactions']));
    }
}