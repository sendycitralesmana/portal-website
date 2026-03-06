<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfilPimpinan extends Model
{
    protected $table = 'profil_pimpinans';

    protected $fillable = [
        'nama',
        'jabatan',
        'deskripsi',
        'foto',
    ];
}
