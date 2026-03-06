<?php

namespace App\Models\En;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class EnPublication extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'publications';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function publicationCategory(): BelongsTo
    {
        return $this->belongsTo(EnPublicationCategory::class, 'publication_category_id', 'id');
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
