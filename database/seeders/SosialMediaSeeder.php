<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SosialMediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sosial_medias')->insert([
            // =======================
            // INSTAGRAM
            // =======================
            [
                'platform' => 'instagram',
                'embed_url' => 'https://www.instagram.com/p/DVIv_ysEp8I/embed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'instagram',
                'embed_url' => 'https://www.instagram.com/p/DVU6M3FEga9/embed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'instagram',
                'embed_url' => 'https://www.instagram.com/p/DU7pPl_kmQX/embed',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'instagram',
                'embed_url' => 'https://www.instagram.com/p/DU5faBNEuvH/embed',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // =======================
            // TIKTOK
            // =======================
            [
                'platform' => 'tiktok',
                'embed_url' => 'https://www.tiktok.com/player/v1/7610720933950541063?controls=1&description=0&music_info=0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'tiktok',
                'embed_url' => 'https://www.tiktok.com/player/v1/7608470730887515400?controls=1&description=0&music_info=0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'tiktok',
                'embed_url' => 'https://www.tiktok.com/player/v1/7605542577844096274?controls=1&description=0&music_info=0',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'tiktok',
                'embed_url' => 'https://www.tiktok.com/player/v1/7605882599281560839?controls=1&description=0&music_info=0',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // =======================
            // YOUTUBE
            // =======================
            [
                'platform' => 'youtube',
                'embed_url' => 'https://www.youtube.com/embed/bXeuwlhv8N8',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'platform' => 'youtube',
                'embed_url' => 'https://www.youtube.com/embed/ScPAOgh6Klk',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}