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

class ProgramPerlindunganRedesignBackController extends Controller
{
    public function index()
    {
        $programPerlindungans = TugasFungsi::query()
            ->where('kategori', 'program perlindungan')
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

        return Inertia::render('backoffice/redesign/tugas-fungsi/program-perlindungan/page', [
            'programPerlindungans' => TugasFungsiResource::collection($programPerlindungans),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/tugas-fungsi/program-perlindungan/create', [
            
        ]);
    }

    public function store(TugasFungsiRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('program-perlindungan', $request->file('gambar'));

                $gambarPath = $path;
            }

            TugasFungsi::create([
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.program-perlindungan.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.program-perlindungan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $programPerlindungan = TugasFungsi::findOrFail($id);

        return Inertia::render('backoffice/redesign/tugas-fungsi/program-perlindungan/edit', [
            'programPerlindungan' => new TugasFungsiResource($programPerlindungan)
        ]);
    }

    public function update(TugasFungsiRequest $request, $id)
    {
        try {
            $programPerlindungan = TugasFungsi::findOrFail($id);

            $gambarPath = $programPerlindungan->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($programPerlindungan->gambar) {
                    Storage::disk('s3')->delete($programPerlindungan->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('program-perlindungan', $request->file('gambar'));

                $gambarPath = $path;
            }

            $programPerlindungan->update([
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.program-perlindungan.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.program-perlindungan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $programPerlindungan = TugasFungsi::findOrFail($id);

            // hapus gambar dari storage
            if ($programPerlindungan->gambar) {
                Storage::disk('s3')->delete($programPerlindungan->gambar);
            }

            $programPerlindungan->delete();

            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.program-perlindungan.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tugas-fungsi.program-perlindungan.index')
                ->with('error', $e->getMessage());
        }
    }
}
