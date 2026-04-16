<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Resources\PublikasiResource;
use App\Models\Publikasi;
use App\Models\SosialMedia;
use App\Models\VideoInfo;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BerandaRedesignController extends Controller
{
    public function index()
    {
        return redirect()->route('redesign.maklumat');
    }

    public function maklumat()
    {
        return Inertia::render('frontoffice/redesign/maklumat/page');
    }

    public function beranda()
    {
        $siaranPers = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Siaran Pers')
                ->orderBy('created_at', 'desc')
                ->limit(4)
                ->get()
        );

        $beritaFotos = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Berita')
                ->orderBy('created_at', 'asc')
                ->limit(4)
                ->get()
        );

        $beritaKegiatans = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Berita')
                ->orderBy('created_at', 'asc')
                ->limit(4)
                ->get()
        );

        $pengumumans = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Informasi')
                ->orderBy('created_at', 'asc')
                ->limit(4)
                ->get()
        );

        $videoInfos = VideoInfo::query()
            ->orderBy('judul', 'desc')
            ->get();

        $sosialMedias = SosialMedia::query()
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('frontoffice/redesign/beranda/page', [
            'sosialMedias' => $sosialMedias,
            'videoInfos' => $videoInfos,
            'siaranPers' => $siaranPers,
            'beritaFotos' => $beritaFotos,
            'beritaKegiatans' => $beritaKegiatans,
            'pengumumans' => $pengumumans,
        ]);
    }

    public function sosialMedia()
    {
        $sosialMedias = SosialMedia::query()
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('frontoffice/redesign/publikasi/sosial-media', [
            'sosialMedias' => $sosialMedias,
        ]);
    }

    public function statistik()
    {
        return Inertia::render('frontoffice/redesign/publikasi/statistik');
    }

    public function gpr()
    {
        return Inertia::render('frontoffice/redesign/beranda/gpr');
    }

    public function publikasiKategori($kategori)
    {
        $kategoriMap = [
            'siaran-pers' => 'Siaran Pers',
            'berita-kegiatan' => 'Berita Kegiatan',
            'berita-foto' => 'Berita',
            'pengumuman' => 'Informasi',
            'laporan' => 'Laporan',
            'kajian-jurnal' => 'Kajian dan Jurnal',
            'buku' => 'Buku',
        ];

        $kategoriDb = $kategoriMap[$kategori] ?? null;

        if (!$kategoriDb) {
            abort(404);
        }

        $publikasis = Publikasi::query()
            ->where('kategori', $kategoriDb)

            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('judul', 'ILIKE', "%{$value}%")
                    ->orWhere('deskripsi', 'ILIKE', "%{$value}%");
                });
            })

            ->orderBy('created_at', 'desc')

            ->paginate(request()->load ?? 10)
            ->withQueryString()

            ->through(function ($item) {
                $item->deskripsi = Str::limit(strip_tags($item->deskripsi), 370);
                return $item;
            });

        return Inertia::render('frontoffice/redesign/publikasi/kategori/page', [
            'kategori' => $kategori,

            'kategoriDb' => $kategoriDb,

            'publikasis' => PublikasiResource::collection($publikasis),

            'state' => [
                'search' => request()->search ?? '',
                'page' => request()->page ?? 1,
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function publikasiSlug($kategori, $slug)
    {
        $publikasi = Publikasi::with('media')
            ->where('slug', $slug)
            ->firstOrFail();

        $publikasiTerkaits = Publikasi::query()
        ->where('kategori', $publikasi->kategori)
        ->where('id', '!=', $publikasi->id)
        ->orderBy('created_at', 'desc')
        ->limit(4)
        ->get();

        return Inertia::render('frontoffice/redesign/publikasi/kategori/detail', [
            'kategori' => $kategori,
            'publikasi' => new PublikasiResource($publikasi),
            'publikasiTerkaits' => PublikasiResource::collection($publikasiTerkaits),
        ]);
    }

    // --------------------------------------------------------------------------------------


    public function publikasi()
    {
        return Inertia::render('frontoffice/redesign/publikasi/page');
    }

    public function publikasiDetail($id)
    {
        return Inertia::render('frontoffice/redesign/publikasi/detail', [
            'id' => $id,
        ]);
    }

    public function siaranPers()
    {
        return Inertia::render('frontoffice/redesign/publikasi/siaran-pers/page');
    }

    public function siaranPersDetail($id)
    {
        return Inertia::render('frontoffice/redesign/publikasi/siaran-pers/detail', [
            'id' => $id,
        ]);
    }

    public function beritaFoto()
    {
        return Inertia::render('frontoffice/redesign/publikasi/berita-foto/page');
    }

    public function beritaFotoDetail($id)
    {
        return Inertia::render('frontoffice/redesign/publikasi/berita-foto/detail', [
            'id' => $id,
        ]);
    }

    public function beritaFotoGaleri($id)
    {
        return Inertia::render('frontoffice/redesign/publikasi/berita-foto/galeri', [
            'id' => $id,
        ]);
    }
}