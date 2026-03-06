<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;

class EnApplicationCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'application_categories';
}
