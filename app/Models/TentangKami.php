<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TentangKami extends Model
{
    protected $table = 'tentang_kamis';

    protected $fillable = [
        'alamat',
        'telepon',
        'hotline',
        'whatsapp',
        'email',
        'jam_operasional',
        'latitude',
        'longitude',
        'gambar',
        'zoom',
    ];
}
