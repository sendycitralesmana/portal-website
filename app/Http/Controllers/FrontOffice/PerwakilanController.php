<?php

namespace App\Http\Controllers\FrontOffice;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\ProtectionService;
use App\Models\Representative;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerwakilanController extends Controller
{
    public function perwakilan(Request $request)
    {

        $search = $request->query('search');
        $perPage = 20;

        $query = Representative::query();

        // Filter berdasarkan search jika ada
        if ($search) {
            $query->where('office', 'like', "%{$search}%");
        }

        // Urutkan dari data terbaru
        $query->orderBy('created_at', 'asc');

        // Pagination otomatis membaca page dari query param
        $representative = $query->paginate($perPage)->withQueryString();

        return Inertia::render('frontoffice/perwakilan/perwakilan', [
            'search' => $search,
            'page' => $representative->currentPage(),
            'per_page' => $perPage,
            'data' => [
                'data' => $representative->items(),
                'total' => $representative->total(),
            ],
        ]);
    }

    public function proaktifDarurat()
    {
        $protectionServices = ProtectionService::orderBy('created_at', 'asc')->get();

        return Inertia::render('frontoffice/layanan-perlindungan/proaktif-darurat', [
            'protectionServices' => $protectionServices
        ]);
    }

}
