<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TentangKamiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tentang_kamis')->insert([
            'alamat' => 'Jl. Raya Bogor KM.24 No.47-49, RT.6/RW.1, Susukan, Kec. Ciracas, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13750',
            'telepon' => '(021) 2968-1560',
            'hotline' => '1500-148',
            'whatsapp' => '+62 857-700-10048',
            'email' => 'lpsk_ri@lpsk.go.id',
            'jam_operasional' => "Senin - Kamis : 08.00 - 16.30\nJumat : 08.00 - 17.00",
            'latitude' => '-6.31484021454712',
            'longitude' => '106.86403769558184',
            'gambar' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}