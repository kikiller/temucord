<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class NotificationApiTest extends TestCase
{
    public function test_api_returns_notifications_successfully()
    {
        $response = $this->getJson('/api/notifications');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'type',
                'message',
                'read',
                'created_at'
            ]
        ]);

        $response->assertJsonFragment(['read' => false]);
    }
}