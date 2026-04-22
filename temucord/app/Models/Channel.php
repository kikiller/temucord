<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Channel extends Model
{
    use HasFactory;

    protected $fillable = [
        'server_id',
        'created_by',
        'name',
        'type',
        'description',
    ];

    public function server()
    {
        return $this->belongsTo(Server::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function reports()
    {
        return $this->hasMany(ChannelReport::class);
    }
}