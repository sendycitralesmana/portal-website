<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PublikasiMedia extends Model
{
    protected $table = 'publikasi_medias';

    protected $fillable = [
        'publikasi_id',
        'kategori',
        'judul',
        'deskripsi',
        'file',
    ];

    public function publikasi()
    {
        return $this->belongsTo(Publikasi::class);
    }
}
