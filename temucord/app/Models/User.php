<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

#[Fillable([
    'username',
    'email',
    'password',
    'birth_date',
    'is_global_admin',
    'blocked_at',
])]
#[Hidden([
    'password',
    'two_factor_secret',
    'two_factor_recovery_codes',
    'remember_token',
])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
            'two_factor_confirmed_at' => 'datetime',
            'is_global_admin' => 'boolean',
            'blocked_at' => 'datetime',
        ];
    }

    public function ownedServers()
    {
        return $this->hasMany(Server::class, 'owner_id');
    }

    public function serverMemberships()
    {
        return $this->hasMany(ServerMember::class);
    }

    public function channels()
    {
        return $this->hasMany(Channel::class, 'created_by');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function reactions()
    {
        return $this->hasMany(Reaction::class);
    }

    public function channelReports()
    {
        return $this->hasMany(ChannelReport::class, 'reported_by');
    }
}
