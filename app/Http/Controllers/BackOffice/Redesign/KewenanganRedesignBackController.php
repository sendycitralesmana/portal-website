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

class KewenanganRedesignBackController extends Controller
{
    public function index()
    {
        $kewenangans = TugasFungsi::query()
            ->where('kategori', 'kewenangan')
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

        return Inertia::render('backoffice/redesign/tugas-fungsi/kewenangan/page', [
            'kewenangans' => TugasFungsiResource::collection($kewenangans),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/tugas-fungsi/kewenangan/create', [
            
        ]);
    }

    public function store(TugasFungsiRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('kewenangan', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            TugasFungsi::create([
                'kategori' => 'kewenangan',
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.kewenangan.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.kewenangan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $kewenangan = TugasFungsi::findOrFail($id);

        return Inertia::render('backoffice/redesign/tugas-fungsi/kewenangan/edit', [
            'kewenangan' => new TugasFungsiResource($kewenangan)
        ]);
    }

    public function update(TugasFungsiRequest $request, $id)
    {
        try {
            $kewenangan = TugasFungsi::findOrFail($id);

            $gambarPath = $kewenangan->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($kewenangan->gambar) {
                    Storage::disk('s3')->delete($kewenangan->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('kewenangan', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            $kewenangan->update([
                'kategori' => 'kewenangan',
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.kewenangan.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.kewenangan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $kewenangan = TugasFungsi::findOrFail($id);
            $kewenangan->delete();

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.kewenangan.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.kewenangan.index')
                ->with('error', $e->getMessage());
        }
    }
}
