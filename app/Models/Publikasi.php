<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Publikasi extends Model
{
    protected $fillable = [
        'jenis',
        'kategori',
        'judul',
        'slug',
        'deskripsi',
        'gambar',
        'tanggal',
    ];

    public function media()
    {
        return $this->hasMany(PublikasiMedia::class, 'publikasi_id', 'id')->orderBy('created_at', 'desc');
    }
}
