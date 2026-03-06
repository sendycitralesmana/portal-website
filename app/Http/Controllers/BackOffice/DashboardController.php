<?php

namespace App\Http\Controllers\BackOffice;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Highlight;
use App\Models\News;
use App\Models\Profile;
use App\Models\Publication;
use App\Models\Representative;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
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
        $countApplication = Application::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countProfile = Profile::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countHighlight = Highlight::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        // $countRepresentative = Representative::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countPublication = Publication::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();
        $countNews = News::when($fromDate, fn($q) => $q->where('created_at', '>=', $fromDate))->count();

        return Inertia::render('backoffice/dashboard/page', [
            'stats' => [
                'user' => $countUser,
                'application' => $countApplication,
                'profile' => $countProfile,
                'highlight' => $countHighlight,
                // 'representative' => $countRepresentative,
                'publication' => $countPublication,
                'news' => $countNews,
            ],
            'selectedRange' => $range,
        ]);
    }
}
