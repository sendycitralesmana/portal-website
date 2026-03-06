<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnInstitution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnInstitutionController extends Controller
{
    public function index(Request $request)
    {
        $institution = EnInstitution::first();

        return Inertia::render('backoffice/en/institution/page', [
            'institution' => $institution,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/en/institution/add', [
            
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
            'history.required' => 'History cannot be empty',
            'legal_basis.required' => 'Legal basis cannot be empty',
            'vision.required' => 'Vision cannot be empty',
            'vision_cover.required' => 'Vision image cannot be empty',
            'vision_cover.image' => 'Vision image must be an image',
            'vision_cover.mimes' => 'Vision image must be in jpeg, png, jpg, gif, svg, or webp format',
            'vision_cover.max' => 'Vision image cannot be larger than 6MB',
            'mission.required' => 'Mission cannot be empty',
            'mission_cover.required' => 'Mission image cannot be empty',
            'mission_cover.image' => 'Mission image must be an image',
            'mission_cover.mimes' => 'Mission image must be in jpeg, png, jpg, gif, svg, or webp format',
            'mission_cover.max' => 'Mission image cannot be larger than 6MB',
            'authority.required' => 'Authority cannot be empty',
            'document.max' => 'Document cannot be larger than 6MB',
        ]);

        $institution = new EnInstitution();
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

        return to_route('backoffice.institution.index')->with('message', 'Institution has been successfully added');
    }

    public function edit($id)
    {
        $institution = EnInstitution::where('id', $id)->first();

        return Inertia::render('backoffice/en/institution/edit', [
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
            'history.required' => 'History cannot be empty',
            'legal_basis.required' => 'Legal basis cannot be empty',
            'vision.required' => 'Vision cannot be empty',
            'vision_cover.image' => 'Vision image must be an image',
            'vision_cover.mimes' => 'Vision image must be in jpeg, png, jpg, gif, svg, or webp format',
            'vision_cover.max' => 'Vision image cannot be larger than 6MB',
            'mission.required' => 'Mission cannot be empty',
            'mission_cover.image' => 'Mission image must be an image',
            'mission_cover.mimes' => 'Mission image must be in jpeg, png, jpg, gif, svg, or webp format',
            'mission_cover.max' => 'Mission image cannot be larger than 6MB',
            'authority.required' => 'Authority cannot be empty',
            'document.max' => 'Document cannot be larger than 6MB',
        ]);

        $institution = EnInstitution::findOrFail($id);

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

        return to_route('backoffice.institution.index')->with('message', 'Institution has been successfully updated');
    }

    public function detail($id)
    {
        $institution = EnInstitution::where('id', $id)->first();

        return Inertia::render('backoffice/en/institution/detail', [
            'institution' => $institution
        ]);
    }

    public function destroy($id)
    {
        $institution = EnInstitution::where('id', $id)->first();
        
        if ($institution->document_url) {
            Storage::disk('s3')->delete($institution->document_url);
        }
        if ($institution->cover) {
            Storage::disk('s3')->delete($institution->cover);
        }

        $institution->delete();

        return to_route('backoffice.institution.index')->with('message', 'Institution has been successfully deleted');
    }

    // public function previewDocument()
    // {
    //     $institution = EnInstitution::first();
    //     $filePath = $institution->document;
    //     $file = Storage::disk('s3')->get($institution->document_url);

    //     return response($file, 200)
    //         ->header('Content-Type', 'application/pdf')
    //         ->header('Content-Disposition', 'inline; filename="' . basename($filePath) . '"');
    // }

    public function previewDocument()
    {
        $institution = EnInstitution::first();
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
        $institution = EnInstitution::where('id', $id)->first();
        $file = Storage::disk('s3')->get($institution->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($institution->document_url) . '"');
    }
}