<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LayananSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('layanans')->insert([
            [
                'judul' => 'JDIH',
                'deskripsi' => 'Jaringan Dokumentasi dan Informasi Hukum',
                'gambar' => null,
                'link' => 'https://robinops.bareskrim.polri.go.id/Account/Login?ReturnUrl=%2F',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'judul' => 'PPID',
                'deskripsi' => 'Pejabat Pembina Informasi dan Dokumentasi',
                'gambar' => null,
                'link' => 'https://cms-publik.kejaksaan.go.id/',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'judul' => 'SSK',
                'deskripsi' => 'Sahabat Saksi Korban',
                'gambar' => null,
                'link' => 'https://ssk.lpsk.go.id/',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'judul' => 'FONDASI',
                'deskripsi' => 'Tingkat Lanjut Keputusan Rekomendasi',
                'gambar' => null,
                'link' => 'https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'judul' => 'SIMPUSAKA',
                'deskripsi' => 'Sistem Informasi Perlindungan Saksi dan Korban',
                'gambar' => null,
                'link' => 'https://ssk.lpsk.go.id/',
                'created_at' => now(),
                'updated_at' => now(),
            ],

            [
                'judul' => 'OPERA',
                'deskripsi' => 'Opini Penyusunan Peraturan di Lingkungan',
                'gambar' => null,
                'link' => 'https://hukum.lpsk.go.id/',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
