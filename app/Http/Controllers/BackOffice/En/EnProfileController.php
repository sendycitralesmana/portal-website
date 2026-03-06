<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnProfile;
use App\Models\En\EnProfileCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnProfileController extends Controller
{
    public function index(Request $request)
    {
        $query = EnProfile::with('profileCategory')->orderBy('created_at', 'asc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $profiles = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/en/profile/page', [
            'profiles' => $profiles,
        ]);
    }

    public function create()
    {
        $categories = EnProfileCategory::get();
        $category = EnProfileCategory::where('slug', 'pejabat')->first();

        return Inertia::render('backoffice/en/profile/add', [
            'categories' => $categories,
            'category' => $category
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'description' => ['required'],
            'foto' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Category is required',
            'name.required' => 'Title is required',
            'description.required' => 'Description is required',
            'foto.required' => 'Photo is required',
            'foto.image' => 'Photo must be an image',
            'foto.mimes' => 'Photo must be a file of type: jpeg, png, jpg, gif, svg, webp',
            'foto.max' => 'Photo may not be greater than 2MB',
        ]);        

        $profile = new EnProfile();
        $profile->id = Str::uuid();
        $profile->profile_category_id = $request->category;
        $profile->name = $request->name;
        $profile->description = $request->description;
        
        if ($request->file('foto')) {
            $file = $request->file('foto');
            $path = Storage::disk('s3')->putFile('/profile', $file);
            $profile->foto = '/' . $path;
        }

        $profile->save();

        return to_route('backoffice.profileEn.index')->with('message', 'Profile has been successfully added');
    }

    public function edit($id)
    {
        $categories = EnProfileCategory::get();
        $profile = EnProfile::with('profileCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/en/profile/edit', [
            'categories' => $categories,
            'profile' => $profile
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'name' => ['required', 'max:255'],
            'description' => ['required'],
            'foto' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Category is required',
            'name.required' => 'Name is required',
            'description.required' => 'Description is required',
            'foto.image' => 'Photo must be an image',
            'foto.mimes' => 'Photo must be a file of type: jpeg, png, jpg, gif, svg, webp',
            'foto.max' => 'Photo may not be greater than 2MB',
        ]);        

        $profile = EnProfile::where('id', $id)->first();
        $profile->profile_category_id = $request->category;
        $profile->name = $request->name;
        $profile->description = $request->description;

        if ($request->file('foto')) {
            Storage::disk('s3')->delete($profile->foto);
            $file = $request->file('foto');
            $path = Storage::disk('s3')->putFile('/profile', $file);
            $profile->foto = '/' . $path;
        }

        $profile->save();

        return to_route('backoffice.profileEn.index')->with('message', 'Profile has been successfully updated');
    }

    public function detail($id)
    {
        $profile = EnProfile::with('profileCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/en/profile/detail', [
            'profile' => $profile
        ]);
    }

    public function destroy($id)
    {
        $profile = EnProfile::where('id', $id)->first();
        Storage::disk('s3')->delete($profile->foto);
        $profile->delete();

        return to_route('backoffice.profileEn.index')->with('message', 'Profile has been successfully deleted');
    }
}
