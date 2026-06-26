<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PejabatStrukturalResource extends JsonResource
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
            'kategori' => $this->kategori,
            'nama' => $this->nama,
            'jabatan' => $this->jabatan,
            'deskripsi' => $this->deskripsi,
            'foto' => $this->foto ? Storage::disk('s3')->url($this->foto) : null,
            'created_at' => $this->created_at
                ? $this->created_at->translatedFormat('l, d F Y')
                : null,
            'updated_at' => $this->updated_at
                ? $this->updated_at->translatedFormat('l, d F Y')
                : null,
        ];
    }
}
