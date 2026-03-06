<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\AboutUs;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Str;

class EnAboutUsController extends Controller
{
    public function index(Request $request)
    {
        $aboutUs = AboutUs::first();
        // dd($aboutUs);

        return Inertia::render('backoffice/en/about-us/page', [
            'aboutUs' => $aboutUs,
        ]);
    }

    public function create()
    {

        return Inertia::render('backoffice/en/about-us/add', [
            
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
            'address.required' => 'Address is required',
            'phone.required' => 'Phone number is required',
            'hotline.required' => 'Hotline number is required',
            'whatsapp.required' => 'WhatsApp number is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email has already been registered',
            'faqs.required' => 'FAQs are required',
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
    
        return redirect()->route('backoffice.about-us.index')
            ->with('message', 'About Us has been successfully added');
    }

    public function edit($id)
    {
        $aboutUs = AboutUs::where('id', $id)->first();

        return Inertia::render('backoffice/en/about-us/edit', [
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
            'address.required' => 'Address is required',
            'phone.required' => 'Phone number is required',
            'hotline.required' => 'Hotline number is required',
            'whatsapp.required' => 'WhatsApp number is required',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email address',
            'email.unique' => 'Email has already been registered',
            'faqs.required' => 'FAQs are required',
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

        return to_route('backoffice.about-us.index')->with('message', 'About Us has been successfully updated');
    }

    public function destroy($id)
    {
        $aboutUs = AboutUs::where('id', $id)->first();
        $aboutUs->delete();

        return to_route('backoffice.about-us.index')->with('message', 'About Us has been successfully deleted');
    }
}
