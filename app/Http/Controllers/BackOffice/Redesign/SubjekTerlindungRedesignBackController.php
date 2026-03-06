<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\TugasFungsiRequest;
use App\Http\Resources\TugasFungsiResource;
use App\Models\TugasFungsi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class SubjekTerlindungRedesignBackController extends Controller
{
    public function index()
    {
        $subjekTerlindungs = TugasFungsi::query()
            ->where('kategori', 'subjek terlindung')
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('kategori', 'ILIKE', "%{$value}%")
                    ->orWhere('judul', 'ILIKE', "%{$value}%")
                    ->orWhere('deskripsi', 'ILIKE', "%{$value}%");
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

        return Inertia::render('backoffice/redesign/tugas-fungsi/subjek-terlindung/page', [
            'subjekTerlindungs' => TugasFungsiResource::collection($subjekTerlindungs),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/tugas-fungsi/subjek-terlindung/create', [
            
        ]);
    }

    public function store(TugasFungsiRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('subjek-terlindung', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            TugasFungsi::create([
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.subjek-terlindung.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.subjek-terlindung.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $subjekTerlindung = TugasFungsi::findOrFail($id);

        return Inertia::render('backoffice/redesign/tugas-fungsi/subjek-terlindung/edit', [
            'subjekTerlindung' => new TugasFungsiResource($subjekTerlindung)
        ]);
    }

    public function update(TugasFungsiRequest $request, $id)
    {
        try {
            $subjekTerlindung = TugasFungsi::findOrFail($id);

            $gambarPath = $subjekTerlindung->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($subjekTerlindung->gambar) {
                    Storage::disk('s3')->delete($subjekTerlindung->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('subjek-terlindung', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            $subjekTerlindung->update([
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.subjek-terlindung.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.subjek-terlindung.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $subjekTerlindung = TugasFungsi::findOrFail($id);
            $subjekTerlindung->delete();

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.subjek-terlindung.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.subjek-terlindung.index')
                ->with('error', $e->getMessage());
        }
    }
}
