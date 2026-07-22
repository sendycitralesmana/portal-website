<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaklumatStandar extends Model
{
    protected $table = 'maklumat_standar';

    protected $fillable = [
        'judul',
        'deskripsi',
        'file',
    ];
}
