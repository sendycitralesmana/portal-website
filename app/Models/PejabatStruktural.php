<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PejabatStruktural extends Model
{
    protected $table = 'pejabat_strukturals';

    protected $fillable = [
        'kategori',
        'nama',
        'jabatan',
        'deskripsi',
        'foto',
    ];
}
