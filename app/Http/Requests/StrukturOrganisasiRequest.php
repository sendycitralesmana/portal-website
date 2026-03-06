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
            'gambar' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp', 'max:12288'], // Maksimal 12MB
        ];
    }

    public function messages(): array
    {
        return [
            'gambar.required' => 'Gambar struktur organisasi wajib diunggah.',
            'gambar.image' => 'File yang diunggah harus berupa gambar.',
            'gambar.mimes' => 'Format gambar harus jpeg, png, jpg, gif, svg, atau webp.',
            'gambar.max' => 'Ukuran gambar tidak boleh lebih dari 12MB.',
        ];
    }
}
