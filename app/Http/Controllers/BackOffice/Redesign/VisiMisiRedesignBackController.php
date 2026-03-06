<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\VisiMisiRequest;
use App\Http\Resources\VisiMisiResource;
use App\Models\VisiMisi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class VisiMisiRedesignBackController extends Controller
{
    public function index()
    {
        $visiMisis = VisiMisi::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('kategori', 'ILIKE', "%{$value}%")
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
            ->orderBy('kategori', 'desc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/profil/visi-misi/page', [
            'visiMisis' => VisiMisiResource::collection($visiMisis),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/profil/visi-misi/create', [
            
        ]);
    }

    public function store(VisiMisiRequest $request)
    {
        try {
            $gambar = null;

            if ($request->hasFile('gambar')) {
                $gambar = $request->file('gambar')
                    ->store('visi-misis', 'public');
            }

            VisiMisi::create([
                'kategori' => $request->kategori,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambar,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.visi-misi.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.visi-misi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $visiMisi = VisiMisi::findOrFail($id);

        return Inertia::render('backoffice/redesign/profil/visi-misi/edit', [
            'visiMisi' => new VisiMisiResource($visiMisi)
        ]);
    }

    public function update(VisiMisiRequest $request, $id)
    {
        try {
            $visiMisi = VisiMisi::findOrFail($id);

            $gambarPath = $visiMisi->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($visiMisi->gambar) {
                    Storage::disk('s3')->delete($visiMisi->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('visi-misi', $request->file('gambar'));

                // 🚨 CEK kalau gagal
                // if (!$path) {
                //     throw new \Exception('Upload gambar ke S3 gagal.');
                // }

                $gambarPath = $path;
            }

            $visiMisi->update([
                'kategori' => $request->kategori,
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.visi-misi.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.profil.visi-misi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $visiMisi = VisiMisi::findOrFail($id);
            $visiMisi->delete();

            return redirect()
                ->route('redesign.backoffice.profil.visi-misi.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.visi-misi.index')
                ->with('error', $e->getMessage());
        }
    }
}
