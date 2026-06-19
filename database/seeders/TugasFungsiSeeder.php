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
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Meminta keterangan secara lisan dan/atau tertulis, surat, dan/atau dokumen yang terkait untuk mendapatkan kebenaran atas permohonan dari pemohon dan pihak lain yang terkait dengan permohonan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Menelaah keterangan, surat, dan/atau dokumen terkait untuk mendapatkan kebenaran atas permohonan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Meminta salinan surat dan/atau dokumen terkait yang diperlukan dari instansi manapun untuk memeriksa laporan pemohon sesuai dengan ketentuan peraturan perundang-undangan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Meminta informasi perkembangan kasus dari penegak hukum', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Mengubah identitas terlindung sesuai dengan ketentuan peraturan perundang-undangan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Mengelola dan menentukan standar rumah aman', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memindahkan atau merelokasi terlindung ke tempat yang lebih aman', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Melakukan pengamanan dan pengawalan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Melakukan pendampingan pihak terlindung dalam proses peradilan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Melakukan penilaian ganti rugi dalam pemberian Restitusi dan Kompensasi kepada Korban', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memberikan surat penetapan Saksi Pelaku kepada aparat penegak hukum dan/atau instansi terkait yang berwenang', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memberikan rekomendasi dan permintaan kerja sama kepada instansi terkait yang berwenang untuk pemenuhan hak pihak terlindung', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Mengelola dan memanfaatkan dana bantuan korban tindak pidana kekerasan seksual sesuai dengan ketentuan peraturan perundang-undangan', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memanfaatkan Dana Abadi Korban', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memfasilitasi penyampaian pernyataan Korban atas dampak penderitaan yang dialaminya', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Mengelola fasilitas Pelindungan, pemulihan, pelatihan, dan analisis strategis pengetahuan Pelindungan pihak terlindung', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'kewenangan', 'judul' => null, 'deskripsi' => 'Memberikan peringatan kepada pelaku dan/atau pihak lain untuk menghentikan Ancamannya', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

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

            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Terorisme', 'deskripsi' => 'Terorisme bukan sekadar tindak kekerasan biasa, melainkan perbuatan yang sengaja menebar ketakutan dan teror yang meluas di tengah masyarakat. Tindak pidana ini berpotensi menimbulkan korban jiwa secara massal dan menargetkan kehancuran pada objek vital strategis, lingkungan, maupun fasilitas publik/internasional. Motivasi di baliknya sangat spesifik, yakni didorong oleh ideologi, politik, atau tujuan gangguan keamanan yang mengancam kedaulatan.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Pelanggaran HAM yang Berat', 'deskripsi' => 'Tindak pidana ini adalah kejahatan paling serius yang mencederai martabat manusia, yang terbagi menjadi dua bentuk utama:
·	Kejahatan Genosida: Upaya sistematis yang dilakukan dengan niat khusus untuk menghancurkan atau memusnahkan secara menyeluruh maupun sebagian dari suatu kelompok bangsa, ras, etnis, atau kelompok agama.
·	Kejahatan terhadap Kemanusiaan: Serangan yang dilakukan secara meluas atau sistematis yang secara sadar ditujukan langsung kepada warga sipil yang tidak bersenjata. ', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Korupsi', 'deskripsi' => 'Korupsi adalah kejahatan kerah putih (white-collar crime) di mana seseorang secara melawan hukum menyalahgunakan wewenang untuk memperkaya diri sendiri, orang lain, atau korporasi. Tindak pidana ini sangat destruktif karena secara langsung merugikan sistem keuangan negara dan melumpuhkan roda perekonomian bangsa, yang pada akhirnya merampas hak-hak ekonomi dan sosial masyarakat luas.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Tindak Pidana Pencucian Uang (TPPU)', 'deskripsi' => 'Pencucian uang adalah serangkaian manuver untuk "membersihkan" harta kekayaan yang merupakan hasil tindak kejahatan (seperti hasil korupsi, narkoba, dsb). Ini dilakukan melalui penempatan, pentransferan, pembelanjaan, hingga pengubahan bentuk atau pertukaran mata uang, dengan tujuan agar harta haram tersebut seolah-olah terlihat sebagai aset yang sah di mata hukum.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Tindak Pidana Perdagangan Orang (TPPO)', 'deskripsi' => 'Kejahatan ini merupakan bentuk eksploitasi manusia yang memprihatinkan. Prosesnya mencakup perekrutan, pengangkutan, penampungan, atau penerimaan seseorang melalui cara-cara terlarang: ancaman, kekerasan, penculikan, penipuan, penjeratan utang, hingga penyalahgunaan posisi rentan. Tujuannya hanya satu, baik di dalam maupun lintas negara, yaitu untuk mengeksploitasi korban demi keuntungan pihak yang memegang kendali.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Narkotika dan Psikotropika', 'deskripsi' => 'Tindak pidana ini berkaitan dengan penyalahgunaan zat atau obat (baik dari tanaman maupun bukan, sintetis atau semi-sintetis) yang mampu merusak susunan saraf pusat. Dampaknya meliputi penurunan atau perubahan kesadaran, hilangnya rasa nyeri, hingga memicu ketergantungan fisik dan psikologis yang parah (sebagaimana diatur dalam UU No. 35 Tahun 2009). Ini dikategorikan sebagai prioritas karena daya rusaknya yang masif terhadap generasi bangsa.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Tindak Pidana Kekerasan Seksual (TPKS)', 'deskripsi' => 'Tindak pidana ini mencakup segala bentuk perbuatan yang merendahkan, menghina, menyerang, dan/atau memobilisasi tubuh, fungsi reproduksi, atau seksualitas seseorang secara paksa. Kejahatan ini tidak lagi terbatas pada kekerasan fisik, melainkan meluas hingga kekerasan seksual non-fisik, pelecehan seksual berbasis elektronik (online), pemaksaan kontrasepsi, pemaksaan perkawinan, hingga perbudakan seksual.
Kasus ini menjadi prioritas utama negara karena korban kekerasan seksual kerap mengalami ketimpangan relasi kuasa yang ekstrem, stigma sosial yang menyudutkan dari lingkungan sekitar, serta trauma psikologis mendalam. Kehadiran LPSK dalam ranah ini sangat vital untuk menjamin hak korban atas penanganan, pelindungan, dan pemulihan (restitusi) tanpa adanya intimidasi atau kriminalisasi balik dari pelaku.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Tindak Pidana Kekerasan Seksual Anak (TPKSA)', 'deskripsi' => 'Ini adalah bentuk kejahatan paling keji terhadap kelompok paling rentan. Tindak pidana ini mencakup segala perbuatan yang menimbulkan kesengsaraan fisik, psikis, seksual, hingga penelantaran terhadap anak. Di dalamnya juga termasuk ancaman pemaksaan dan perampasan kemerdekaan anak secara melawan hukum (merujuk pada UU Perlindungan Anak). Trauma yang ditimbulkan sangat mendalam sehingga kehadiran negara untuk melindungi korban mutlak diperlukan.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Penyiksaan', 'deskripsi' => 'Penyiksaan secara hukum didefinisikan sebagai perbuatan yang dilakukan dengan sengaja dan melawan hukum sehingga menimbulkan kesakitan atau penderitaan yang berat, baik secara fisik maupun mental, terhadap seseorang.
Secara spesifik, tindak pidana ini ditekankan apabila perbuatan tersebut dilakukan oleh pejabat publik (atau atas persetujuan/hasutannya) terhadap seorang tahanan atau individu yang berada di bawah pengawasan pihak berwenang. Tujuannya meliputi upaya untuk memperoleh pengakuan, keterangan, memberikan penghukuman, hingga intimidasi. Definisi yuridis ini menjadi dasar kuat bagi LPSK untuk hadir memberikan pelindungan maksimal bagi korban dari ancaman penyalahgunaan wewenang aparat hukum atau pihak yang memiliki otoritas.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Penganiayaan Berat', 'deskripsi' => 'Tindak pidana ini adalah bentuk kekerasan interpersonal tingkat tinggi. Penganiayaan berat difokuskan pada tindakan-tindakan penganiayaan yang eskalasinya secara nyata menyebabkan dampak luka berat, cacat fisik, atau ancaman kehilangan nyawa pada korbannya.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Tindak Pidana Lingkungan dan Kehutanan', 'deskripsi' => 'Tindak pidana ini mencakup segala bentuk perbuatan melawan hukum yang secara sengaja atau karena kelalaian besar mengakibatkan pencemaran dan perusakan lingkungan hidup. Kejahatan ini masuk dalam prioritas karena dampaknya bersifat jangka panjang dan mengancam kesehatan publik serta hak generasi masa depan. Mengingat pelakunya sering kali merupakan korporasi besar dengan kekuatan finansial yang kuat, para saksi, ahli, atau pejuang lingkungan (whistleblower) yang membongkar kasus ini kerap menghadapi intimidasi dan gugatan balik yang masif.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],
            ['kategori' => 'tindak pidana tertentu', 'judul' => 'Tindak Pidana Lain', 'deskripsi' => 'Tindak Pidana lain yang mengakibatkan posisi Pihak Terlindung dihadapkan pada Ancaman, situasi khusus, dan/atau situasi membahayakan jiwanya. Poin ini menjadi bukti nyata bahwa esensi tertinggi dari prioritas perlindungan negara adalah keselamatan manusia, melampaui batasan kaku dari sekadar label atau pasal hukumnya.', 'gambar' => null, 'created_at' => now(), 'updated_at' => now()],

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