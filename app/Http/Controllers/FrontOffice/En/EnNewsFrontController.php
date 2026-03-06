<?php

namespace App\Http\Controllers\FrontOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnNews;
use App\Models\En\EnNewsDocument;
use App\Models\En\EnNewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EnNewsFrontController extends Controller
{
    public function show(Request $request, $slug)
    {
        // $news = EnNews::with('newsCategory')->where('title', 'LPSK Gelar Seleksi Terbuka Pengisian Jabatan Pimpinan Tinggi Madya Sekretaris Jenderal')->get();
        // dd($news);

        $search = $request->query('search');
        $perPage = 10;

        $query = EnNews::query();

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

        return Inertia::render('frontoffice/en/news/news', [
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

        $news = EnNews::with('newsCategory', 'documents', 'images', 'user')->find($id);

        return Inertia::render('frontoffice/en/news/detail', [
            'slugCategory' => $slugCategory,
            'news' => $news
        ]);
    }

    public function previewDocumentRelation($document_id)
    {
        $news = EnNewsDocument::where('id', $document_id)->first();
        // dd($news);
        $file = Storage::disk('s3')->get($news->url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($news->name) . '"');

    }

    public function previewImageRelation($id)
    {
        $image = EnNewsImage::findOrFail($id);
        $file = Http::get($image->full_url);

        return response($file->body(), 200)
            ->header('Content-Type', $file->header('Content-Type'))
            ->header('Content-Disposition', 'attachment; filename="'.$image->name.'"');
    }

    public function announcement()
    {
        $announcements = EnNews::where('news_category_id', '9f13d1c2-9e62-4cbb-9d62-9a2e543e3d56')
            ->orderBy('created_at', 'desc')
            ->skip(3)     // lewati 3 data pertama
            ->take(8)     // ambil 8 data berikutnya
            ->get();

        $topAnnouncements = EnNews::where('news_category_id', '9f13d1c2-9e62-4cbb-9d62-9a2e543e3d56')
            ->orderBy('created_at', 'desc')
            ->take(3)     // ambil 3 data terbaru
            ->get();

        return Inertia::render('frontoffice/en/public-information/announcement', [
            'announcements'   => $announcements,
            'topAnnouncements' => $topAnnouncements,
        ]);
    }
}
