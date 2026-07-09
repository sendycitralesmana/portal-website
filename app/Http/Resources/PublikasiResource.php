<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PublikasiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            'id' => $this->id,
            'jenis' => $this->jenis,
            'kategori' => $this->kategori,
            'judul' => $this->judul,
            'slug' => $this->slug,
            'deskripsi' => $this->deskripsi,
            // 'gambar' => $this->gambar ? Storage::disk('s3')->url($this->gambar) : null,
            'gambar' => $this->gambar && Storage::disk('s3')->exists($this->gambar)
            ? Storage::disk('s3')->url($this->gambar)
            : asset('/images/logo-baru.png'),
            'tanggal' => $this->tanggal,
            'created_at' => $this->created_at
                ? $this->created_at->translatedFormat('l, d F Y')
                : null,
            'updated_at' => $this->updated_at
                ? $this->updated_at->translatedFormat('l, d F Y')
                : null,

            // ✅ relasi media
            'media' => PublikasiMediaResource::collection(
                $this->whenLoaded('media')
            ),
        ];
    }
}
