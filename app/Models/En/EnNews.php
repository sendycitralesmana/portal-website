<?php

namespace App\Models\En;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Facades\Storage;

class EnNews extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'news';

    public function newsCategory(): BelongsTo
    {
        return $this->belongsTo(EnNewsCategory::class, 'news_category_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(EnNewsDocument::class, 'news_id', 'id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(EnNewsImage::class, 'news_id', 'id');
    }

    public function highlight(): HasOne
    {
        return $this->hasOne(EnHighlight::class, 'news_id', 'id');
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

    protected $appends = ['cover_url'];
}
