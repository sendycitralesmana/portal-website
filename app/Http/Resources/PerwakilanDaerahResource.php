<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PerwakilanDaerahResource extends JsonResource
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
            'kantor' => $this->kantor,
            'alamat' => $this->alamat,
            'telepon' => $this->telepon,
            'email' => $this->email,
            'whatsapp' => $this->whatsapp,
            'twitter' => $this->twitter,
            'tiktok' => $this->tiktok,
            'youtube' => $this->youtube,
            'instagram' => $this->instagram,
            'gambar' => $this->gambar ? Storage::disk('s3')->url($this->gambar) : null,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'lokasi' => $this->lokasi,
            'maps' => $this->maps,
            'link' => $this->link,
            'created_at' => $this->created_at
                ? $this->created_at->translatedFormat('l, d F Y')
                : null,
            'updated_at' => $this->updated_at
                ? $this->updated_at->translatedFormat('l, d F Y')
                : null,
        ];
    }
}
