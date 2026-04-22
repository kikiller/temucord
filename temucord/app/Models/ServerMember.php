<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServerMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'server_id',
        'user_id',
        'joined_at',
    ];

    protected function casts(): array
    {
        return [
            'joined_at' => 'datetime',
        ];
    }

    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}