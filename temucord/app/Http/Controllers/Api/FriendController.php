<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FriendRequest;
use App\Models\User;
use Illuminate\Http\Request;

class FriendController extends Controller
{
    public function notifications(Request $request)
    {
        $userId = $request->query('user_id');

        $pendingCount = FriendRequest::where('receiver_id', $userId)
            ->where('status', 'pending')
            ->count();

        return response()->json([
            'status' => 'success',
            'notifications' => [
                [
                    'type' => 'friend_requests',
                    'message' => "Tienes {$pendingCount} solicitudes de amistad pendientes",
                    'count' => $pendingCount,
                ]
            ]
        ]);
    }

    public function requests(Request $request)
    {
        $userId = $request->query('user_id');

        $requests = FriendRequest::with('sender:id,username,email')
            ->where('receiver_id', $userId)
            ->where('status', 'pending')
            ->get();

        return response()->json([
            'status' => 'success',
            'requests' => $requests
        ]);
    }

    public function sendRequest(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|exists:users,id',
            'receiver_id' => 'required|exists:users,id',
        ]);

        if ($request->sender_id == $request->receiver_id) {
            return response()->json([
                'status' => 'error',
                'message' => 'No puedes enviarte solicitud a ti mismo'
            ], 400);
        }

        $exists = FriendRequest::where(function ($query) use ($request) {
            $query->where('sender_id', $request->sender_id)
                ->where('receiver_id', $request->receiver_id);
        })->orWhere(function ($query) use ($request) {
            $query->where('sender_id', $request->receiver_id)
                ->where('receiver_id', $request->sender_id);
        })->first();

        if ($exists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Ya existe una solicitud o amistad entre estos usuarios'
            ], 400);
        }

        $friendRequest = FriendRequest::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'status' => 'pending',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Solicitud enviada correctamente',
            'friend_request' => $friendRequest
        ], 201);
    }

    public function accept($id)
    {
        $friendRequest = FriendRequest::findOrFail($id);

        $friendRequest->update([
            'status' => 'accepted'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Solicitud aceptada correctamente'
        ]);
    }

    public function reject($id)
    {
        $friendRequest = FriendRequest::findOrFail($id);

        $friendRequest->update([
            'status' => 'rejected'
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Solicitud rechazada correctamente'
        ]);
    }

    public function friends(Request $request)
    {
        $userId = $request->query('user_id');

        $friendships = FriendRequest::with([
            'sender:id,username,email',
            'receiver:id,username,email'
        ])
            ->where('status', 'accepted')
            ->where(function ($query) use ($userId) {
                $query->where('sender_id', $userId)
                    ->orWhere('receiver_id', $userId);
            })
            ->get();

        $friends = $friendships->map(function ($friendship) use ($userId) {
            return $friendship->sender_id == $userId
                ? $friendship->receiver
                : $friendship->sender;
        });

        return response()->json([
            'status' => 'success',
            'friends' => $friends
        ]);
    }

    public function searchUsers(Request $request)
    {
        $userId = $request->query('user_id');
        $search = $request->query('search');

        if (!$search) {
            return response()->json([
                'status' => 'success',
                'users' => []
            ]);
        }

        $users = User::where('username', 'ILIKE', "%{$search}%")
            ->where('id', '!=', $userId)
            ->select('id', 'username', 'email')
            ->limit(10)
            ->get();

        return response()->json([
            'status' => 'success',
            'users' => $users
        ]);
    }
}