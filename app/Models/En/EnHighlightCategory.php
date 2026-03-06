<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EnHighlightCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'highlight_categories';

    public function highlights(): HasMany
    {
        return $this->hasMany(EnHighlight::class, 'highlight_category_id', 'id');
    }
}
