<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class News extends Model
{

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id',
        'title',
        'content',
        'document_url',
        'cover',
        'news_category_id',
        'user_id',
        'status',
    ];

    public function newsCategory(): BelongsTo
    {
        return $this->belongsTo(NewsCategory::class, 'news_category_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function highlight(): HasOne
    {
        return $this->hasOne(Highlight::class, 'news_id', 'id');
    }
    
    public function documents(): HasMany
    {
        return $this->hasMany(NewsDocument::class, 'news_id', 'id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(NewsImage::class, 'news_id', 'id');
    }

    // set createdAt to format
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

    public function getDocumentFullUrlAttribute()
    {
        return $this->document_url ? Storage::disk('s3')->url($this->document_url) : null;
    }

    protected $appends = ['cover_url', 'document_full_url'];
}
