<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnPublication;
use App\Models\En\EnPublicationCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnPublicationController extends Controller
{
    public function index(Request $request)
    {
        $query = EnPublication::with('publicationCategory')->orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"]);
                //   ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $publications = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/en/publication/page', [
            'publications' => $publications,
            'search' => $request->search,
        ]);
    }

    public function create()
    {
        // $categories = EnPublicationCategory::get();\
        $categories = EnPublicationCategory::whereNotIn('name', ['Video'])->get();


        return Inertia::render('backoffice/en/publication/add', [
            'categories' => $categories,
        ]);
    }

    // public function store(Request $request)
    // {

    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //         'document' => ['nullable', 'max:6144'],
    //     ], [
    //         'category.required' => 'Category is required',
    //         'title.required' => 'Title is required',
    //         'cover.required' => 'Image is required',
    //         'cover.image' => 'The file must be an image',
    //         'cover.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'The image may not be greater than 6MB',
    //         'document.max' => 'The document may not be greater than 6MB',
    //     ]);        

    //     $publication = new EnPublication();
    //     $publication->id = Str::uuid();
    //     $publication->publication_category_id = $request->category;
    //     $publication->title = $request->title;
    //     $publication->user_id = Auth::user()->id;

    //     if ($request->file('document')) {
    //         $filename = $request->file('document')->getClientOriginalName();
    //         $publication->document_name = $filename;
    //         $file = $request->file('document');
    //         $path = Storage::disk('s3')->put('/publication', $file);
    //         $publication->document_url = '/' . $path;
    //     }
    //     if ($request->file('cover')) {
    //         $file = $request->file('cover');
    //         $path = Storage::disk('s3')->put('/publication', $file);
    //         $publication->cover = '/' . $path;
    //     }
    //     if (Auth::user()->role_id == 1) {
    //         $publication->status = "DINAIKAN";
    //     } else {
    //         $publication->status = "DIAJUKAN";
    //     }

    //     $publication->save();

    //     return to_route('backoffice.publicationEn.index')->with('message', 'Publication has been successfully added');
    // }

    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'document' => ['nullable', 'max:6144'],
        ], [
            'category.required' => 'Category is required',
            'title.required' => 'Title is required',
            'cover.required' => 'Image is required',
            'cover.image' => 'The file must be an image',
            'cover.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'The image may not be greater than 6MB',
            'document.max' => 'The document may not be greater than 6MB',
        ]);

        $publication = new EnPublication();
        $publication->id = Str::uuid();
        $publication->publication_category_id = $request->category;
        $publication->title = $request->title;
        $publication->user_id = Auth::user()->id;

        // Proses gambar embedded base64 dalam konten Summernote
        $processedContent = $this->handleSummernoteImages($request->content);
        $publication->content = $processedContent;

        if ($request->file('document')) {
            $filename = $request->file('document')->getClientOriginalName();
            $publication->document_name = $filename;
            $file = $request->file('document');
            $path = Storage::disk('s3')->put('/publication', $file);
            $publication->document_url = '/' . $path;
        }
        if ($request->file('cover')) {
            $file = $request->file('cover');
            $path = Storage::disk('s3')->put('/publication', $file);
            $publication->cover = '/' . $path;
        }
        if (Auth::user()->role_id == 1) {
            $publication->status = "DINAIKAN";
        } else {
            $publication->status = "DIAJUKAN";
        }

        $publication->save();

        return to_route('backoffice.publicationEn.index')->with('message', 'Publication has been successfully added');
    }

    private function handleSummernoteImages(string $content): string
    {
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        $dom->loadHTML('<?xml encoding="utf-8" ?>' . $content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $images = $dom->getElementsByTagName('img');

        foreach ($images as $img) {
            $src = $img->getAttribute('src');

            if (Str::startsWith($src, 'data:image')) {
                preg_match('/data:image\/(\w+);base64,/', $src, $type);
                $imageData = base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $src));

                $extension = $type[1] ?? 'png';
                $shortName = now()->format('ymd_His') . '_' . Str::random(5); // contoh: 240619_153035_Ab12f
                $filename = 'publication/' . $shortName . '.' . $extension;

                Storage::disk('s3')->put($filename, $imageData, 'public');
                $img->setAttribute('src', Storage::disk('s3')->url($filename));
            }
        }

        return $dom->saveHTML();
    }

    public function edit($id)
    {
        // $categories = EnPublicationCategory::get();
        $categories = EnPublicationCategory::whereNotIn('name', ['Video'])->get();
        $publication = EnPublication::with('publicationCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/en/publication/edit', [
            'categories' => $categories,
            'publication' => $publication
        ]);
    }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'category' => ['required', 'max:255'],
    //         'title' => ['required', 'max:255'],
    //         'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
    //     ], [
    //         'category.required' => 'Category is required',
    //         'title.required' => 'Name is required',
    //         'cover.image' => 'The file must be an image',
    //         'cover.mimes' => 'The image must be in one of the following formats: jpeg, png, jpg, gif, svg, webp',
    //         'cover.max' => 'The image may not be larger than 6MB',
    //     ]);        

    //     $publication = EnPublication::where('id', $id)->first();
    //     $publication->publication_category_id = $request->category;
    //     $publication->title = $request->title;
    //     $publication->status = $request->status;

    //     if ($request->file('cover')) {
    //         Storage::disk('s3')->delete($publication->cover);
    //         $file = $request->file('cover');
    //         $path = Storage::disk('s3')->putFile('/publication', $file);
    //         $publication->cover = '/' . $path;
    //     }

    //     if ($request->file('document')) {
    //         if ($publication->document) {
    //             Storage::disk('s3')->delete($publication->document_url);
    //         }
    //         $filename = $request->file('document')->getClientOriginalName();
    //         $publication->document_name = $filename;
    //         $file = $request->file('document');
    //         $path = Storage::disk('s3')->put('/publication', $file);
    //         $publication->document_url = '/' . $path;
    //     }

    //     $publication->save();

    //     return to_route('backoffice.publicationEn.index')->with('message', 'Publication has been successfully updated');
    // }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            'status' => ['required', 'max:255'],
            'content' => ['required'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
        ]);

        $publication = EnPublication::findOrFail($id);

        // ✅ Convert & upload Summernote base64 images
        $cleanedContent = $this->handleSummernoteImages($request->content);

        // 🔄 Ambil src image lama & baru
        preg_match_all('/<img[^>]+src="([^">]+)"/', $publication->content, $oldImages);
        preg_match_all('/<img[^>]+src="([^">]+)"/', $cleanedContent, $newImages);

        $oldImages = $oldImages[1] ?? [];
        $newImages = $newImages[1] ?? [];

        // ❌ Hapus image yang tidak dipakai lagi
        $removedImages = array_diff($oldImages, $newImages);
        foreach ($removedImages as $imgUrl) {
            $path = ltrim(parse_url($imgUrl, PHP_URL_PATH), '/');
            Storage::disk('s3')->delete($path);
        }

        // ✅ Update berita
        $publication->publication_category_id = $request->category;
        $publication->title = $request->title;
        $publication->status = $request->status;
        $publication->content = $cleanedContent;


        // 📷 Ganti cover jika ada
        if ($request->hasFile('cover')) {
            if ($publication->cover) {
                Storage::disk('s3')->delete(ltrim($publication->cover, '/'));
            }
            $path = Storage::disk('s3')->putFile('publication', $request->file('cover'));
            $publication->cover = '/' . $path;
        }

        if ($request->file('document')) {
            if ($publication->document) {
                Storage::disk('s3')->delete($publication->document_url);
            }
            $filename = $request->file('document')->getClientOriginalName();
            $publication->document_name = $filename;
            $file = $request->file('document');
            $path = Storage::disk('s3')->put('/publication', $file);
            $publication->document_url = '/' . $path;
        }

        $publication->save();

        return to_route('backoffice.publicationEn.index')->with('message', 'Publication has been successfully updated');
    }

    public function detail($id)
    {
        $publication = EnPublication::with('publicationCategory', 'user')->where('id', $id)->first();

        return Inertia::render('backoffice/en/publication/detail', [
            'publication' => $publication
        ]);
    }

    public function destroy($id)
    {
        $publication = EnPublication::where('id', $id)->first();
        
        if ($publication->document_url) {
            Storage::disk('s3')->delete($publication->document_url);
        }
        if ($publication->cover) {
            Storage::disk('s3')->delete($publication->cover);
        }

        $publication->delete();

        return to_route('backoffice.publicationEn.index')->with('message', 'Publication has been successfully deleted');
    }

    public function previewDocument($id)
    {
        $publication = EnPublication::where('id', $id)->first();
        $file = Storage::disk('s3')->get($publication->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($publication->document_name) . '"');

    }
}