<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TugasFungsiRequest extends FormRequest
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
            'kategori' => 'required|in:fungsi, kewenangan,subjek terlindung,tindak pidana tertentu,program perlindungan',
            'judul' => 'nullable|string',
            'deskripsi' => 'required|string',
            'gambar' => 'nullable|image|max:10240', // Maksimal 10MB
        ];
    }

    public function messages(): array
    {
        return [
            'kategori.required' => 'Kategori wajib diisi.',
            'kategori.in' => 'Kategori tidak valid. Pilih salah satu: kewenangan, subjek terlindung, tindak pidana tertentu, program perlindungan.',
            'judul.string' => 'Judul harus berupa teks.',
            'deskripsi.required' => 'Deskripsi wajib diisi.',
            'deskripsi.string' => 'Deskripsi harus berupa teks.',
            'gambar.image' => 'Gambar harus berupa file gambar (jpeg, png, bmp, gif, svg).',
            'gambar.max' => 'Ukuran gambar maksimal 10MB.',
        ];
    }
}
