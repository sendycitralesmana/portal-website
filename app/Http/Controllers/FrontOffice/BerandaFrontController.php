<?php

namespace App\Http\Controllers\FrontOffice;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use App\Models\Affiliate;
use App\Models\Application;
use App\Models\Highlight;
use App\Models\News;
use App\Models\Publication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BerandaFrontController extends Controller
{
    public function index()
    {

        // $highlights = Highlight::with('news', 'news.newsCategory', 'highlightCategory')
        // ->whereHas('highlightCategory', function($query) {
        //     $query->where('slug', 'carousel');
        // })
        // ->get();

        // $modals = Highlight::with('news', 'news.newsCategory', 'highlightCategory')
        // ->whereHas('highlightCategory', function($query) {
        //     $query->where('slug', 'modal');
        // })
        // ->get();

        // $artikel = News::with('newsCategory')
        //     ->whereHas('newsCategory', fn($q) => $q->where('slug', 'artikel'))
        //     ->latest()
        //     ->take(3)
        //     ->get()
        //     ->map(fn($item) => [
        //         'id' => $item->id,
        //         'title' => $item->title,
        //         'date' => $item->created_at,
        //         'content' => $item->content
        //     ]);

        // $informasi = News::with('newsCategory')
        //     ->whereHas('newsCategory', fn($q) => $q->where('slug', 'informasi'))
        //     ->latest()
        //     ->take(4)
        //     ->get()
        //     ->map(fn($item) => [
        //         'id' => $item->id,
        //         'title' => $item->title,
        //         'date' => $item->created_at,
        //     ]);

        // $application = Application::whereHas('applicationCategory', function ($query) {
        //         $query->where('slug', 'internal')->orderBy('created_at', 'asc');
        //     })->get();

        // $buku = Publication::with('publicationCategory')
        //     ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'buku'))
        //     ->latest()
        //     ->take(4)
        //     ->get();
    
        // $laporan = Publication::with('publicationCategory')
        //     ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'laporan'))
        //     ->latest()
        //     ->take(4)
        //     ->get();
    
        // $jurnal = Publication::with('publicationCategory')
        //     ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'jurnal'))
        //     ->latest()
        //     ->take(4)
        //     ->get();
    
        // $buletin = Publication::with('publicationCategory')
        //     ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'buletin'))
        //     ->latest()
        //     ->take(4)
        //     ->get();

        // $applicationExternal = Application::whereHas('applicationCategory', function ($query) {
        //         $query->where('slug', 'external');
        //     })->orderBy('created_at', 'asc')->get();

        // $affiliates = Affiliate::orderBy('created_at', 'asc')->get();

        // $aboutUs = AboutUs::first();

        // // Tambahkan data lain yang diperlukan oleh Hero, InformationSection, dsb.

        // return Inertia::render('page', [
        //     'highlights' => $highlights,
        //     'artikel' => $artikel,
        //     'informasi' => $informasi,
        //     'application' => $application,
        //     'publication' => [
        //         'buku' => $buku,
        //         'laporan' => $laporan,
        //         'jurnal' => $jurnal,
        //         'buletin' => $buletin,
        //     ],
        //     'applicationExternal' => $applicationExternal,
        //     'modals' => $modals,
        //     'aboutUs' => $aboutUs,
        //     'affiliates' => $affiliates
        // ]);

        return redirect()->route('redesign.maklumat');
    }

    public function beranda()
    {

        $highlights = Highlight::with('news', 'news.newsCategory', 'highlightCategory')
        ->whereHas('highlightCategory', function($query) {
            $query->where('slug', 'carousel');
        })
        ->get();

        $modals = Highlight::with('news', 'news.newsCategory', 'highlightCategory')
        ->whereHas('highlightCategory', function($query) {
            $query->where('slug', 'modal');
        })
        ->get();

        $artikel = News::with('newsCategory')
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

        $informasi = News::with('newsCategory')
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

        $application = Application::whereHas('applicationCategory', function ($query) {
                $query->where('slug', 'internal')->orderBy('created_at', 'asc');
            })->get();

        $buku = Publication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'buku'))
            ->latest()
            ->take(4)
            ->get();
    
        $laporan = Publication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'laporan'))
            ->latest()
            ->take(4)
            ->get();
    
        $jurnal = Publication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'jurnal'))
            ->latest()
            ->take(4)
            ->get();
    
        $buletin = Publication::with('publicationCategory')
            ->whereHas('publicationCategory', fn($q) => $q->where('slug', 'buletin'))
            ->latest()
            ->take(4)
            ->get();

        $applicationExternal = Application::whereHas('applicationCategory', function ($query) {
                $query->where('slug', 'external');
            })->orderBy('created_at', 'asc')->get();

        $affiliates = Affiliate::orderBy('created_at', 'asc')->get();

        $aboutUs = AboutUs::first();

        // Tambahkan data lain yang diperlukan oleh Hero, InformationSection, dsb.

        return Inertia::render('page', [
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
            // Tambahkan props lainnya jika perlu
        ]);
    }

    public function maklumat()
    {
        return Inertia::render('maklumat');
    }

    public function footer()
    { 
        // return response
        $footer = AboutUs::first();

        return response()->json($footer);
        
    }
}
