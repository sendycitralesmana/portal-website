<?php

use App\Http\Controllers\BackOffice\En\EnAboutUsController;
use App\Http\Controllers\BackOffice\En\EnApplicationController;
use App\Http\Controllers\BackOffice\En\EnDashboardController;
use App\Http\Controllers\BackOffice\En\EnHighlightController;
use App\Http\Controllers\BackOffice\En\EnInstitutionController;
use App\Http\Controllers\BackOffice\En\EnNewsController;
use App\Http\Controllers\BackOffice\En\EnProfileController;
use App\Http\Controllers\BackOffice\En\EnProtectionServiceController;
use App\Http\Controllers\BackOffice\En\EnPublicationController;
use App\Http\Controllers\BackOffice\En\EnRepresentativeController as EnEnRepresentativeController;
use App\Http\Controllers\BackOffice\En\EnStructureController;
use App\Http\Controllers\BackOffice\En\EnUserController;
use App\Http\Controllers\BackOffice\En\EnWorkUnitController;
use App\Http\Controllers\FrontOffice\En\EnDashboardFrontController;
use App\Http\Controllers\FrontOffice\En\EnNewsFrontController;
use App\Http\Controllers\FrontOffice\En\EnProfileFrontController;
use App\Http\Controllers\FrontOffice\En\EnPublicationFrontController;
use App\Http\Controllers\FrontOffice\En\EnRepresentativeController;
use App\Http\Controllers\FrontOffice\En\EnRepresentativeFrontController;
use App\Http\Controllers\FrontOffice\UnduhDokumenController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {

    // grup backoffice en
    Route::prefix('backoffice/en')->group(function () {
        
        // grup dashboard
        Route::prefix('dashboard')->group(function () {
            Route::get('/', [EnDashboardController::class, 'index'])->name('dashboardEn');
        });

        // grup applicationEn
        Route::prefix('application')->group(function () {
            Route::get('/', [EnApplicationController::class, 'index'])->name('backoffice.applicationEn.index');
            Route::get('/add', [EnApplicationController::class, 'create'])->name('backoffice.applicationEn.create');
            Route::post('/simpan', [EnApplicationController::class, 'store'])->name('applicationEn.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnApplicationController::class, 'edit'])->name('backoffice.applicationEn.edit');
                Route::post('/update', [EnApplicationController::class, 'update'])->name('applicationEn.update');
                Route::delete('/delete', [EnApplicationController::class, 'destroy'])->name('applicationEn.destroy');
            });
        });

        // grup profile
        Route::prefix('profile')->group(function () {
            Route::get('/', [EnProfileController::class, 'index'])->name('backoffice.profileEn.index');
            Route::get('/add', [EnProfileController::class, 'create'])->name('backoffice.profileEn.create');
            Route::post('/simpan', [EnProfileController::class, 'store'])->name('backoffice.profileEn.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnProfileController::class, 'edit'])->name('backoffice.profileEn.edit');
                Route::post('/update', [EnProfileController::class, 'update'])->name('backoffice.profileEn.update');
                Route::delete('/delete', [EnProfileController::class, 'destroy'])->name('backoffice.profileEn.destroy');
                Route::get('/detail', [EnProfileController::class, 'detail'])->name('backoffice.profileEn.detail');
            });
        });

        // grup structure
        Route::prefix('structure')->group(function () {
            Route::get('/', [EnStructureController::class, 'index'])->name('backoffice.structure.index');
            Route::get('/add', [EnStructureController::class, 'create'])->name('backoffice.structure.create');
            Route::post('/simpan', [EnStructureController::class, 'store'])->name('backoffice.structure.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnStructureController::class, 'edit'])->name('backoffice.structure.edit');
                Route::post('/update', [EnStructureController::class, 'update'])->name('backoffice.structure.update');
                Route::delete('/delete', [EnStructureController::class, 'destroy'])->name('backoffice.structure.destroy');
                Route::get('/detail', [EnStructureController::class, 'detail'])->name('backoffice.structure.detail');
            });
        });

        // grup institution
        Route::prefix('institution')->group(function () {
            Route::get('/', [EnInstitutionController::class, 'index'])->name('backoffice.institution.index');
            Route::get('/add', [EnInstitutionController::class, 'create'])->name('backoffice.institution.create');
            Route::post('/simpan', [EnInstitutionController::class, 'store'])->name('backoffice.institution.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnInstitutionController::class, 'edit'])->name('backoffice.institution.edit');
                Route::post('/update', [EnInstitutionController::class, 'update'])->name('backoffice.institution.update');
                Route::delete('/delete', [EnInstitutionController::class, 'destroy'])->name('backoffice.institution.destroy');
                Route::get('/preview-document', [EnInstitutionController::class, 'previewDocument'])->name('backofficeEn.institution.preview-document');
                Route::get('/detail', [EnInstitutionController::class, 'detail'])->name('backoffice.institution.detail');
            });
        });

        // grup work-unit
        Route::prefix('work-unit')->group(function () {
            Route::get('/', [EnWorkUnitController::class, 'index'])->name('backoffice.work-unit.index');
            Route::get('/add', [EnWorkUnitController::class, 'create'])->name('backoffice.work-unit.create');
            Route::post('/simpan', [EnWorkUnitController::class, 'store'])->name('backoffice.work-unit.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnWorkUnitController::class, 'edit'])->name('backoffice.work-unit.edit');
                Route::post('/update', [EnWorkUnitController::class, 'update'])->name('backoffice.work-unit.update');
                Route::delete('/delete', [EnWorkUnitController::class, 'destroy'])->name('backoffice.work-unit.destroy');
                Route::get('/preview-document', [EnWorkUnitController::class, 'previewDocument'])->name('backofficeEn.work-unit.preview-document');
                Route::get('/detail', [EnWorkUnitController::class, 'detail'])->name('backoffice.work-unit.detail');
            });
        });

        // grup publicationEn
        Route::prefix('publication')->group(function () {
            Route::get('/', [EnPublicationController::class, 'index'])->name('backoffice.publicationEn.index');
            Route::get('/add', [EnPublicationController::class, 'create'])->name('backoffice.publicationEn.create');
            Route::post('/simpan', [EnPublicationController::class, 'store'])->name('backoffice.publicationEn.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnPublicationController::class, 'edit'])->name('backoffice.publicationEn.edit');
                Route::post('/update', [EnPublicationController::class, 'update'])->name('backoffice.publicationEn.update');
                Route::delete('/delete', [EnPublicationController::class, 'destroy'])->name('backoffice.publicationEn.destroy');
                Route::get('/preview-document', [EnPublicationController::class, 'previewDocument'])->name('backofficeEn.publicationEn.preview-document');
                Route::get('/detail', [EnPublicationController::class, 'detail'])->name('backoffice.publicationEn.detail');
            });
        });

        // grup news
        Route::prefix('news')->group(function () {
            Route::get('/', [EnNewsController::class, 'index'])->name('backoffice.newsEn.index');
            Route::get('/add', [EnNewsController::class, 'create'])->name('backoffice.newsEn.create');
            Route::post('/simpan', [EnNewsController::class, 'store'])->name('backoffice.newsEn.store');

            Route::post('/{type}/{id}/update', [EnNewsController::class, 'updateType'])->name('backoffice.newsEn.{type}/{id}');
            Route::delete('/{type}/{id}/delete', [EnNewsController::class, 'deleteType'])->name('backoffice.newsEn.{type}/{id}');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::post('/{type}/store', [EnNewsController::class, 'storeType'])->name('backoffice.newsEn.{type}/{id}');
                Route::get('/show', [EnNewsController::class, 'show'])->name('backoffice.newsEn.show');
                Route::get('/edit', [EnNewsController::class, 'edit'])->name('backoffice.newsEn.edit');
                Route::post('/update', [EnNewsController::class, 'update'])->name('backoffice.newsEn.update');
                Route::delete('/delete', [EnNewsController::class, 'destroy'])->name('backoffice.newsEn.destroy');
                Route::get('/detail', [EnNewsController::class, 'detail'])->name('backoffice.newsEn.detail');
            });
        });

        // grup highlight
        Route::prefix('highlight')->group(function () {
            Route::get('/', [EnHighlightController::class, 'index'])->name('backoffice.highlightEn.index');
            Route::get('/add', [EnHighlightController::class, 'create'])->name('backoffice.highlightEn.create');
            Route::post('/simpan', [EnHighlightController::class, 'store'])->name('backoffice.highlightEn.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnHighlightController::class, 'edit'])->name('backoffice.highlightEn.edit');
                Route::post('/update', [EnHighlightController::class, 'update'])->name('backoffice.highlightEn.update');
                Route::delete('/delete', [EnHighlightController::class, 'destroy'])->name('backoffice.highlightEn.destroy');
            });
        });

        // grup user
        Route::prefix('user')->group(function () {
            Route::get('/', [EnUserController::class, 'index'])->name('backoffice.userEn.index');
            Route::get('/add', [EnUserController::class, 'create'])->name('backoffice.userEn.create');
            Route::post('/simpan', [EnUserController::class, 'store'])->name('backoffice.userEn.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnUserController::class, 'edit'])->name('backoffice.userEn.edit');
                Route::post('/update', [EnUserController::class, 'update'])->name('backoffice.userEn.update');
                Route::delete('/delete', [EnUserController::class, 'destroy'])->name('backoffice.userEn.destroy');
            });
        });

        // grup representative
        Route::prefix('representative')->group(function () {
            Route::get('/', [EnEnRepresentativeController::class, 'index'])->name('backoffice.representative.index');
            Route::get('/add', [EnEnRepresentativeController::class, 'create'])->name('backoffice.representative.create');
            Route::post('/simpan', [EnEnRepresentativeController::class, 'store'])->name('backoffice.representative.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnEnRepresentativeController::class, 'edit'])->name('backoffice.representative.edit');
                Route::post('/update', [EnEnRepresentativeController::class, 'update'])->name('backoffice.representative.update');
                Route::delete('/delete', [EnEnRepresentativeController::class, 'destroy'])->name('backoffice.representative.destroy');
                Route::get('/detail', [EnEnRepresentativeController::class, 'detail'])->name('backoffice.representative.detail');
            });
        });

        // grup protection-service
        Route::prefix('protection-service')->group(function () {
            Route::get('/', [EnProtectionServiceController::class, 'index'])->name('backoffice.protection-service.index');
            Route::get('/add', [EnProtectionServiceController::class, 'create'])->name('backoffice.protection-service.create');
            Route::post('/simpan', [EnProtectionServiceController::class, 'store'])->name('backoffice.protection-service.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnProtectionServiceController::class, 'edit'])->name('backoffice.protection-service.edit');
                Route::post('/update', [EnProtectionServiceController::class, 'update'])->name('backoffice.protection-service.update');
                Route::delete('/delete', [EnProtectionServiceController::class, 'destroy'])->name('backoffice.protection-service.destroy');
                Route::get('/detail', [EnProtectionServiceController::class, 'detail'])->name('backoffice.protection-service.detail');
            });
        });

        // grup about-us
        Route::prefix('about-us')->group(function () {
            Route::get('/', [EnAboutUsController::class, 'index'])->name('backoffice.about-us.index');
            Route::get('/add', [EnAboutUsController::class, 'create'])->name('backoffice.about-us.create');
            Route::post('/simpan', [EnAboutUsController::class, 'store'])->name('backoffice.about-us.store');

            // grup id
            Route::prefix('{id}')->group(function () {
                Route::get('/edit', [EnAboutUsController::class, 'edit'])->name('backoffice.about-us.edit');
                Route::post('/update', [EnAboutUsController::class, 'update'])->name('backoffice.about-us.update');
                Route::delete('/delete', [EnAboutUsController::class, 'destroy'])->name('backoffice.about-us.destroy');
            });
        });

    });

});

// grup frontoffice en
Route::prefix('/en')->group(function () {
    
    // dashboard
    Route::get('/', [EnDashboardFrontController::class, 'index'])->name('home');

    // dashboard
    Route::get('/maklumat', [EnDashboardFrontController::class, 'maklumat'])->name('maklumatEn');

    // dashboard
    Route::get('/home', [EnDashboardFrontController::class, 'home'])->name('homeEn');

    // footer
    Route::get('/api/footer', [EnDashboardFrontController::class, 'footer'])->name('footerEn');

    // grup representative
    Route::prefix('representative')->group(function () {
        Route::get('/', [EnRepresentativeFrontController::class, 'representative'])->name('representative.representative');
    });

    // grup protective-service
    Route::prefix('protection-service')->group(function () {
        Route::get('/proactive-emergency', [EnRepresentativeFrontController::class, 'proactiveEmergency'])->name('protective-service.proactive-emergency');
    });

    // grup public-information
    Route::prefix('public-information')->group(function () {
        Route::get('/announcement', [EnNewsFrontController::class, 'announcement'])->name('public-information.announcement');
    });

    // information group
    Route::get('/specific-criminal-offense', function () {
        return Inertia::render('frontoffice/en/information/specific-criminal-offense');
    })->name('specific-criminal-offense');

    Route::get('/protection-request-mechanism', function () {
        return Inertia::render('frontoffice/en/information/protection-request-mechanism');
    })->name('protection-request-mechanism');

    Route::get('/protection-program', function () {
        return Inertia::render('frontoffice/en/information/protection-program');
    })->name('protection-program');

    Route::get('/protection-subject', function () {
        return Inertia::render('frontoffice/en/information/protection-subject');
    })->name('protection-subject');

    // grup profile
    Route::prefix('profile')->group(function () {
            
        // Route::get('/institution', function () {
        //     return Inertia::render('frontoffice/en/profile/institution');
        // })->name('profile.institution');
        Route::get('/institution', [EnProfileFrontController::class, 'institution'])->name('profile.institution');
        Route::get('/official', [EnProfileFrontController::class, 'index'])->name('profile.official');
        Route::get('/structure', [EnProfileFrontController::class, 'structure'])->name('profile.structure');
        Route::get('/work-unit', [EnProfileFrontController::class, 'workUnit'])->name('profile.work-unit');
        // Route::get('/structure', function () {
        //     return Inertia::render('frontoffice/en/profile/structure');
        // })->name('profile.structure');
        // Route::get('/work-unit', function () {
        //     return Inertia::render('frontoffice/en/profile/work-unit');
        // })->name('profile.work-unit');
        Route::get('/roadmap', function () {
            return Inertia::render('frontoffice/en/profile/roadmap');
        })->name('profile.roadmap');

    });

    // service group
    Route::prefix('service')->group(function () {

        Route::get('/service-declaration', function () {
            return Inertia::render('frontoffice/en/service/service-declaration');
        })->name('service.service-declaration');
        Route::get('/service-declaration-preview', [UnduhDokumenController::class, 'maklumatPelayananPreview'])->name('profile.service-declaration-preview');

        Route::get('/public-service', function () {
            return Inertia::render('frontoffice/en/service/public-service');
        })->name('service.public-service');
        Route::get('/public-service-preview', [UnduhDokumenController::class, 'pelayananPublikPreview'])->name('profile.public-service-preview');

        Route::get('/acceptance-of-application', function () {
            return Inertia::render('frontoffice/en/service/acceptance-of-application');
        })->name('service.acceptance-of-application');
        Route::get('/acceptance-of-application-preview', [UnduhDokumenController::class, 'penerimaanPermohonanPreview'])->name('profile.acceptance-of-application-preview');

        Route::get('/emergency-protection', function () {
            return Inertia::render('frontoffice/en/service/emergency-protection');
        })->name('service.emergency-protection');
        Route::get('/emergency-protection-preview', [UnduhDokumenController::class, 'pemberianPerlindunganDaruratPreview'])->name('profile.emergency-protection-preview');

        Route::get('/proactive-action', function () {
            return Inertia::render('frontoffice/en/service/proactive-action');
        })->name('service.proactive-action');
        Route::get('/proactive-action-preview', [UnduhDokumenController::class, 'tindakanProaktifPreview'])->name('profile.proactive-action-preview');

        Route::get('/protection-provision', function () {
            return Inertia::render('frontoffice/en/service/protection-provision');
        })->name('service.protection-provision');
        Route::get('/protection-provision-preview', [UnduhDokumenController::class, 'pemberianPerlindunganPreview'])->name('profile.protection-provision-preview');

        Route::get('/public-information-request', function () {
            return Inertia::render('frontoffice/en/service/public-information-request');
        })->name('service.public-information-request');
        Route::get('/public-information-request-preview', [UnduhDokumenController::class, 'permintaanInformasiPublikPreview'])->name('profile.public-information-request-preview');

        Route::get('/survey-report', function () {
            return Inertia::render('frontoffice/en/service/survey-report');
        })->name('service.survey-report');
        Route::get('/survey-report-2021-preview', [UnduhDokumenController::class, 'laporanSurvey2021Preview'])->name('profile.survey-report-2021-preview');
        Route::get('/survey-report-2022-preview', [UnduhDokumenController::class, 'laporanSurvey2022Preview'])->name('profile.survey-report-2022-preview');
        Route::get('/survey-report-2023-preview', [UnduhDokumenController::class, 'laporanSurvey2023Preview'])->name('profile.survey-report-2023-preview');
        Route::get('/survey-report-2024-preview', [UnduhDokumenController::class, 'laporanSurvey2024Preview'])->name('profile.survey-report-2024-preview');

    });

    // grup news
    Route::prefix('news')->group(function () {
        Route::get('/{slug}', [EnNewsFrontController::class, 'show'])->name('news.slug');
        Route::get('/document/{document_id}', [EnNewsFrontController::class, 'previewDocumentRelation'])->name('news.document');
        Route::get('/image/{image_id}', [EnNewsFrontController::class, 'previewImageRelation'])->name('news.image');
        Route::get('/{slugCategory}/{id}', [EnNewsFrontController::class, 'detail'])->name('news.detail');
    });

    // grup publication
    Route::prefix('publication')->group(function () {
        Route::get('/{slug}', [EnPublicationFrontController::class, 'show'])->name('publication.slug');
        Route::get('/{slugCategory}/{id}', [EnPublicationFrontController::class, 'detail'])->name('publication.detail');
        Route::get('/{slugCategory}/{id}/preview-document', [EnPublicationFrontController::class, 'previewDocument'])->name('publication.preview-document');
    });

});
// grup frontoffice en