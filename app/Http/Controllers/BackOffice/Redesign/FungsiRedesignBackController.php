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

class FungsiRedesignBackController extends Controller
{
    public function index()
    {
        $fungsis = TugasFungsi::query()
            ->where('kategori', 'fungsi')
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

        return Inertia::render('backoffice/redesign/tugas-fungsi/fungsi/page', [
            'fungsis' => TugasFungsiResource::collection($fungsis),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/tugas-fungsi/fungsi/create', [
            
        ]);
    }

    public function store(TugasFungsiRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('fungsi', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            TugasFungsi::create([
                'kategori' => 'fungsi',
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.fungsi.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.fungsi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $fungsis = TugasFungsi::findOrFail($id);

        return Inertia::render('backoffice/redesign/tugas-fungsi/fungsi/edit', [
            'fungsi' => new TugasFungsiResource($fungsis)
        ]);
    }

    public function update(TugasFungsiRequest $request, $id)
    {
        try {
            $fungsis = TugasFungsi::findOrFail($id);

            $gambarPath = $fungsis->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($fungsis->gambar) {
                    Storage::disk('s3')->delete($fungsis->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('fungsi', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            $fungsis->update([
                'kategori' => 'fungsi',
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.fungsi.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.fungsi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $fungsis = TugasFungsi::findOrFail($id);
            $fungsis->delete();

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.fungsi.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.fungsi.index')
                ->with('error', $e->getMessage());
        }
    }
}
