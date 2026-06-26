<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\LayananRequest;
use App\Http\Resources\LayananResource;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class LayananRedesignController extends Controller
{
    public function index()
    {
        $layanans = Layanan::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('judul', 'ILIKE', "%{$value}%")
                        ->orWhere('deskripsi', 'ILIKE', "%{$value}%")
                        ->orWhere('link', 'ILIKE', "%{$value}%");
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
                fn($query) => $query->orderBy(request()->field, request()->direction)
            )
            ->orderBy('id', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/layanan/page', [
            'layanans' => LayananResource::collection($layanans),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/layanan/create', []);
    }

    public function store(LayananRequest $request)
    {
        try {
            $gambarPath = null;

            if ($request->hasFile('gambar')) {
                $gambarPath = Storage::disk('s3')
                    ->putFile('layanan', $request->file('gambar'));
            }

            Layanan::create([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'link' => $request->link,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.layanan.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.layanan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $layanan = Layanan::findOrFail($id);

        return Inertia::render('backoffice/redesign/layanan/edit', [
            'layanan' => new LayananResource($layanan)
        ]);
    }

    public function update(LayananRequest $request, $id)
    {
        try {
            $layanan = Layanan::findOrFail($id);

            $gambarPath = $layanan->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($layanan->gambar) {
                    Storage::disk('s3')->delete($layanan->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('layanan', $request->file('gambar'));

                $gambarPath = $path;
            }

            $layanan->update([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'link' => $request->link,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.layanan.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.layanan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $layanan = Layanan::findOrFail($id);

            // hapus gambar dari storage
            if ($layanan->gambar) {
                Storage::disk('s3')->delete($layanan->gambar);
            }

            $layanan->delete();

            return redirect()
                ->route('redesign.backoffice.layanan.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.layanan.index')
                ->with('error', $e->getMessage());
        }
    }
}