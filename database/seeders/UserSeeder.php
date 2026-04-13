<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@temucord.com'],
            [
                'username' => 'admin_global',
                'birth_date' => '2000-01-01',
                'password' => 'Admin12345',
                'is_global_admin' => true,
                'blocked_at' => null,
            ]
        );

        User::updateOrCreate(
            ['email' => 'user1@temucord.com'],
            [
                'username' => 'miembro_uno',
                'birth_date' => '2002-05-10',
                'password' => 'User12345',
                'is_global_admin' => false,
                'blocked_at' => null,
            ]
        );

        User::updateOrCreate(
            ['email' => 'user2@temucord.com'],
            [
                'username' => 'miembro_dos',
                'birth_date' => '2003-08-20',
                'password' => 'User12345',
                'is_global_admin' => false,
                'blocked_at' => null,
            ]
        );
    }
}
