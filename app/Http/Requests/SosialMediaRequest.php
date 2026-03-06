<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SosialMediaRequest extends FormRequest
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
            'platform' => 'required|in:instagram,tiktok,youtube',
            'embed_url' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'platform.required' => 'Platform wajib diisi.',
            'platform.in' => 'Platform harus salah satu dari: instagram, tiktok, youtube.',
            'embed_url.required' => 'Embed Url wajib diisi.',
        ];
    }
}
