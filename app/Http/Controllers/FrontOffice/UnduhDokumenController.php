<?php

namespace App\Http\Controllers\FrontOffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UnduhDokumenController extends Controller
{
    public function maklumatPelayananPreview()
    {
        $file = Storage::disk('public')->get('pdf/maklumat.pdf');

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="maklumat.pdf"');
    }

    public function pelayananPublikPreview()
    {
        $file = Storage::disk('public')->get('pdf/pelayanan-publik.pdf');

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="pelayanan-publik.pdf"');
    }

    public function penerimaanPermohonanPreview()
    {
        $file = Storage::disk('public')->get('pdf/penerimaan-permohonan.pdf');

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="penerimaan-permohonan.pdf"');
    }

    public function pemberianPerlindunganDaruratPreview()
    {
        $file = Storage::disk('public')->get('pdf/pemberian-perlindungan-darurat.pdf');

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="pemberian-perlindungan-darurat.pdf"');
    }

    public function tindakanProaktifPreview()
    {
        $file = Storage::disk('public')->get('pdf/tindakan-proaktif.pdf');

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="tindakan-proaktif.pdf"');
    }

    public function permintaanInformasiPublikPreview()
    {
        $file = Storage::disk('public')->get('pdf/permintaan-informasi-publik.pdf');

        return response($file, 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="permintaan-informasi-publik.pdf"');
    }

}
