<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VideoInfo extends Model
{
    protected $table = 'video_infos';

    protected $fillable = [
        'judul',
        'embed_url',
        'deskripsi',
    ];
}
