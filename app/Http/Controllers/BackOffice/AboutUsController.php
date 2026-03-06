<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AboutUsController extends Controller
{
    public function index(Request $request)
    {
        $aboutUs = AboutUs::first();
        // dd($aboutUs);

        return Inertia::render('backoffice/tentang-kami/page', [
            'aboutUs' => $aboutUs,
        ]);
    }

    public function create()
    {

        return Inertia::render('backoffice/tentang-kami/add', [
            
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'address' => ['required'],
            'phone' => ['required', 'max:255'],
            'hotline' => ['required', 'max:255'],
            'whatsapp' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:about_us,email'],
            'faqs' => ['required'],
            'facebook' => ['nullable', 'max:255'],
            'instagram' => ['nullable', 'max:255'],
            'twitter' => ['nullable', 'max:255'],
            'youtube' => ['nullable', 'max:255'],
            'tiktok' => ['nullable', 'max:255'],
        ], [
            'address.required' => 'Alamat tidak boleh kosong',
            'phone.required' => 'Nomor telepon tidak boleh kosong',
            'hotline.required' => 'Nomor hotline tidak boleh kosong',
            'whatsapp.required' => 'Nomor whatsapp tidak boleh kosong',
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'faqs.required' => 'FAQs tidak boleh kosong',
        ]);
    
        // Simpan About Us
        $aboutUs = new AboutUs();
        $aboutUs->id = Str::uuid();
        $aboutUs->address = $request->address;
        $aboutUs->phone = $request->phone;
        $aboutUs->hotline = $request->hotline;
        $aboutUs->whatsapp = $request->whatsapp;
        $aboutUs->email = $request->email;
        $aboutUs->faqs = $request->faqs;
        $aboutUs->facebook = $request->facebook;
        $aboutUs->instagram = $request->instagram;
        $aboutUs->twitter = $request->twitter;
        $aboutUs->youtube = $request->youtube;
        $aboutUs->tiktok = $request->tiktok;
        $aboutUs->save();
    
        return redirect()->route('backoffice.tentang-kami.index')
            ->with('message', 'Data berhasil disimpan.');
    }

    public function edit($id)
    {
        $aboutUs = AboutUs::where('id', $id)->first();

        return Inertia::render('backoffice/tentang-kami/edit', [
            'aboutUs' => $aboutUs
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'address' => ['required'],
            'phone' => ['required', 'max:255'],
            'hotline' => ['required', 'max:255'],
            'whatsapp' => ['required', 'max:255'],
            'email' => ['required', 'email', 'max:255', Rule::unique(AboutUs::class)->ignore($id)],
            'faqs' => ['required'],
            'facebook' => ['nullable', 'max:255'],
            'instagram' => ['nullable', 'max:255'],
            'twitter' => ['nullable', 'max:255'],
            'youtube' => ['nullable', 'max:255'],
            'tiktok' => ['nullable', 'max:255'], 
        ], [
            'address.required' => 'Alamat tidak boleh kosong',
            'phone.required' => 'Nomor telepon tidak boleh kosong',
            'hotline.required' => 'Nomor hotline tidak boleh kosong',
            'whatsapp.required' => 'Nomor whatsapp tidak boleh kosong',
            'email.required' => 'Email tidak boleh kosong',
            'email.email' => 'Email tidak valid',
            'email.unique' => 'Email sudah terdaftar',
            'faqs.required' => 'FAQs tidak boleh kosong',
        ]);

        $aboutUs = AboutUs::where('id', $id)->first();
        $aboutUs->address = $request->address;
        $aboutUs->phone = $request->phone;
        $aboutUs->hotline = $request->hotline;
        $aboutUs->whatsapp = $request->whatsapp;
        $aboutUs->email = $request->email;
        $aboutUs->faqs = $request->faqs;
        $aboutUs->facebook = $request->facebook;
        $aboutUs->instagram = $request->instagram;
        $aboutUs->twitter = $request->twitter;
        $aboutUs->youtube = $request->youtube;
        $aboutUs->tiktok = $request->tiktok;

        $aboutUs->save();

        return to_route('backoffice.tentang-kami.index')->with('message', 'Tentang Kami berhasil diperbarui');
    }

    public function destroy($id)
    {
        $aboutUs = AboutUs::where('id', $id)->first();
        $aboutUs->delete();

        return to_route('backoffice.tentang-kami.index')->with('message', 'Tentang Kami berhasil dihapus');
    }
}