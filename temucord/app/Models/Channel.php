<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}