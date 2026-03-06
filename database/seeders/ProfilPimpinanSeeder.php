<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProfilPimpinanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('profil_pimpinans')->insert([
            [
                'nama' => 'Brigjen. Pol. (Purn). Dr. Achmadi, S.H., M.A.P.',
                'deskripsi' => 'DR. Achmadi saat ini kembali terpilih sebagai anggota LPSK Periode 2024-2029. Lahir di Sragen, 20 September 1960, Ia merupakan lulusan AKABRI Tahun 1984, Perguruan Tinggi Ilmu Kepolisian (PTIK) angkatan 23, SESKOAU angkatan 35 tahun 1999, SESPATI Polri Dikreg 13 tahun 2007, dan PPSA 19 Lemhannas RI tahun 2013.

Achmadi menyelesaikan Program Studi Doktor Ilmu Administrasi di Universitas Brawijaya tahun 2010, Pascasarjana (S2) Ilmu Administrasi Publik Universitas Brawijaya tahun 2004, dan Sarjana Hukum Universitas Wisnuwardhana tahun 2004.

Pada periode pertama sebagai Wakil Ketua LPSK (2019-2024), Achmadi bertanggung jawab dalam penilaian restitusi dan kompensasi, perlindungan saksi dan korban, serta membidangi peraturan dan pengawasan internal.

Sebelumnya menjabat Direktur Penyidikan Sektor Jasa Keuangan OJK di Bareskrim Polri (2017-2018) dan berkarir 25 tahun di kepolisian dengan berbagai jabatan strategis.',
                'jabatan' => 'Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => '(Dr. iur.) Antonius PS Wibowo, S.H., M.H.',
                'deskripsi' => 'Antonius Prijadi Soesilo Wibowo terpilih kembali menjadi pimpinan LPSK periode 2024-2029. Lahir di Ponorogo, 10 Mei 1964. Meraih gelar S3 di Justus Liebig University of Giessen (2012), S2 Universitas Indonesia (2001), dan S1 Universitas Gadjah Mada (1989).

Pada periode 2019-2024 fokus pada Pemenuhan Hak Saksi dan Korban serta TPPO. Aktif dalam Gugus Tugas TPPO dan ASEAN-ACT.

Sebelumnya pengajar dan Dekan Fakultas Hukum Unika Atma Jaya Jakarta.',
                'jabatan' => 'Wakil Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Sri Suparyati, S.H., LL.M.',
                'deskripsi' => 'Sri Suparyati menjadi pimpinan LPSK periode 2024-2029. Lahir di Jakarta, 04 Agustus 1974. Lulusan S2 Hukum HULL University Inggris (2010) dan S1 UNKRIS Jakarta (1997).

Berpengalaman sebagai pendiri Lokataru, Deputi Koordinator KONTRAS, Treasurer AFAD, dan Direktur Eksekutif Omah Munir.

Aktif dalam advokasi HAM internasional dan pendampingan korban.',
                'jabatan' => 'Wakil Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Susilaningtias, S.H., M.H.',
                'deskripsi' => 'Susilaningtias kembali menjadi pimpinan LPSK periode 2024-2029. Lahir di Surabaya, 20 Oktober 1977. Lulusan S2 Universitas Indonesia (2021) dan S1 Universitas Brawijaya (2000).

Bergabung dengan LPSK sejak 2010, pernah menjadi Wakil Ketua periode 2019-2024.

Aktif menulis karya ilmiah terkait perlindungan saksi dan korban.',
                'jabatan' => 'Wakil Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Wawan Fahrudin, S. SOS., M.E.',
                'deskripsi' => 'Wawan Fahrudin pimpinan LPSK periode 2024-2029. Lahir di Kudus, 25 Mei 1980. Lulusan S2 Perencanaan Kebijakan Publik UI (2022) dan S1 Ilmu Politik UI (2004).

Sebelumnya Staf Khusus BP2MI, Tenaga Ahli UKP PIP/BPIP, Konsultan Bappenas, dan Staf Ahli DPD RI.',
                'jabatan' => 'Wakil Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Mahyudin, S.H., M.H.',
                'deskripsi' => 'Mahyudin pimpinan LPSK periode 2024-2029. Lahir di Bima, 8 Juni 1979. Lulusan S2 Hukum Tata Negara UI (2016) dan S1 Universitas Ibnu Chaldun (2006).

Sebelumnya advokat AHP Law Firm dan anggota Bawaslu DKI Jakarta (2018-2023).

Penulis buku Sengketa Proses Pemilu (2021).',
                'jabatan' => 'Wakil Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Sri Nurherwati, S.H.',
                'deskripsi' => 'Sri Nurherwati pimpinan LPSK periode 2024-2029. Lahir di Semarang, 30 Oktober 1968. Lulusan Fakultas Hukum UNTAG Semarang (1992).

Berpengalaman sebagai Komisioner Komnas Perempuan (2010-2019), Konsultan Komnas Perempuan, dan advokat.

Aktif dalam advokasi kasus kekerasan seksual dan hak restitusi korban.',
                'jabatan' => 'Wakil Ketua Lembaga Perlindungan Saksi dan Korban',
                'foto' => null,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}