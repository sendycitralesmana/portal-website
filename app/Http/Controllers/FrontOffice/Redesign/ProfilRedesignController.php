<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
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
            ->orderBy('created_at', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/profil/profil-pimpinan', [
            'profilPimpinans' => $profilPimpinans
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
            ->get();
        $kepalaBiroLpsks = PejabatStruktural::query()
            ->where('kategori', 'kepala biro lpsk')
            ->get();
        $kepalaBagianLpsks = PejabatStruktural::query()
            ->where('kategori', 'kepala bagian lpsk')
            ->get();
        $kepalaPerwakilanLpskDaerahs = PejabatStruktural::query()
            ->where('kategori', 'kepala perwakilan lpsk daerah')
            ->get();
        $tenagaAhliLpsks = PejabatStruktural::query()
            ->where('kategori', 'tenaga ahli lpsk')
            ->get();
        return Inertia::render('frontoffice/redesign/profil/pejabat-struktural', [
            'sekretarisJenderals' => $sekretarisJenderals,
            'kepalaBiroLpsks' => $kepalaBiroLpsks,
            'kepalaBagianLpsks' => $kepalaBagianLpsks,
            'kepalaPerwakilanLpskDaerahs' => $kepalaPerwakilanLpskDaerahs,
            'tenagaAhliLpsks' => $tenagaAhliLpsks
        ]);
    }

    public function perwakilanDaerah()
    {
        $perwakilanDaerahs = PerwakilanDaerah::query()
            ->get();
        return Inertia::render('frontoffice/redesign/profil/perwakilan-daerah', [
            'perwakilanDaerahs' => $perwakilanDaerahs
        ]);
    }
}
