<?php

namespace App\Models\En;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EnHighlight extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $connection = 'pgsql_en';
    protected $table = 'highlights';
    
    public function highlightCategory(): BelongsTo
    {
        return $this->belongsTo(EnHighlightCategory::class, 'highlight_category_id', 'id');
    }

    public function news(): BelongsTo
    {
        return $this->belongsTo(EnNews::class, 'news_id', 'id');
    }
}
