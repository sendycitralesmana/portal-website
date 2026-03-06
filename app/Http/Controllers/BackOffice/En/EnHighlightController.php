<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnHighlight;
use App\Models\En\EnHighlightCategory;
use App\Models\En\EnNews;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnHighlightController extends Controller
{
    public function index(Request $request)
    {
        $query = EnHighlight::with('highlightCategory', 'news')->orderBy('created_at', 'desc');

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

        return Inertia::render('backoffice/en/highlight/page', [
            'highlights' => $highlights,
            'search' => $request->search,
        ]);
    }

    public function create()
    {
        $categories = EnHighlightCategory::get();

        $news = EnNews::doesntHave('highlight')->orderBy('created_at', 'desc')->get();

        return Inertia::render('backoffice/en/highlight/add', [
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
            'category.required' => 'Category is required',
            'news.required' => 'Title is required',
        ]);        

        $highlight = new EnHighlight();
        $highlight->id = Str::uuid();
        $highlight->highlight_category_id = $request->category;
        $highlight->news_id = $request->news;

        $highlight->save();

        return to_route('backoffice.highlightEn.index')->with('message', 'Highlight has been successfully added');
    }

    public function edit($id)
    {
        $categories = EnHighlightCategory::get();
        $highlight = EnHighlight::with('highlightCategory', 'news')->where('id', $id)->first();

        $news = EnNews::whereDoesntHave('highlight')
        ->orWhere('id', $highlight->news_id) // tetap ambil berita yang sedang dipakai
        ->orderBy('created_at', 'desc')
        ->with('newsCategory') // pastikan kategori juga dimuat
        ->get();

        return Inertia::render('backoffice/en/highlight/edit', [
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
            'category.required' => 'Category is required',
            'news.required' => 'Title is required',
        ]);        

        $highlight = EnHighlight::where('id', $id)->first();
        $highlight->highlight_category_id = $request->category;
        $highlight->news_id = $request->news;

        $highlight->save();

        return to_route('backoffice.highlightEn.index')->with('message', 'Highlight has been successfully updated');
    }

    public function destroy($id)
    {
        $highlight = EnHighlight::where('id', $id)->first();

        $highlight->delete();

        return to_route('backoffice.highlightEn.index')->with('message', 'Highlight has been successfully deleted');
    }
}