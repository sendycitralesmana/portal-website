<?php

namespace App\Http\Controllers\BackOffice\Redesign;

use App\Http\Controllers\Controller;
use App\Http\Requests\PublikasiMediaRequest;
use App\Http\Requests\PublikasiRequest;
use App\Http\Resources\PublikasiResource;
use App\Models\Publikasi;
use App\Models\PublikasiMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $publikasis = Publikasi::with('media')
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
            // ->where('gambar', '!=', null)
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

    public function detail($id)
    {
        $publikasi = Publikasi::with('media')->findOrFail($id);

        return Inertia::render('backoffice/redesign/publikasi/detail', [
            'publikasi' => new PublikasiResource($publikasi)
        ]);
    }

    public function create()
    {
        return Inertia::render('backoffice/redesign/publikasi/create', [
            
        ]);
    }

    public function store(PublikasiRequest $request)
    {
        DB::beginTransaction();

        // Array untuk menyimpan semua path file yang sudah di-upload
        $uploadedFiles = [];

        try {

            $gambarPath = null;

            /*
            |--------------------------------------------------------------------------
            | Upload Thumbnail Publikasi
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('gambar')) {

                $gambarPath = Storage::disk('s3')
                    ->putFile('publikasi-redesign', $request->file('gambar'));

                // Simpan path agar bisa dihapus jika error
                $uploadedFiles[] = $gambarPath;
            }

            /*
            |--------------------------------------------------------------------------
            | Simpan Publikasi
            |--------------------------------------------------------------------------
            */

            $publikasi = Publikasi::create([
                'jenis' => $request->jenis,
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'slug' => $this->generateUniqueSlug($request->judul),
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
                'tanggal' => now(),
            ]);

            /*
            |--------------------------------------------------------------------------
            | Simpan Publikasi Media (Multiple)
            |--------------------------------------------------------------------------
            */

            if ($request->has('media')) {

                foreach ($request->media as $media) {

                    if (!empty($media['file'])) {

                        $filePath = Storage::disk('s3')
                            ->putFile('publikasi-media', $media['file']);

                        // Simpan path agar bisa dihapus jika error
                        $uploadedFiles[] = $filePath;

                        PublikasiMedia::create([
                            'publikasi_id' => $publikasi->id,
                            'kategori' => $media['kategori'],
                            'judul' => $media['judul'] ?? null,
                            'deskripsi' => $media['deskripsi'] ?? null,
                            'file' => $filePath,
                        ]);
                    }
                }
            }

            DB::commit();

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('success', 'Data berhasil dibuat');

        } catch (Throwable $e) {

            DB::rollBack();

            /*
            |--------------------------------------------------------------------------
            | Hapus semua file yang sudah di-upload jika terjadi error
            |--------------------------------------------------------------------------
            */
            foreach ($uploadedFiles as $file) {
                if (Storage::disk('s3')->exists($file)) {
                    Storage::disk('s3')->delete($file);
                }
            }

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function edit($id)
    {
        $publikasi = Publikasi::with('media')->findOrFail($id);

        return Inertia::render('backoffice/redesign/publikasi/edit', [
            'publikasi' => new PublikasiResource($publikasi)
        ]);
    }

    public function update(PublikasiRequest $request, $id)
    {
        DB::beginTransaction();

        $uploadedFiles = [];

        try {

            $publikasi = Publikasi::with('media')->findOrFail($id);

            $gambarPath = $publikasi->gambar;

            /*
            |--------------------------------------------------------------------------
            | Upload Thumbnail Publikasi
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('gambar')) {

                if ($publikasi->gambar && Storage::disk('s3')->exists($publikasi->gambar)) {
                    Storage::disk('s3')->delete($publikasi->gambar);
                }

                $gambarPath = Storage::disk('s3')
                    ->putFile('publikasi-redesign', $request->file('gambar'));

                $uploadedFiles[] = $gambarPath;
            }

            /*
            |--------------------------------------------------------------------------
            | Update Publikasi
            |--------------------------------------------------------------------------
            */

            $publikasi->update([
                'jenis' => $request->jenis,
                'kategori' => $request->kategori,
                'judul' => $request->judul,
                'slug' => $this->generateUniqueSlug($request->judul, $id),
                'deskripsi' => $request->deskripsi,
                'gambar' => $gambarPath,
            ]);

            /*
            |--------------------------------------------------------------------------
            | Hapus Media Lama Jika Dihapus di Form
            |--------------------------------------------------------------------------
            */

            if ($request->has('deleted_media_ids')) {

                $medias = PublikasiMedia::whereIn('id', $request->deleted_media_ids)->get();

                foreach ($medias as $media) {

                    if ($media->file && Storage::disk('s3')->exists($media->file)) {
                        Storage::disk('s3')->delete($media->file);
                    }

                    $media->delete();
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Tambah Publikasi Media Baru
            |--------------------------------------------------------------------------
            */

            if ($request->has('media')) {

                foreach ($request->media as $media) {

                    if (!empty($media['file'])) {

                        $filePath = Storage::disk('s3')
                            ->putFile('publikasi-media', $media['file']);

                        $uploadedFiles[] = $filePath;

                        PublikasiMedia::create([
                            'publikasi_id' => $publikasi->id,
                            'kategori' => $media['kategori'],
                            'judul' => $media['judul'] ?? null,
                            'deskripsi' => $media['deskripsi'] ?? null,
                            'file' => $filePath,
                        ]);
                    }
                }
            }

            DB::commit();

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('success', 'Data berhasil diubah');

        } catch (Throwable $e) {

            DB::rollBack();

            /*
            |--------------------------------------------------------------------------
            | Hapus File Jika Upload Gagal
            |--------------------------------------------------------------------------
            */

            foreach ($uploadedFiles as $file) {
                if (Storage::disk('s3')->exists($file)) {
                    Storage::disk('s3')->delete($file);
                }
            }

            return redirect()
                ->route('redesign.backoffice.publikasi.index')
                ->with('error', $e->getMessage());
        }
    }

    public function destroy($id)
    {
        try {
            $publikasi = Publikasi::with('media')->findOrFail($id);

            // Hapus file thumbnail jika ada
            if ($publikasi->gambar && Storage::disk('s3')->exists($publikasi->gambar)) {
                Storage::disk('s3')->delete($publikasi->gambar);
            }

            // Hapus semua media terkait dan file-nya dari S3
            foreach ($publikasi->media as $media) {
                if ($media->file && Storage::disk('s3')->exists($media->file)) {
                    Storage::disk('s3')->delete($media->file);
                }
                $media->delete();
            }

            // Hapus publikasi
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

    // Publikasi Media
    public function publikasiMediaStore(PublikasiMediaRequest $request)
    {
        try {
            $filePath = null;

            if ($request->hasFile('file')) {
                $filePath = Storage::disk('s3')
                    ->putFile('publikasi-media', $request->file('file'));
            }

            PublikasiMedia::create([
                'publikasi_id' => $request->publikasi_id,
                'kategori' => $request->kategori,
                'judul' => $request->judul ?? null,
                'deskripsi' => $request->deskripsi ?? null,
                'file' => $filePath,
            ]);

            return redirect('/redesign/backoffice/publikasi/' . $request->publikasi_id . '/detail')
                ->with('success', 'Data berhasil dibuat');
        } catch (Throwable $e) {
            return redirect('/redesign/backoffice/publikasi/' . $request->publikasi_id . '/detail')
                ->with('error', $e->getMessage());
        }
    }

    public function publikasiMediaUpdate(Request $request, $id)
    {
        try {
            $media = PublikasiMedia::findOrFail($id);

            if ($request->hasFile('file')) {
                if ($media->file && Storage::disk('s3')->exists($media->file)) {
                    Storage::disk('s3')->delete($media->file);
                }

                $filePath = Storage::disk('s3')
                    ->putFile('publikasi-media', $request->file('file'));
            }

            $media->update([
                'judul' => $request->judul,
                'deskripsi' => $request->deskripsi,
                'file' => $filePath ?? $media->file,
            ]);

            return redirect('/redesign/backoffice/publikasi/' . $media->publikasi_id . '/detail')
                ->with('success', 'Data berhasil diubah');
        } catch (Throwable $e) {
            return redirect('/redesign/backoffice/publikasi/' . $media->publikasi_id . '/detail')
                ->with('error', $e->getMessage());
        }
    }

    public function publikasiMediaDestroy($id)
    {
        try {
            $media = PublikasiMedia::findOrFail($id);

            if ($media->file && Storage::disk('s3')->exists($media->file)) {
                Storage::disk('s3')->delete($media->file);
            }

            $media->delete();

            return redirect('/redesign/backoffice/publikasi/' . $media->publikasi_id . '/detail')
                ->with('success', 'Data berhasil dihapus');

        } catch (Throwable $e) {
            $media = PublikasiMedia::findOrFail($id);
            return redirect('/redesign/backoffice/publikasi/' . $media->publikasi_id . '/detail')
                ->with('error', $e->getMessage());
        }
    }
}
