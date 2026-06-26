<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LayananRequest extends FormRequest
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
            'judul' => 'required|string',
            'link' => 'required|string',
            'gambar' => 'nullable|image|max:10240', // Maksimal 10MB
        ];
    }

    public function messages(): array
    {
        return [
            'judul.required' => 'Judul wajib diisi.',
            'judul.string' => 'Judul harus berupa teks.',
            'link.required' => 'Link wajib diisi.',
            'link.string' => 'Link harus berupa teks.',
            'gambar.image' => 'Gambar harus berupa file gambar.',
            'gambar.max' => 'Ukuran gambar maksimal 10MB.',
        ];
    }
}
