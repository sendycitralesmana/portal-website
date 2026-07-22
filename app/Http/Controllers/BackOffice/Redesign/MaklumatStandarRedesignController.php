<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\MaklumatStandarRequest;
use App\Http\Resources\MaklumatStandarResource;
use App\Models\MaklumatStandar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class MaklumatStandarRedesignController extends Controller
{
    public function index()
    {
        $maklumatStandars = MaklumatStandar::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('judul', 'ILIKE', "%{$value}%")
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
                fn($query) => $query->orderBy(request()->field, request()->direction)
            )
            ->orderBy('id', 'asc')
            ->paginate(request()->load ?? 10)
            ->withQueryString();

        return Inertia::render('backoffice/redesign/maklumat-standar/page', [
            'maklumatStandars' => MaklumatStandarResource::collection($maklumatStandars),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/maklumat-standar/create', []);
    }

    public function store(MaklumatStandarRequest $request)
    {
        try {
            $filePath = $request->hasFile('file')
                ? Storage::disk('s3')->putFile(
                    'maklumat-standar',
                    $request->file('file')
                )
                : null;

            MaklumatStandar::create([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'file' => $filePath,
            ]);

            return redirect()
                ->route('redesign.backoffice.maklumat-standar.index')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.maklumat-standar.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $maklumatStandar = MaklumatStandar::findOrFail($id);

        return Inertia::render('backoffice/redesign/maklumat-standar/edit', [
            'maklumatStandar' => new MaklumatStandarResource($maklumatStandar)
        ]);
    }

    public function update(MaklumatStandarRequest $request, $id)
    {
        try {
            $maklumatStandar = MaklumatStandar::findOrFail($id);

            // Default: tetap gunakan file lama
            $filePath = $maklumatStandar->file;

            // Jika user upload file PDF baru
            if ($request->hasFile('file')) {

                // Hapus file lama dari S3
                if ($maklumatStandar->file) {
                    Storage::disk('s3')->delete($maklumatStandar->file);
                }

                // Upload file PDF baru ke S3
                $filePath = Storage::disk('s3')->putFile(
                    'maklumat-standar',
                    $request->file('file')
                );
            }

            // Update data
            $maklumatStandar->update([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'file' => $filePath,
            ]);

            return redirect()
                ->route('redesign.backoffice.maklumat-standar.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.maklumat-standar.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $maklumatStandar = MaklumatStandar::findOrFail($id);

            // Hapus file lama dari S3
            if ($maklumatStandar->file) {
                Storage::disk('s3')->delete($maklumatStandar->file);
            }

            $maklumatStandar->delete();

            return redirect()
                ->route('redesign.backoffice.maklumat-standar.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.maklumat-standar.index')
                ->with('error', $e->getMessage());
        }
    }
}
