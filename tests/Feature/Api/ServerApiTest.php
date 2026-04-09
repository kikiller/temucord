<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class ServerApiTest extends TestCase
{
    public function test_api_returns_servers_successfully()
    {
        // Simulamos la petición a la ruta que creamos en el paso 2
        $response = $this->getJson('/api/servers');

        // Verificamos que el código de estado sea 200 (Éxito)
        $response->assertStatus(200);

        // Verificamos que la estructura contenga los campos esperados
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'description']
        ]);
    }
}   