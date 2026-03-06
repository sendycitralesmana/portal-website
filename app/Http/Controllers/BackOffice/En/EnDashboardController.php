<?php

namespace App\Http\Controllers\BackOffice\En;

use App\Http\Controllers\Controller;
use App\Models\En\EnApplication;
use App\Models\En\EnHighlight;
use App\Models\En\EnNews;
use App\Models\En\EnProfile;
use App\Models\En\EnPublication;
use App\Models\Representative;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnDashboardController extends Controller
{
    public function index(Request $request)
    {
        $range = $request->input('range', 'all');

        $fromDate = match ($range) {
            'today' => Carbon::today(),
            '1minggu' => Carbon::now()->subWeek(),
            '1bulan' => Carbon::now()->subMonth(),
            '3bulan' => Carbon::now()->subMonths(3),
            '6bulan' => Carbon::now()->subMonths(6),
            '1tahun' => Carbon::now()->subYear(),
            'all' => null,
            default => null,
        };

        // Conditional query with optional $fromDate
        $countUser = User::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countApplication = EnApplication::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countProfile = EnProfile::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countHighlight = EnHighlight::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countRepresentative = Representative::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countPublication = EnPublication::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countNews = EnNews::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();

        return Inertia::render('backoffice/en/dashboard/page', [
            'stats' => [
                'user' => $countUser,
                'application' => $countApplication,
                'profile' => $countProfile,
                'highlight' => $countHighlight,
                'representative' => $countRepresentative,
                'publication' => $countPublication,
                'news' => $countNews,
            ],
            'selectedRange' => $range,
        ]);
    }

}
