<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Structure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class StructureController extends Controller
{
    public function index(Request $request)
    {
        $query = Structure::orderBy('created_at', 'asc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $structures = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/struktur/page', [
            'structures' => $structures,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/struktur/add', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'position' => ['required', 'max:255'],
            // 'description' => ['required'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'name.required' => 'Judul tidak boleh kosong',
            'position.required' => 'Jabatan tidak boleh kosong',
            // 'description.required' => 'Deskripsi tidak boleh kosong',
            'foto.required' => 'Foto tidak boleh kosong',
            'foto.image' => 'Foto harus berformat gambar',
            'foto.mimes' => 'Foto harus berformat jpeg, png, jpg, gif, svg, webp',
            'foto.max' => 'Foto tidak boleh lebih dari 2MB',
        ]);

        $structure = new Structure();
        $structure->id = Str::uuid();
        $structure->category = $request->category;
        $structure->name = $request->name;
        $structure->position = $request->position;
        
        if ($request->file('foto')) {
            $file = $request->file('foto');
            $path = Storage::disk('s3')->putFile('/structure', $file);
            $structure->foto = '/' . $path;
        }

        $structure->save();

        return to_route('backoffice.struktur.index')->with('message', 'struktur berhasil ditambahkan');
    }

    public function edit($id)
    {
        $structure = Structure::where('id', $id)->first();

        return Inertia::render('backoffice/struktur/edit', [
            'structure' => $structure
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'position' => ['required', 'max:255'],
            // 'description' => ['required'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'name.required' => 'Nama tidak boleh kosong',
            'position.required' => 'Jabatan tidak boleh kosong',
            // 'description.required' => 'Deskripsi tidak boleh kosong',
            'foto.image' => 'Foto harus berformat gambar',
            'foto.mimes' => 'Foto harus berformat jpeg, png, jpg, gif, svg, webp',
            'foto.max' => 'Foto tidak boleh lebih dari 2MB',
        ]);

        $structure = Structure::where('id', $id)->first();
        $structure->category = $request->category;
        $structure->name = $request->name;
        $structure->position = $request->position;

        if ($request->file('foto')) {
            Storage::disk('s3')->delete($structure->foto);
            $file = $request->file('foto');
            $path = Storage::disk('s3')->putFile('/structure', $file);
            $structure->foto = '/' . $path;
        }

        $structure->save();

        return to_route('backoffice.struktur.index')->with('message', 'struktur berhasil diperbarui');
    }

    public function detail($id)
    {
        $structure = Structure::where('id', $id)->first();

        return Inertia::render('backoffice/struktur/detail', [
            'structure' => $structure
        ]);
    }

    public function destroy($id)
    {
        $structure = Structure::where('id', $id)->first();
        Storage::disk('s3')->delete($structure->foto);
        $structure->delete();

        return to_route('backoffice.struktur.index')->with('message', 'struktur berhasil dihapus');
    }
}