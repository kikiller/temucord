<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $request->validate([
                'username'   => 'required|string|max:255',
                'email'      => 'required|string|email|max:255|unique:users',
                'password'   => 'required|string|min:8|confirmed',
                'birth_date' => 'required|date',
            ]);

            $user = User::create([
                'username'   => $request->username,
                'email'      => $request->email,
                'password'   => Hash::make($request->password),
                'birth_date' => $request->birth_date,
            ]);

            return response()->json([
                'status'  => 'success',
                'message' => 'Usuario registrado correctamente',
                'user'    => $user
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => $e->getMessage()
            ], 400);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'status'  => 'success',
                'message' => 'Sesión iniciada correctamente',
                'user'    => $user
            ], 200);
        }

        return response()->json([
            'status'  => 'error',
            'message' => 'Credenciales incorrectas'
        ], 401);
    }
}