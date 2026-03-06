<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Highlight extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;
    
    public function highlightCategory(): BelongsTo
    {
        return $this->belongsTo(HighlightCategory::class, 'highlight_category_id', 'id');
    }

    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class, 'news_id', 'id');
    }
    
}
