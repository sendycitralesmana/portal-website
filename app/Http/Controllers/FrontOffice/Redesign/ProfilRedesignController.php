<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Resources\PejabatStrukturalResource;
use App\Http\Resources\PerwakilanDaerahResource;
use App\Http\Resources\ProfilPimpinanResource;
use App\Http\Resources\StrukturOrganisasiResource;
use App\Models\ProfilPimpinan;
use App\Models\VisiMisi;
use App\Models\PejabatStruktural;
use App\Models\PerwakilanDaerah;
use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfilRedesignController extends Controller
{
    public function visiMisi()
    {
        $visiMisis = VisiMisi::query()
            ->orderBy('kategori', 'desc')
            ->get();
        return Inertia::render('frontoffice/redesign/profil/visi-misi', [
            'visiMisis' => $visiMisis
        ]);
    }

    public function profilPimpinan()
    {
        $profilPimpinans = ProfilPimpinan::query()
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/profil/profil-pimpinan', [
            'profilPimpinans' => $profilPimpinans
                ? ProfilPimpinanResource::collection($profilPimpinans)
                : null
        ]);
    }

    // public function strukturOrganisasi()
    // {
    //     $strukturOrganisasi = StrukturOrganisasi::query()
    //         ->first();
    //     return Inertia::render('frontoffice/redesign/profil/struktur-organisasi', [
    //         'strukturOrganisasi' => $strukturOrganisasi
    //     ]);
    // }

    public function strukturOrganisasi()
    {
        $strukturOrganisasi = StrukturOrganisasi::query()->first();

        return Inertia::render('frontoffice/redesign/profil/struktur-organisasi', [
            'strukturOrganisasi' => $strukturOrganisasi
                ? new StrukturOrganisasiResource($strukturOrganisasi)
                : null
        ]);
    }

    public function pejabatStruktural()
    {
        $sekretarisJenderals = PejabatStruktural::query()
            ->where('kategori', 'sekretaris jenderal')
            ->orderBy('id', 'asc')
            ->get();
        $kepalaBiroLpsks = PejabatStruktural::query()
            ->where('kategori', 'kepala biro lpsk')
            ->orderBy('id', 'asc')
            ->get();
        $kepalaBagianLpsks = PejabatStruktural::query()
            ->where('kategori', 'kepala bagian lpsk')
            ->orderBy('id', 'asc')
            ->get();
        $kepalaPerwakilanLpskDaerahs = PejabatStruktural::query()
            ->where('kategori', 'kepala perwakilan lpsk daerah')
            ->orderBy('id', 'asc')
            ->get();
        $tenagaAhliLpsks = PejabatStruktural::query()
            ->where('kategori', 'tenaga ahli lpsk')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/profil/pejabat-struktural', [
            'sekretarisJenderals' => PejabatStrukturalResource::collection($sekretarisJenderals),
            'kepalaBiroLpsks' => PejabatStrukturalResource::collection($kepalaBiroLpsks),
            'kepalaBagianLpsks' => PejabatStrukturalResource::collection($kepalaBagianLpsks),
            'kepalaPerwakilanLpskDaerahs' => PejabatStrukturalResource::collection($kepalaPerwakilanLpskDaerahs),
            'tenagaAhliLpsks' => PejabatStrukturalResource::collection($tenagaAhliLpsks)
        ]);
    }

    public function perwakilanDaerah()
    {
        $perwakilanDaerahs = PerwakilanDaerah::query()
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/profil/perwakilan-daerah', [
            'perwakilanDaerahs' => PerwakilanDaerahResource::collection($perwakilanDaerahs)
        ]);
    }
}
