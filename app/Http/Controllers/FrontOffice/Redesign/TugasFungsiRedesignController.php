<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Resources\TugasFungsiResource;
use App\Models\TugasFungsi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TugasFungsiRedesignController extends Controller
{
    public function kewenangan()
    {
        $kewenangans = TugasFungsi::query()
            ->where('kategori', 'kewenangan')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/kewenangan', [
            'kewenangans' => TugasFungsiResource::collection($kewenangans)
        ]);
    }

    public function subjekTerlindung()
    {
        $subjekTerlindungs = TugasFungsi::query()
            ->where('kategori', 'subjek terlindung')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/subjek-terlindung', [
            'subjekTerlindungs' => TugasFungsiResource::collection($subjekTerlindungs)
        ]);
    }

    public function tindakPidanaTertentu()
    {
        $tindakPidanaTertentus = TugasFungsi::query()
            ->where('kategori', 'tindak pidana tertentu')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/tindak-pidana-tertentu', [
            'tindakPidanaTertentus' => TugasFungsiResource::collection($tindakPidanaTertentus)
        ]);
    }

    public function programPerlindungan()
    {
        $programPerlindungans = TugasFungsi::query()
            ->where('kategori', 'program perlindungan')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/program-perlindungan', [
            'programPerlindungans' => TugasFungsiResource::collection($programPerlindungans)
        ]);
    }
}
