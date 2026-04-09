<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class RoleApiTest extends TestCase
{
    public function test_api_returns_roles_successfully()
    {
        $response = $this->getJson('/api/roles');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'name',
                'color',
                'permissions'
            ]
        ]);
        
        // Verificamos que el rol de Admin tenga su color rojo
        $response->assertJsonFragment(['name' => 'Admin', 'color' => '#FF0000']);
    }
}