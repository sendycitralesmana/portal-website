<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VideoInfoRequest extends FormRequest
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
            'judul' => 'required|string|max:255',
            'embed_url' => 'required|max:255',
            'deskripsi' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'judul.required' => 'Judul video harus diisi.',
            'judul.string' => 'Judul video harus berupa teks.',
            'judul.max' => 'Judul video tidak boleh lebih dari 255 karakter.',
            'embed_url.required' => 'URL embed video harus diisi.',
            'embed_url.max' => 'URL embed video tidak boleh lebih dari 255 karakter.',
        ];
    }
}
