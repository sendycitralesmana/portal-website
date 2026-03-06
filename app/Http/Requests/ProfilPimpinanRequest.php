<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfilPimpinanRequest extends FormRequest
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
            'nama' => 'required|string',
            'jabatan' => 'required|string',
            'deskripsi' => 'required|string',
            'foto' => 'nullable|image|max:10240', // Maksimal 10MB
        ];
    }

    public function messages(): array
    {
        return [
            'nama.required' => 'Nama wajib diisi.',
            'nama.string' => 'Nama harus berupa teks.',
            'jabatan.required' => 'Jabatan wajib diisi.',
            'jabatan.string' => 'Jabatan harus berupa teks.',
            'deskripsi.required' => 'Deskripsi wajib diisi.',
            'deskripsi.string' => 'Deskripsi harus berupa teks.',
            'foto.image' => 'Foto harus berupa file gambar.',
            'foto.max' => 'Ukuran foto maksimal 10MB.',
        ];
    }
}
