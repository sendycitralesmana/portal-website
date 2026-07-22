<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerwakilanDaerah extends Model
{
    protected $table = 'perwakilan_daerahs';

    protected $fillable = [
        'kantor',
        'alamat',
        'telepon',
        'email',
        'whatsapp',
        'twitter',
        'tiktok',
        'youtube',
        'instagram',
        'gambar',
        'latitude',
        'longitude',
        'lokasi',
        'maps',
        'link',
    ];
}
