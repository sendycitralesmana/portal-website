<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Affiliate extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function getCoverUrlAttribute()
    {
        return $this->cover ? Storage::disk('s3')->url($this->cover) : null;
    }

    protected $appends = ['cover_url'];
}
