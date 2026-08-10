<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Resources\TugasFungsiResource;
use App\Models\TugasFungsi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TugasFungsiRedesignController extends Controller
{
    public function tugas()
    {
        return Inertia::render('frontoffice/redesign/tugas-fungsi/tugas', [
            
        ]);
    }

    public function fungsi()
    {
        // return Inertia::render('frontoffice/redesign/tugas-fungsi/fungsi', [
            
        // ]);

        $fungsis = TugasFungsi::query()
            ->where('kategori', 'fungsi')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/fungsi', [
            'fungsis' => TugasFungsiResource::collection($fungsis)
        ]);
    }

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

    public function tingkatKeseriusanTindakPidana()
    {
        $tindakPidanaTertentus = TugasFungsi::query()
            ->where('kategori', 'tindak pidana tertentu')
            ->orderBy('id', 'asc')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/tingkat-keseriusan-tindak-pidana', [
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
