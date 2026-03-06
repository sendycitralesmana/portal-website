<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BerandaRedesignBackController extends Controller
{
    public function beranda()
    {
        return Inertia::render('backoffice/redesign/beranda/page');
    }
}
