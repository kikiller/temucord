<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ChannelReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'channel_id',
        'reported_by',
        'reason',
        'status',
    ];

    public function channel()
    {
        return $this->belongsTo(Channel::class);
    }

    public function reporter()
    {
        return $this->belongsTo(User::class, 'reported_by');
    }
}