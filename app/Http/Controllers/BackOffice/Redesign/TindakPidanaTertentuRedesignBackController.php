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

class TindakPidanaTertentuRedesignBackController extends Controller
{
    public function index()
    {
        $tindakPidanaTertentus = TugasFungsi::query()
            ->where('kategori', 'tindak pidana tertentu')
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
            ->orderBy('id', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/tugas-fungsi/tindak-pidana-tertentu/page', [
            'tindakPidanaTertentus' => TugasFungsiResource::collection($tindakPidanaTertentus),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/tugas-fungsi/tindak-pidana-tertentu/create', [
            
        ]);
    }

    public function store(TugasFungsiRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('tindak-pidana-tertentu', $request->file('gambar'));

                $gambarPath = $path;
            }

            TugasFungsi::create([
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $tindakPidanaTertentu = TugasFungsi::findOrFail($id);

        return Inertia::render('backoffice/redesign/tugas-fungsi/tindak-pidana-tertentu/edit', [
            'tindakPidanaTertentu' => new TugasFungsiResource($tindakPidanaTertentu)
        ]);
    }

    public function update(TugasFungsiRequest $request, $id)
    {
        try {
            $tindakPidanaTertentu = TugasFungsi::findOrFail($id);

            $gambarPath = $tindakPidanaTertentu->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($tindakPidanaTertentu->gambar) {
                    Storage::disk('s3')->delete($tindakPidanaTertentu->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('tindak-pidana-tertentu', $request->file('gambar'));

                $gambarPath = $path;
            }

            $tindakPidanaTertentu->update([
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $tindakPidanaTertentu = TugasFungsi::findOrFail($id);

            // hapus gambar dari storage
            if ($tindakPidanaTertentu->gambar) {
                Storage::disk('s3')->delete($tindakPidanaTertentu->gambar);
            }

            $tindakPidanaTertentu->delete();

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index')
                ->with('error', $e->getMessage());
        }
    }
}
