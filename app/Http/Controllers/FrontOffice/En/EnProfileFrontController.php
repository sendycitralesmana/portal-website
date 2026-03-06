<?php

namespace App\Http\Controllers\FrontOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnInstitution;
use App\Models\En\EnProfile;
use App\Models\En\EnStructure;
use App\Models\En\EnWorkUnit;
use App\Models\Institution;
use App\Models\Structure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnProfileFrontController extends Controller
{
    public function index()
    {
        $users = EnProfile::orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/en/profile/official', [
            'users' => $users,
        ]);
    }

    public function institution()
    {
        $institution = EnInstitution::first();

        return Inertia::render('frontoffice/en/profile/institution', [
            'institution' => $institution
        ]);
    }

    public function structure()
    {
        $sekjen = EnStructure::where('category', 'Sekretaris Jenderal')->orderBy('created_at', 'asc')->first();
        $kepalaBiro = EnStructure::where('category', 'Kepala Biro')->orderBy('created_at', 'asc')->get();
        $kepalaBagian = EnStructure::where('category', 'Kepala Bagian')->orderBy('created_at', 'asc')->get();
        $kepalaPerwakilan = EnStructure::where('category', 'Kepala Perwakilan')->orderBy('created_at', 'asc')->get();
        $tenagaAhli = EnStructure::where('category', 'Tenaga Ahli')->orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/en/profile/structure', [
            'sekjen' => $sekjen,
            'kepalaBiro' => $kepalaBiro,
            'kepalaBagian' => $kepalaBagian,
            'kepalaPerwakilan' => $kepalaPerwakilan,
            'tenagaAhli' => $tenagaAhli
        ]);
    }

    public function workUnit()
    {
        $workUnits = EnWorkUnit::orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/en/profile/work-unit', [
            'workUnits' => $workUnits
        ]);
    }
}
