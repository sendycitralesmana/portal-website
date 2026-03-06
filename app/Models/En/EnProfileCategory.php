<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EnProfileCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'profile_categories';

    public function profiles(): HasMany
    {
        return $this->hasMany(EnProfile::class, 'profile_category_id', 'id');
    }
}
