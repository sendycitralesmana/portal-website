<?php

namespace App\Http\Controllers\FrontOffice;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsDocument;
use App\Models\NewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BeritaFrontController extends Controller
{
    // public function show(Request $request, $slug)
    // {
    //     $search = $request->query('search');
    //     $page = $request->query('page', 1);
    //     $perPage = 10;

    //     $query = News::query();

    //     $query->whereHas('newsCategory', function ($q) use ($slug) {
    //         $q->where('slug', $slug);
    //     });

    //     if ($search) {
    //         $query->where('title', 'like', "%$search%");
    //     }

    //     $news = $query->paginate($perPage)->withQueryString();

    //     return Inertia::render('frontoffice/berita/berita', [
    //         'slug' => $slug,
    //         'search' => $search,
    //         'page' => (int) $page,
    //         'per_page' => $perPage,
    //         'data' => [
    //             'data' => $news->items(),
    //             'total' => $news->total(),
    //         ],
    //     ]);
    // }

    public function show(Request $request, $slug)
    {
        $search = $request->query('search');
        $perPage = 10;

        $query = News::query();

        // Filter berdasarkan relasi category.slug
        $query->whereHas('newsCategory', function ($q) use ($slug) {
            $q->where('slug', $slug);
        });

        // Filter berdasarkan search jika ada
        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        // Urutkan dari data terbaru
        $query->orderBy('created_at', 'desc');

        // Pagination otomatis membaca page dari query param
        $news = $query->paginate($perPage)->withQueryString();

        return Inertia::render('frontoffice/berita/berita', [
            'slug' => $slug,
            'search' => $search,
            'page' => $news->currentPage(),
            'per_page' => $perPage,
            'data' => [
                'data' => $news->items(),
                'total' => $news->total(),
            ],
        ]);
    }

    public function detail(Request $request, $slugCategory, $id)
    {

        $news = News::with('newsCategory', 'documents', 'images', 'user')->find($id);

        return Inertia::render('frontoffice/berita/detail', [
            'slugCategory' => $slugCategory,
            'news' => $news
        ]);
    }

    public function previewDocument($slugCategory, $id)
    {
        $news = News::where('id', $id)->first();
        $file = Storage::disk('s3')->get($news->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($news->document_name) . '"');

    }

    public function previewDocumentRelation($document_id)
    {
        $news = NewsDocument::where('id', $document_id)->first();
        // dd($news);
        $file = Storage::disk('s3')->get($news->url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($news->name) . '"');

    }

    public function previewImageRelation($id)
    {
        $image = NewsImage::findOrFail($id);
        $file = Http::get($image->full_url);

        return response($file->body(), 200)
            ->header('Content-Type', $file->header('Content-Type'))
            ->header('Content-Disposition', 'attachment; filename="'.$image->name.'"');
    }

    public function pengumuman()
    {
        $announcements = News::where('news_category_id', '9f13d1c2-9e62-4cbb-9d62-9a2e543e3d56')
            ->orderBy('created_at', 'desc')
            ->skip(3)     // lewati 3 data pertama
            ->take(8)     // ambil 8 data berikutnya
            ->get();

        $topAnnouncements = News::where('news_category_id', '9f13d1c2-9e62-4cbb-9d62-9a2e543e3d56')
            ->orderBy('created_at', 'desc')
            ->take(3)     // ambil 3 data terbaru
            ->get();

        return Inertia::render('frontoffice/informasi-publik/pengumuman', [
            'announcements'   => $announcements,
            'topAnnouncements' => $topAnnouncements,
        ]);
    }

}
