import { Head, Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';

import HeaderTitle from '@/components/header-title';
import { useFilter } from '@/hooks/use-filter';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

import { FileText, Network, Pencil, Plus, Search } from 'lucide-react';

import DeleteDialog from './delete-dialog';
import StrukturOrganisasiPagination from './pagination';

const StrukturOrganiasiPage = (props: any) => {
    const { data: strukturOrganisasis = [], meta } = props.strukturOrganisasis ?? {};

    const [params, setParams] = useState({
        ...props.state,
        load: props.state.load.toString(),
    });

    const [isLoading, setIsLoading] = useState(true);

    const skeletonRows = Array.from({ length: 3 });

    /**
     * Data yang mempunyai gambar.
     * Hanya mengambil 1 data.
     */
    const strukturGambar = useMemo(() => {
        return strukturOrganisasis.find((item: any) => item.gambar);
    }, [strukturOrganisasis]);

    /**
     * Data yang mempunyai deskripsi atau file.
     */
    const strukturDokumen = useMemo(() => {
        return strukturOrganisasis.filter((item: any) => item.deskripsi || item.file);
    }, [strukturOrganisasis]);

    const currentPage = meta?.current_page ?? 1;
    const perPage = meta?.per_page ?? 10;

    const resetParams = () => {
        setParams({
            ...props.state,
            load: props.state.load.toString(),
        });
    };

    useFilter({
        route: '/backoffice/profil/struktur-organisasi',
        values: params,
        only: ['strukturOrganisasis'],
        onLoading: (loading) => setIsLoading(loading),
    });

    return (
        <AppLayoutRedesign>
            <Head title="Struktur Organisasi">
                <meta name="description" content="Halaman Struktur Organisasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col pb-32">
                {/* ===================================================== */}
                {/* HEADER */}
                {/* ===================================================== */}
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Struktur Organisasi"
                        subtitle="Kelola data struktur organisasi yang ditampilkan pada halaman profil."
                        icon={Network}
                    />

                    {/* <Button asChild variant="blue">
                        <Link href="/backoffice/profil/struktur-organisasi/create">
                            <Plus className="size-4" />
                            Tambah
                        </Link>
                    </Button> */}
                </div>

                <Card className="mb-6">
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold">Gambar Struktur Organisasi</h3>

                            <p className="text-muted-foreground text-sm">Gambar struktur organisasi yang ditampilkan pada halaman profil.</p>
                        </div>

                        {strukturGambar && (
                            <Button
                                className="h-9 shrink-0 bg-amber-400 px-3 text-sm font-medium text-black hover:bg-amber-500"
                                variant="default"
                                size="sm"
                                asChild
                            >
                                <Link href={`/backoffice/profil/struktur-organisasi/${strukturGambar.id}/edit`}>
                                    <Pencil className="size-4" />
                                    Edit
                                </Link>
                            </Button>
                        )}
                    </CardHeader>

                    <CardContent className="mt-2 pb-6">
                        {isLoading ? (
                            <div className="space-y-6">
                                <Skeleton className="aspect-video w-full rounded-xl" />

                                <div className="flex justify-end">
                                    <Skeleton className="h-9 w-20 rounded-md" />
                                </div>
                            </div>
                        ) : strukturGambar ? (
                            <div className="space-y-6">
                                {/* Gambar */}
                                <div className="w-full overflow-hidden rounded-xl border bg-black">
                                    <img src={strukturGambar.gambar} alt="Struktur Organisasi" className="h-auto w-full object-contain" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed">
                                <Search className="mb-3 h-10 w-10 text-blue-500" />

                                <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada gambar struktur organisasi</p>

                                <Button className="mt-4" variant="blue" asChild>
                                    <Link href="/backoffice/profil/struktur-organisasi/create">
                                        <Plus className="size-4" />
                                        Tambah
                                    </Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* ===================================================== */}
                {/* BARIS 2 - DESKRIPSI & FILE */}
                {/* ===================================================== */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold">Deskripsi & Dokumen</h3>

                            <p className="text-muted-foreground text-sm">Kelola deskripsi dan dokumen struktur organisasi.</p>
                        </div>

                        <Button asChild variant="blue" className="shrink-0">
                            <Link href="/backoffice/profil/struktur-organisasi/create">
                                <Plus className="size-4" />
                                Tambah
                            </Link>
                        </Button>
                    </CardHeader>

                    <CardContent className="mt-2 pb-6">
                        {isLoading ? (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {skeletonRows.map((_, index) => (
                                    <div key={index} className="rounded-xl border p-5">
                                        <div className="mb-5 flex items-start justify-between gap-3">
                                            <div className="space-y-2">
                                                <Skeleton className="h-4 w-20" />
                                                <Skeleton className="h-5 w-36" />
                                            </div>

                                            <div className="flex gap-2">
                                                <Skeleton className="h-9 w-9 rounded-md" />
                                                <Skeleton className="h-9 w-9 rounded-md" />
                                            </div>
                                        </div>

                                        <Skeleton className="mb-2 h-4 w-24" />
                                        <Skeleton className="h-24 w-full rounded-lg" />

                                        <Skeleton className="mt-5 h-16 w-full rounded-lg" />
                                    </div>
                                ))}
                            </div>
                        ) : strukturDokumen.length === 0 ? (
                            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed">
                                <Search className="mb-3 h-10 w-10 text-blue-500" />

                                <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada data deskripsi atau file</p>

                                <Button className="mt-4" variant="blue" asChild>
                                    <Link href="/backoffice/profil/struktur-organisasi/create">
                                        <Plus className="size-4" />
                                        Tambah
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                {strukturDokumen.map((item: any, index: number) => (
                                    <div
                                        key={item.id}
                                        className="flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-900"
                                    >
                                        {/* Card Header */}
                                        <div className="mb-5 flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <span className="text-muted-foreground text-xs font-medium">
                                                    Data #{index + 1 + (currentPage - 1) * perPage}
                                                </span>

                                                <h4 className="mt-1 truncate font-semibold">Struktur Organisasi</h4>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                <Button
                                                    className="h-9 w-9 bg-amber-400 p-0 text-black hover:bg-amber-500"
                                                    variant="default"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        href={`/backoffice/profil/struktur-organisasi/${item.id}/edit-file`}
                                                        aria-label="Edit struktur organisasi"
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>

                                                <DeleteDialog id={item.id} />
                                            </div>
                                        </div>

                                        {/* Deskripsi */}
                                        {item.deskripsi && (
                                            <div className="mb-5">
                                                <p className="mb-2 text-sm font-medium">Deskripsi</p>

                                                <div className="bg-muted/50 min-h-[100px] rounded-lg p-3">
                                                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                                        {item.deskripsi}
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* File PDF */}
                                        {item.file && (
                                            <div className="mt-auto">
                                                <p className="mb-2 text-sm font-medium">File</p>

                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <button
                                                            type="button"
                                                            className="flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                                                        >
                                                            <FileText className="size-7 shrink-0 text-red-500" />

                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-sm font-medium">Dokumen PDF</p>

                                                                <p className="truncate text-xs text-gray-500">{item.file.split('/').pop()}</p>

                                                                <p className="mt-1 text-xs text-blue-500">Klik untuk preview</p>
                                                            </div>
                                                        </button>
                                                    </DialogTrigger>

                                                    <DialogContent className="!h-[95vh] !w-[95vw] !max-w-[95vw] overflow-hidden p-3 sm:!max-w-[95vw] sm:p-4">
                                                        <div className="flex h-full min-h-0 flex-col">
                                                            <div className="mb-3 flex shrink-0 items-center gap-2">
                                                                <FileText className="size-5 text-red-600" />

                                                                <h3 className="font-semibold">Dokumen PDF</h3>
                                                            </div>

                                                            <iframe
                                                                src={item.file}
                                                                title={`Preview PDF ${item.id}`}
                                                                className="min-h-0 w-full flex-1 rounded-lg border"
                                                            />
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        )}

                                        {/* Tidak ada deskripsi dan file */}
                                        {!item.deskripsi && !item.file && (
                                            <div className="bg-muted/50 rounded-lg p-4 text-center">
                                                <p className="text-muted-foreground text-sm">Tidak ada deskripsi atau file.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>

                    {/* Pagination */}
                    {!isLoading && strukturDokumen.length > 0 && (
                        <CardFooter className="flex w-full flex-col items-center justify-between gap-3 border-t py-4 lg:flex-row">
                            <StrukturOrganisasiPagination meta={meta} />
                        </CardFooter>
                    )}
                </Card>
            </div>
        </AppLayoutRedesign>
    );
};

export default StrukturOrganiasiPage;
