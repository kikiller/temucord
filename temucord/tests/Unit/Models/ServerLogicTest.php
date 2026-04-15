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
            'owner_id' => $user->id 
        ]);
        $this->assertEquals('Temucord Oficial', $server->name);
    }

    /** @test */
    public function test_dos_relacion_usuario()
    {
        $user = User::factory()->create();
        $server = Server::factory()->create(['owner_id' => $user->id]);
        $this->assertNotNull($server->owner_id);
    }

    /** @test */
    public function test_tres_relacion_canales()
    {
        $user = User::factory()->create();
        $server = Server::factory()->create(['owner_id' => $user->id]);
        
        $channel = new Channel([
            'name' => 'general',
            'server_id' => $server->id,
            'created_by' => $user->id,
        ]);
        
        $channel->save();

        $this->assertCount(1, $server->channels);
    }

    /** @test */
    public function test_cuatro_booleano_admin()
    {
        // Corregido: Se cambió 'is_admin' por 'is_global_admin' según el error de Postgres
        $user = User::factory()->create(['is_global_admin' => true]);
        $this->assertTrue((bool) $user->is_global_admin);
    }

    /** @test */
    public function test_cinco_booleano_block()
    {
        // Corregido: Se cambió 'is_admin' por 'is_global_admin' para que coincida con la migración
        $user = User::factory()->create(['is_global_admin' => false]);
        $this->assertFalse((bool) $user->is_global_admin);
    }

    /** @test */
    public function test_seis_integridad_postgres()
    {
        $this->expectException(QueryException::class);
        // Forzamos error de integridad (falta owner_id)
        Server::create(['name' => 'Fail']);
    }
}