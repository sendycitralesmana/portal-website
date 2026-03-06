<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProfileCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function profiles(): HasMany
    {
        return $this->hasMany(Profile::class, 'profile_category_id', 'id');
    }
}
