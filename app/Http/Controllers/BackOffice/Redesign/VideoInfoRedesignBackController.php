<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\VideoInfoRequest;
use App\Http\Resources\VideoInfoResource;
use App\Models\VideoInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class VideoInfoRedesignBackController extends Controller
{
    private function extractYoutubeId($url)
    {
        $url = trim($url);

        $patterns = [
            '/youtu\.be\/([^\?\/]+)/',
            '/youtube\.com\/watch\?v=([^\&]+)/',
            '/youtube\.com\/embed\/([^\?\/]+)/',
            '/youtube\.com\/shorts\/([^\?\/]+)/'
        ];

        foreach ($patterns as $pattern) {
            if (preg_match($pattern, $url, $matches)) {
                return $matches[1];
            }
        }

        // jika input langsung video id
        if (preg_match('/^[a-zA-Z0-9_-]{11}$/', $url)) {
            return $url;
        }

        return null;
    }

    public function index()
    {
        $videoInfos = VideoInfo::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('judul', 'ILIKE', "%{$value}%")
                    ->orWhere('embed_url', 'ILIKE', "%{$value}%");
                });
            })
            ->when(request()->created_from, function ($query, $value) {
                $query->whereDate('created_at', '>=', $value);
            })
            ->when(request()->created_to, function ($query, $value) {
                $query->whereDate('created_at', '<=', $value);
            })
            ->when(
                request()->field && request()->direction,
                fn ($query) => $query->orderBy(request()->field, request()->direction)
            )
            ->orderBy('id', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/video-info/page', [
            'videoInfos' => VideoInfoResource::collection($videoInfos),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/video-info/create', [
            
        ]);
    }

    public function store(VideoInfoRequest $request)
    {
        try {

            $embedId = trim($request->embed_url);

            $embedUrl = "https://www.youtube.com/embed/{$embedId}";

            VideoInfo::create([
                'judul' => $request->judul,
                'embed_url' => $embedUrl,
            ]);

            return redirect()
                ->route('redesign.backoffice.video-info.index')
                ->with('success', 'Data berhasil dibuat');

        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.video-info.index')
                ->with('error', $e->getMessage());
        }
    }

    // public function store(VideoInfoRequest $request)
    // {
    //     try {

    //         $videoId = $this->extractYoutubeId($request->embed_url);

    //         if (!$videoId) {
    //             return redirect()
    //                 ->route('redesign.backoffice.video-info.index')
    //                 ->with('error', 'URL YouTube tidak valid');
    //         }

    //         $embedUrl = "https://www.youtube.com/embed/{$videoId}";

    //         VideoInfo::create([
    //             'judul' => $request->judul,
    //             'embed_url' => $embedUrl,
    //         ]);

    //         return redirect()
    //             ->route('redesign.backoffice.video-info.index')
    //             ->with('success', 'Data berhasil dibuat');

    //     } catch (Throwable $e) {
    //         return redirect()
    //             ->route('redesign.backoffice.video-info.index')
    //             ->with('error', $e->getMessage());
    //     }
    // }

    public function edit($id)
    {
        $videoInfo = VideoInfo::findOrFail($id);

        return Inertia::render('backoffice/redesign/video-info/edit', [
            'videoInfo' => new VideoInfoResource($videoInfo)
        ]);
    }

    public function update(VideoInfoRequest $request, $id)
    {
        try {

            $videoInfo = VideoInfo::findOrFail($id);

            $embedId = trim($request->embed_url);

            $embedUrl = "https://www.youtube.com/embed/{$embedId}";

            $videoInfo->update([
                'judul' => $request->judul,
                'embed_url' => $embedUrl,
            ]);

            return redirect()
                ->route('redesign.backoffice.video-info.index')
                ->with('success', 'Data berhasil diubah');

        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.video-info.index')
                ->with('error', $e->getMessage());
        }
    }

    // public function update(VideoInfoRequest $request, $id)
    // {
    //     try {

    //         $videoInfo = VideoInfo::findOrFail($id);

    //         $videoId = $this->extractYoutubeId($request->embed_url);

    //         if (!$videoId) {
    //             return redirect()
    //                 ->route('redesign.backoffice.video-info.index')
    //                 ->with('error', 'URL YouTube tidak valid');
    //         }

    //         $embedUrl = "https://www.youtube.com/embed/{$videoId}";

    //         $videoInfo->update([
    //             'judul' => $request->judul,
    //             'embed_url' => $embedUrl,
    //         ]);

    //         return redirect()
    //             ->route('redesign.backoffice.video-info.index')
    //             ->with('success', 'Data berhasil diubah');

    //     } catch (Throwable $e) {
    //         return redirect()
    //             ->route('redesign.backoffice.video-info.index')
    //             ->with('error', $e->getMessage());
    //     }
    // }
}
