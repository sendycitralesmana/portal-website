<?php

namespace App\Http\Controllers\FrontOffice;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PublikasiFrontController extends Controller
{
    public function show(Request $request, $slug)
    {
        $search = $request->query('search');
        $perPage = 10;

        $query = Publication::query();

        // Filter berdasarkan relasi category.slug
        $query->whereHas('publicationCategory', function ($q) use ($slug) {
            $q->where('slug', $slug);
        });

        // Filter berdasarkan search jika ada
        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        // Urutkan dari data terbaru
        $query->orderBy('created_at', 'desc');

        // Pagination otomatis membaca page dari query param
        $publications = $query->paginate($perPage)->withQueryString();

        return Inertia::render('frontoffice/publikasi/publikasi', [
            'slug' => $slug,
            'search' => $search,
            'page' => $publications->currentPage(),
            'per_page' => $perPage,
            'data' => [
                'data' => $publications->items(),
                'total' => $publications->total(),
            ],
        ]);
    }

    public function detail(Request $request, $slugCategory, $id)
    {

        $publication = Publication::with('publicationCategory', 'user')->find($id);

        return Inertia::render('frontoffice/publikasi/detail', [
            'slugCategory' => $slugCategory,
            'publication' => $publication
        ]);
    }

    public function previewDocument($slugCategory, $id)
    {
        $publication = Publication::where('id', $id)->first();
        $file = Storage::disk('s3')->get($publication->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($publication->document_name) . '"');

    }
}
