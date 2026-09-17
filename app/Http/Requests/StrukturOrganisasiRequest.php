<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StrukturOrganisasiRequest extends FormRequest
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
            'deskripsi' => ['nullable', 'string'],
            'gambar' => ['required', 'max:12288'], // Maksimal 12MB
            'file' => ['nullable', 'file', 'mimes:pdf', 'max:12288'], // Maksimal 12MB
        ];
    }

    public function messages(): array
    {
        return [
            'deskripsi.string' => 'Deskripsi harus berupa teks.',
            'gambar.required' => 'Gambar struktur organisasi wajib diunggah.',
            // 'gambar.image' => 'File yang diunggah harus berupa gambar.',
            // 'gambar.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
            'gambar.max' => 'Ukuran gambar tidak boleh lebih dari 12MB.',
            'file.file' => 'File yang diunggah harus berupa file.',
            'file.mimes' => 'Format file harus berupa PDF.',
            'file.max' => 'Ukuran file tidak boleh lebih dari 12MB.',
        ];
    }
}
