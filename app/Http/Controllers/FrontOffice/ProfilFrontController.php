<?php

namespace App\Http\Controllers\FrontOffice;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;

use Inertia\Inertia;
use App\Models\Pejabat;
use App\Models\Profile;
use App\Models\Structure;
use App\Models\WorkUnit;
use Illuminate\Support\Facades\Storage;

class ProfilFrontController extends Controller
{
    public function index()
    {
        $users = Profile::orderBy('created_at', 'asc')->get();
        $institution = Institution::first();

        return Inertia::render('frontoffice/profil/pejabat', [
            'users' => $users,
            'institution' => $institution
        ]);
    }

    public function structure()
    {
        $sekjen = Structure::where('category', 'Sekretaris Jenderal')->orderBy('created_at', 'asc')->first();
        $kepalaBiro = Structure::where('category', 'Kepala Biro')->orderBy('created_at', 'asc')->get();
        $kepalaBagian = Structure::where('category', 'Kepala Bagian')->orderBy('created_at', 'asc')->get();
        $kepalaPerwakilan = Structure::where('category', 'Kepala Perwakilan')->orderBy('created_at', 'asc')->get();
        $tenagaAhli = Structure::where('category', 'Tenaga Ahli')->orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/profil/struktur', [
            'sekjen' => $sekjen,
            'kepalaBiro' => $kepalaBiro,
            'kepalaBagian' => $kepalaBagian,
            'kepalaPerwakilan' => $kepalaPerwakilan,
            'tenagaAhli' => $tenagaAhli
        ]);
    }

    public function institution()
    {
        $institution = Institution::first();

        return Inertia::render('frontoffice/profil/lembaga', [
            'institution' => $institution
        ]);
    }

    public function institutionPreview()
    {
        $institution = Institution::first();
        $filePath = $institution->document;

        $stream = Storage::disk('s3')->readStream($filePath);

        return response()->stream(function () use ($stream) {
            fpassthru($stream);
        }, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . basename($filePath) . '"',
        ]);
    }

    public function workUnit()
    {
        $workUnits = WorkUnit::orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/profil/unit-kerja', [
            'workUnits' => $workUnits
        ]);
    }

    // public function previewDocument($slugCategory, $id)
    // {
    //     $institution = Institution::where('id', $id)->first();
    //     $file = Storage::disk('s3')->get($institution->document_url);

    //     return response($file, 200)
    //         ->header('Content-Type', 'application/pdf')
    //         ->header('Content-Disposition', 'inline; filename="' . basename($institution->document_name) . '"');
    // }
}
