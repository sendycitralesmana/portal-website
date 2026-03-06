<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TentangKamiResource extends JsonResource
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
            'alamat' => $this->alamat,
            'telepon' => $this->telepon,
            'whatsapp' => $this->whatsapp,
            'email' => $this->email,
            'jam_operasional' => $this->jam_operasional,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'gambar' => $this->gambar ? Storage::disk('s3')->url($this->gambar) : null,
            'created_at' => $this->created_at
                ? $this->created_at->translatedFormat('l, d F Y')
                : null,
            'updated_at' => $this->updated_at
                ? $this->updated_at->translatedFormat('l, d F Y')
                : null,
        ];
    }
}
