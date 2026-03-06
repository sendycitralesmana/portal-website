<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Application extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function applicationCategory(): BelongsTo
    {
        return $this->belongsTo(ApplicationCategory::class, 'application_category_id', 'id');
    }

    public function getCoverUrlAttribute()
    {
        return $this->cover ? Storage::disk('s3')->url($this->cover) : null;
    }

    protected $appends = ['cover_url'];

}
