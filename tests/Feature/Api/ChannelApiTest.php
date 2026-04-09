<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class ChannelApiTest extends TestCase
{
    public function test_api_returns_channels_successfully()
    {
        // 1. Hacemos la petición a la nueva ruta
        $response = $this->getJson('/api/channels');

        // 2. Verificamos que el estado sea 200 (Éxito)
        $response->assertStatus(200);

        // 3. Verificamos que la estructura JSON sea la correcta
        // Esperamos una lista (*) donde cada objeto tenga id, name, type y server_id
        $response->assertJsonStructure([
            '*' => ['id', 'name', 'type', 'server_id']
        ]);

        // 4. Opcional: Validamos que contenga un dato específico que pusimos
        $response->assertJsonFragment([
            'name' => 'general',
            'type' => 'text'
        ]);
    }
}