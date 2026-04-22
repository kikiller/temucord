<?php

namespace App\Http\Middleware;

use App\Models\Server;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $user
                    ? [
                        'id' => $user->id,
                        'name' => $user->username ?? $user->name,
                        'username' => $user->username ?? $user->name,
                        'email' => $user->email,
                        'birth_date' => $user->birth_date ?? null,
                        'is_global_admin' => $user->is_global_admin ?? false,
                        'blocked_at' => $user->blocked_at ?? null,
                        'email_verified_at' => $user->email_verified_at,
                    ]
                    : null,
            ],

            'flash' => [
                'success' => $request->session()->get('success'),
            ],

            'userServers' => $user
                ? Server::query()
                    ->where(function ($query) use ($user) {
                        $query->where('owner_id', $user->id)
                            ->orWhereHas('members', function ($memberQuery) use ($user) {
                                $memberQuery->where('user_id', $user->id);
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
                    ])
                : [],
        ];
    }
}