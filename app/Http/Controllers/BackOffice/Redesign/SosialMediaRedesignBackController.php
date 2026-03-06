<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\SosialMediaRequest;
use App\Http\Resources\SosialMediaResource;
use App\Models\SosialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class SosialMediaRedesignBackController extends Controller
{
    public function index()
    {
        $sosialMedias = SosialMedia::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('platform', 'ILIKE', "%{$value}%")
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
            ->orderBy('created_at', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/sosial-media/page', [
            'sosialMedias' => SosialMediaResource::collection($sosialMedias),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/sosial-media/create', [
            
        ]);
    }

    public function store(SosialMediaRequest $request)
    {
        try {

            $platform = $request->platform;
            $id = trim($request->embed_url);

            // Generate embed URL berdasarkan platform
            switch ($platform) {
                case 'instagram':
                    $embedUrl = "https://www.instagram.com/p/{$id}/embed";
                    break;

                case 'tiktok':
                    $embedUrl = "https://www.tiktok.com/player/v1/{$id}?controls=1&description=0&music_info=0";
                    break;

                case 'youtube':
                    $embedUrl = "https://www.youtube.com/embed/{$id}";
                    break;

                default:
                    return redirect()
                        ->route('redesign.backoffice.sosial-media.index')
                        ->with('error', 'Platform tidak valid');
            }

            SosialMedia::create([
                'platform' => $platform,
                'embed_url' => $embedUrl,
            ]);

            // SosialMedia::create([
            //     'platform' => $request->platform,
            //     'embed_url' => $request->embed_url,
            // ]);

            return redirect()
                ->route('redesign.backoffice.sosial-media.index')
                ->with('success', 'Data berhasil dibuat');

        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.sosial-media.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $sosialMedia = SosialMedia::findOrFail($id);

        return Inertia::render('backoffice/redesign/sosial-media/edit', [
            'sosialMedia' => new SosialMediaResource($sosialMedia)
        ]);
    }

    public function update(SosialMediaRequest $request, $id)
    {
        try {
            $sosialMedia = SosialMedia::findOrFail($id);

            $platform = $request->platform;
            $embedId = trim($request->embed_url);

            // Generate embed URL berdasarkan platform
            switch ($platform) {
                case 'instagram':
                    $embedUrl = "https://www.instagram.com/p/{$embedId}/embed";
                    break;

                case 'tiktok':
                    $embedUrl = "https://www.tiktok.com/player/v1/{$embedId}?controls=1&description=0&music_info=0";
                    break;

                case 'youtube':
                    $embedUrl = "https://www.youtube.com/embed/{$embedId}";
                    break;

                default:
                    return redirect()
                        ->route('redesign.backoffice.sosial-media.index')
                        ->with('error', 'Platform tidak valid');
            }

            $sosialMedia->update([
                'platform' => $platform,
                'embed_url' => $embedUrl,
            ]);

            // $sosialMedia->update([
            //     'platform' => $request->platform,
            //     'embed_url' => $request->embed_url,
            // ]);

            return redirect()
                ->route('redesign.backoffice.sosial-media.index')
                ->with('success', 'Data berhasil diubah');

        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.sosial-media.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $sosialMedia = SosialMedia::findOrFail($id);
            $sosialMedia->delete();

            return redirect()
                ->route('redesign.backoffice.sosial-media.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.sosial-media.index')
                ->with('error', $e->getMessage());
        }
    }
}
