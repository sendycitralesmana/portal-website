<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\ApplicationCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = Application::with('applicationCategory');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $query = $query->orderBy('created_at', 'asc');

        $applications = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/aplikasi/page', [
            'applications' => $applications,
        ]);
    }

    public function create()
    {
        $categories = ApplicationCategory::get();

        return Inertia::render('backoffice/aplikasi/tambah', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            // 'description' => ['required', 'max:255'],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'title.required' => 'Judul tidak boleh kosong',
            // 'description.required' => 'Deskripsi tidak boleh kosong',
            'cover.required' => 'Cover tidak boleh kosong',
            'cover.image' => 'Cover harus berformat gambar',
            'cover.mimes' => 'Cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover tidak boleh lebih dari 2MB',
        ]);

        $application = new Application();
        $application->id = Str::uuid();
        $application->application_category_id = $request->category;
        $application->title = $request->title;
        $application->description = $request->title;
        $application->url = $request->link1;
        
        if ($request->file('cover')) {
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/application', $file);
            $application->cover = '/' . $path;
        }

        $application->save();

        return to_route('backoffice.aplikasi.index')->with('message', 'Aplikasi berhasil ditambahkan');
    }

    public function edit($id)
    {
        $categories = ApplicationCategory::get();
        $application = Application::with('applicationCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/aplikasi/edit', [
            'categories' => $categories,
            'application' => $application
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'category' => ['required', 'max:255'],
            'title' => ['required', 'max:255'],
            // 'description' => ['required', 'max:255'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:2048'],
        ], [
            'category.required' => 'Kategori tidak boleh kosong',
            'title.required' => 'Judul tidak boleh kosong',
            // 'description.required' => 'Deskripsi tidak boleh kosong',
            'cover.image' => 'Cover harus berformat gambar',
            'cover.mimes' => 'Cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover tidak boleh lebih dari 2MB',
        ]);

        $application = Application::where('id', $id)->first();
        $application->application_category_id = $request->category;
        $application->title = $request->title;
        $application->description = $request->title;
        $application->url = $request->link1;

        if ($request->file('cover')) {
            if ($application->cover) {
                Storage::disk('s3')->delete($application->cover);
            }
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/application', $file);
            $application->cover = '/' . $path;
        }

        $application->save();

        return to_route('backoffice.aplikasi.index')->with('message', 'Aplikasi berhasil diperbarui');
    }

    public function destroy($id)
    {
        $application = Application::where('id', $id)->first();
        Storage::disk('s3')->delete($application->cover);
        $application->delete();

        return to_route('backoffice.aplikasi.index')->with('message', 'Aplikasi berhasil dihapus');
    }
}
