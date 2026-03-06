<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ApplicationCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class, 'application_category_id', 'id');
    }
}
