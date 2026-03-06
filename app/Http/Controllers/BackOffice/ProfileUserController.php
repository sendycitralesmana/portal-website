<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\ProfileCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProfileUserController extends Controller
{
    public function index(Request $request)
    {
        $query = Profile::with('profileCategory')->orderBy('created_at', 'asc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $profiles = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/profil/page', [
            'profiles' => $profiles,
        ]);
    }

    public function create()
    {
        $categories = ProfileCategory::get();
        $category = ProfileCategory::where('slug', 'pejabat')->first();

        return Inertia::render('backoffice/profil/add', [
            'categories' => $categories,
            'category' => $category
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'position' => ['required', 'max:255'],
            'description' => ['required'],
            'foto' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'name.required' => 'Judul tidak boleh kosong',
            'position.required' => 'Jabatan tidak boleh kosong',
            'description.required' => 'Deskripsi tidak boleh kosong',
            'foto.required' => 'Foto tidak boleh kosong',
            'foto.image' => 'Foto harus berformat gambar',
            'foto.mimes' => 'Foto harus berformat jpeg, png, jpg, gif, svg, webp',
            'foto.max' => 'Foto tidak boleh lebih dari 2MB',
        ]);

        $profile = new Profile();
        $profile->id = Str::uuid();
        $profile->profile_category_id = $request->category;
        $profile->name = $request->name;
        $profile->position = $request->position;
        $profile->description = $request->description;
        
        if ($request->file('foto')) {
            $file = $request->file('foto');
            $path = Storage::disk('s3')->putFile('/profile', $file);
            $profile->foto = '/' . $path;
        }

        $profile->save();

        return to_route('backoffice.profil.index')->with('message', 'Profil berhasil ditambahkan');
    }

    public function edit($id)
    {
        $categories = ProfileCategory::get();
        $profile = Profile::with('profileCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/profil/edit', [
            'categories' => $categories,
            'profile' => $profile
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'position' => ['required', 'max:255'],
            'description' => ['required'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'name.required' => 'Nama tidak boleh kosong',
            'position.required' => 'Jabatan tidak boleh kosong',
            'description.required' => 'Deskripsi tidak boleh kosong',
            'foto.image' => 'Foto harus berformat gambar',
            'foto.mimes' => 'Foto harus berformat jpeg, png, jpg, gif, svg, webp',
            'foto.max' => 'Foto tidak boleh lebih dari 2MB',
        ]);

        $profile = Profile::where('id', $id)->first();
        $profile->profile_category_id = $request->category;
        $profile->name = $request->name;
        $profile->position = $request->position;
        $profile->description = $request->description;

        if ($request->file('foto')) {
            Storage::disk('s3')->delete($profile->foto);
            $file = $request->file('foto');
            $path = Storage::disk('s3')->putFile('/profile', $file);
            $profile->foto = '/' . $path;
        }

        $profile->save();

        return to_route('backoffice.profil.index')->with('message', 'Profil berhasil diperbarui');
    }

    public function detail($id)
    {
        $profile = Profile::with('profileCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/profil/detail', [
            'profile' => $profile
        ]);
    }

    public function destroy($id)
    {
        $profile = Profile::where('id', $id)->first();
        Storage::disk('s3')->delete($profile->foto);
        $profile->delete();

        return to_route('backoffice.profil.index')->with('message', 'Profil berhasil dihapus');
    }
}
