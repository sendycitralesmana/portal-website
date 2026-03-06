<?php

namespace App\Http\Controllers\FrontOffice\En;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use App\Models\Affiliate;
use App\Models\En\EnApplication;
use App\Models\En\EnHighlight;
use App\Models\En\EnNews;
use App\Models\En\EnPublication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnDashboardFrontController extends Controller
{
    public function index()
    {
        return to_route('maklumatEn');
    }

    public function maklumat()
    {
        return Inertia::render('frontoffice/en/maklumat');
    }

    public function home()
    {

        $highlights = EnHighlight::with('news', 'news.newsCategory', 'highlightCategory')
        ->whereHas('highlightCategory', function($query) {
            $query->where('slug', 'carousel');
        })
        ->get();

        $modals = EnHighlight::with('news', 'news.newsCategory', 'highlightCategory')
        ->whereHas('highlightCategory', function($query) {
            $query->where('slug', 'modal');
        })
        ->get();

        $artikel = EnNews::with('newsCategory')
            ->whereHas('newsCategory', fn($q) => $q->where('slug', 'artikel'))
            ->latest()
            ->take(4)
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'date' => $item->created_at,
                'content' => $item->content
            ]);

        $informasi = EnNews::with('newsCategory')
            ->whereHas('newsCategory', fn($q) => $q->where('slug', 'informasi'))
            ->latest()
            ->take(4)
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'title' => $item->title,
                'date' => $item->created_at,
                'content' => $item->content
            ]);

        $application = EnApplication::whereHas('applicationCategory', function ($query) {
                $query->where('slug', 'internal');
            })->get();

        $buku = EnPublication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'buku'))
            ->latest()
            ->take(4)
            ->get();
    
        $laporan = EnPublication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'laporan'))
            ->latest()
            ->take(4)
            ->get();
    
        $jurnal = EnPublication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'jurnal'))
            ->latest()
            ->take(4)
            ->get();
    
        $buletin = EnPublication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'buletin'))
            ->latest()
            ->take(4)
            ->get();

        $applicationExternal = EnApplication::whereHas('applicationCategory', function ($query) {
                $query->where('slug', 'external');
            })->orderBy('created_at', 'asc')->get();

        $aboutUs = AboutUs::first();

        $affiliates = Affiliate::orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/en/page', [
            'highlights' => $highlights,
            'artikel' => $artikel,
            'informasi' => $informasi,
            'application' => $application,
            'publication' => [
                'buku' => $buku,
                'laporan' => $laporan,
                'jurnal' => $jurnal,
                'buletin' => $buletin,
            ],
            'applicationExternal' => $applicationExternal,
            'modals' => $modals,
            'aboutUs' => $aboutUs,
            'affiliates' => $affiliates
        ]);
    }

    public function footer()
    { 
        // return response
        $footer = AboutUs::first();

        return response()->json($footer);
        
    }
}