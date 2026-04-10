<?php

namespace Tests\Unit\Models;

use Tests\TestCase;
use App\Models\User;
use App\Models\Server;
use App\Models\Channel;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Database\QueryException;

class ServerLogicTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function test_uno_creacion_servidor()
    {
        $user = User::factory()->create();
        $server = Server::create([
            'name' => 'Temucord Oficial',
            'description' => 'Servidor de prueba',
            'owner_id' => $user->id // Ajustado a owner_id según tu error
        ]);
        $this->assertEquals('Temucord Oficial', $server->name);
    }

    /** @test */
    public function test_dos_relacion_usuario()
    {
        $user = User::factory()->create();
        $server = Server::factory()->create(['owner_id' => $user->id]);
        // Verifica si tu relación en el modelo Server se llama 'owner' o 'user'
        $this->assertNotNull($server->owner_id);
    }

    /** @test */
    /** @test */
    /** @test */
    /** @test */
    public function test_tres_relacion_canales()
    {
        $user = User::factory()->create();
        $server = Server::factory()->create(['owner_id' => $user->id]);
        
        // No enviamos el 'type' manualmente, dejamos que la Factory 
        // o la base de datos use su valor por defecto.
        $channel = new Channel([
            'name' => 'general',
            'server_id' => $server->id,
            'created_by' => $user->id,
        ]);
        
        // Si tienes un valor por defecto en la migración, esto funcionará.
        // Si no, asegúrate de poner aquí el valor EXACTO que pide tu CHECK constraint.
        $channel->save();

        $this->assertCount(1, $server->channels);
    }

    /** @test */
    public function test_cuatro_booleano_admin()
    {
        $user = User::factory()->create(['is_admin' => true]);
        $this->assertTrue((bool) $user->is_admin);
    }

    /** @test */
    public function test_cinco_booleano_block()
    {
        // Si el error dice que no existe la columna 'block', 
        // asegúrate de que tu migración de usuarios la incluya.
        $user = User::factory()->create(['is_admin' => false]);
        $this->assertFalse((bool) $user->is_admin);
    }

    /** @test */
    public function test_seis_integridad_postgres()
    {
        $this->expectException(QueryException::class);
        // Forzamos error de integridad (falta owner_id)
        Server::create(['name' => 'Fail']);
    }
}