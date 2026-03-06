<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\NewsCategory;
use App\Models\NewsDocument;
use App\Models\NewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use DOMDocument;

class NewsController extends Controller
{

    public function updateUserId(Request $request)
    {
        $before = News::where('user_id', 'clraaaiwt000065qndcbpcbfm')->count();

        News::where('user_id', 'clraaaiwt000065qndcbpcbfm')
            ->update(['user_id' => 'clygt8qau0002e550desnn0il']);

        $after = News::where('user_id', 'clygt8qau0002e550desnn0il')->count();

        return response()->json([
            'message' => 'User ID updated successfully.',
            'updated_from' => $before,
            'updated_to' => $after
        ]);
    }

    public function storeType(Request $request, $id, $type)
    {
        // dd($request, $id, $type);
        if ($type == 'documents') {
            $document = new NewsDocument();
            $document->id = Str::uuid();
            $document->news_id = $id;
            $document->name = $request->file->getClientOriginalName();
            $document->extension = $request->file->getClientOriginalExtension();
            $document->size = $request->file->getSize();
            $document->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $document->save();

            return redirect()->back()->with('success', 'Dokumen berhasil ditambahkan.');
        } else {
            $image = new NewsImage();
            $image->id = Str::uuid();
            $image->news_id = $id;
            $image->name = $request->file->getClientOriginalName();
            $image->extension = $request->file->getClientOriginalExtension();
            $image->size = $request->file->getSize();
            $image->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $image->save();

            return redirect()->back()->with('success', 'Gambar berhasil ditambahkan.');
        }
    }

    public function updateType(Request $request, $type, $id)
    {
        if ($type == 'documents') {
            // update
            $document = NewsDocument::find($id);
            $path = Storage::disk('s3')->delete('url');
            $document->name = $request->file->getClientOriginalName();
            $document->size = $request->file->getSize();
            $document->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $document->save();

            return redirect()->back()->with('success', 'Dokumen berhasil diupdate.');
        } else {
            $image = NewsImage::find($id);
            $path = Storage::disk('s3')->delete('url');
            $image->name = $request->file->getClientOriginalName();
            $image->size = $request->file->getSize();
            $image->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $image->save();

            return redirect()->back()->with('success', 'Gambar berhasil diupdate.');
        }
    }

    public function deleteType(Request $request, $type, $id)
    {
        if ($type == 'documents') {
            $document = NewsDocument::find($id);
            $path = Storage::disk('s3')->delete('url');
            $document->delete();
            return redirect()->back()->with('success', 'Dokumen berhasil dihapus.');
        } else {
            $image = NewsImage::find($id);
            $path = Storage::disk('s3')->delete('url');
            $image->delete();
            return redirect()->back()->with('success', 'Gambar berhasil dihapus.');
        }
    }

    public function index(Request $request)
    {
        // $test = News::with('newsCategory', 'user', 'images', 'documents')->where('news_category_id', '41e5ecbd-7bc1-45f6-92e7-d95054068879')->orderBy('created_at', 'desc')->get();
        // dd($test);
        
        $query = News::with('newsCategory', 'user')->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                ->orWhereHas('user', function ($userQuery) use ($search) {
                    $userQuery->whereRaw('LOWER(name) LIKE ?', ["%{$search}%"]);
                });
            });
        }

        $news = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/berita/page', [
            'news' => $news,
            'search' => $request->search,
        ]);
    }

    public function show($id)
    {
        $news = News::with('newsCategory')->findOrFail($id);

        return response()->json([
            'id' => $news->id,
            'title' => $news->title,
            'cover_url' => $news->cover_url,
            'excerpt' => $news->excerpt ?? '',
            'category' => $news->newsCategory->name ?? '-',
            'created_at' => $news->created_at,
        ]);
    }

    public function create()
    {
        $categories = NewsCategory::get();
        $category = NewsCategory::where('slug', 'pejabat')->first();

        return Inertia::render('backoffice/berita/add', [
            'categories' => $categories,
            'category' => $category
        ]);
    }

    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'content' => ['required'],
    //         'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //     ], [
    //         'category.required' => 'Kategori tidak boleh kosong',
    //         'title.required' => 'Judul tidak boleh kosong',
    //         'content.required' => 'Konten tidak boleh kosong',
    //         'cover.required' => 'Gambar tidak boleh kosong',
    //         'cover.image' => 'Gambar harus berformat gambar',
    //         'cover.mimes' => 'Gambar harus berformat jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'Gambar tidak boleh lebih dari 6MB',
    //     ]);

    //     $news = new News();
    //     $news->id = Str::uuid();
    //     $news->news_category_id = $request->category;
    //     $news->title = $request->title;
    //     $news->user_id = Auth::user()->id;
    //     $news->content = $request->content;

    //     if ($request->file('cover')) {
    //         $file = $request->file('cover');
    //         $path = Storage::disk('s3')->put('/news', $file);
    //         $news->cover = '/' . $path;
    //     }

    //     if (Auth::user()->role_id == 1) {
    //         $news->status = "DINAIKAN";
    //     } else {
    //         $news->status = "DIAJUKAN";
    //     }

    //     $news->save();

    //     return to_route('backoffice.berita.index')->with('message', 'Berita berhasil ditambahkan');
    // }


    // one file
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'content' => ['required'],
    //         'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //     ], [
    //         'category.required' => 'Kategori tidak boleh kosong',
    //         'title.required' => 'Judul tidak boleh kosong',
    //         'content.required' => 'Konten tidak boleh kosong',
    //         'cover.required' => 'Gambar tidak boleh kosong',
    //         'cover.image' => 'Gambar harus berformat gambar',
    //         'cover.mimes' => 'Gambar harus berformat jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'Gambar tidak boleh lebih dari 6MB',
    //     ]);

    //     $processedContent = $this->handleSummernoteImages($request->content);

    //     $news = new News();
    //     $news->id = Str::uuid();
    //     $news->news_category_id = $request->category;
    //     $news->title = $request->title;
    //     $news->user_id = Auth::user()->id;
    //     $news->content = $processedContent;

    //     if ($request->file('cover')) {
    //         $file = $request->file('cover');
    //         $path = Storage::disk('s3')->put('/news', $file);
    //         $news->cover = '/' . $path;
    //     }

    //     if ($request->file('document')) {
    //         $filename = $request->file('document')->getClientOriginalName();
    //         $news->document_name = $filename;
    //         $file = $request->file('document');
    //         $path = Storage::disk('s3')->put('/news', $file);
    //         $news->document_url = '/' . $path;
    //     }

    //     $news->status = Auth::user()->role_id == 1 ? 'DINAIKAN' : 'DIAJUKAN';

    //     $news->save();

    //     return to_route('backoffice.berita.index')->with('message', 'Berita berhasil ditambahkan');
    // }

    // multiple
    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            'content' => ['required'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'documents.*' => ['file', 'max:10240'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'title.required' => 'Judul tidak boleh kosong',
            'content.required' => 'Konten tidak boleh kosong',
            'images.*.image' => 'File harus berupa gambar',
            'images.*.mimes' => 'Gambar harus berformat jpeg, png, jpg, gif, svg, webp',
            'images.*.max' => 'Gambar tidak boleh lebih dari 6MB',
            'documents.*.max' => 'Dokumen tidak boleh lebih dari 10MB',
        ]);
    
        $processedContent = $this->handleSummernoteImages($request->content);
    
        $news = new News();
        $news->id = Str::uuid();
        $news->news_category_id = $request->category;
        $news->title = $request->title;
        $news->user_id = Auth::id();
        $news->content = $processedContent;
        $news->status = Auth::user()->role_id == 1 ? 'DINAIKAN' : 'DIAJUKAN';
    
        if ($request->file('cover')) {
            $path = Storage::disk('s3')->put('news', $request->file('cover'));
            $news->cover = '/' . $path;
        }
    
        $news->save();
    
        foreach ($request->file('images', []) as $imageFile) {
            $path = Storage::disk('s3')->put('news/images', $imageFile);
    
            NewsImage::create([
                'id' => Str::uuid(),
                'news_id' => $news->id,
                'name' => $imageFile->getClientOriginalName(),
                'size' => $imageFile->getSize(),
                'extension' => $imageFile->getClientOriginalExtension(),
                'url' => '/' . $path,
            ]);
        }
    
        foreach ($request->file('documents', []) as $docFile) {
            $path = Storage::disk('s3')->put('news/documents', $docFile);
            
            NewsDocument::create([
                'id' => Str::uuid(),
                'news_id' => $news->id,
                'name' => $docFile->getClientOriginalName(),
                'size' => $docFile->getSize(),
                'extension' => $docFile->getClientOriginalExtension(),
                'url' => '/' . $path,
            ]);
        }
    
        return to_route('backoffice.berita.index')
            ->with('message', 'Berita berhasil ditambahkan');
    }

    // Fungsi untuk proses gambar base64 dari Summernote
    private function handleSummernoteImages(string $content): string
    {
        libxml_use_internal_errors(true);
        $dom = new DOMDocument();
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $images = $dom->getElementsByTagName('img');

        foreach ($images as $img) {
            $src = $img->getAttribute('src');

            if (Str::startsWith($src, 'data:image')) {
                preg_match('/data:image\/(\w+);base64,/', $src, $type);
                $imageData = base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $src));

                $extension = $type[1] ?? 'png';
                $filename = 'news/' . Str::random(20) . '.' . $extension;

                Storage::disk('s3')->put($filename, $imageData, 'public');
                $img->setAttribute('src', Storage::disk('s3')->url($filename));
            }
        }

        return $dom->saveHTML();
    }

    public function edit($id)
    {
        $categories = NewsCategory::get();
        $news = News::with('newsCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/berita/edit', [
            'categories' => $categories,
            'news' => $news
        ]);
    }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //         'status' => ['required', 'max:255'],
    //         'content' => ['required'],
    //     ], [
    //         'category.required' => 'Kategori tidak boleh kosong',
    //         'title.required' => 'Nama tidak boleh kosong',
    //         'status.required' => 'Status tidak boleh kosong',
    //         'content.required' => 'Konten tidak boleh kosong',
    //         'cover.image' => 'gambar harus berformat gambar',
    //         'cover.mimes' => 'gambar harus berformat jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'gambar tidak boleh lebih dari 6MB',
    //     ]);

    //     $news = News::where('id', $id)->first();
    //     $news->news_category_id = $request->category;
    //     $news->title = $request->title;
    //     $news->content = $request->content;
    //     $news->status = $request->status;

    //     if ($request->file('cover')) {
    //         Storage::disk('s3')->delete($news->cover);
    //         $file = $request->file('cover');
    //         $path = Storage::disk('s3')->putFile('/news', $file);
    //         $news->cover = '/' . $path;
    //     }

    //     $news->save();

    //     return to_route('backoffice.berita.index')->with('message', 'Berita berhasil diperbarui');
    // }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //         'status' => ['required', 'max:255'],
    //         'content' => ['required'],
    //     ], [
    //         'category.required' => 'Kategori tidak boleh kosong',
    //         'title.required' => 'Nama tidak boleh kosong',
    //         'status.required' => 'Status tidak boleh kosong',
    //         'content.required' => 'Konten tidak boleh kosong',
    //         'cover.image' => 'Gambar harus berformat gambar',
    //         'cover.mimes' => 'Gambar harus berformat jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'Gambar tidak boleh lebih dari 6MB',
    //     ]);

    //     $news = News::findOrFail($id);

    //     preg_match_all('/<img[^>]+src="([^">]+)"/', $request->content, $newImages);
    //     $newImages = $newImages[1];

    //     preg_match_all('/<img[^>]+src="([^">]+)"/', $news->content, $oldImages);
    //     $oldImages = $oldImages[1]; 

    //     $removedImages = array_diff($oldImages, $newImages);
    //     foreach ($removedImages as $imgUrl) {
    //         $path = parse_url($imgUrl, PHP_URL_PATH); 
    //         $cleanPath = ltrim($path, '/'); 
    //         Storage::disk('s3')->delete($cleanPath);
    //     }


    //     $news->news_category_id = $request->category;
    //     $news->title = $request->title;
    //     $news->status = $request->status;
    //     $news->content = $request->content;

    //     if ($request->hasFile('cover')) {
    //         if ($news->cover) {
    //             Storage::disk('s3')->delete(ltrim($news->cover, '/'));
    //         }
    //         $path = Storage::disk('s3')->putFile('news', $request->file('cover'));
    //         $news->cover = '/' . $path;
    //     }

    //     $news->save();

    //     return to_route('backoffice.berita.index')->with('message', 'Berita berhasil diperbarui');
    // }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            'status' => ['required', 'max:255'],
            'content' => ['required'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'title.required' => 'Nama tidak boleh kosong',
            'status.required' => 'Status tidak boleh kosong',
            'content.required' => 'Konten tidak boleh kosong',
            'cover.image' => 'Gambar harus berformat gambar',
            'cover.mimes' => 'Gambar harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Gambar tidak boleh lebih dari 6MB',
        ]);

        $news = News::findOrFail($id);

        // Hapus image yang tidak digunakan lagi
        $oldImages = $this->extractImageSrcs($news->content);
        $newImages = $this->extractImageSrcs($request->content);
        $removedImages = array_diff($oldImages, $newImages);

        foreach ($removedImages as $imgUrl) {
            $path = ltrim(parse_url($imgUrl, PHP_URL_PATH), '/');
            Storage::disk('s3')->delete($path);
        }

        // Update data berita
        $news->news_category_id = $request->category;
        $news->title = $request->title;
        $news->status = $request->status;
        $news->content = $this->replaceImageNames($request->content);

        // Cover upload (rename to short & unique name)
        if ($request->hasFile('cover')) {
            if ($news->cover) {
                Storage::disk('s3')->delete(ltrim($news->cover, '/'));
            }

            $file = $request->file('cover');
            $filename = 'news/' . now()->format('ymd_His') . '_' . Str::random(5) . '.' . $file->getClientOriginalExtension();
            Storage::disk('s3')->put($filename, file_get_contents($file));
            $news->cover = '/' . $filename;
        }

        if ($request->file('document')) {
            if ($news->document) {
                Storage::disk('s3')->delete($news->document_url);
            }
            $filename = $request->file('document')->getClientOriginalName();
            $news->document_name = $filename;
            $file = $request->file('document');
            $path = Storage::disk('s3')->put('/news', $file);
            $news->document_url = '/' . $path;
        }

        $news->save();

        return to_route('backoffice.berita.detail', ['id' => $id])->with('message', 'Berita berhasil diperbarui');
    }

    // Ambil semua <img src="..."> dari HTML
    private function extractImageSrcs($html)
    {
        preg_match_all('/<img[^>]+src="([^">]+)"/', $html, $matches);
        return $matches[1] ?? [];
    }

    // Opsional: ganti nama file img base64 → nama pendek (jika kamu handle base64 upload)
    private function replaceImageNames($html)
    {
        return preg_replace_callback('/<img[^>]+src="([^">]+)"/', function ($match) {
            $src = $match[1];
            if (Str::startsWith($src, 'data:image')) {
                $ext = explode('/', mime_content_type($src))[1];
                $filename = 'news/' . now()->format('ymd_His') . '_' . Str::random(5) . '.' . $ext;
                $content = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $src));
                Storage::disk('s3')->put($filename, $content);
                return str_replace($src, Storage::disk('s3')->url($filename), $match[0]);
            }
            return $match[0];
        }, $html);
    }

    public function detail($id)
    {
        $news = News::with('newsCategory', 'user', 'images', 'documents')->where('id', $id)->first();

        return Inertia::render('backoffice/berita/detail', [
            'news' => $news
        ]);
    }

    public function destroy($id)
    {
        $news = News::with('images', 'documents', 'highlight')->where('id', $id)->first();
        
        // Validasi & hapus semua images
        if ($news->images()->exists()) {
            foreach ($news->images as $image) {
                if (!empty($image->url)) {
                    $path = ltrim($image->url, '/');
                    Storage::disk('s3')->delete($path);
                }
            }
            $news->images()->delete();
        }

        // Validasi & hapus semua documents
        if ($news->documents()->exists()) {
            foreach ($news->documents as $document) {
                if (!empty($document->url)) {
                    $path = ltrim($document->url, '/');
                    Storage::disk('s3')->delete($path);
                }
            }
            $news->documents()->delete();
        }

        if ($news->document_url) {
            Storage::disk('s3')->delete($news->document_url);
        }

        if ($news->cover) {
            Storage::disk('s3')->delete($news->cover);
        }

        if ($news->highlight()->exists()) {
            $news->highlight()->delete();
        }

        $news->delete();

        return to_route('backoffice.berita.index')->with('message', 'Berita berhasil dihapus');
    }

    public function previewDocument($id)
    {
        $news = News::where('id', $id)->first();
        $file = Storage::disk('s3')->get($news->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($news->document_name) . '"');

    }
}
