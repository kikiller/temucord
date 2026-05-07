<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ServerController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
        ]);

        $result = DB::select(
            'CALL sp_crear_servidor(?, ?, ?, ?, NULL, NULL)',
            [
                auth()->id(),
                $request->name,
                null,
                null,
            ]
        );

        $response = $result[0] ?? null;

        if (!$response || $response->p_server_id === null) {
            return back()->withErrors([
                'name' => $response->p_message ?? 'No se pudo crear el servidor',
            ]);
        }

        return back()->with('success', $response->p_message);
    }
}