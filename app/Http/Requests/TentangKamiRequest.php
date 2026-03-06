<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TentangKamiRequest extends FormRequest
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
            'alamat' => 'required|string',
            'telepon' => 'required|string',
            'whatsapp' => 'required|string',
            'email' => 'required|email',
            'jam_operasional' => 'required|string',
            'latitude' => 'required|string',
            'longitude' => 'required|string',
            'gambar' => 'nullable|image|max:10240', // Maksimal 10MB
        ];
    }

    public function messages(): array
    {
        return [
            'alamat.required' => 'Alamat wajib diisi.',
            'alamat.string' => 'Alamat harus berupa teks.',
            'telepon.required' => 'Telepon wajib diisi.',
            'telepon.string' => 'Telepon harus berupa teks.',
            'whatsapp.required' => 'WhatsApp wajib diisi.',
            'whatsapp.string' => 'WhatsApp harus berupa teks.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Email harus berupa alamat email yang valid.',
            'jam_operasional.required' => 'Jam operasional wajib diisi.',
            'jam_operasional.string' => 'Jam operasional harus berupa teks.',
            'latitude.required' => 'Latitude wajib diisi.',
            'latitude.string' => 'Latitude harus berupa teks.',
            'longitude.required' => 'Longitude wajib diisi.',
            'longitude.string' => 'Longitude harus berupa teks.',
            'gambar.image' => 'Gambar harus berupa file gambar (jpeg, png, bmp, gif, svg).',
            'gambar.max' => 'Ukuran gambar maksimal 10MB.',
        ];
    }
}
