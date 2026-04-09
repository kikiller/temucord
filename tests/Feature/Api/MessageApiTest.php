<?php

namespace Tests\Feature\Api;

use Tests\TestCase;

class MessageApiTest extends TestCase
{
    public function test_api_returns_messages_successfully()
    {
        $response = $this->getJson('/api/messages');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            '*' => [
                'id',
                'content',
                'user_id',
                'channel_id',
                'timestamp'
            ]
        ]);
    }
}