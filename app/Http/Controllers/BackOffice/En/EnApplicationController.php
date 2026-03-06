<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnApplication;
use App\Models\En\EnApplicationCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = EnApplication::with('applicationCategory');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"])
                  ->orWhereRaw('LOWER(description) LIKE ?', ["%{$search}%"]);
            });
        }

        $query = $query->orderBy('created_at', 'asc');

        $applications = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/en/application/page', [
            'applications' => $applications,
        ]);
    }

    public function create()
    {
        $categories = EnApplicationCategory::get();

        return Inertia::render('backoffice/en/application/add', [
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
            'category.required' => 'Category is required',
            'title.required' => 'Title is required',
            // 'description.required' => 'Description is required',
            'cover.required' => 'Cover is required',
            'cover.image' => 'Cover must be an image',
            'cover.mimes' => 'Cover must be one of: jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover must not be larger than 2MB',
        ]);

        $application = new EnApplication();
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

        return to_route('backoffice.applicationEn.index')->with('message', 'Application has been successfully added');
    }

    public function edit($id)
    {
        $categories = EnApplicationCategory::get();
        $application = EnApplication::with('applicationCategory')->where('id', $id)->first();

        return Inertia::render('backoffice/en/application/edit', [
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
            'category.required' => 'Category is required',
            'title.required' => 'Title is required',
            // 'description.required' => 'Description is required',
            'cover.image' => 'Cover must be an image',
            'cover.mimes' => 'Cover must be one of: jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover must not be larger than 2MB',
        ]);

        $application = EnApplication::where('id', $id)->first();
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

        return to_route('backoffice.applicationEn.index')->with('message', 'Application has been successfully updated');
    }

    public function destroy($id)
    {
        $application = EnApplication::where('id', $id)->first();
        Storage::disk('s3')->delete($application->cover);
        $application->delete();

        return to_route('backoffice.applicationEn.index')->with('message', 'Application has been successfully deleted');
    }
}
