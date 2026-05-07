<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::unprepared("
            DROP PROCEDURE IF EXISTS sp_crear_servidor;

            CREATE OR REPLACE PROCEDURE sp_crear_servidor(
                IN p_owner_id BIGINT,
                IN p_name VARCHAR,
                IN p_description TEXT,
                IN p_image VARCHAR,
                INOUT p_server_id BIGINT,
                INOUT p_message TEXT
            )
            LANGUAGE plpgsql
            AS $$
            BEGIN
                IF p_name IS NULL OR trim(p_name) = '' THEN
                    p_server_id := NULL;
                    p_message := 'El nombre del servidor no puede estar vacio';
                    RETURN;
                END IF;

                IF NOT EXISTS (
                    SELECT 1
                    FROM users
                    WHERE id = p_owner_id
                ) THEN
                    p_server_id := NULL;
                    p_message := 'El propietario no existe';
                    RETURN;
                END IF;

                INSERT INTO servers (
                    owner_id,
                    name,
                    description,
                    created_at,
                    updated_at
                )
                VALUES (
                    p_owner_id,
                    trim(p_name),
                    p_description,
                    NOW(),
                    NOW()
                )
                RETURNING id INTO p_server_id;

                INSERT INTO server_members (
                    server_id,
                    user_id,
                    joined_at,
                    created_at,
                    updated_at
                )
                VALUES (
                    p_server_id,
                    p_owner_id,
                    NOW(),
                    NOW(),
                    NOW()
                );

                p_message := 'Servidor creado correctamente';

            EXCEPTION
                WHEN OTHERS THEN
                    p_server_id := NULL;
                    p_message := SQLERRM;
            END;
            $$;
        ");
    }

    public function down(): void
    {
        DB::unprepared("
            DROP PROCEDURE IF EXISTS sp_crear_servidor;
        ");
    }
};