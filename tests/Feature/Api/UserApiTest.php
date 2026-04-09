<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class UserApiTest extends TestCase
{
    public function test_api_returns_users_successfully()
    {
        // 1. Llamamos a la ruta de usuarios que pusimos en web.php
        $response = $this->getJson('/api/users');

        // 2. Verificamos que responda con un 200 OK
        $response->assertStatus(200);

        // 3. Validamos la estructura de la lista de usuarios
        $response->assertJsonStructure([
            '*' => [
                'id',
                'username',
                'email',
                'status'
            ]
        ]);

        // 4. Verificamos que un usuario específico esté en la respuesta
        $response->assertJsonFragment([
            'username' => 'Gabriel85',
            'status' => 'online'
        ]);
    }
}