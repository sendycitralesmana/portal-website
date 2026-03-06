<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TugasFungsiSeeder extends Seeder
{
    public function run(): void
    {
        $data = [

            /*
            |--------------------------------------------------------------------------
            | KEWENANGAN
            |--------------------------------------------------------------------------
            */

            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Meminta keterangan secara lisan dan / atau tertulis dari pemohon dan pihak lain yang terkait dengan permohonan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Menelaah keterangan, surat, dan/atau dokumen yang terkait untuk mendapatkan kebenaran atas permohonan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Meminta salinan atau fotokopi surat dan/atau dokumen terkait yang diperlukan dari instansi manapun untuk memeriksa laporan pemohon sesuai dengan ketentuan peraturan perundang-undangan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Meminta informasi perkembangan kasus dari penegak hukum', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Mengubah identitas terlindung sesuai dengan ketentuan peraturan perundang-undangan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Mengelola rumah aman', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memindahkan atau merelokasi terlindung ke tempat yang lebih aman', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Melakukan pengamanan dan pengawalan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Melakukan pendampingan Saksi dan/atau Korban dalam proses peradilan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Melakukan penilaian ganti rugi dalam pemberian Restitusi dan Kompensasi', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | SUBJEK TERLINDUNG
            |--------------------------------------------------------------------------
            */

            ['kategori' => 'subjek terlindung', 'judul' => 'saksi', 'deskripsi' => 'Orang yang dapat memberikan keterangan guna kepentingan penyelidikan, penyidikan, penuntutan dan pemeriksaan di sidang pengadilan tentang suatu tindak pidana yang ia dengar sendiri, ia lihat sendiri, dan/atau ia alami sendiri termasuk pula orang yang dapat memberikan keterangan yang berhubungan dengan suatu perkara pidana meskipun tidak ia dengar sendiri, tidak ia lihat sendiri dan tidak ia alami sendiri, sepanjang keterangan orang itu berhubungan dengan tindak pidana.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'subjek terlindung', 'judul' => 'korban', 'deskripsi' => 'Orang yang mengalami penderitaan fisik, mental, dan/atau kerugian ekonomi yang diakibatkan oleh suatu tindak pidana.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'subjek terlindung', 'judul' => 'saksi pelaku', 'deskripsi' => 'Tersangka, terdakwa, atau terpidana yang bekerja sama dengan penegak hukum untuk mengungkap suatu tindak pidana dalam kasus yang sama.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'subjek terlindung', 'judul' => 'pelapor', 'deskripsi' => 'Orang yang memberikan laporan, informasi, atau keterangan kepada penegak hukum mengenai tindak pidana yang akan, sedang, atau telah terjadi.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'subjek terlindung', 'judul' => 'ahli', 'deskripsi' => 'Orang yang memiliki keahlian di bidang tertentu yang diperlukan untuk membuat terang suatu perkara pidana guna kepentingan penyidikan, penuntutan, dan pemeriksaan di sidang pengadilan.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | TINDAK PIDANA TERTENTU
            |--------------------------------------------------------------------------
            */

            ['kategori' => 'tindak pidana tertentu', 'judul' => 'terorisme', 'deskripsi' => 'Perbuatan yang menggunakan kekerasan atau ancaman kekerasan...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'pelanggaran ham berat', 'deskripsi' => 'Pelanggaran hak asasi manusia yang berat meliputi kejahatan genosida...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'korupsi', 'deskripsi' => 'Setiap orang yang secara melawan hukum melakukan perbuatan memperkaya diri...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'pencucian uang', 'deskripsi' => 'Menempatkan, mentransfer, mengalihkan, membelanjakan, membayarkan...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'narkoba', 'deskripsi' => 'Zat atau obat yang berasal dari tanaman atau bukan tanaman, baik sintetis...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'perdagangan manusia', 'deskripsi' => 'Tindakan perekrutan, pengangkutan, penampungan, pengiriman, pemindahan...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'kekerasan seksual pada anak', 'deskripsi' => 'Kekerasan adalah setiap perbuatan terhadap Anak yang berakibat...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'penyiksaan', 'deskripsi' => 'Tindakan dengan sengaja dan melawan hukum menimbulkan kesakitan...', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'penganiayaan berat', 'deskripsi' => 'Penganiayaan yang menyebabkan timbulnya dampak luka berat.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            /*
            |--------------------------------------------------------------------------
            | PROGRAM PERLINDUNGAN
            |--------------------------------------------------------------------------
            */

            ['kategori' => 'program perlindungan', 'judul' => 'perlindungan fisik', 'deskripsi' => 'Pengamanan dan pengawalan, penempatan di rumah aman, mendapat identitas baru, bantuan medis dan pemberian kesaksian tanpa hadir langsung di pengadilan, bantuan rehabilitasi psiko-sosial.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'program perlindungan', 'judul' => 'perlindungan prosedural', 'deskripsi' => 'Pendampingan, mendapat penerjemah, informasi perkembangan kasus, penggantian biaya transportasi, nasihat hukum, bantuan biaya hidup sementara sesuai Pasal 5 UU 13/2006.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'program perlindungan', 'judul' => 'perlindungan hukum', 'deskripsi' => 'Saksi, Korban, Saksi Pelaku, dan/atau Pelapor tidak dapat dituntut secara hukum atas kesaksian/laporan yang diberikan dengan iktikad baik.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'program perlindungan', 'judul' => 'bantuan medis, psikologis, dan psikososial', 'deskripsi' => 'Bantuan medis untuk korban, rehabilitasi psikologis untuk trauma, dan bantuan psikososial untuk pemulihan sosial-spiritual termasuk pendidikan dan pekerjaan.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

            ['kategori' => 'program perlindungan', 'judul' => 'fasilitasi restitusi dan kompensasi', 'deskripsi' => 'Restitusi diberikan oleh pelaku kepada korban, sedangkan kompensasi diberikan oleh negara jika pelaku tidak mampu mengganti kerugian.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
        ];

        DB::table('tugas_fungsis')->insert($data);
    }
}