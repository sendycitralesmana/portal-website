<?php

namespace App\Http\Controllers\FrontOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnProtectionService;
use App\Models\ProtectionService;
use App\Models\Representative;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnRepresentativeFrontController extends Controller
{
    public function representative(Request $request)
    {
        $search = $request->query('search');
        $perPage = 10;

        $query = Representative::query();

        // Filter berdasarkan search jika ada
        if ($search) {
            $query->where('office', 'like', "%{$search}%");
        }

        // Urutkan dari data terbaru
        $query->orderBy('created_at', 'desc');

        // Pagination otomatis membaca page dari query param
        $representative = $query->paginate($perPage)->withQueryString();

        return Inertia::render('frontoffice/en/representative/representative', [
            'search' => $search,
            'page' => $representative->currentPage(),
            'per_page' => $perPage,
            'data' => [
                'data' => $representative->items(),
                'total' => $representative->total(),
            ],
        ]);
    }

    public function proactiveEmergency()
    {
        $protectionServices = EnProtectionService::orderBy('created_at', 'asc')->get();
        return Inertia::render('frontoffice/en/protection-service/proactive-emergency', [
            'protectionServices' => $protectionServices
        ]);
    }
}
