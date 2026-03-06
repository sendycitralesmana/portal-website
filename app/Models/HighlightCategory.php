<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HighlightCategory extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public function highlights(): HasMany
    {
        return $this->hasMany(Highlight::class, 'highlight_category_id', 'id');
    }
}
