<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PerwakilanDaerahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('perwakilan_daerahs')->insert([
            [
                'kantor' => 'Kantor Perwakilan LPSK Medan',
                'alamat' => 'Gedung Keuangan Negara, Jl. Pangeran Diponegoro No.30a, Madras Hulu, Kec. Medan Polonia, Kota Medan, Sumatera Utara 20152',
                'telepon' => '(061) 42007818',
                'email' => 'lpsk_ri@lpsk.go.id',
                'whatsapp' => '(061) 42007818',
                'twitter' => 'lpskperwakilanmedan',
                'tiktok' => 'lpskperwakilanmedan',
                'youtube' => 'lpskperwakilanmedan',
                'instagram' => 'lpskperwakilanmedan',
                'gambar' => null,
                'latitude' => '3.5794859979277636',
                'longitude' => '98.67193981480449',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kantor' => 'Kantor Perwakilan LPSK Yogyakarta',
                'alamat' => 'Jl. Kusumanegara No.11, Semaki, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55166',
                'telepon' => '(0274) 5019084',
                'email' => 'lpsk_ri@lpsk.go.id',
                'whatsapp' => '(0274) 5019084',
                'twitter' => 'lpskperwakilanyogyakarta',
                'tiktok' => 'lpskperwakilanyogyakarta',
                'youtube' => 'lpskperwakilanyogyakarta',
                'instagram' => 'lpskperwakilanyogyakarta',
                'gambar' => null,
                'latitude' => '-7.801320219647797',
                'longitude' => '110.38330326767203',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kantor' => 'Kantor Perwakilan LPSK Jawa Tengah',
                'alamat' => 'Jl. Kusumanegara No.11, Semaki, Kec. Umbulharjo, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55166',
                'telepon' => '(0274) 5019084',
                'email' => 'lpsk_ri@lpsk.go.id',
                'whatsapp' => '(0274) 5019084',
                'twitter' => 'lpskperwakilanjawatengah',
                'tiktok' => 'lpskperwakilanjawatengah',
                'youtube' => 'lpskperwakilanjawatengah',
                'instagram' => 'lpskperwakilanjawatengah',
                'gambar' => null,
                'latitude' => '-7.632005468429076',
                'longitude' => '110.3398122090587',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kantor' => 'Kantor Perwakilan LPSK Jawa Timur',
                'alamat' => 'Jl. Indrapura No.5, Perak Tim., Kec. Pabean Cantian, Surabaya, Jawa Timur 60164',
                'telepon' => '(021) 2968-1560',
                'email' => 'lpsk_ri@lpsk.go.id',
                'whatsapp' => '(021) 2968-1560',
                'twitter' => 'lpskperwakilanjawatimur',
                'tiktok' => 'lpskperwakilanjawatimur',
                'youtube' => 'lpskperwakilanjawatimur',
                'instagram' => 'lpskperwakilanjawatimur',
                'gambar' => null,
                'latitude' => '-7.242188506340065',
                'longitude' => '112.7327378955902',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kantor' => 'Kantor Perwakilan LPSK Nusa Tenggara Timur',
                'alamat' => 'Jl. Basuki Rahmat, Naikolan, Kec. Maulafa, Kota Kupang, Nusa Tenggara Tim.',
                'telepon' => '(021) 2968-1560',
                'email' => 'lpsk_ri@lpsk.go.id',
                'whatsapp' => '(021) 2968-1560',
                'twitter' => 'lpskperwakilannusatenggaratimur',
                'tiktok' => 'lpskperwakilannusatenggaratimur',
                'youtube' => 'lpskperwakilannusatenggaratimur',
                'instagram' => 'lpskperwakilannusatenggaratimur',
                'gambar' => null,
                'latitude' => '-10.185509505639562',
                'longitude' => '123.60272531534318',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}