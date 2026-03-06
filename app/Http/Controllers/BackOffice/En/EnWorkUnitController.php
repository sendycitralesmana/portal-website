<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnWorkUnit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnWorkUnitController extends Controller
{
    public function index(Request $request)
    {
        $query = EnWorkUnit::orderBy('created_at', 'desc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"]);
                //   ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $workUnits = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/en/work-unit/page', [
            'workUnits' => $workUnits,
            'search' => $request->search,
        ]);
    }

    public function create()
    {

        return Inertia::render('backoffice/en/work-unit/add', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ], [
            'title.required' => 'Title not allowed empty',
            'content.required' => 'Content not allowed empty',
        ]);

        $workUnit = new EnWorkUnit();
        $workUnit->id = Str::uuid();
        $workUnit->title = $request->title;

        // Proses gambar embedded base64 dalam konten Summernote
        $processedContent = $this->handleSummernoteImages($request->content);
        $workUnit->content = $processedContent;

        $workUnit->save();

        return to_route('backoffice.work-unit.index')->with('message', 'Work unit has been added');
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
                $filename = 'workUnit/' . $shortName . '.' . $extension;

                Storage::disk('s3')->put($filename, $imageData, 'public');
                $img->setAttribute('src', Storage::disk('s3')->url($filename));
            }
        }

        return $dom->saveHTML();
    }


    public function edit($id)
    {
        $workUnit = EnWorkUnit::where('id', $id)->first();

        return Inertia::render('backoffice/en/work-unit/edit', [
            'workUnit' => $workUnit
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'content' => ['required'],
        ], [
            'title.required' => 'Title not allowed empty',
            'content.required' => 'Content not allowed empty',
        ]);

        $workUnit = EnWorkUnit::findOrFail($id);

        // ✅ Convert & upload Summernote base64 images
        $cleanedContent = $this->handleSummernoteImages($request->content);

        // 🔄 Ambil src image lama & baru
        preg_match_all('/<img[^>]+src="([^">]+)"/', $workUnit->content, $oldImages);
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
        $workUnit->title = $request->title;
        $workUnit->content = $cleanedContent;


        // 📷 Ganti cover jika ada
        if ($request->hasFile('cover')) {
            if ($workUnit->cover) {
                Storage::disk('s3')->delete(ltrim($workUnit->cover, '/'));
            }
            $path = Storage::disk('s3')->putFile('workUnit', $request->file('cover'));
            $workUnit->cover = '/' . $path;
        }

        if ($request->file('document')) {
            if ($workUnit->document) {
                Storage::disk('s3')->delete($workUnit->document_url);
            }
            $filename = $request->file('document')->getClientOriginalName();
            $workUnit->document_name = $filename;
            $file = $request->file('document');
            $path = Storage::disk('s3')->put('/workUnit', $file);
            $workUnit->document_url = '/' . $path;
        }

        $workUnit->save();

        return to_route('backoffice.work-unit.index')->with('message', 'Work unit has been updated');
    }

    public function detail($id)
    {
        $workUnit = EnWorkUnit::with('workUnitCategory', 'user')->where('id', $id)->first();

        return Inertia::render('backoffice/en/work-unit/detail', [
            'workUnit' => $workUnit
        ]);
    }

    public function destroy($id)
    {
        $workUnit = EnWorkUnit::where('id', $id)->first();

        $workUnit->delete();

        return to_route('backoffice.work-unit.index')->with('message', 'Work unit has been deleted');
    }

    public function previewDocument($id)
    {
        $workUnit = EnWorkUnit::where('id', $id)->first();
        $file = Storage::disk('s3')->get($workUnit->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($workUnit->document_name) . '"');

    }
}