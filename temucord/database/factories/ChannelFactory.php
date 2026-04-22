<?php

namespace Database\Factories;

use App\Models\Channel;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Channel>
 */
class ChannelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name' => fake()->word(),
        'server_id' => \App\Models\Server::factory(),
        // Ajusta esto según lo que definiste en tu migración (ejemplo: 'TEXT', 'VOICE' o 1)
        'type' => 'TEXT', 
        'created_by' => \App\Models\User::factory(),
    ];
}
}
