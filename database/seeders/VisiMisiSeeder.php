<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VisiMisiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('visi_misis')->insert([
            [
                'kategori' => 'visi',
                'deskripsi' => '“Terwujudnya perlindungan saksi dan korban dalam sistem peradilan pidana”

Visi ini mengandung maksud bahwa LPSK yang diberikan mandat oleh undang-undang selaku focal point dalam pemberian perlindungan saksi dan korban harus mampu mewujudkan suatu kondisi dimana saksi dan korban benar-benar merasa terlindungi dan dapat mengungkap kasus dalam peradilan pidana.',
                'gambar' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'misi',
                'deskripsi' => 'Dalam rangka mewujudkan visi di atas, Lembaga Saksi dan Korban memiliki misi sebagai berikut :

1. Mewujudkan perlindungan dan pemenuhan hak-hak bagi saksi dan korban dalam peradilan pidana.
2. Mewujudkan kelembagaan yang profesional dalam memberikan perlindungan dan pemenuhan hak-hak bagi saksi dan korban.
3. Memperkuat landasan hukum dan kemampuan dalam pemenuhan hak-hak saksi dan korban.
4. Mewujudkan dan mengembangkan jejaring dengan para pemangku kepentingan dalam rangka pemenuhan hak saksi dan korban.
5. Mewujudkan kondisi yang kondusif serta partisipasi masyarakat dalam perlindungan saksi dan korban.',
                'gambar' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}