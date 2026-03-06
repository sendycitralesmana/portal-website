<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class EnProfile extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'profiles';

    public function profileCategory(): BelongsTo
    {
        return $this->belongsTo(EnProfileCategory::class, 'profile_category_id', 'id');
    }

    public function getFotoUrlAttribute()
    {
        return $this->foto ? Storage::disk('s3')->url($this->foto) : null;
    }

    protected $appends = ['foto_url'];
}
