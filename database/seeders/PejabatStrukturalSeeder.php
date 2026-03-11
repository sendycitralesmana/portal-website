<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PejabatStrukturalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pejabatStrukturals = [
            [
                'kategori' => 'sekretaris jenderal',
                'nama' => 'Sriyana, S.H, LL.M, DFM',
                'jabatan' => 'sekretaris jenderal',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala biro lpsk',
                'nama' => 'Fifiana Fitri Amalia, S.E., M.E., Ak.',
                'jabatan' => 'kepala biro umum dan kepegawaian',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala biro lpsk',
                'nama' => 'Arief Suryadi, SE , M.Ak.',
                'jabatan' => 'kepala biro hukum, kerja sama dan humas',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala biro lpsk',
                'nama' => 'Dr. M. Ramdan, S.H., M.Si.',
                'jabatan' => 'kepala biro penelaahan permohonan',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala biro lpsk',
                'nama' => 'Dr. Roy Haris Oktabian, S.STP, M.Si',
                'jabatan' => 'kepala biro pemenuhan hak saksi dan korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala bagian lpsk',
                'nama' => 'Ida Swastika, S.E.',
                'jabatan' => 'kepala bagian pengawasan',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala bagian lpsk',
                'nama' => 'Dian Herdiansah',
                'jabatan' => 'kepala bagian kerumahtanggaan',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala perwakilan lpsk daerah',
                'nama' => 'Erlince Ully Artha Tobing, S.Sos., M.Si.',
                'jabatan' => 'kepala perwakilan lpsk medan',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala perwakilan lpsk daerah',
                'nama' => 'Novita Prima Dewi, S.IP',
                'jabatan' => 'kepala perwakilan lpsk yogyakarta',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala perwakilan lpsk daerah',
                'nama' => 'Asri Oktaviany Wahono, S.H.',
                'jabatan' => 'kepala perwakilan lpsk jawa tengah',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala perwakilan lpsk daerah',
                'nama' => 'Andri Umar Sidik, S.T.',
                'jabatan' => 'kepala perwakilan lpsk jawa timur',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'kepala perwakilan lpsk daerah',
                'nama' => 'Anselmus Sowa Bolen, S.E.',
                'jabatan' => 'kepala perwakilan lpsk nusa tenggara timur',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Abdanev Jopa C, S.H.',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Muhammad Busyrol Fuad, S.H., M.H',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Ali Nur Sahid, S.H.I., M.I.Kom',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Amalia Mahsunah, S.H.',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Rianto Wicaksono, S.H.',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Galih Prihanto Jati, S.E',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Syahrial Martanto Wiryawan, S.H',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'Yulisa Maharani, S.H., M.H.',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'kategori' => 'tenaga ahli lpsk',
                'nama' => 'M. Tommy Permana, S.Sos.',
                'jabatan' => 'tenaga ahli',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('pejabat_strukturals')->insert($pejabatStrukturals);
    }
}