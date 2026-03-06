<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfilPimpinanRequest;
use App\Http\Resources\ProfilPimpinanResource;
use App\Models\ProfilPimpinan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class ProfilPimpinanRedesignBackController extends Controller
{
    public function index()
    {
        $profilPimpinans = ProfilPimpinan::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('nama', 'ILIKE', "%{$value}%")
                    ->orWhere('deskripsi', 'ILIKE', "%{$value}%")
                    ->orWhere('jabatan', 'ILIKE', "%{$value}%");
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

        return Inertia::render('backoffice/redesign/profil/profil-pimpinan/page', [
            'profilPimpinans' => ProfilPimpinanResource::collection($profilPimpinans),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/profil/profil-pimpinan/create', [
            
        ]);
    }

    public function store(ProfilPimpinanRequest $request)
    {
        try {
            if ($request->hasFile('foto')) {

                $path = Storage::disk('s3')
                    ->putFile('profil-pimpinan', $request->file('foto'));

                $fotoPath = $path;
            }

            $fotoPath = null;

            ProfilPimpinan::create([
                'nama' => $request->nama,
                'deskripsi' => $request->deskripsi,
                'jabatan' => $request->jabatan,
                'foto' => $fotoPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.profil-pimpinan.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.profil-pimpinan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $profilPimpinan = ProfilPimpinan::findOrFail($id);

        return Inertia::render('backoffice/redesign/profil/profil-pimpinan/edit', [
            'profilPimpinan' => new ProfilPimpinanResource($profilPimpinan)
        ]);
    }

    public function update(ProfilPimpinanRequest $request, $id)
    {
        try {
            $profilPimpinan = ProfilPimpinan::findOrFail($id);

            $fotoPath = $profilPimpinan->foto; // default foto lama

            if ($request->hasFile('foto')) {

                // hapus lama
                if ($profilPimpinan->foto) {
                    Storage::disk('s3')->delete($profilPimpinan->foto);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('profil-pimpinan', $request->file('foto'));

                $fotoPath = $path;
            }

            $fotoPath = null;

            $profilPimpinan->update([
                'nama' => $request->nama,
                'deskripsi' => $request->deskripsi,
                'jabatan' => $request->jabatan,
                'foto' => $fotoPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.profil-pimpinan.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.profil.profil-pimpinan.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $profilPimpinan = ProfilPimpinan::findOrFail($id);
            $profilPimpinan->delete();

            return redirect()
                ->route('redesign.backoffice.profil.profil-pimpinan.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.profil-pimpinan.index')
                ->with('error', $e->getMessage());
        }
    }
}
