<?php

namespace Database\Factories;

use App\Models\Server;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Server>
 */
class ServerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
{
    return [
        'name' => fake()->company(),
        'description' => fake()->sentence(),
        'owner_id' => \App\Models\User::factory(), // Usando owner_id como dice tu error
    ];
}
}
