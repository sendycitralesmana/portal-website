<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MaklumatStandarRequest extends FormRequest
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
            'judul' => 'nullable|string|max:255',
            'deskripsi' => 'nullable|string',
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,webp,pdf,doc,docx,xls,xlsx,ppt,pptx|max: 15360', // max 15MB
        ];
    }

    public function messages()
    {
        return [
            'judul.string' => 'Judul harus berupa teks',
            'judul.max' => 'Judul tidak boleh lebih dari 255 karakter',
            'file.required' => 'File wajib diunggah',
            'file.max' => 'File tidak boleh lebih dari 15MB',
            'file.mimes' => 'File harus berupa gambar atau dokumen',
            'file.uploaded' => 'File gagal diunggah. Ukuran file mungkin melebihi batas upload server.',
        ];
    }
}
