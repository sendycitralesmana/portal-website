<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VideoInfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('video_infos')->insert([
            'judul' => 'Apa itu LPSK',
            'embed_url' => 'https://www.youtube.com/embed/bXeuwlhv8N8',
            'deskripsi' => 'Penjelasan tentang LPSK',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('video_infos')->insert([
            'judul' => 'Alur Permohonan',
            'embed_url' => 'https://www.youtube.com/embed/qcf7t9m4gvg',
            'deskripsi' => 'Tata cara permohonan di LPSK',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}