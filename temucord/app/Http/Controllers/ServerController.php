<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Server;
use App\Models\ServerMember;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ServerController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'channel_name' => ['required', 'string', 'max:255'],
            'channel_type' => ['required', 'in:open,closed'],
        ]);

        $user = $request->user();

        DB::transaction(function () use ($validated, $user) {
            do {
                $inviteCode = Str::upper(Str::random(10));
            } while (Server::where('invite_code', $inviteCode)->exists());

            $server = Server::create([
                'owner_id' => $user->id,
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'invite_code' => $inviteCode,
                'invite_link' => rtrim(config('app.url'), '/') . '/invite/' . $inviteCode,
                'invite_qr_path' => null,
            ]);

            ServerMember::firstOrCreate(
                [
                    'server_id' => $server->id,
                    'user_id' => $user->id,
                ],
                [
                    'joined_at' => now(),
                ],
            );

            Channel::create([
                'server_id' => $server->id,
                'created_by' => $user->id,
                'name' => $validated['channel_name'],
                'type' => $validated['channel_type'],
                'description' => 'Canal inicial del servidor',
            ]);
        });

        return back()->with('success', 'Servidor creado correctamente.');
    }
}