<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\TentangKamiRequest;
use App\Http\Resources\TentangKamiResource;
use App\Models\TentangKami;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Throwable;

class TentangKamiRedesignBackController extends Controller
{
    public function index()
    {
        $tentangKamis = TentangKami::query()
            ->when(request()->search, function ($query, $value) {
                $query->where(function ($q) use ($value) {
                    $q->where('alamat', 'ILIKE', "%{$value}%")
                    ->orWhere('telepon', 'ILIKE', "%{$value}%")
                    ->orWhere('hotline', 'ILIKE', "%{$value}%")
                    ->orWhere('whatsapp', 'ILIKE', "%{$value}%")
                    ->orWhere('email', 'ILIKE', "%{$value}%")
                    ->orWhere('jam_operasional', 'ILIKE', "%{$value}%")
                    ->orWhere('latitude', 'ILIKE', "%{$value}%")
                    ->orWhere('longitude', 'ILIKE', "%{$value}%");
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

        return Inertia::render('backoffice/redesign/tentang-kami/page', [
            'tentangKamis' => TentangKamiResource::collection($tentangKamis),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => request()->load ?? 10,
            ],
        ]);
    }

    public function edit($id)
    {
        $tentangKami = TentangKami::findOrFail($id);

        return Inertia::render('backoffice/redesign/tentang-kami/edit', [
            'tentangKami' => new TentangKamiResource($tentangKami)
        ]);
    }

    public function update(TentangKamiRequest $request, $id)
    {
        try {
            $tentangKami = TentangKami::findOrFail($id);

            $gambarPath = $tentangKami->gambar; // default gambar lama

            if ($request->hasFile('gambar')) {

                // hapus lama
                if ($tentangKami->gambar) {
                    Storage::disk('s3')->delete($tentangKami->gambar);
                }

                // upload baru
                $path = Storage::disk('s3')
                    ->putFile('tentang-kami', $request->file('gambar'));

                $gambarPath = $path;
            }

            $gambarPath = null;

            $tentangKami->update([
                'alamat' => $request->alamat,
                'telepon' => $request->telepon,
                'hotline' => $request->hotline,
                'whatsapp' => $request->whatsapp,
                'email' => $request->email,
                'jam_operasional' => $request->jam_operasional,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'gambar' => $gambarPath,
            ]);

            return redirect()
                ->route('redesign.backoffice.tentang-kami.index')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {

            return redirect()
                ->route('redesign.backoffice.tentang-kami.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $tentangKami = TentangKami::findOrFail($id);
            $tentangKami->delete();

            return redirect()
                ->route('redesign.backoffice.tentang-kami.index')
                ->with('success', 'Data berhasil dihapus');
        } catch (Throwable $e) {
            return redirect()
                ->route('redesign.backoffice.tentang-kami.index')
                ->with('error', $e->getMessage());
        }
    }

    public function apiTentangKami()
    {
        $tentangKami = TentangKami::query()
            ->first();

        return response()->json($tentangKami);
    }
}
