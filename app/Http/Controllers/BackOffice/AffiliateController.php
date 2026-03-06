<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Affiliate;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AffiliateController extends Controller
{
    public function index(Request $request)
    {
        $query = Affiliate::orderBy('created_at', 'asc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(title) LIKE ?', ["%{$search}%"]);
            });
        }

        $affiliates = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/afiliasi/page', [
            'affiliates' => $affiliates,
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/afiliasi/tambah', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:4096'],
        ], [
            'title.required' => 'Judul tidak boleh kosong',
            'cover.required' => 'Cover tidak boleh kosong',
            'cover.image' => 'Cover harus berformat gambar',
            'cover.mimes' => 'Cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover tidak boleh lebih dari 2MB',
        ]);

        $affiliate = new Affiliate();
        $affiliate->id = Str::uuid();
        $affiliate->title = $request->title;
        $affiliate->url = $request->url;
        
        if ($request->file('cover')) {
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/affiliate', $file);
            $affiliate->cover = '/' . $path;
        }

        $affiliate->save();

        return to_route('backoffice.afiliasi.index')->with('message', 'afiliasi berhasil ditambahkan');
    }

    public function edit($id)
    {
        $affiliate = Affiliate::where('id', $id)->first();

        return Inertia::render('backoffice/afiliasi/edit', [
            'affiliate' => $affiliate
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => ['required', 'max:255'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:4096'],
        ], [
            'title.required' => 'Judul tidak boleh kosong',
            'cover.image' => 'Cover harus berformat gambar',
            'cover.mimes' => 'Cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'Cover tidak boleh lebih dari 2MB',
        ]);

        $affiliate = Affiliate::where('id', $id)->first();
        $affiliate->title = $request->title;
        $affiliate->url = $request->url;

        if ($request->file('cover')) {
            if ($affiliate->cover) {
                Storage::disk('s3')->delete($affiliate->cover);
            }
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/affiliate', $file);
            $affiliate->cover = '/' . $path;
        }

        $affiliate->save();

        return to_route('backoffice.afiliasi.index')->with('message', 'afiliasi berhasil diperbarui');
    }

    public function destroy($id)
    {
        $affiliate = Affiliate::where('id', $id)->first();
        Storage::disk('s3')->delete($affiliate->cover);
        $affiliate->delete();

        return to_route('backoffice.afiliasi.index')->with('message', 'afiliasi berhasil dihapus');
    }
}
