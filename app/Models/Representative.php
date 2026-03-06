<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Representative extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->locale('id')->isoFormat('dddd, D MMMM YYYY');
    }

    // set updatedAt to format
    public function getUpdatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->locale('id')->isoFormat('dddd, D MMMM YYYY');
    }

    public function getCoverUrlAttribute()
    {
        return $this->cover ? Storage::disk('s3')->url($this->cover) : null;
    }

    protected $appends = ['cover_url'];
}
