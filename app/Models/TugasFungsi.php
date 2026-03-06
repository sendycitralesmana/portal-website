<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TugasFungsi extends Model
{
    protected $table = 'tugas_fungsis';

    protected $fillable = [
        'kategori',
        'judul',
        'deskripsi',
        'gambar',
    ];
}
