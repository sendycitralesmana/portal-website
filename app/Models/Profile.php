<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Profile extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function profileCategory(): BelongsTo
    {
        return $this->belongsTo(ProfileCategory::class, 'profile_category_id', 'id');
    }

    public function getFotoUrlAttribute()
    {
        return $this->foto ? Storage::disk('s3')->url($this->foto) : null;
    }

    protected $appends = ['foto_url'];
}
