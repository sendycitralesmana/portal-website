<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\ProtectionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProtectionServiceController extends Controller
{
    public function index(Request $request)
    {
        $protectionService = ProtectionService::get();

        return Inertia::render('backoffice/layanan-perlindungan/page', [
            'protectionService' => $protectionService,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/layanan-perlindungan/add', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required'],
            'information' => ['required'],
            'legal_basis' => ['required'],
            'access_protection' => ['required'],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
        ], [
            'title.required' => 'Judul tidak boleh kosong',
            'information.required' => 'Informasi tidak boleh kosong',
            'legal_basis.required' => 'Dasar hukum tidak boleh kosong',
            'access_protection.required' => 'Kewenangan tidak boleh kosong',
            'cover.required' => 'Cover tidak boleh kosong',
            'cover.image' => 'Cover harus berformat gambar',
            'cover.mimes' => 'Cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover tidak boleh lebih dari 6MB',
        ]);

        $protectionService = new ProtectionService();
        $protectionService->id = Str::uuid();
        $protectionService->title = $request->title;
        $protectionService->information = $request->information;
        $protectionService->legal_basis = $request->legal_basis;
        $protectionService->access_protection = $request->access_protection;

        if ($request->file('cover')) {
            $file = $request->file('cover');
            $path = Storage::disk('s3')->put('/protectionService', $file);
            $protectionService->cover = '/' . $path;
        }

        $protectionService->save();

        return to_route('backoffice.layanan-perlindungan.index')->with('message', 'Layanan perlindungan berhasil ditambahkan');
    }

    public function edit($id)
    {
        $protectionService = ProtectionService::where('id', $id)->first();

        return Inertia::render('backoffice/layanan-perlindungan/edit', [
            'protectionService' => $protectionService
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => ['required'],
            'information' => ['required'],
            'legal_basis' => ['required'],
            'access_protection' => ['required'],
            'vision_cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
        ], [
            'title.required' => 'Judul tidak boleh kosong',
            'information.required' => 'Informasi tidak boleh kosong',
            'legal_basis.required' => 'Dasar hukum tidak boleh kosong',
            'access_protection.required' => 'Kewenangan tidak boleh kosong',
            'vision_cover.image' => 'Cover harus berformat gambar',
            'vision_cover.mimes' => 'Cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'vision_cover.max' => 'Cover tidak boleh lebih dari 6MB',
        ]);

        $protectionService = ProtectionService::findOrFail($id);

        $protectionService->title = $request->title;
        $protectionService->information = $request->information;
        $protectionService->legal_basis = $request->legal_basis;
        $protectionService->access_protection = $request->access_protection;

        if ($request->hasFile('cover')) {
            if ($protectionService->cover) {
                Storage::disk('s3')->delete(ltrim($protectionService->cover, '/'));
            }
            $path = Storage::disk('s3')->putFile('protectionService', $request->file('cover'));
            $protectionService->cover = '/' . $path;
        }

        $protectionService->save();

        return to_route('backoffice.layanan-perlindungan.index')->with('message', 'Layanan perlindungan berhasil diperbarui');
    }

    public function detail($id)
    {
        $protectionService = ProtectionService::where('id', $id)->first();

        return Inertia::render('backoffice/layanan-perlindungan/detail', [
            'protectionService' => $protectionService
        ]);
    }

    public function destroy($id)
    {
        $protectionService = ProtectionService::where('id', $id)->first();
        
        if ($protectionService->cover) {
            Storage::disk('s3')->delete($protectionService->cover);
        }

        $protectionService->delete();

        return to_route('backoffice.layanan-perlindungan.index')->with('message', 'Layanan perlindungan berhasil dihapus');
    }

    // public function previewDocument()
    // {
    //     $protectionService = ProtectionService::first();
    //     $filePath = $protectionService->document;
    //     $file = Storage::disk('s3')->get($protectionService->document_url);

    //     return response($file, 200)
    //         ->header('Content-Type', 'application/pdf')
    //         ->header('Content-Disposition', 'inline; filename="' . basename($filePath) . '"');
    // }

    public function previewDocument()
    {
        $protectionService = ProtectionService::first();
        $filePath = $protectionService->document;

        $stream = Storage::disk('s3')->readStream($filePath);

        return response()->stream(function () use ($stream) {
            fpassthru($stream);
        }, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"',
        ]);
    }

    public function previewDocumentUrl($id)
    {
        $protectionService = ProtectionService::where('id', $id)->first();
        $file = Storage::disk('s3')->get($protectionService->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($protectionService->document_url) . '"');
    }
}