<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\PejabatStrukturalRequest;
use App\Http\Resources\PejabatStrukturalResource;
use App\Models\PejabatStruktural;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class PejabatStrukturalRedesignBackController extends Controller
{
    public function index()
    {
        $pejabatStrukturals = PejabatStruktural::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('nama', 'ILIKE', "%{$value}%")
                        ->orWhere('kategori', 'ILIKE', "%{$value}%")
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
                fn($query) => $query->orderBy(request()->field, request()->direction)
            )
            ->orderBy('id', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/profil/pejabat-struktural/page', [
            'pejabatStrukturals' => PejabatStrukturalResource::collection($pejabatStrukturals),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/profil/pejabat-struktural/create', []);
    }

    public function store(PejabatStrukturalRequest $request)
    {
        try {
            $fotoPath = null;

            if ($request->hasFile('foto')) {
                $fotoPath = Storage::disk('s3')
                    ->putFile('pejabat-struktural', $request->file('foto'));
            }

            PejabatStruktural::create([
                'nama' => $request->nama,
                'kategori' => $request->kategori,
                'jabatan' => $request->jabatan,
                'deskripsi' => $request->deskripsi,
                'foto' => $fotoPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.pejabat-struktural.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.pejabat-struktural.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $pejabatStruktural = PejabatStruktural::findOrFail($id);

        return Inertia::render('backoffice/redesign/profil/pejabat-struktural/edit', [
            'pejabatStruktural' => new PejabatStrukturalResource($pejabatStruktural)
        ]);
    }

    public function update(PejabatStrukturalRequest $request, $id)
    {
        try {
            $pejabatStruktural = PejabatStruktural::findOrFail($id);

            $fotoPath = $pejabatStruktural->foto; // default foto lama

            if ($request->hasFile('foto')) {

                // hapus lama
                if ($pejabatStruktural->foto) {
                    Storage::disk('s3')->delete($pejabatStruktural->foto);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('pejabat-struktural', $request->file('foto'));

                $fotoPath = $path;
            }

            $pejabatStruktural->update([
                'nama' => $request->nama,
                'kategori' => $request->kategori,
                'jabatan' => $request->jabatan,
                'deskripsi' => $request->deskripsi,
                'foto' => $fotoPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.profil.pejabat-struktural.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.profil.pejabat-struktural.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $pejabatStruktural = PejabatStruktural::findOrFail($id);

            // hapus foto dari storage
            if ($pejabatStruktural->foto) {
                Storage::disk('s3')->delete($pejabatStruktural->foto);
            }

            $pejabatStruktural->delete();

            return redirect()
                ->route('redesign.backoffice.profil.pejabat-struktural.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.profil.pejabat-struktural.index')
                ->with('error', $e->getMessage());
        }
    }
}
