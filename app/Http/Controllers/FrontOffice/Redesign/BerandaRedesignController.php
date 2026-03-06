<?php

namespace App\Http\Controllers\FrontOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Models\SosialMedia;
use Illuminate\Http\Request;
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
        $sosialMedias = SosialMedia::query()
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('frontoffice/redesign/beranda/page', [
            'sosialMedias' => $sosialMedias,
        ]);
    }

    public function gpr()
    {
        return Inertia::render('frontoffice/redesign/beranda/gpr');
    }

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