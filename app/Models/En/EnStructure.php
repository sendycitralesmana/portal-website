<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class EnStructure extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'structures';

    public function getFotoUrlAttribute()
    {
        return $this->foto ? Storage::disk('s3')->url($this->foto) : null;
    }

    protected $appends = ['foto_url'];
}
