<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class NewsDocument extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = "news_documents";

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
        return $this->belongsTo(News::class, 'news_id', 'id');
    }

    
    public function getFullUrlAttribute()
    {
        return $this->url ? Storage::disk('s3')->url($this->url) : null;
    }
    protected $appends = ['full_url'];
}
