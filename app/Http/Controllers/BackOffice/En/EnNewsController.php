<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnNews;
use App\Models\En\EnNewsCategory;
use App\Models\En\EnNewsDocument;
use App\Models\En\EnNewsImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use DOMDocument;

class EnNewsController extends Controller
{
    public function index(Request $request)
    {
        $query = EnNews::with('newsCategory', 'user')->orderBy('created_at', 'desc');

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

        return Inertia::render('backoffice/en/news/page', [
            'news' => $news,
            'search' => $request->search,
        ]);
    }

    public function storeType(Request $request, $id, $type)
    {
        // dd($request, $id, $type);
        if ($type == 'documents') {
            $document = new EnNewsDocument();
            $document->id = Str::uuid();
            $document->news_id = $id;
            $document->name = $request->file->getClientOriginalName();
            $document->extension = $request->file->getClientOriginalExtension();
            $document->size = $request->file->getSize();
            $document->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $document->save();

            return redirect()->back()->with('success', 'Document has successfully added.');
        } else {
            $image = new EnNewsImage();
            $image->id = Str::uuid();
            $image->news_id = $id;
            $image->name = $request->file->getClientOriginalName();
            $image->extension = $request->file->getClientOriginalExtension();
            $image->size = $request->file->getSize();
            $image->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $image->save();

            return redirect()->back()->with('success', 'Image has successfully added.');
        }
    }

    public function updateType(Request $request, $type, $id)
    {
        if ($type == 'documents') {
            // update
            $document = EnNewsDocument::find($id);
            $path = Storage::disk('s3')->delete('url');
            $document->name = $request->file->getClientOriginalName();
            $document->size = $request->file->getSize();
            $document->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $document->save();

            return redirect()->back()->with('success', 'Document has successfully updated.');
        } else {
            $image = EnNewsImage::find($id);
            $path = Storage::disk('s3')->delete('url');
            $image->name = $request->file->getClientOriginalName();
            $image->size = $request->file->getSize();
            $image->url = Storage::disk('s3')->putFile('news/images', $request->file);
            $image->save();

            return redirect()->back()->with('success', 'Image has successfully updated.');
        }
    }

    public function deleteType(Request $request, $type, $id)
    {
        if ($type == 'documents') {
            $document = EnNewsDocument::find($id);
            $path = Storage::disk('s3')->delete('url');
            $document->delete();
            return redirect()->back()->with('success', 'Document has successfully deleted.');
        } else {
            $image = EnNewsImage::find($id);
            $path = Storage::disk('s3')->delete('url');
            $image->delete();
            return redirect()->back()->with('success', 'Image has successfully deleted.');
        }
    }

    public function create()
    {
        $categories = EnNewsCategory::get();
        $category = EnNewsCategory::where('slug', 'pejabat')->first();

        return Inertia::render('backoffice/en/news/add', [
            'categories' => $categories,
            'category' => $category
        ]);
    }

    public function show($id)
    {
        $news = EnNews::with('newsCategory')->findOrFail($id);

        return response()->json([
            'id' => $news->id,
            'title' => $news->title,
            'cover_url' => $news->cover_url,
            'excerpt' => $news->excerpt ?? '',
            'category' => $news->newsCategory->name ?? '-',
            'created_at' => $news->created_at,
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
    //         'category.required' => 'Category is required',
    //         'title.required' => 'Title is required',
    //         'content.required' => 'Content is required',
    //         'cover.required' => 'Image is required',
    //         'cover.image' => 'The file must be an image',
    //         'cover.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'The image may not be greater than 6MB',
    //     ]);

    //     $news = new EnNews();
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

    //     return to_route('backoffice.newsEn.index')->with('message', 'News has been successfully added');
    // }

    // one 
    // public function store(Request $request)
    // {
    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'content' => ['required'],
    //         'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //     ], [
    //         'category.required' => 'Category is required',
    //         'title.required' => 'Title is required',
    //         'content.required' => 'Content is required',
    //         'cover.required' => 'Image is required',
    //         'cover.image' => 'The file must be an image',
    //         'cover.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'The image may not be greater than 6MB',
    //     ]);

    //     $processedContent = $this->handleSummernoteImages($request->content);

    //     $news = new EnNews();
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

    //     $news->status = Auth::user()->role_id == 1 ? 'DINAIKAN' : 'DIAJUKAN';

    //     $news->save();

    //     return to_route('backoffice.newsEn.index')->with('message', 'News has been successfully added');
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
    
        $news = new EnNews();
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
    
            EnNewsImage::create([
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
            
            EnNewsDocument::create([
                'id' => Str::uuid(),
                'news_id' => $news->id,
                'name' => $docFile->getClientOriginalName(),
                'size' => $docFile->getSize(),
                'extension' => $docFile->getClientOriginalExtension(),
                'url' => '/' . $path,
            ]);
        }
    
        return to_route('backoffice.newsEn.index')
            ->with('message', 'News has been successfully added');
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
        $categories = EnNewsCategory::get();
        $news = EnNews::with('newsCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/en/news/edit', [
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
    //         'category.required' => 'Category is required',
    //         'title.required' => 'Name is required',
    //         'status.required' => 'Status is required',
    //         'content.required' => 'Content is required',
    //         'cover.image' => 'The file must be an image',
    //         'cover.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'The image may not be greater than 6MB',
    //     ]);        

    //     $news = EnNews::where('id', $id)->first();
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

    //     return to_route('backoffice.newsEn.index')->with('message', 'News has been successfully updated');
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
            'category.required' => 'Category is required',
            'title.required' => 'Name is required',
            'status.required' => 'Status is required',
            'content.required' => 'Content is required',
            'cover.image' => 'The file must be an image',
            'cover.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'The image may not be greater than 6MB',
        ]);

        $news = EnNews::findOrFail($id);

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

        $news->save();

        return to_route('backoffice.newsEn.detail', ['id' => $id])->with('message', 'News has been successfully updated');
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
        $news = EnNews::with('newsCategory', 'user', 'images', 'documents')->where('id', $id)->first();
        // dd($news);

        return Inertia::render('backoffice/en/news/detail', [
            'news' => $news
        ]);
    }

    public function destroy($id)
    {
        $news = EnNews::with('images', 'documents', 'highlight')->where('id', $id)->first();

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

        return to_route('backoffice.newsEn.index')->with('message', 'News has been successfully deleted');
    }
}

