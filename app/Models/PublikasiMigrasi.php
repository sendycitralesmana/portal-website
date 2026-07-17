<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PublikasiMigrasi extends Model
{
    protected $table = 'publikasi_migrasi';

    protected $fillable = [
        'jenis',
        'kategori',
        'judul',
        'slug',
        'deskripsi',
        'gambar',
        'tanggal',
    ];
}
