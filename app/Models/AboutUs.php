<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AboutUs extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'address',
        'phone',
        'hotline',
        'whatsapp',
        'email',
        'faqs',
        'facebook',
        'instagram',
        'twitter',
        'youtube',
        'tiktok',
    ];
}
