<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PublicationCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class, 'publication_category_id', 'id');
    }
}
