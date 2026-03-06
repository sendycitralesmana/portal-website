<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnStructure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnStructureController extends Controller
{
    public function index(Request $request)
    {
        $query = EnStructure::orderBy('created_at', 'asc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(name) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $structures = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/en/structure/page', [
            'structures' => $structures,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/en/structure/add', [
            
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
            'category.required' => 'Category cannot be empty',
            'name.required' => 'Title cannot be empty',
            'position.required' => 'Position cannot be empty',
            // 'description.required' => 'Description cannot be empty',
            'foto.required' => 'Photo cannot be empty',
            'foto.image' => 'Photo must be an image',
            'foto.mimes' => 'Photo must be in jpeg, png, jpg, gif, svg, or webp format',
            'foto.max' => 'Photo cannot be larger than 2MB',
        ]);

        $structure = new EnStructure();
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

        return to_route('backoffice.structure.index')->with('message', 'structure has been successfully added');
    }

    public function edit($id)
    {
        $structure = EnStructure::where('id', $id)->first();

        return Inertia::render('backoffice/en/structure/edit', [
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
            'category.required' => 'Category cannot be empty',
            'name.required' => 'Name cannot be empty',
            'position.required' => 'Position cannot be empty',
            // 'description.required' => 'Description cannot be empty',
            'foto.image' => 'Photo must be an image',
            'foto.mimes' => 'Photo must be in jpeg, png, jpg, gif, svg, or webp format',
            'foto.max' => 'Photo cannot be larger than 2MB',
        ]);

        $structure = EnStructure::where('id', $id)->first();
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

        return to_route('backoffice.structure.index')->with('message', 'structure has been successfully updated');
    }

    public function detail($id)
    {
        $structure = EnStructure::where('id', $id)->first();

        return Inertia::render('backoffice/en/structure/detail', [
            'structure' => $structure
        ]);
    }

    public function destroy($id)
    {
        $structure = EnStructure::where('id', $id)->first();
        Storage::disk('s3')->delete($structure->foto);
        $structure->delete();

        return to_route('backoffice.structure.index')->with('message', 'structure has been successfully deleted');
    }
}