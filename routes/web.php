<?php

// use App\Http\Controllers\BackOffice\AboutUsController;
// use App\Http\Controllers\BackOffice\AffiliateController;
// use App\Http\Controllers\BackOffice\ApplicationController;
// use App\Http\Controllers\BackOffice\DashboardController;
// use App\Http\Controllers\BackOffice\HighlightController;
// use App\Http\Controllers\BackOffice\InstitusionController;
// use App\Http\Controllers\BackOffice\NewsController;
// use App\Http\Controllers\BackOffice\ProfileUserController;
// use App\Http\Controllers\BackOffice\ProtectionServiceController;
// use App\Http\Controllers\BackOffice\PublicationController;
// use App\Http\Controllers\BackOffice\RepresentativeController;
// use App\Http\Controllers\BackOffice\ServiceController;
// use App\Http\Controllers\BackOffice\StructureController;
// use App\Http\Controllers\BackOffice\UserController;
// use App\Http\Controllers\BackOffice\WorkUnitController;
// use App\Http\Controllers\FrontOffice\BerandaFrontController;
// use App\Http\Controllers\FrontOffice\BeritaFrontController;
// use App\Http\Controllers\FrontOffice\PerwakilanController;
// use App\Http\Controllers\FrontOffice\ProfilFrontController;
// use App\Http\Controllers\FrontOffice\PublikasiFrontController;
// use App\Http\Controllers\FrontOffice\UnduhDokumenController;
// use App\Models\User;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Storage;
// use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

// Route::get('/', function () {
//     return Inertia::render('page');
// })->name('home');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// Route::middleware('auth')->group(function () {

//     // grup backoffice
//     Route::prefix('backoffice')->group(function () {
        
//         // grup dashboard
//         Route::prefix('dashboard')->group(function () {
//             Route::get('/', [DashboardController::class, 'index'])->name('backoffice.dashboard');
//         });

//         // grup user
//         Route::prefix('user')->group(function () {
//             Route::get('/', [UserController::class, 'index'])->name('backoffice.user.index');
//         });

//         // grup aplikasi
//         Route::prefix('aplikasi')->group(function () {
//             Route::get('/', [ApplicationController::class, 'index'])->name('backoffice.aplikasi.index');
//             Route::get('/tambah', [ApplicationController::class, 'create'])->name('backoffice.aplikasi.create');
//             Route::post('/simpan', [ApplicationController::class, 'store'])->name('aplikasi.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [ApplicationController::class, 'edit'])->name('backoffice.aplikasi.edit');
//                 Route::post('/update', [ApplicationController::class, 'update'])->name('aplikasi.update');
//                 Route::delete('/delete', [ApplicationController::class, 'destroy'])->name('aplikasi.destroy');
//             });
//         });

//         // grup afiliasi
//         Route::prefix('afiliasi')->group(function () {
//             Route::get('/', [AffiliateController::class, 'index'])->name('backoffice.afiliasi.index');
//             Route::get('/tambah', [AffiliateController::class, 'create'])->name('backoffice.afiliasi.create');
//             Route::post('/simpan', [AffiliateController::class, 'store'])->name('afiliasi.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [AffiliateController::class, 'edit'])->name('backoffice.afiliasi.edit');
//                 Route::post('/update', [AffiliateController::class, 'update'])->name('afiliasi.update');
//                 Route::delete('/delete', [AffiliateController::class, 'destroy'])->name('afiliasi.destroy');
//             });
//         });
        
//         // grup profil
//         Route::prefix('profil')->group(function () {
//             Route::get('/', [ProfileUserController::class, 'index'])->name('backoffice.profil.index');
//             Route::get('/add', [ProfileUserController::class, 'create'])->name('backoffice.profil.create');
//             Route::post('/simpan', [ProfileUserController::class, 'store'])->name('backoffice.profil.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [ProfileUserController::class, 'edit'])->name('backoffice.profil.edit');
//                 Route::post('/update', [ProfileUserController::class, 'update'])->name('backoffice.profil.update');
//                 Route::delete('/delete', [ProfileUserController::class, 'destroy'])->name('backoffice.profil.destroy');
//                 Route::get('/detail', [ProfileUserController::class, 'detail'])->name('backoffice.profil.detail');
//             });
//         });

//         // grup struktur
//         Route::prefix('struktur')->group(function () {
//             Route::get('/', [StructureController::class, 'index'])->name('backoffice.struktur.index');
//             Route::get('/add', [StructureController::class, 'create'])->name('backoffice.struktur.create');
//             Route::post('/simpan', [StructureController::class, 'store'])->name('backoffice.struktur.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [StructureController::class, 'edit'])->name('backoffice.struktur.edit');
//                 Route::post('/update', [StructureController::class, 'update'])->name('backoffice.struktur.update');
//                 Route::delete('/delete', [StructureController::class, 'destroy'])->name('backoffice.struktur.destroy');
//                 Route::get('/detail', [StructureController::class, 'detail'])->name('backoffice.struktur.detail');
//             });
//         });

//         // grup lembaga
//         Route::prefix('lembaga')->group(function () {
//             Route::get('/', [InstitusionController::class, 'index'])->name('backoffice.lembaga.index');
//             Route::get('/add', [InstitusionController::class, 'create'])->name('backoffice.lembaga.create');
//             Route::post('/simpan', [InstitusionController::class, 'store'])->name('backoffice.lembaga.store');
//             // Route::get('/preview-document', [InstitusionController::class, 'previewDocument'])->name('backoffice.lembaga.preview-document');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [InstitusionController::class, 'edit'])->name('backoffice.lembaga.edit');
//                 Route::post('/update', [InstitusionController::class, 'update'])->name('backoffice.lembaga.update');
//                 Route::delete('/delete', [InstitusionController::class, 'destroy'])->name('backoffice.lembaga.destroy');
//                 Route::get('/detail', [InstitusionController::class, 'detail'])->name('backoffice.lembaga.detail');
//                 Route::get('/preview-document', [InstitusionController::class, 'previewDocumentUrl'])->name('backoffice.lembaga.preview-document');
//             });
//         });
        
//         // grup unit-kerja
//         Route::prefix('unit-kerja')->group(function () {
//             Route::get('/', [WorkUnitController::class, 'index'])->name('backoffice.unit-kerja.index');
//             Route::get('/add', [WorkUnitController::class, 'create'])->name('backoffice.unit-kerja.create');
//             Route::post('/simpan', [WorkUnitController::class, 'store'])->name('backoffice.unit-kerja.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [WorkUnitController::class, 'edit'])->name('backoffice.unit-kerja.edit');
//                 Route::post('/update', [WorkUnitController::class, 'update'])->name('backoffice.unit-kerja.update');
//                 Route::delete('/delete', [WorkUnitController::class, 'destroy'])->name('backoffice.unit-kerja.destroy');
//                 Route::get('/preview-document', [WorkUnitController::class, 'previewDocument'])->name('backoffice.unit-kerja.preview-document');
//                 Route::get('/detail', [WorkUnitController::class, 'detail'])->name('backoffice.unit-kerja.detail');
//             });
//         });

//         // grup publikasi
//         Route::prefix('publikasi')->group(function () {
//             Route::get('/', [PublicationController::class, 'index'])->name('backoffice.publikasi.index');
//             Route::get('/add', [PublicationController::class, 'create'])->name('backoffice.publikasi.create');
//             Route::post('/simpan', [PublicationController::class, 'store'])->name('backoffice.publikasi.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [PublicationController::class, 'edit'])->name('backoffice.publikasi.edit');
//                 Route::post('/update', [PublicationController::class, 'update'])->name('backoffice.publikasi.update');
//                 Route::delete('/delete', [PublicationController::class, 'destroy'])->name('backoffice.publikasi.destroy');
//                 Route::get('/preview-document', [PublicationController::class, 'previewDocument'])->name('backoffice.publikasi.preview-document');
//                 Route::get('/detail', [PublicationController::class, 'detail'])->name('backoffice.publikasi.detail');
//             });
//         });
        
//         // grup berita
//         Route::prefix('berita')->group(function () {
//             Route::get('/', [NewsController::class, 'index'])->name('backoffice.berita.index');
//             Route::get('/add', [NewsController::class, 'create'])->name('backoffice.berita.create');
//             Route::post('/simpan', [NewsController::class, 'store'])->name('backoffice.berita.store');

//             // Route::get('/update-user-id', [NewsController::class, 'updateUserId'])->name('backoffice.berita.update-user-id');
//             Route::post('/{type}/{id}/update', [NewsController::class, 'updateType'])->name('backoffice.berita.{type}/{id}');
//             Route::delete('/{type}/{id}/delete', [NewsController::class, 'deleteType'])->name('backoffice.berita.{type}/{id}');
            
//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::post('/{type}/store', [NewsController::class, 'storeType'])->name('backoffice.berita.{type}/{id}');
//                 Route::get('/show', [NewsController::class, 'show'])->name('backoffice.berita.show');
//                 Route::get('/edit', [NewsController::class, 'edit'])->name('backoffice.berita.edit');
//                 Route::post('/update', [NewsController::class, 'update'])->name('backoffice.berita.update');
//                 Route::delete('/delete', [NewsController::class, 'destroy'])->name('backoffice.berita.destroy');
//                 Route::get('/preview-document', [NewsController::class, 'previewDocument'])->name('backoffice.berita.preview-document');
//                 Route::get('/detail', [NewsController::class, 'detail'])->name('backoffice.berita.detail');
//             });
//         });

//         // grup sorot
//         Route::prefix('sorot')->group(function () {
//             Route::get('/', [HighlightController::class, 'index'])->name('backoffice.sorot.index');
//             Route::get('/add', [HighlightController::class, 'create'])->name('backoffice.sorot.create');
//             Route::post('/simpan', [HighlightController::class, 'store'])->name('backoffice.sorot.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/show', [HighlightController::class, 'show'])->name('backoffice.sorot.show');
//                 Route::get('/edit', [HighlightController::class, 'edit'])->name('backoffice.sorot.edit');
//                 Route::post('/update', [HighlightController::class, 'update'])->name('backoffice.sorot.update');
//                 Route::delete('/delete', [HighlightController::class, 'destroy'])->name('backoffice.sorot.destroy');
//             });
//         });

//         // grup pengguna
//         Route::prefix('pengguna')->group(function () {
//             Route::get('/', [UserController::class, 'index'])->name('backoffice.pengguna.index');
//             Route::get('/add', [UserController::class, 'create'])->name('backoffice.pengguna.create');
//             Route::post('/simpan', [UserController::class, 'store'])->name('backoffice.pengguna.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [UserController::class, 'edit'])->name('backoffice.pengguna.edit');
//                 Route::post('/update', [UserController::class, 'update'])->name('backoffice.pengguna.update');
//                 Route::delete('/delete', [UserController::class, 'destroy'])->name('backoffice.pengguna.destroy');
//             });
//         });

//         // grup perwakilan
//         Route::prefix('perwakilan')->group(function () {
//             Route::get('/', [RepresentativeController::class, 'index'])->name('backoffice.perwakilan.index');
//             Route::get('/add', [RepresentativeController::class, 'create'])->name('backoffice.perwakilan.create');
//             Route::post('/simpan', [RepresentativeController::class, 'store'])->name('backoffice.perwakilan.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [RepresentativeController::class, 'edit'])->name('backoffice.perwakilan.edit');
//                 Route::post('/update', [RepresentativeController::class, 'update'])->name('backoffice.perwakilan.update');
//                 Route::delete('/delete', [RepresentativeController::class, 'destroy'])->name('backoffice.perwakilan.destroy');
//                 Route::get('/detail', [RepresentativeController::class, 'detail'])->name('backoffice.perwakilan.detail');
//             });
//         });

//         // grup layanan-perlindungan
//         Route::prefix('layanan-perlindungan')->group(function () {
//             Route::get('/', [ProtectionServiceController::class, 'index'])->name('backoffice.layanan-perlindungan.index');
//             Route::get('/add', [ProtectionServiceController::class, 'create'])->name('backoffice.layanan-perlindungan.create');
//             Route::post('/simpan', [ProtectionServiceController::class, 'store'])->name('backoffice.layanan-perlindungan.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [ProtectionServiceController::class, 'edit'])->name('backoffice.layanan-perlindungan.edit');
//                 Route::post('/update', [ProtectionServiceController::class, 'update'])->name('backoffice.layanan-perlindungan.update');
//                 Route::delete('/delete', [ProtectionServiceController::class, 'destroy'])->name('backoffice.layanan-perlindungan.destroy');
//                 Route::get('/detail', [ProtectionServiceController::class, 'detail'])->name('backoffice.layanan-perlindungan.detail');
//             });
//         });

//         // grup tentang-kami
//         Route::prefix('tentang-kami')->group(function () {
//             Route::get('/', [AboutUsController::class, 'index'])->name('backoffice.tentang-kami.index');
//             Route::get('/add', [AboutUsController::class, 'create'])->name('backoffice.tentang-kami.create');
//             Route::post('/simpan', [AboutUsController::class, 'store'])->name('backoffice.tentang-kami.store');

//             // grup id
//             Route::prefix('{id}')->group(function () {
//                 Route::get('/edit', [AboutUsController::class, 'edit'])->name('backoffice.tentang-kami.edit');
//                 Route::post('/update', [AboutUsController::class, 'update'])->name('backoffice.tentang-kami.update');
//                 Route::delete('/delete', [AboutUsController::class, 'destroy'])->name('backoffice.tentang-kami.destroy');
//             });
//         });

//     });

// });

// // google oauth routes
// Route::get('/auth/google/redirect', function () {
//     return Socialite::driver('google')->redirect();
// });
 
// // Route::get('/auth/google/callback', function () {
// //     $googleUser = Socialite::driver('google')->user();
 
// //     $user = User::updateOrCreate([
// //         'google_id' => $googleUser->id,
// //         'email' => $googleUser->email,
// //     ], [
// //         'name' => $googleUser->name,
// //         'email' => $googleUser->email,
// //         'password' => Hash::make('password'),
// //         'google_token' => $googleUser->token,
// //         'google_refresh_token' => $googleUser->refreshToken,
// //     ]);
 
// //     Auth::login($user);
 
// //     // return redirect('/dashboard');
// //     return redirect()->route('dashboard');
// // });

// Route::get('/auth/google/callback', function () {
//     $googleUser = Socialite::driver('google')->user();

//     // Try to find user by google_id first
//     $user = User::where('google_id', $googleUser->id)->first();

//     if (!$user) {
//         // Try to find user by email
//         $user = User::where('email', $googleUser->email)->first();

//         if ($user) {
//             // Update the user with google_id and tokens if found by email
//             $user->update([
//                 'google_id' => $googleUser->id,
//                 'google_token' => $googleUser->token,
//                 'google_refresh_token' => $googleUser->refreshToken,
//                 'name' => $googleUser->name,
//             ]);
//         } else {
//             // Create new user if not found by google_id or email
//             $user = User::create([
//                 'id' => \Illuminate\Support\Str::uuid(),
//                 'name' => $googleUser->name,
//                 'email' => $googleUser->email,
//                 'password' => Hash::make(Str::random(16)), // Consider generating a random password or null if using social login only
//                 'google_id' => $googleUser->id,
//                 'google_token' => $googleUser->token,
//                 'google_refresh_token' => $googleUser->refreshToken,
//             ]);
//         }
//     } else {
//         // Update tokens on existing user found by google_id
//         $user->update([
//             'google_token' => $googleUser->token,
//             'google_refresh_token' => $googleUser->refreshToken,
//             'name' => $googleUser->name,
//         ]);
//     }

//     Auth::login($user);

//     return redirect()->route('dashboard');
// });


// // frontoffice routes 

//     // beranda
//     Route::get('/', [BerandaFrontController::class, 'index'])->name('home');
    
//     // maklumat
//     Route::get('/maklumat', [BerandaFrontController::class, 'maklumat'])->name('maklumat');

//     // maklumat
//     Route::get('/beranda', [BerandaFrontController::class, 'beranda'])->name('beranda');

//     // footer
//     Route::get('/api/footer', [BerandaFrontController::class, 'footer'])->name('footer');

//     // grup informasi
//     Route::get('/tindak-pidana-tertentu', function () {
//         return Inertia::render('frontoffice/informasi/tindak-pidana-tertentu');
//     })->name('tindak-pidana-tertentu');

//     Route::get('/mekanisme-permohonan-perlindungan', function () {
//         return Inertia::render('frontoffice/informasi/mekanisme-permohonan-perlindungan');
//     })->name('mekanisme-permohonan-perlindungan');

//     Route::get('/program-perlindungan', function () {
//         return Inertia::render('frontoffice/informasi/program-perlindungan');
//     })->name('program-perlindungan');

//     Route::get('/subjek-perlindungan', function () {
//         return Inertia::render('frontoffice/informasi/subjek-perlindungan');
//     })->name('subjek-perlindungan');

//     // grup profil
//     Route::prefix('profil')->group(function () {
            
//         Route::get('/lembaga', [ProfilFrontController::class, 'institution'])->name('profil.lembaga');
//         Route::get('/lembaga-preview', [ProfilFrontController::class, 'institutionPreview'])->name('profil.lembaga-preview');
//         Route::get('/pejabat', [ProfilFrontController::class, 'index'])->name('profil.pejabat');
//         Route::get('/struktur', [ProfilFrontController::class, 'structure'])->name('profil.struktur');
//         Route::get('/unit-kerja', [ProfilFrontController::class, 'workUnit'])->name('profil.unit-kerja');
//         // Route::get('/struktur', function () {
//         //     return Inertia::render('frontoffice/profil/struktur');
//         // })->name('profil.struktur');
//         // Route::get('/unit-kerja', function () {
//         //     return Inertia::render('frontoffice/profil/unit-kerja');
//         // })->name('profil.unit-kerja');
//         Route::get('/roadmap', function () {
//             return Inertia::render('frontoffice/profil/roadmap');
//         })->name('profil.roadmap');
//         Route::get('/ketentuan-logo', function () {
//             return Inertia::render('frontoffice/profil/ketentuan-logo');
//         })->name('profil.ketentuan-logo');

//     });

//     // grup perwakilan
//     Route::prefix('perwakilan')->group(function () {
//         Route::get('/', [PerwakilanController::class, 'perwakilan'])->name('perwakilan.perwakilan');
//     });
    
//     // grup informasi-publik
//     Route::prefix('informasi-publik')->group(function () {
//         Route::get('/pengumuman', [BeritaFrontController::class, 'pengumuman'])->name('informasi-publik.pengumuman');
//     });

//     // grup layanan-perlindungan
//     Route::prefix('layanan-perlindungan')->group(function () {
//         Route::get('/proaktif-darurat', [PerwakilanController::class, 'proaktifDarurat'])->name('layanan-perlindungan.proaktif-darurat');
//     });

//     // grup layanan
//     Route::prefix('layanan')->group(function () {
        
//         Route::get('/maklumat-pelayanan', function () {
//             return Inertia::render('frontoffice/layanan/maklumat-pelayanan');
//         })->name('layanan.maklumat-pelayanan');
//         Route::get('/maklumat-pelayanan-preview', [UnduhDokumenController::class, 'maklumatPelayananPreview'])->name('profil.maklumat-pelayanan-preview');
        
//         Route::get('/pelayanan-publik', function () {
//             return Inertia::render('frontoffice/layanan/pelayanan-publik');
//         })->name('layanan.pelayanan-publik');
//         Route::get('/pelayanan-publik-preview', [UnduhDokumenController::class, 'pelayananPublikPreview'])->name('profil.pelayanan-publik-preview');
        
//         Route::get('/penerimaan-permohonan', function () {
//             return Inertia::render('frontoffice/layanan/penerimaan-permohonan');
//         })->name('layanan.penerimaan-permohonan');
//         Route::get('/penerimaan-permohonan-preview', [UnduhDokumenController::class, 'penerimaanPermohonanPreview'])->name('profil.penerimaan-permohonan-preview');
        
//         Route::get('/pemberian-perlindungan-darurat', function () {
//             return Inertia::render('frontoffice/layanan/pemberian-perlindungan-darurat');
//         })->name('layanan.pemberian-perlindungan-darurat');
//         Route::get('/pemberian-perlindungan-darurat-preview', [UnduhDokumenController::class, 'pemberianPerlindunganDaruratPreview'])->name('profil.pemberian-perlindungan-darurat-preview');

//         Route::get('/tindakan-proaktif', function () {
//             return Inertia::render('frontoffice/layanan/tindakan-proaktif');
//         })->name('layanan.tindakan-proaktif');
//         Route::get('/tindakan-proaktif-preview', [UnduhDokumenController::class, 'tindakanProaktifPreview'])->name('profil.tindakan-proaktif-preview');

//         Route::get('/pemberian-perlindungan', function () {
//             return Inertia::render('frontoffice/layanan/pemberian-perlindungan');
//         })->name('layanan.pemberian-perlindungan');
//         Route::get('/pemberian-perlindungan-preview', [UnduhDokumenController::class, 'pemberianPerlindunganPreview'])->name('profil.pemberian-perlindungan-preview');


//         Route::get('/permintaan-informasi-publik', function () {
//             return Inertia::render('frontoffice/layanan/permintaan-informasi-publik');
//         })->name('layanan.permintaan-informasi-publik');
//         Route::get('/permintaan-informasi-publik-preview', [UnduhDokumenController::class, 'permintaanInformasiPublikPreview'])->name('profil.permintaan-informasi-publik-preview');
        
//         Route::get('/laporan-survey', function () {
//             return Inertia::render('frontoffice/layanan/laporan-survey');
//         })->name('layanan.laporan-survey');
//         Route::get('/laporan-survey-2021-preview', [UnduhDokumenController::class, 'laporanSurvey2021Preview'])->name('profil.laporan-survey-2021-preview');
//         Route::get('/laporan-survey-2022-preview', [UnduhDokumenController::class, 'laporanSurvey2022Preview'])->name('profil.laporan-survey-2022-preview');
//         Route::get('/laporan-survey-2023-preview', [UnduhDokumenController::class, 'laporanSurvey2023Preview'])->name('profil.laporan-survey-2023-preview');
//         Route::get('/laporan-survey-2024-preview', [UnduhDokumenController::class, 'laporanSurvey2024Preview'])->name('profil.laporan-survey-2024-preview');

//     });

//     // grup berita
//     Route::prefix('berita')->group(function () {
//         Route::get('/{slug}', [BeritaFrontController::class, 'show'])->name('berita.slug');
//         Route::get('/document/{document_id}', [BeritaFrontController::class, 'previewDocumentRelation'])->name('berita.document');
//         Route::get('/image/{image_id}', [BeritaFrontController::class, 'previewImageRelation'])->name('berita.image');
//         Route::get('/{slugCategory}/{id}', [BeritaFrontController::class, 'detail'])->name('berita.detail');
//         Route::get('/{slugCategory}/{id}/preview-document', [BeritaFrontController::class, 'previewDocument'])->name('publikasi.preview-document');
//     });

//     // grup publikasi
//     Route::prefix('publikasi')->group(function () {
//         Route::get('/{slug}', [PublikasiFrontController::class, 'show'])->name('publikasi.slug');
//         Route::get('/{slugCategory}/{id}', [PublikasiFrontController::class, 'detail'])->name('publikasi.detail');
//         Route::get('/{slugCategory}/{id}/preview-document', [PublikasiFrontController::class, 'previewDocument'])->name('publikasi.preview-document');
//     });

// 



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
require __DIR__.'/web-en.php';
require __DIR__.'/redesign.php';
