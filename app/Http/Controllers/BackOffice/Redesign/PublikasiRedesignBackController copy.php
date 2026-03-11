<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\PublikasiRequest;
use App\Http\Resources\PublikasiResource;
use App\Models\Publikasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Throwable;

use function Symfony\Component\Clock\now;

class PublikasiRedesignBackController extends Controller
{
    private function generateUniqueSlug($judul, $ignoreId = null)
    {
        $slug = Str::slug($judul);

        $count = Publikasi::where('slug', 'LIKE', "{$slug}%")
            ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
            ->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }

    public function index()
    {
        // $publikasi = Publikasi::where('slug', 'test')->first();
        // return $publikasi;

        $publikasis = Publikasi::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('jenis', 'ILIKE', "%{$value}%")
                    ->orWhere('kategori', 'ILIKE', "%{$value}%")
                    ->orWhere('judul', 'ILIKE', "%{$value}%")
                    ->orWhere('deskripsi', 'ILIKE', "%{$value}%")
                    ->orWhere('tanggal', 'ILIKE', "%{$value}%");
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
            ->orderBy('created_at', 'desc')
            ->where('gambar', '!=', null)
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/publikasi/page', [
            'publikasis' => PublikasiResource::collection($publikasis),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/publikasi/create', [
            
        ]);
    }

    public function store(PublikasiRequest $request)
    {
        try {
            if ($request->hasFile('gambar')) {

                $path = Storage::disk('s3')
                    ->putFile('publikasi-redesign', $request->file('gambar'));

                $gambarPath = $path;
            }

            Publikasi::create([
                'jenis' => $request->jenis,
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'slug' => $this->generateUniqueSlug($request->judul),
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
                'tanggal' => now(),
            ]);

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $publikasi = Publikasi::findOrFail($id);

        return Inertia::render('backoffice/redesign/publikasi/edit', [
            'publikasi' => new PublikasiResource($publikasi)
        ]);
    }

    public function update(PublikasiRequest $request, $id)
    {
        try {
            $publikasi = Publikasi::findOrFail($id);

            $gambarPath = $publikasi->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($publikasi->gambar) {
                    Storage::disk('s3')->delete($publikasi->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('publikasi-redesign', $request->file('gambar'));

                $gambarPath = $path;
            }

            $publikasi->update([
                'jenis' => $request->jenis,
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'slug' => $this->generateUniqueSlug($request->judul, $id),
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $publikasi = Publikasi::findOrFail($id);

            // hapus gambar dari storage
            if ($publikasi->gambar) {
                Storage::disk('s3')->delete($publikasi->gambar);
            }

            $publikasi->delete();

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('error', $e->getMessage());
        }
    }
}
