<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EnPublicationCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'publication_categories';

    public function publications(): HasMany
    {
        return $this->hasMany(EnPublication::class, 'publication_category_id', 'id');
    }
}
