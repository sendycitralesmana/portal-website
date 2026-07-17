<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\DraftMigrasi;
use App\Models\Drafts;
use App\Models\Publikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DraftRedesignBackController extends Controller
{
    public function index()
    {
        $drafts = DraftMigrasi::get();
        $publikasi = Publikasi::where("judul", "Kekerasan Fisik Ancam Pelapor Tindak Pidana")->get();
        dd($publikasi);
        return $drafts->count();
    }

    public function updateGambar()
{
    $gambars = Publikasi::whereNotNull('gambar')
        ->whereBetween('created_at', [
            // '2026-03-06 07:00:01.371',
            // '2026-07-17 23:27:18.472',
            '2021-07-10 00:00:01.371',
            '2026-07-15 23:27:18.472',
        ])
        ->get();

    $hasil = [];
    $totalDitemukan = $gambars->count();
    $totalDiubah = 0;
    $totalTidakDiubah = 0;

    foreach ($gambars as $gambar) {
        $before = $gambar->gambar;
        $after = str_replace(':', '_', $before);

        $status = 'Tidak Diubah';

        if ($before !== $after) {
            $gambar->update([
                'gambar' => $after,
            ]);

            $status = 'Diubah';
            $totalDiubah++;
        } else {
            $totalTidakDiubah++;
        }

        $hasil[] = [
            'id' => $gambar->id,
            'status' => $status,
            'before' => $before,
            'after' => $after,
        ];
    }

    return response()->json([
        'summary' => [
            'total_ditemukan' => $totalDitemukan,
            'total_diubah' => $totalDiubah,
            'total_tidak_diubah' => $totalTidakDiubah,
        ],
        'data' => $hasil,
    ]);
}

    // public function index()
    // {
    //     $drafts = Drafts::whereBetween('created_at', [
    //         '2026-03-06 00:00:01.371',
    //         '2026-07-17 23:27:18.472',
    //     ])->get();

    //     return $drafts->count();
    // }

    public function updateSubCategoryId()
    {
        DB::statement("
            UPDATE draft_migrasi
            SET sub_category_id = CASE
                WHEN sub_category_id = 'clraagrvb000465qnvw0ow74x' THEN 'Siaran Pers'
                WHEN sub_category_id = 'clraagrvb000565qndqsna2jl' THEN 'Warta Hukum'
                WHEN sub_category_id = 'clraaing4000665qn0noxy2wy' THEN 'Buku'
                WHEN sub_category_id = 'clraaing4000765qnuds8ikvo' THEN 'Buletin'
                WHEN sub_category_id = 'clraaing4000865qni24k6uov' THEN 'Jurnal'
                WHEN sub_category_id = 'clraaing4000965qnpode082g' THEN 'Artikel'
                WHEN sub_category_id = 'clraaing4000a65qnlyf06ngu' THEN 'Informasi'
                WHEN sub_category_id = 'clraaing4000b65qnelywc34t' THEN 'Kegiatan'
                WHEN sub_category_id = 'clraaing4000c65qnhslrc8q8' THEN 'Kalender Kegiatan'
                WHEN sub_category_id = 'clraaing4000d65qnqdxshbh6' THEN 'Galeri'
                WHEN sub_category_id = 'clraaing4000e65qnj58dpckt' THEN 'Video'
                WHEN sub_category_id = 'clraaing4000f65qnfb0944sd' THEN 'Laporan'
                WHEN sub_category_id = 'clrem6low000013t2t8moj80g' THEN 'Undang Undang Terkait'
                WHEN sub_category_id = 'clrem6low000113t2mw9nrgx4' THEN 'Peraturan Pemerintah'
                WHEN sub_category_id = 'clrem6low000213t2m73pnsh7' THEN 'Peraturan Presiden'
                WHEN sub_category_id = 'clrem6low000313t2xb2aagvz' THEN 'Perma'
                WHEN sub_category_id = 'clrem6low000413t2y0ugrp14' THEN 'Peraturan Lain'
                WHEN sub_category_id = 'clrem6low000513t2svbzdhne' THEN 'Peraturan LPSK'
                WHEN sub_category_id = 'clrem6low000613t25rh52bdy' THEN 'Peraturan dan Keputusan Ketua LPSK'
                WHEN sub_category_id = 'clrem6low000713t2t32q21ey' THEN 'Peraturan dan Keputusan Sekjen LPSK'
                WHEN sub_category_id = 'clrfs1kkm0000d7uye6kqmzuw' THEN 'Instansi Aparat Penegak Hukum'
                WHEN sub_category_id = 'clrfs1kkm0001d7uyaziewsep' THEN 'Instansi Umum'
                WHEN sub_category_id = 'clrfs1kkm0002d7uyszksr2kt' THEN 'Internasional'
                WHEN sub_category_id = 'clrfs1kkm0003d7uypnx8qif8' THEN 'Kesehatan'
                WHEN sub_category_id = 'clrfs1kkm0004d7uyn1kt51wo' THEN 'Pendidikan'
                WHEN sub_category_id = 'clrfs1kkm0005d7uydz981cvr' THEN 'LSM/Pers'
                WHEN sub_category_id = 'clrfsr1mu0006d7uy44p8pjtc' THEN 'Standar Pelayanan Pemerintah Permohonan'
                WHEN sub_category_id = 'clrfsr1mu0007d7uycmjgxjrd' THEN 'Standar Pelayanan Proaktif dan Darurat'
                WHEN sub_category_id = 'clrfsr1mu0008d7uydois308o' THEN 'Standar Pelayanan Informasi Publik'
                WHEN sub_category_id = 'clrfsr1mu0009d7uyhcrdw1zu' THEN 'Standar Pelayanan dan Pemenuhan Hak'
                WHEN sub_category_id = 'clrj7sqfs000113d8rffmeiya' THEN 'Standar Pelayanan Penerimaan Permohonan'
                WHEN sub_category_id = 'lpsk-berita-berita' THEN 'Berita'
                ELSE sub_category_id
            END
        ");

        return response()->json([
            "message" => "Sub category berhasil disesuaikan"
        ]);
    }

    public function migratePublikasi()
    {
        $inserted = 0;

        DraftMigrasi::orderBy('id')
            ->chunk(500, function ($drafts) use (&$inserted) {

                $dataInsert = [];
                $slugCache = [];

                foreach ($drafts as $draft) {

                    $baseSlug = Str::slug(strtolower($draft->title), '-');
                    $slug = $baseSlug;
                    $counter = 1;

                    while (
                        DB::table('publikasi_migrasi')->where('slug', $slug)->exists()
                        || in_array($slug, $slugCache)
                    ) {
                        $slug = $baseSlug . '-' . $counter;
                        $counter++;
                    }

                    $slugCache[] = $slug;

                    $dataInsert[] = [
                        'jenis' => $draft->category_id ? $draft->category_id : 'LPSK-BERITA',
                        'kategori' => $draft->sub_category_id,
                        'judul' => $draft->title,
                        'slug' => $slug,
                        'deskripsi' => $draft->content ? $draft->content : '-',
                        'gambar' => $draft->thumbnail ? 'publikasi/' . $draft->thumbnail : null,
                        'tanggal' => $draft->published_at,
                        'created_at' => $draft->created_at,
                        'updated_at' => now(),
                    ];
                }

                DB::table('publikasi_migrasi')->insert($dataInsert);

                $inserted += count($dataInsert);
            });

        return response()->json([
            'message' => 'Migrasi publikasi berhasil',
            'total_inserted' => $inserted
        ]);
    }

    public function updateGambarPublikasi()
    {
        $updated = DB::table('publikasi_migrasi')
            ->whereNotNull('gambar')
            ->where('gambar', 'not like', 'publikasi/%')
            ->whereBetween('created_at', [
                '2026-03-06 00:00:01',
                '2026-07-17 23:22:20',
            ])
            ->update([
                'gambar' => DB::raw("CONCAT('publikasi/', gambar)"),
            ]);

        return response()->json([
            'message' => 'Path gambar berhasil diperbarui',
            'total_updated' => $updated,
        ]);
    }

    public function updateKategoriPublikasi()
    {
        $updated = DB::table('publikasi_migrasi')
            ->where('kategori', 'Informasi')
            ->whereBetween('created_at', [
                '2026-03-06 00:00:01',
                '2026-07-17 23:22:20',
            ])
            ->update([
                'kategori' => 'Pengumuman',
            ]);

        return response()->json([
            'message' => 'Kategori publikasi berhasil diperbarui',
            'total_updated' => $updated,
        ]);
    }

    // public function updateGambarPublikasi()
    // {
    //     $updated = DB::update("
    //         UPDATE publikasis
    //         SET gambar = CONCAT('publikasi/', gambar)
    //         WHERE gambar IS NOT NULL
    //         AND gambar NOT LIKE 'publikasi/%'
    //     ");

    //     return response()->json([
    //         'message' => 'Path gambar berhasil diperbarui',
    //         'total_updated' => $updated
    //     ]);
    // }

    // public function updateKategoriPublikasi()
    // {
    //     $updated = DB::table('publikasis')
    //         ->where('kategori', 'Informasi')
    //         ->update([
    //             'kategori' => 'Pengumuman'
    //         ]);

    //     return response()->json([
    //         'message' => 'Kategori publikasi berhasil diperbarui',
    //         'total_updated' => $updated
    //     ]);
    // }
}
