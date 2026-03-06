<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SosialMediaResource extends JsonResource
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
            'platform' => $this->platform,
            'embed_url' => $this->embed_url,
            'created_at' => $this->created_at
                ? $this->created_at->translatedFormat('l, d F Y')
                : null,
            'updated_at' => $this->updated_at
                ? $this->updated_at->translatedFormat('l, d F Y')
                : null,
        ];
    }
}
