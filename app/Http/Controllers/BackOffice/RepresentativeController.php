<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Representative;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RepresentativeController extends Controller
{
    public function index(Request $request)
    {

        $query = Representative::orderBy('created_at', 'asc');

        if ($request->filled('search')) {
            $search = strtolower($request->search);
            $query->where(function ($q) use ($search) {
                $q->orWhereRaw('LOWER(office) LIKE ?', ["%{$search}%"]);
            });
        }

        $representatives = $query->paginate(10)->withQueryString()->toArray();

        return Inertia::render('backoffice/perwakilan/page', [
            'representatives' => $representatives,
        ]);
    }

    public function create()
    {

        return Inertia::render('backoffice/perwakilan/add', [
            
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'office' => ['required', 'max:255'],
            'address' => ['required'],
            'phone' => ['required', 'max:255'],
            'chief_representative' => ['required', 'max:255'],
            'hotline' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:'.Representative::class],
            'instagram' => ['required', 'max:255'],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'longitude' => ['required'],
            'latitude' => ['required'],
        ], [
            'office.required' => 'Perwakilan tidak boleh kosong',
            'address.required' => 'Alamat tidak boleh kosong',
            'chief_representative.required' => 'Ketua Perwakilan tidak boleh kosong',
            'phone.required' => 'Nomor telepon tidak boleh kosong',
            'hotline.required' => 'Nomor hotline tidak boleh kosong',
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'instagram.required' => 'Instagram tidak boleh kosong',
            'cover.required' => 'cover tidak boleh kosong',
            'cover.image' => 'cover harus berformat gambar',
            'cover.mimes' => 'cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'cover tidak boleh lebih dari 6MB',
            'longitude.required' => 'Longitude tidak boleh kosong',
            'latitude.required' => 'Latitude tidak boleh kosong',
        ]);

        $representative = new Representative();
        $representative->id = Str::uuid();
        $representative->office = $request->office;
        $representative->chief_representative = $request->chief_representative;
        $representative->address = $request->address;
        $representative->phone = $request->phone;
        $representative->hotline = $request->hotline;
        $representative->email = $request->email;
        $representative->instagram = $request->instagram;
        $representative->longitude = $request->longitude;
        $representative->latitude = $request->latitude;
        
        if ($request->file('cover')) {
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/perwakilan', $file);
            $representative->cover = '/' . $path;
        }

        $representative->save();

        return to_route('backoffice.perwakilan.index')->with('message', 'Perwakilan berhasil ditambahkan');
    }

    public function edit($id)
    {
        $representative = Representative::where('id', $id)->first();

        return Inertia::render('backoffice/perwakilan/edit', [
            'representative' => $representative
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'office' => ['required', 'max:255'],
            'address' => ['required'],
            'phone' => ['required', 'max:255'],
            'chief_representative' => ['required', 'max:255'],
            'hotline' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(Representative::class)->ignore($id)],
            'instagram' => ['required', 'max:255'],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:6144'],
            'longitude' => ['required'],
            'latitude' => ['required'],
        ], [
            'office.required' => 'Perwakilan tidak boleh kosong',
            'address.required' => 'Alamat tidak boleh kosong',
            'chief_representative.required' => 'Ketua Perwakilan tidak boleh kosong',
            'phone.required' => 'Nomor telepon tidak boleh kosong',
            'hotline.required' => 'Nomor hotline tidak boleh kosong',
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'instagram.required' => 'Instagram tidak boleh kosong',
            'cover.image' => 'cover harus berformat gambar',
            'cover.mimes' => 'cover harus berformat jpeg, png, jpg, gif, svg, webp',
            'cover.max' => 'cover tidak boleh lebih dari 6MB',
            'longitude.required' => 'Longitude tidak boleh kosong',
            'latitude.required' => 'Latitude tidak boleh kosong',
        ]);

        $representative = Representative::where('id', $id)->first();
        $representative->office = $request->office;
        $representative->address = $request->address;
        $representative->chief_representative = $request->chief_representative;
        $representative->phone = $request->phone;
        $representative->hotline = $request->hotline;
        $representative->email = $request->email;
        $representative->instagram = $request->instagram;
        $representative->longitude = $request->longitude;
        $representative->latitude = $request->latitude;

        if ($request->file('cover')) {
            Storage::disk('s3')->delete($representative->cover);
            $file = $request->file('cover');
            $path = Storage::disk('s3')->putFile('/perwakilan', $file);
            $representative->cover = '/' . $path;
        }

        $representative->save();

        return to_route('backoffice.perwakilan.index')->with('message', 'Perwakilan berhasil diperbarui');
    }

    public function detail($id)
    {
        $representative = Representative::where('id', $id)->first();

        return Inertia::render('backoffice/perwakilan/detail', [
            'representative' => $representative
        ]);
    }

    public function destroy($id)
    {
        $representative = Representative::where('id', $id)->first();
        Storage::disk('s3')->delete($representative->cover);
        $representative->delete();

        return to_route('backoffice.perwakilan.index')->with('message', 'Perwakilan berhasil dihapus');
    }
}