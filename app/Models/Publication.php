<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

class Publication extends Model
{

    protected $keyType = 'string';
    public $incrementing = false;

    public function publicationCategory(): BelongsTo
    {
        return $this->belongsTo(PublicationCategory::class, 'publication_category_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
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
