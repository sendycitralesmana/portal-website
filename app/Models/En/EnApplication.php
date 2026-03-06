<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class EnApplication extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'applications';

    public function applicationCategory(): BelongsTo
    {
        return $this->belongsTo(EnApplicationCategory::class, 'application_category_id', 'id');
    }

    public function getCoverUrlAttribute()
    {
        return $this->cover ? Storage::disk('s3')->url($this->cover) : null;
    }

    protected $appends = ['cover_url'];
}
