<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Channel;
use App\Models\Server;
use App\Models\ServerMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServerController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->query('user_id');

        if (! $userId) {
            return response()->json([
                'status' => 'error',
                'message' => 'user_id es requerido',
            ], 422);
        }

        $servers = Server::query()
            ->where(function ($query) use ($userId) {
                $query->where('owner_id', $userId)
                    ->orWhereHas('members', function ($memberQuery) use ($userId) {
                        $memberQuery->where('user_id', $userId);
                    });
            })
            ->withCount('channels')
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'description',
                'owner_id',
                'invite_code',
                'created_at',
            ]);

        return response()->json([
            'status' => 'success',
            'servers' => $servers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'channel_name' => ['required', 'string', 'max:255'],
            'channel_type' => ['required', 'in:open,closed'],
        ]);

        $server = DB::transaction(function () use ($validated) {
            do {
                $inviteCode = Str::upper(Str::random(10));
            } while (Server::where('invite_code', $inviteCode)->exists());

            $server = Server::create([
                'owner_id' => $validated['user_id'],
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'invite_code' => $inviteCode,
                'invite_link' => rtrim(config('app.url'), '/') . '/invite/' . $inviteCode,
                'invite_qr_path' => null,
            ]);

            ServerMember::firstOrCreate(
                [
                    'server_id' => $server->id,
                    'user_id' => $validated['user_id'],
                ],
                [
                    'joined_at' => now(),
                ],
            );

            Channel::create([
                'server_id' => $server->id,
                'created_by' => $validated['user_id'],
                'name' => $validated['channel_name'],
                'type' => $validated['channel_type'],
                'description' => 'Canal inicial del servidor',
            ]);

            return $server->loadCount('channels');
        });

        return response()->json([
            'status' => 'success',
            'message' => 'Servidor creado correctamente',
            'server' => $server,
        ], 201);
    }
}