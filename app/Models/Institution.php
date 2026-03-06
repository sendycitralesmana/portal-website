<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Institution extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function getDocumentUrlAttribute()
    {
        return $this->document ? Storage::disk('s3')->url($this->document) : null;
    }

    public function getFileUrlAttribute()
    {
        return $this->file ? Storage::disk('s3')->url($this->file) : null;
    }

    public function getVisionCoverUrlAttribute()
    {
        return $this->vision_cover ? Storage::disk('s3')->url($this->vision_cover) : null;
    }

    public function getMissionCoverUrlAttribute()
    {
        return $this->mission_cover ? Storage::disk('s3')->url($this->mission_cover) : null;
    }

    protected $appends = ['document_url', 'vision_cover_url', 'mission_cover_url', 'file_url'];
}
