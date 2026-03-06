<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnProtectionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnProtectionServiceController extends Controller
{
    public function index(Request $request)
    {
        $protectionService = EnProtectionService::orderBy('created_at', 'asc')->get();

        return Inertia::render('backoffice/en/protection-service/page', [
            'protectionService' => $protectionService,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/en/protection-service/add', [
            
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
            'title.required' => 'Title cannot be empty',
            'information.required' => 'Information cannot be empty',
            'legal_basis.required' => 'Legal basis cannot be empty',
            'access_protection.required' => 'Authority cannot be empty',
            'cover.required' => 'Cover cannot be empty',
            'cover.image' => 'Cover must be an image',
            'cover.mimes' => 'Cover must be in jpeg, png, jpg, gif, svg, or webp format',
            'cover.max' => 'Cover cannot be larger than 6MB',
        ]);        

        $protectionService = new EnProtectionService();
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

        return to_route('backoffice.protection-service.index')->with('message', 'Protection service has been successfully added');
    }

    public function edit($id)
    {
        $protectionService = EnProtectionService::where('id', $id)->first();

        return Inertia::render('backoffice/en/protection-service/edit', [
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
            'title.required' => 'Title cannot be empty',
            'information.required' => 'Information cannot be empty',
            'legal_basis.required' => 'Legal basis cannot be empty',
            'access_protection.required' => 'Authority cannot be empty',
            'vision_cover.image' => 'Cover must be an image',
            'vision_cover.mimes' => 'Cover must be in jpeg, png, jpg, gif, svg, or webp format',
            'vision_cover.max' => 'Cover cannot be larger than 6MB',
        ]);

        $protectionService = EnProtectionService::findOrFail($id);

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

        return to_route('backoffice.protection-service.index')->with('message', 'Protection service has been successfully updated');
    }

    public function detail($id)
    {
        $protectionService = EnProtectionService::where('id', $id)->first();

        return Inertia::render('backoffice/en/protection-service/detail', [
            'protectionService' => $protectionService
        ]);
    }

    public function destroy($id)
    {
        $protectionService = EnProtectionService::where('id', $id)->first();
        
        if ($protectionService->cover) {
            Storage::disk('s3')->delete($protectionService->cover);
        }

        $protectionService->delete();

        return to_route('backoffice.protection-service.index')->with('message', 'Protection service has been successfully deleted');
    }

    // public function previewDocument()
    // {
    //     $protectionService = EnProtectionService::first();
    //     $filePath = $protectionService->document;
    //     $file = Storage::disk('s3')->get($protectionService->document_url);

    //     return response($file, 200)
    //         ->header('Content-Type', 'application/pdf')
    //         ->header('Content-Disposition', 'inline; filename="' . basename($filePath) . '"');
    // }

    public function previewDocument()
    {
        $protectionService = EnProtectionService::first();
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
        $protectionService = EnProtectionService::where('id', $id)->first();
        $file = Storage::disk('s3')->get($protectionService->document_url);

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="' . basename($protectionService->document_url) . '"');
    }
}
