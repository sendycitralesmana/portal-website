<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class EnNewsImage extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    
    protected $connection = 'pgsql_en';
    protected $table = "news_images";

    protected $fillable = [
        'id',
        'news_id',
        'name',
        'size',
        'extension',
        'url',
    ];

    public function news(): BelongsTo
    {
        return $this->belongsTo(EnNews::class, 'news_id', 'id');
    }

    protected $appends = ['full_url'];

    public function getFullUrlAttribute()
    {
        return $this->url ? Storage::disk('s3')->url($this->url) : null;
    }
}
