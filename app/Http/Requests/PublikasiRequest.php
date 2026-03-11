<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PublikasiRequest extends FormRequest
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
            'jenis' => 'required',
            'kategori' => 'required',
            'judul' => 'required',
            'deskripsi' => 'required',
            'gambar' => 'nullable|image|max:10240', // Maksimal 10MB

            // publikasi_media
            'media' => 'nullable|array',
            'media.*.kategori' => 'required|string|max:255',
            'media.*.judul' => 'nullable|string|max:255',
            'media.*.deskripsi' => 'nullable|string',
            'media.*.file' => 'required|file|mimes:jpg,jpeg,png,gif,webp,pdf,doc,docx,xls,xlsx,ppt,pptx|max:10240',
        ];
    }

    public function messages(): array
    {
        return [
            'jenis.required' => 'Jenis publikasi wajib diisi.',
            'kategori.required' => 'Kategori publikasi wajib diisi.',
            'judul.required' => 'Judul publikasi wajib diisi.',
            'deskripsi.required' => 'Deskripsi publikasi wajib diisi.',
            'gambar.image' => 'Gambar harus berupa file gambar (jpg, jpeg, png, dll).',
            'gambar.max' => 'Ukuran gambar maksimal adalah 10MB.',

            // publikasi_media
            'media.array' => 'Media harus berupa array.',
            'media.*.kategori.required' => 'Kategori media wajib diisi.',
            'media.*.kategori.string' => 'Kategori media harus berupa teks.',
            'media.*.kategori.max' => 'Kategori media tidak boleh lebih dari 255 karakter.',
            'media.*.judul.string' => 'Judul media harus berupa teks.',
            'media.*.judul.max' => 'Judul media tidak boleh lebih dari 255 karakter.',
            'media.*.file.required' => 'File media wajib diunggah.',
            'media.*.file.mimes' => 'File media harus berupa gambar atau dokumen.',
            'media.*.file.max' => 'Ukuran file media maksimal adalah 10MB.',
        ];
    }
}
