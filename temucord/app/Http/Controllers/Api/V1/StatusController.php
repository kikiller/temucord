<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StatusController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'version' => 'Laravel 12 API',
            'estado' => 'Conectado exitosamente',
            'estudiante' => 'Enrique',
            'fecha' => now()->format('d-m-Y H:i:s')
        ]);
    }
}