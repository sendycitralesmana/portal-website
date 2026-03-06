<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Structure extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function getFotoUrlAttribute()
    {
        return $this->foto ? Storage::disk('s3')->url($this->foto) : null;
    }

    protected $appends = ['foto_url'];
}
