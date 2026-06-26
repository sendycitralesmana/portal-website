<?php

use App\Http\Controllers\BackOffice\DraftRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\BerandaRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\KewenanganRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\LayananRedesignController;
use App\Http\Controllers\BackOffice\Redesign\PejabatStrukturalRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\PerwakilanDaerahRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\ProfilPimpinanRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\ProgramPerlindunganRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\PublikasiRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\SosialMediaRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\StrukturOrganisasiRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\SubjekTerlindungRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\TentangKamiRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\TindakPidanaTertentuRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\VideoInfoRedesignBackController;
use App\Http\Controllers\BackOffice\Redesign\VisiMisiRedesignBackController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FrontOffice\Redesign\BerandaRedesignController;
use App\Http\Controllers\FrontOffice\Redesign\ProfilRedesignController;
use App\Http\Controllers\FrontOffice\Redesign\TugasFungsiRedesignController;

// redesign routes 

// grup redesign
Route::prefix('redesign')->group(function () {
    // beranda
    Route::get('/', [BerandaRedesignController::class, 'index'])->name('redesign.home');

    Route::get('/cari', [BerandaRedesignController::class, 'cari'])->name('redesign.cari');

    // maklumat
    Route::get('/maklumat', [BerandaRedesignController::class, 'maklumat'])->name('redesign.maklumat');

    // beranda
    Route::get('/beranda', [BerandaRedesignController::class, 'beranda'])->name('redesign.beranda');

    // sosial media
    Route::get('/sosial-media', [BerandaRedesignController::class, 'sosialMedia'])->name('redesign.sosial-media');

    // statistik
    Route::get('/statistik', [BerandaRedesignController::class, 'statistik'])->name('redesign.statistik');

    // footer
    Route::get('/gpr', [BerandaRedesignController::class, 'gpr'])->name('redesign.gpr');

    // profil
    Route::prefix('/profil')->group(function () {
        Route::get('/visi-misi', [ProfilRedesignController::class, 'visiMisi'])->name('redesign.profil.visi-misi');
        Route::get('/profil-pimpinan', [ProfilRedesignController::class, 'profilPimpinan'])->name('redesign.profil.profil-pimpinan');
        Route::get('/struktur-organisasi', [ProfilRedesignController::class, 'strukturOrganisasi'])->name('redesign.profil.struktur-organisasi');
        Route::get('/pejabat-struktural', [ProfilRedesignController::class, 'pejabatStruktural'])->name('redesign.profil.pejabat-struktural');
        Route::get('/perwakilan-daerah', [ProfilRedesignController::class, 'perwakilanDaerah'])->name('redesign.profil.perwakilan-daerah');
    });

    // tugas fungsi
    Route::prefix('/tugas-fungsi')->group(function () {
        Route::get('/kewenangan', [TugasFungsiRedesignController::class, 'kewenangan'])->name('redesign.profil.kewenangan');
        Route::get('/subjek-pelindungan', [TugasFungsiRedesignController::class, 'subjekTerlindung'])->name('redesign.profil.subjek-terlindung');
        Route::get('/tindak-pidana-prioritas', [TugasFungsiRedesignController::class, 'tindakPidanaTertentu'])->name('redesign.profil.tindak-pidana-tertentu');
        Route::get('/program-pelindungan', [TugasFungsiRedesignController::class, 'programPerlindungan'])->name('redesign.profil.program-perlindungan');
    });

    // publikasi
    Route::prefix('/publikasi')->group(function () {
        // Route::get('/', [BerandaRedesignController::class, 'publikasi'])->name('redesign.publikasi');

        // // publikasi id
        // Route::prefix('/{id}')->group(function () {
        //     Route::get('/detail', [BerandaRedesignController::class, 'publikasiDetail'])->name('redesign.publikasi.detail');
        // });

        // {kategori}
        Route::prefix('/{kategori}')->group(function () {
            Route::get('/', [BerandaRedesignController::class, 'publikasiKategori'])->name('redesign.publikasi.kategori');

            // slug
            Route::prefix('/{slug}')->group(function () {
                Route::get('/', [BerandaRedesignController::class, 'publikasiSlug'])->name('redesign.publikasi.slug');
            });
        });

        // siaran-pers
        // Route::prefix('/siaran-pers')->group(function () {
        //     Route::get('/', [BerandaRedesignController::class, 'siaranPers'])->name('redesign.siaran-pers');

        //     // siaran-pers id
        //     Route::prefix('/{id}')->group(function () {
        //         Route::get('/detail', [BerandaRedesignController::class, 'siaranPersDetail'])->name('redesign.siaran-pers.detail');
        //     });
        // });

    });

    // berita-foto
    Route::prefix('/berita-foto')->group(function () {
        Route::get('/', [BerandaRedesignController::class, 'beritaFoto'])->name('redesign.berita-foto');

        // slug
        Route::prefix('/{slug}')->group(function () {
            Route::get('/', [BerandaRedesignController::class, 'beritaFotoSlug'])->name('redesign.berita-foto.slug');
        });

        // berita-foto id
        // Route::prefix('/{id}')->group(function () {
        //     Route::get('/detail', [BerandaRedesignController::class, 'beritaFotoDetail'])->name('redesign.berita-foto.detail');
        //     Route::get('/galeri', [BerandaRedesignController::class, 'beritaFotoGaleri'])->name('redesign.berita-foto.galeri');
        // });
    });

    // backoffice
    Route::prefix('/backoffice')->group(function () {
        Route::get('/beranda', [BerandaRedesignBackController::class, 'beranda'])->name('dashboard');

        // grup draft
        Route::prefix('draft')->group(function () {
            Route::get('/', [DraftRedesignBackController::class, 'index'])->name('redesign.backoffice.draft.index');
            Route::get('/update-sub-category-id', [DraftRedesignBackController::class, 'updateSubCategoryId'])->name('redesign.backoffice.draft.update-sub-category-id');
            Route::get('/migrate-publikasi', [DraftRedesignBackController::class, 'migratePublikasi'])->name('redesign.backoffice.draft.migrate-publikasi');
            Route::get('/update-gambar-publikasi', [DraftRedesignBackController::class, 'updateGambarPublikasi'])->name('redesign.backoffice.draft.update-gambar-publikasi');
            Route::get('/update-kategori-publikasi', [DraftRedesignBackController::class, 'updateKategoriPublikasi'])->name('redesign.backoffice.draft.update-kategori-publikasi');
        });

        // grup publikasi
        Route::prefix('publikasi')->group(function () {
            Route::get('/', [PublikasiRedesignBackController::class, 'index'])->name('redesign.backoffice.publikasi.index');
            Route::get('/create', [PublikasiRedesignBackController::class, 'create'])->name('redesign.backoffice.publikasi.create');
            Route::post('/store', [PublikasiRedesignBackController::class, 'store'])->name('redesign.backoffice.publikasi.store');
            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/detail', [PublikasiRedesignBackController::class, 'detail'])->name('redesign.backoffice.publikasi.detail');
                Route::get('/edit', [PublikasiRedesignBackController::class, 'edit'])->name('redesign.backoffice.publikasi.edit');
                Route::put('/update', [PublikasiRedesignBackController::class, 'update'])->name('redesign.backoffice.publikasi.update');
                Route::delete('/delete', [PublikasiRedesignBackController::class, 'destroy'])->name('redesign.backoffice.publikasi.destroy');
            });
        });

        // grup publikasi-media
        Route::prefix('publikasi-media')->group(function () {
            Route::post('/store', [PublikasiRedesignBackController::class, 'publikasiMediaStore'])->name('redesign.backoffice.publikasi-media.store');
            // grup id
            Route::prefix('{id}')->group(function () {
                Route::post('/update', [PublikasiRedesignBackController::class, 'publikasiMediaUpdate'])->name('redesign.backoffice.publikasi-media.update');
                Route::delete('/delete', [PublikasiRedesignBackController::class, 'publikasiMediaDestroy'])->name('redesign.backoffice.publikasi-media.destroy');
            });
        });

        // grup tentang kami
        Route::prefix('tentang-kami')->group(function () {
            Route::get('/', [TentangKamiRedesignBackController::class, 'index'])->name('redesign.backoffice.tentang-kami.index');
            Route::get('/create', [TentangKamiRedesignBackController::class, 'create'])->name('redesign.backoffice.tentang-kami.create');
            Route::post('/store', [TentangKamiRedesignBackController::class, 'store'])->name('redesign.backoffice.tentang-kami.store');
            // api
            Route::get('/api', [TentangKamiRedesignBackController::class, 'apiTentangKami'])->name('redesign.backoffice.tentang-kami.api');
            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [TentangKamiRedesignBackController::class, 'edit'])->name('redesign.backoffice.tentang-kami.edit');
                Route::put('/update', [TentangKamiRedesignBackController::class, 'update'])->name('redesign.backoffice.tentang-kami.update');
                Route::delete('/delete', [TentangKamiRedesignBackController::class, 'destroy'])->name('redesign.backoffice.tentang-kami.destroy');
            });
        });

        // grup layanan
        Route::prefix('layanan')->group(function () {
            Route::get('/', [LayananRedesignController::class, 'index'])->name('redesign.backoffice.layanan.index');
            Route::get('/create', [LayananRedesignController::class, 'create'])->name('redesign.backoffice.layanan.create');
            Route::post('/store', [LayananRedesignController::class, 'store'])->name('redesign.backoffice.layanan.store');
            // api
            Route::get('/api', [LayananRedesignController::class, 'apiTentangKami'])->name('redesign.backoffice.layanan.api');
            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [LayananRedesignController::class, 'edit'])->name('redesign.backoffice.layanan.edit');
                Route::put('/update', [LayananRedesignController::class, 'update'])->name('redesign.backoffice.layanan.update');
                Route::delete('/delete', [LayananRedesignController::class, 'destroy'])->name('redesign.backoffice.layanan.destroy');
            });
        });

        // grup video-info
        Route::prefix('video-info')->group(function () {
            Route::get('/', [VideoInfoRedesignBackController::class, 'index'])->name('redesign.backoffice.video-info.index');
            Route::get('/create', [VideoInfoRedesignBackController::class, 'create'])->name('redesign.backoffice.video-info.create');
            Route::post('/store', [VideoInfoRedesignBackController::class, 'store'])->name('redesign.backoffice.video-info.store');
            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [VideoInfoRedesignBackController::class, 'edit'])->name('redesign.backoffice.video-info.edit');
                Route::put('/update', [VideoInfoRedesignBackController::class, 'update'])->name('redesign.backoffice.video-info.update');
                Route::delete('/delete', [VideoInfoRedesignBackController::class, 'destroy'])->name('redesign.backoffice.video-info.destroy');
            });
        });

        // grup sosial-media
        Route::prefix('sosial-media')->group(function () {
            Route::get('/', [SosialMediaRedesignBackController::class, 'index'])->name('redesign.backoffice.sosial-media.index');
            Route::get('/create', [SosialMediaRedesignBackController::class, 'create'])->name('redesign.backoffice.sosial-media.create');
            Route::post('/store', [SosialMediaRedesignBackController::class, 'store'])->name('redesign.backoffice.sosial-media.store');
            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [SosialMediaRedesignBackController::class, 'edit'])->name('redesign.backoffice.sosial-media.edit');
                Route::put('/update', [SosialMediaRedesignBackController::class, 'update'])->name('redesign.backoffice.sosial-media.update');
                Route::delete('/delete', [SosialMediaRedesignBackController::class, 'destroy'])->name('redesign.backoffice.sosial-media.destroy');
            });
        });

        // grup profil
        Route::prefix('/profil')->group(function () {

            // grup visi-misi
            Route::prefix('visi-misi')->group(function () {
                Route::get('/', [VisiMisiRedesignBackController::class, 'index'])->name('redesign.backoffice.profil.visi-misi.index');
                Route::get('/create', [VisiMisiRedesignBackController::class, 'create'])->name('redesign.backoffice.profil.visi-misi.create');
                Route::post('/store', [VisiMisiRedesignBackController::class, 'store'])->name('redesign.backoffice.profil.visi-misi.store');

                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [VisiMisiRedesignBackController::class, 'edit'])->name('redesign.backoffice.profil.visi-misi.edit');
                    Route::put('/update', [VisiMisiRedesignBackController::class, 'update'])->name('redesign.backoffice.profil.visi-misi.update');
                    Route::delete('/delete', [VisiMisiRedesignBackController::class, 'destroy'])->name('redesign.backoffice.profil.visi-misi.destroy');
                });
            });

            // grup profil pimpinan
            Route::prefix('profil-pimpinan')->group(function () {
                Route::get('/', [ProfilPimpinanRedesignBackController::class, 'index'])->name('redesign.backoffice.profil.profil-pimpinan.index');
                Route::get('/create', [ProfilPimpinanRedesignBackController::class, 'create'])->name('redesign.backoffice.profil.profil-pimpinan.create');
                Route::post('/store', [ProfilPimpinanRedesignBackController::class, 'store'])->name('redesign.backoffice.profil.profil-pimpinan.store');

                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [ProfilPimpinanRedesignBackController::class, 'edit'])->name('redesign.backoffice.profil.profil-pimpinan.edit');
                    Route::put('/update', [ProfilPimpinanRedesignBackController::class, 'update'])->name('redesign.backoffice.profil.profil-pimpinan.update');
                    Route::delete('/delete', [ProfilPimpinanRedesignBackController::class, 'destroy'])->name('redesign.backoffice.profil.profil-pimpinan.destroy');
                });
            });

            // grup struktur organisasi
            Route::prefix('struktur-organisasi')->group(function () {
                Route::get('/', [StrukturOrganisasiRedesignBackController::class, 'index'])->name('redesign.backoffice.profil.struktur-organisasi.index');
                Route::get('/create', [StrukturOrganisasiRedesignBackController::class, 'create'])->name('redesign.backoffice.profil.struktur-organisasi.create');
                Route::post('/store', [StrukturOrganisasiRedesignBackController::class, 'store'])->name('redesign.backoffice.profil.struktur-organisasi.store');
                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [StrukturOrganisasiRedesignBackController::class, 'edit'])->name('redesign.backoffice.profil.struktur-organisasi.edit');
                    Route::put('/update', [StrukturOrganisasiRedesignBackController::class, 'update'])->name('redesign.backoffice.profil.struktur-organisasi.update');
                    Route::delete('/delete', [StrukturOrganisasiRedesignBackController::class, 'destroy'])->name('redesign.backoffice.profil.struktur-organisasi.destroy');
                });
            });

            // grup pejabat struktural
            Route::prefix('pejabat-struktural')->group(function () {
                Route::get('/', [PejabatStrukturalRedesignBackController::class, 'index'])->name('redesign.backoffice.profil.pejabat-struktural.index');
                Route::get('/create', [PejabatStrukturalRedesignBackController::class, 'create'])->name('redesign.backoffice.profil.pejabat-struktural.create');
                Route::post('/store', [PejabatStrukturalRedesignBackController::class, 'store'])->name('redesign.backoffice.profil.pejabat-struktural.store');

                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [PejabatStrukturalRedesignBackController::class, 'edit'])->name('redesign.backoffice.profil.pejabat-struktural.edit');
                    Route::put('/update', [PejabatStrukturalRedesignBackController::class, 'update'])->name('redesign.backoffice.profil.pejabat-struktural.update');
                    Route::delete('/delete', [PejabatStrukturalRedesignBackController::class, 'destroy'])->name('redesign.backoffice.profil.pejabat-struktural.destroy');
                });
            });

            // grup perwakilan daerah
            Route::prefix('perwakilan-daerah')->group(function () {
                Route::get('/', [PerwakilanDaerahRedesignBackController::class, 'index'])->name('redesign.backoffice.profil.perwakilan-daerah.index');
                Route::get('/create', [PerwakilanDaerahRedesignBackController::class, 'create'])->name('redesign.backoffice.profil.perwakilan-daerah.create');
                Route::post('/store', [PerwakilanDaerahRedesignBackController::class, 'store'])->name('redesign.backoffice.profil.perwakilan-daerah.store');
                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [PerwakilanDaerahRedesignBackController::class, 'edit'])->name('redesign.backoffice.profil.perwakilan-daerah.edit');
                    Route::put('/update', [PerwakilanDaerahRedesignBackController::class, 'update'])->name('redesign.backoffice.profil.perwakilan-daerah.update');
                    Route::delete('/delete', [PerwakilanDaerahRedesignBackController::class, 'destroy'])->name('redesign.backoffice.profil.perwakilan-daerah.destroy');
                });
            });
        });

        // grup tugas fungsi
        Route::prefix('/tugas-fungsi')->group(function () {

            // grup kewenangan
            Route::prefix('kewenangan')->group(function () {
                Route::get('/', [KewenanganRedesignBackController::class, 'index'])->name('redesign.backoffice.tugas-fungsi.kewenangan.index');
                Route::get('/create', [KewenanganRedesignBackController::class, 'create'])->name('redesign.backoffice.tugas-fungsi.kewenangan.create');
                Route::post('/store', [KewenanganRedesignBackController::class, 'store'])->name('redesign.backoffice.tugas-fungsi.kewenangan.store');
                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [KewenanganRedesignBackController::class, 'edit'])->name('redesign.backoffice.tugas-fungsi.kewenangan.edit');
                    Route::put('/update', [KewenanganRedesignBackController::class, 'update'])->name('redesign.backoffice.tugas-fungsi.kewenangan.update');
                    Route::delete('/delete', [KewenanganRedesignBackController::class, 'destroy'])->name('redesign.backoffice.tugas-fungsi.kewenangan.destroy');
                });
            });

            // grup subjek terlindung
            Route::prefix('subjek-terlindung')->group(function () {
                Route::get('/', [SubjekTerlindungRedesignBackController::class, 'index'])->name('redesign.backoffice.tugas-fungsi.subjek-terlindung.index');
                Route::get('/create', [SubjekTerlindungRedesignBackController::class, 'create'])->name('redesign.backoffice.tugas-fungsi.subjek-terlindung.create');
                Route::post('/store', [SubjekTerlindungRedesignBackController::class, 'store'])->name('redesign.backoffice.tugas-fungsi.subjek-terlindung.store');
                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [SubjekTerlindungRedesignBackController::class, 'edit'])->name('redesign.backoffice.tugas-fungsi.subjek-terlindung.edit');
                    Route::put('/update', [SubjekTerlindungRedesignBackController::class, 'update'])->name('redesign.backoffice.tugas-fungsi.subjek-terlindung.update');
                    Route::delete('/delete', [SubjekTerlindungRedesignBackController::class, 'destroy'])->name('redesign.backoffice.tugas-fungsi.subjek-terlindung.destroy');
                });
            });

            // grup tindak pidana tertentu
            Route::prefix('tindak-pidana-tertentu')->group(function () {
                Route::get('/', [TindakPidanaTertentuRedesignBackController::class, 'index'])->name('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.index');
                Route::get('/create', [TindakPidanaTertentuRedesignBackController::class, 'create'])->name('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.create');
                Route::post('/store', [TindakPidanaTertentuRedesignBackController::class, 'store'])->name('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.store');
                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [TindakPidanaTertentuRedesignBackController::class, 'edit'])->name('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.edit');
                    Route::put('/update', [TindakPidanaTertentuRedesignBackController::class, 'update'])->name('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.update');
                    Route::delete('/delete', [TindakPidanaTertentuRedesignBackController::class, 'destroy'])->name('redesign.backoffice.tugas-fungsi.tindak-pidana-tertentu.destroy');
                });
            });

            // grup program perlindungan
            Route::prefix('program-perlindungan')->group(function () {
                Route::get('/', [ProgramPerlindunganRedesignBackController::class, 'index'])->name('redesign.backoffice.tugas-fungsi.program-perlindungan.index');
                Route::get('/create', [ProgramPerlindunganRedesignBackController::class, 'create'])->name('redesign.backoffice.tugas-fungsi.program-perlindungan.create');
                Route::post('/store', [ProgramPerlindunganRedesignBackController::class, 'store'])->name('redesign.backoffice.tugas-fungsi.program-perlindungan.store');
                // grup id
                Route::prefix('{id}')->group(function () {
                    Route::get('/edit', [ProgramPerlindunganRedesignBackController::class, 'edit'])->name('redesign.backoffice.tugas-fungsi.program-perlindungan.edit');
                    Route::put('/update', [ProgramPerlindunganRedesignBackController::class, 'update'])->name('redesign.backoffice.tugas-fungsi.program-perlindungan.update');
                    Route::delete('/delete', [ProgramPerlindunganRedesignBackController::class, 'destroy'])->name('redesign.backoffice.tugas-fungsi.program-perlindungan.destroy');
                });
            });
        });
    });
});
