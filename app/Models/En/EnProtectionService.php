<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class EnProtectionService extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'protection_services';

    public function getCoverUrlAttribute()
    {
        return $this->cover ? Storage::disk('s3')->url($this->cover) : null;
    }

    protected $appends = ['cover_url'];
}
