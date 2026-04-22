<?php

namespace App\Http\Middleware;

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
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->username ?? $request->user()->name,
                        'username' => $request->user()->username ?? $request->user()->name,
                        'email' => $request->user()->email,
                        'birth_date' => $request->user()->birth_date ?? null,
                        'is_global_admin' => $request->user()->is_global_admin ?? false,
                        'blocked_at' => $request->user()->blocked_at ?? null,
                        'email_verified_at' => $request->user()->email_verified_at,
                    ]
                    : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
            ],
        ];
    }
}