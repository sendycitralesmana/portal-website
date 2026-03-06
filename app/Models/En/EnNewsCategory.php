<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EnNewsCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'news_categories';

    public function news(): HasMany
    {
        return $this->hasMany(EnNews::class, 'news_category_id', 'id');
    }
}
