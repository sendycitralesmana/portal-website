<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Resources\LayananResource;
use App\Http\Resources\PublikasiResource;
use App\Models\Layanan;
use App\Models\Publikasi;
use App\Models\SosialMedia;
use App\Models\TentangKami;
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

    public function cari(Request $request)
    {
        $search = $request->search;

        if (!$search) {
            return response()->json([]);
        }

        $publikasis = Publikasi::query()
            ->select([
                'id',
                'judul',
                'slug',
                'kategori',
            ])
            ->where('judul', 'ILIKE', "%{$search}%")
            ->latest()
            ->limit(20)
            ->get();

        return response()->json($publikasis);
    }

    public function maklumat()
    {
        return Inertia::render('frontoffice/redesign/maklumat/page');
    }

    public function apiTentangKami()
    {
        $tentangKami = TentangKami::query()
            ->first();

        return response()->json($tentangKami);
    }

    public function ssk()
    {
        return Inertia::render('frontoffice/redesign/beranda/ssk', [
            
        ]);
    }

    public function beranda()
    {
        $siaranPers = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Siaran Pers')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
        );

        // $beritaFotos = PublikasiResource::collection(
        //     Publikasi::query()->with('media')
        //         ->where('kategori', 'Berita Foto')
        //         ->orderBy('created_at', 'desc')
        //         ->limit(5)
        //         ->get()
        // );

        $informasis = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Informasi')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
        );

        $beritas = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Berita')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
        );

        $pengumumans = PublikasiResource::collection(
            Publikasi::query()
                ->where('kategori', 'Pengumuman')
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get()
        );

        $videoInfos = VideoInfo::query()
            ->orderBy('judul', 'desc')
            ->get();

        // $layanans = Layanan::query()
        //     ->orderBy('id', 'asc')
        //     ->get();

        $layanans = LayananResource::collection(
            Layanan::query()
                ->orderBy('id', 'asc')
                ->get()
        );

        $sosialMedias = SosialMedia::query()
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('frontoffice/redesign/beranda/page', [
            'sosialMedias' => $sosialMedias,
            'layanans' => $layanans,
            'videoInfos' => $videoInfos,
            'siaranPers' => $siaranPers,
            'informasis' => $informasis,
            'beritas' => $beritas,
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
            'informasi' => 'Informasi',
            'siaran-pers' => 'Siaran Pers',
            'berita-foto' => 'Berita Foto',
            'berita' => 'Berita',
            'pengumuman' => 'Pengumuman',
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
        $publikasis = Publikasi::query()->with('media')
            ->where('kategori', "Berita Foto")

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

        return Inertia::render('frontoffice/redesign/publikasi/berita-foto/page', [

            'publikasis' => PublikasiResource::collection($publikasis),

            'state' => [
                'search' => request()->search ?? '',
                'page' => request()->page ?? 1,
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function beritaFotoSlug($slug)
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

        return Inertia::render('frontoffice/redesign/publikasi/berita-foto/detail', [
            'kategori' => "Berita Foto",
            'publikasi' => new PublikasiResource($publikasi),
            'publikasiTerkaits' => PublikasiResource::collection($publikasiTerkaits),
        ]);
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
