<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class InstitusionController extends Controller
{
    public function index(Request $request)
    {
        $institution = Institution::first();

        return Inertia::render('backoffice/lembaga/page', [
            'institution' => $institution,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/lembaga/add', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'history' => ['required'],
            'legal_basis' => ['required'],
            'document' => ['nullable', 'max:6144'],
            'vision' => ['required'],
            'vision_cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'mission' => ['required'],
            'mission_cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'authority' => ['required'],
        ], [
            'history.required' => 'Sejarah tidak boleh kosong',
            'legal_basis.required' => 'Dasar hukum tidak boleh kosong',
            'vision.required' => 'Visi tidak boleh kosong',
            'vision_cover.required' => 'Gambar visi tidak boleh kosong',
            'vision_cover.image' => 'Gambar visi harus berupa gambar',
            'vision_cover.mimes' => 'Gambar visi harus berformat jpeg, png, jpg, gif, svg, atau webp',
            'vision_cover.max' => 'Gambar visi tidak boleh lebih dari 6MB',
            'mission.required' => 'Misi tidak boleh kosong',
            'mission_cover.required' => 'Gambar misi tidak boleh kosong',
            'mission_cover.image' => 'Gambar misi harus berupa gambar',
            'mission_cover.mimes' => 'Gambar misi harus berformat jpeg, png, jpg, gif, svg, atau webp',
            'mission_cover.max' => 'Gambar misi tidak boleh lebih dari 6MB',
            'authority.required' => 'Kewenangan tidak boleh kosong',
            'document.max' => 'Dokumen tidak boleh lebih dari 6MB',
        ]);

        $institution = new Institution();
        $institution->id = Str::uuid();
        $institution->history = $request->history;
        $institution->legal_basis = $request->legal_basis;
        $institution->vision = $request->vision;
        $institution->mission = $request->mission;
        $institution->authority = $request->authority;

        if ($request->file('document')) {
            $file = $request->file('document');
            $path = Storage::disk('s3')->put('/institution', $file);
            $institution->document = '/' . $path;
        }

        if ($request->file('file')) {
            $file = $request->file('file');
            $path = Storage::disk('s3')->put('/institution', $file);
            $institution->file = '/' . $path;
        }

        if ($request->file('vision_cover')) {
            $file = $request->file('vision_cover');
            $path = Storage::disk('s3')->put('/institution', $file);
            $institution->vision_cover = '/' . $path;
        }

        if ($request->file('mission_cover')) {
            $file = $request->file('mission_cover');
            $path = Storage::disk('s3')->put('/institution', $file);
            $institution->mission_cover = '/' . $path;
        }

        $institution->save();

        return to_route('backoffice.lembaga.index')->with('message', 'Profil Lembaga berhasil ditambahkan');
    }

    public function edit($id)
    {
        $institution = Institution::where('id', $id)->first();

        return Inertia::render('backoffice/lembaga/edit', [
            'institution' => $institution
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'history' => ['required'],
            'legal_basis' => ['required'],
            'document' => ['nullable', 'max:6144'],
            'vision' => ['required'],
            'vision_cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'mission' => ['required'],
            'mission_cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'authority' => ['required'],
        ], [
            'history.required' => 'Sejarah tidak boleh kosong',
            'legal_basis.required' => 'Dasar hukum tidak boleh kosong',
            'vision.required' => 'Visi tidak boleh kosong',
            'vision_cover.image' => 'Gambar visi harus berupa gambar',
            'vision_cover.mimes' => 'Gambar visi harus berformat jpeg, png, jpg, gif, svg, atau webp',
            'vision_cover.max' => 'Gambar visi tidak boleh lebih dari 6MB',
            'mission.required' => 'Misi tidak boleh kosong',
            'mission_cover.image' => 'Gambar misi harus berupa gambar',
            'mission_cover.mimes' => 'Gambar misi harus berformat jpeg, png, jpg, gif, svg, atau webp',
            'mission_cover.max' => 'Gambar misi tidak boleh lebih dari 6MB',
            'authority.required' => 'Kewenangan tidak boleh kosong',
            'document.max' => 'Dokumen tidak boleh lebih dari 6MB',
        ]);

        $institution = Institution::findOrFail($id);

        $institution->history = $request->history;
        $institution->legal_basis = $request->legal_basis;
        $institution->vision = $request->vision;
        $institution->mission = $request->mission;
        $institution->authority = $request->authority;

        if ($request->hasFile('document')) {
            if ($institution->document) {
                Storage::disk('s3')->delete(ltrim($institution->document, '/'));
            }
            $path = Storage::disk('s3')->putFile('institution', $request->file('document'));
            $institution->document = '/' . $path;
        }

        if ($request->hasFile('vision_cover')) {
            if ($institution->vision_cover) {
                Storage::disk('s3')->delete(ltrim($institution->vision_cover, '/'));
            }
            $path = Storage::disk('s3')->putFile('institution', $request->file('vision_cover'));
            $institution->vision_cover = '/' . $path;
        }

        if ($request->hasFile('mission_cover')) {
            if ($institution->mission_cover) {
                Storage::disk('s3')->delete(ltrim($institution->mission_cover, '/'));
            }
            $path = Storage::disk('s3')->putFile('institution', $request->file('mission_cover'));
            $institution->mission_cover = '/' . $path;
        }

        $institution->save();

        return to_route('backoffice.lembaga.index')->with('message', 'Profil Lembaga berhasil diperbarui');
    }

    public function detail($id)
    {
        $institution = Institution::where('id', $id)->first();

        return Inertia::render('backoffice/lembaga/detail', [
            'institution' => $institution
        ]);
    }

    public function destroy($id)
    {
        $institution = Institution::where('id', $id)->first();
        
        if ($institution->document_url) {
            Storage::disk('s3')->delete($institution->document_url);
        }
        if ($institution->cover) {
            Storage::disk('s3')->delete($institution->cover);
        }

        $institution->delete();

        return to_route('backoffice.lembaga.index')->with('message', 'Profil Lembaga berhasil dihapus');
    }

    // public function previewDocument()
    // {
    //     $institution = Institution::first();
    //     $filePath = $institution->document;
    //     $file = Storage::disk('s3')->get($institution->document_url);

    //     return response($file, 200)
    //         ->header('Content-Type', 'application/pdf')
    //         ->header('Content-Disposition', 'inline; filename="' . basename($filePath) . '"');
    // }

    public function previewDocument()
    {
        $institution = Institution::first();
        $filePath = $institution->document;

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
        $institution = Institution::where('id', $id)->first();
        $file = Storage::disk('s3')->get($institution->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($institution->document_url) . '"');
    }
}