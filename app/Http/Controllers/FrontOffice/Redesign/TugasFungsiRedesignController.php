<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Models\TugasFungsi;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TugasFungsiRedesignController extends Controller
{
    public function kewenangan()
    {
        $kewenangans = TugasFungsi::query()
            ->where('kategori', 'kewenangan')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/kewenangan', [
            'kewenangans' => $kewenangans
        ]);
    }

    public function subjekTerlindung()
    {
        $subjekTerlindungs = TugasFungsi::query()
            ->where('kategori', 'subjek terlindung')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/subjek-terlindung', [
            'subjekTerlindungs' => $subjekTerlindungs
        ]);
    }

    public function tindakPidanaTertentu()
    {
        $tindakPidanaTertentus = TugasFungsi::query()
            ->where('kategori', 'tindak pidana tertentu')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/tindak-pidana-tertentu', [
            'tindakPidanaTertentus' => $tindakPidanaTertentus
        ]);
    }

    public function programPerlindungan()
    {
        $programPerlindungans = TugasFungsi::query()
            ->where('kategori', 'program perlindungan')
            ->get();
        return Inertia::render('frontoffice/redesign/tugas-fungsi/program-perlindungan', [
            'programPerlindungans' => $programPerlindungans
        ]);
    }
}
