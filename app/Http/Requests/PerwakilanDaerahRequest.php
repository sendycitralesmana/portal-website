<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PerwakilanDaerahRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'kantor' => 'required|string',
            'alamat' => 'required|string',
            'telepon' => 'nullable|string',
            'email' => 'nullable|email',
            'whatsapp' => 'nullable|string',
            'twitter' => 'nullable|string',
            'tiktok' => 'nullable|string',
            'youtube' => 'nullable|string',
            'instagram' => 'nullable|string',
            'gambar' => 'nullable|image|max:10240', // Maksimal 10MB
            'latitude' => 'nullable|string',    
            'longitude' => 'nullable|string',
            'lokasi' => 'nullable|string',    
            'maps' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'kantor.required' => 'Kantor wajib diisi.',
            'kantor.string' => 'Kantor harus berupa teks.',
            'alamat.string' => 'Alamat harus berupa teks.',
            'telepon.string' => 'Telepon harus berupa teks.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Email harus berupa alamat email yang valid.',
            'whatsapp.string' => 'WhatsApp harus berupa teks.',
            'twitter.string' => 'Twitter harus berupa teks.',
            'tiktok.string' => 'TikTok harus berupa teks.',
            'youtube.string' => 'YouTube harus berupa teks.',
            'instagram.string' => 'Instagram harus berupa teks.',
            'gambar.image' => 'Gambar harus berupa file gambar.',
            'gambar.max' => 'Ukuran gambar maksimal 10MB.',
            'latitude.string' => 'Latitude harus berupa teks.',
            'longitude.string' => 'Longitude harus berupa teks.',
            'lokasi.string' => 'Lokasi harus berupa teks.',
            'maps.string' => 'Maps harus berupa teks.',
        ];
    }
}
