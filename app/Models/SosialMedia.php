<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SosialMedia extends Model
{
    protected $table = 'sosial_medias';

    protected $fillable = [
        'platform',
        'embed_url',
    ];
}
