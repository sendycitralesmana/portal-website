<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Highlight;
use App\Models\HighlightCategory;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class HighlightController extends Controller
{
    public function index(Request $request)
    {
        $query = Highlight::with('highlightCategory', 'news')->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereHas('highlightCategory', function ($categoryQuery) use ($search) {
                    $categoryQuery->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                })
                ->orWhereHas('news', function ($newsQuery) use ($search) {
                    $newsQuery->whereRaw('LOWER(title) LIKE ?', ["%{$search}%"]);
                });
            });
        }

        $highlights = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/sorot/page', [
            'highlights' => $highlights,
            'search' => $request->search,
        ]);
    }

    public function create()
    {
        $categories = HighlightCategory::get();

        $news = News::doesntHave('highlight')->orderBy('created_at', 'desc')->get();

        return Inertia::render('backoffice/sorot/add', [
            'categories' => $categories,
            'news' => $news
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'news' => ['required', 'max:255'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'news.required' => 'Berita tidak boleh kosong',
        ]);

        $highlight = new Highlight();
        $highlight->id = Str::uuid();
        $highlight->highlight_category_id = $request->category;
        $highlight->news_id = $request->news;

        $highlight->save();

        return to_route('backoffice.sorot.index')->with('message', 'Sorot berhasil ditambahkan');
    }

    public function edit($id)
    {
        $categories = HighlightCategory::get();
        $highlight = Highlight::with('highlightCategory', 'news')->where('id', $id)->first();

        $news = News::whereDoesntHave('highlight')
        ->orWhere('id', $highlight->news_id) // tetap ambil berita yang sedang dipakai
        ->orderBy('created_at', 'desc')
        ->with('newsCategory') // pastikan kategori juga dimuat
        ->get();

        return Inertia::render('backoffice/sorot/edit', [
            'categories' => $categories,
            'highlight' => $highlight,
            'news' => $news
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'news' => ['required', 'max:255'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'news.required' => 'Berita tidak boleh kosong',
        ]);

        $highlight = Highlight::where('id', $id)->first();
        $highlight->highlight_category_id = $request->category;
        $highlight->news_id = $request->news;

        $highlight->save();

        return to_route('backoffice.sorot.index')->with('message', 'Sorot berhasil diperbarui');
    }

    public function destroy($id)
    {
        $highlight = Highlight::where('id', $id)->first();

        $highlight->delete();

        return to_route('backoffice.sorot.index')->with('message', 'Sorot berhasil dihapus');
    }
}