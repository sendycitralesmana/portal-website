<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\StrukturOrganisasiRequest;
use App\Http\Resources\StrukturOrganisasiResource;
use App\Models\StrukturOrganisasi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class StrukturOrganisasiRedesignBackController extends Controller
{
    public function index()
    {
        $strukturOrganisasis = StrukturOrganisasi::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('gambar', 'ILIKE', "%{$value}%");
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
            ->orderBy('created_at', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/profil/struktur-organisasi/page', [
            'strukturOrganisasis' => StrukturOrganisasiResource::collection($strukturOrganisasis),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/profil/struktur-organisasi/create', []);
    }

    public function edit($id)
    {
        $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);

        return Inertia::render('backoffice/redesign/profil/struktur-organisasi/edit', [
            'strukturOrganisasi' => new StrukturOrganisasiResource($strukturOrganisasi)
        ]);
    }

    public function editFile($id)
    {
        $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);

        return Inertia::render('backoffice/redesign/profil/struktur-organisasi/edit-file', [
            'strukturOrganisasi' => new StrukturOrganisasiResource($strukturOrganisasi)
        ]);
    }

    public function store(StrukturOrganisasiRequest $request)
    {
        try {
            $filePath = null;

            // Upload PDF
            if ($request->hasFile('file')) {
                $filePath = Storage::disk('s3')
                    ->putFile('struktur-organisasi/file', $request->file('file'));
            }

            StrukturOrganisasi::create([
                'gambar' => "-",
                'deskripsi' => $request->deskripsi,
                'file' => $filePath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function update(StrukturOrganisasiRequest $request, $id)
    {
        try {
            $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);

            $gambarPath = $strukturOrganisasi->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($strukturOrganisasi->gambar) {
                    Storage::disk('s3')->delete($strukturOrganisasi->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('struktur-organisasi', $request->file('gambar'));

                $gambarPath = $path;
            }

            $strukturOrganisasi->update([
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function updateFile(StrukturOrganisasiRequest $request, $id)
    {
        try {
            $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);

            $filePath = $strukturOrganisasi->file; // default file lama

            if ($request->hasFile('file')) {

                // Hapus file PDF lama
                if ($strukturOrganisasi->file) {
                    Storage::disk('s3')->delete($strukturOrganisasi->file);
                }

                // Upload PDF baru
                $path = Storage::disk('s3')
                    ->putFile('struktur-organisasi/file', $request->file('file'));

                $filePath = $path;
            }

            $strukturOrganisasi->update([
                'gambar' => '-',
                'deskripsi' => $request->deskripsi,
                'file' => $filePath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $strukturOrganisasi = StrukturOrganisasi::findOrFail($id);

            // Hapus gambar dari S3
            if ($strukturOrganisasi->gambar && $strukturOrganisasi->gambar !== '-') {
                Storage::disk('s3')->delete($strukturOrganisasi->gambar);
            }

            // Hapus file PDF dari S3
            if ($strukturOrganisasi->file) {
                Storage::disk('s3')->delete($strukturOrganisasi->file);
            }

            // Hapus data dari database
            $strukturOrganisasi->delete();

            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.struktur-organisasi.index')
                ->with('error', $e->getMessage());
        }
    }
}
