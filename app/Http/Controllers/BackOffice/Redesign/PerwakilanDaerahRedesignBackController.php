<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\PerwakilanDaerahRequest;
use App\Http\Resources\PerwakilanDaerahResource;
use App\Models\PerwakilanDaerah;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class PerwakilanDaerahRedesignBackController extends Controller
{
    public function index()
    {
        $perwakilanDaerahs = PerwakilanDaerah::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('kantor', 'ILIKE', "%{$value}%")
                    ->orWhere('alamat', 'ILIKE', "%{$value}%")
                    ->orWhere('telepon', 'ILIKE', "%{$value}%")
                    ->orWhere('email', 'ILIKE', "%{$value}%")
                    ->orWhere('whatsapp', 'ILIKE', "%{$value}%")
                    ->orWhere('twitter', 'ILIKE', "%{$value}%")
                    ->orWhere('tiktok', 'ILIKE', "%{$value}%")
                    ->orWhere('youtube', 'ILIKE', "%{$value}%")
                    ->orWhere('instagram', 'ILIKE', "%{$value}%");
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

        return Inertia::render('backoffice/redesign/profil/perwakilan-daerah/page', [
            'perwakilanDaerahs' => PerwakilanDaerahResource::collection($perwakilanDaerahs),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/profil/perwakilan-daerah/create', [
            
        ]);
    }

    public function store(PerwakilanDaerahRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('perwakilan-daerah', $request->file('gambar'));

                $gambarPath = $path;
            }

            PerwakilanDaerah::create([
                'kantor' => $request->kantor,
                'alamat' => $request->alamat,
                'telepon' => $request->telepon,
                'email' => $request->email,
                'whatsapp' => $request->whatsapp,
                'twitter' => $request->twitter,
                'tiktok' => $request->tiktok,
                'youtube' => $request->youtube,
                'instagram' => $request->instagram,
                'gambar' => $gambarPath,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.perwakilan-daerah.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.perwakilan-daerah.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $perwakilanDaerah = PerwakilanDaerah::findOrFail($id);

        return Inertia::render('backoffice/redesign/profil/perwakilan-daerah/edit', [
            'perwakilanDaerah' => new PerwakilanDaerahResource($perwakilanDaerah)
        ]);
    }

    public function update(PerwakilanDaerahRequest $request, $id)
    {
        try {
            $perwakilanDaerah = PerwakilanDaerah::findOrFail($id);

            $gambarPath = $perwakilanDaerah->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($perwakilanDaerah->gambar) {
                    Storage::disk('s3')->delete($perwakilanDaerah->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('perwakilan-daerah', $request->file('gambar'));

                $gambarPath = $path;
            }

            $perwakilanDaerah->update([
                'kantor' => $request->kantor,
                'alamat' => $request->alamat,
                'telepon' => $request->telepon,
                'email' => $request->email,
                'whatsapp' => $request->whatsapp,
                'twitter' => $request->twitter,
                'tiktok' => $request->tiktok,
                'youtube' => $request->youtube,
                'instagram' => $request->instagram,
                'gambar' => $gambarPath,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.perwakilan-daerah.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.profil.perwakilan-daerah.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $perwakilanDaerah = PerwakilanDaerah::findOrFail($id);

            // hapus gambar dari storage
            if ($perwakilanDaerah->gambar) {
                Storage::disk('s3')->delete($perwakilanDaerah->gambar);
            }

            $perwakilanDaerah->delete();

            return redirect()
                ->route('redesign.backoffice.profil.perwakilan-daerah.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.perwakilan-daerah.index')
                ->with('error', $e->getMessage());
        }
    }
}
