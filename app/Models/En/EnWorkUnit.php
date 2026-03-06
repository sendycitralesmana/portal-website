<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;

class EnWorkUnit extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'work_units';

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->locale('id')->isoFormat('dddd, D MMMM YYYY');
    }

    // set updatedAt to format
    public function getUpdatedAtAttribute($value)
    {
        return \Carbon\Carbon::parse($value)->locale('id')->isoFormat('dddd, D MMMM YYYY');
    }
}
