import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import HeaderTitle from '@/components/header-title';
import ImagePreviewDialog from '@/components/image-preview-dialog';
import { useFilter } from '@/hooks/use-filter';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

import { IconArrowsDownUp } from '@tabler/icons-react';
import { Pencil, Plus, Search as SearchIcon, Users } from 'lucide-react';

import DeleteDialog from './delete-dialog';
import Filter from './filter';
import PejabatStrukturalPagination from './pagination';

const PejabatStrukturalPage = (props: any) => {
    const { data: pejabatStrukturals = [], meta } = props.pejabatStrukturals ?? {};

    console.log('pejabatStrukturals', pejabatStrukturals);

    const [params, setParams] = useState({
        ...props.state,
        load: props.state.load.toString(),
    });

    const [isLoading, setIsLoading] = useState(true);
    const skeletonRows = Array.from({ length: 10 });

    const onSortable = (field: string) => {
        setParams({
            ...params,
            field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
            page: 1,
        });
    };

    const resetParams = () => {
        setParams({
            ...props.state,
            load: props.state.load.toString(),
        });
    };

    useFilter({
        route: '/backoffice/profil/pejabat-struktural',
        values: params,
        only: ['pejabatStrukturals'],
        onLoading: (loading) => setIsLoading(loading),
    });

    return (
        <AppLayoutRedesign>
            <Head title="Pejabat Struktural">
                <meta name="description" content="Halaman Pejabat Struktural" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Pejabat Struktural"
                        subtitle="Kelola data profil pejabat struktural yang ditampilkan pada halaman profil."
                        icon={Users}
                    />

                    <Button variant="blue" size="lg" asChild>
                        <Link href="/backoffice/profil/pejabat-struktural/create">
                            <Plus className="size-4" />
                            Tambah
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <Filter params={params} setParams={setParams} resetParams={resetParams} total={meta?.total} />
                    </CardHeader>

                    <CardContent>
                        {/* ================= DESKTOP ================= */}
                        <div className="hidden lg:block">
                            <Table className="w-full table-auto">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>#</TableHead>
                                        <TableHead>Foto</TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('kategori')}>
                                                Kategori
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('nama')}>
                                                Nama
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('jabatan')}>
                                                Jabatan
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('deskripsi')}>
                                                Deskripsi
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('created_at')}>
                                                Dibuat Pada
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {isLoading ? (
                                        skeletonRows.map((_, i) => (
                                            <TableRow key={i}>
                                                {Array.from({ length: 7 }).map((__, j) => (
                                                    <TableCell key={j}>
                                                        <Skeleton className="h-4 w-full rounded bg-gradient-to-r from-blue-500 to-blue-700" />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : pejabatStrukturals.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={7} className="py-20 text-center">
                                                <div className="animate-fade-in flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                                                    <SearchIcon className="h-10 w-10 animate-bounce text-blue-500" />
                                                    <span className="animate-pulse text-sm">Tidak ada data</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        pejabatStrukturals.map((item: any, index: number) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{index + 1 + (meta.current_page - 1) * meta.per_page}</TableCell>

                                                <TableCell>
                                                    {item.foto ? (
                                                        <ImagePreviewDialog src={item.foto} alt={item.kategori} />
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Tidak ada foto</span>
                                                    )}
                                                </TableCell>

                                                <TableCell>{item.kategori}</TableCell>
                                                <TableCell>{item.nama}</TableCell>
                                                <TableCell>{item.jabatan}</TableCell>
                                                <TableCell className="max-w-md break-words whitespace-normal">
                                                    <div className="space-y-2 text-sm leading-relaxed">
                                                        {item.deskripsi
                                                            ?.split(/\n+/)
                                                            .filter((p: string) => p.trim() !== '')
                                                            .map((p: string, i: number) => <p key={i}>{p}</p>)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>{item.created_at}</TableCell>

                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                            <Link href={`/backoffice/profil/pejabat-struktural/${item.id}/edit`}>
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>
                                                        <DeleteDialog id={item.id} />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* ================= MOBILE ================= */}
                        <div className="space-y-4 lg:hidden">
                            {isLoading ? (
                                skeletonRows.map((_, i) => (
                                    <div key={i} className="rounded-xl border p-4">
                                        <Skeleton className="mb-3 h-4 w-1/2" />
                                        <Skeleton className="h-20 w-full" />
                                    </div>
                                ))
                            ) : pejabatStrukturals.length === 0 ? (
                                <div className="py-20 text-center">
                                    <SearchIcon className="mx-auto h-10 w-10 animate-bounce text-blue-500" />
                                    <p className="mt-2 animate-pulse text-sm text-gray-500">Tidak ada data</p>
                                </div>
                            ) : (
                                pejabatStrukturals.map((item: any, index: number) => (
                                    <div key={item.id} className="rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold">#{index + 1}</span>

                                            <div className="flex gap-2">
                                                <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                    <Link href={`/backoffice/profil/pejabat-struktural/${item.id}/edit`}>
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <DeleteDialog id={item.id} />
                                            </div>
                                        </div>

                                        {item.foto && (
                                            <div className="mt-3">
                                                <ImagePreviewDialog src={item.foto} alt={item.kategori} />
                                            </div>
                                        )}

                                        <div className="mt-3 space-y-2 text-sm">
                                            <p>
                                                <strong>Kategori:</strong> {item.kategori}
                                            </p>
                                            <p>
                                                <strong>Nama:</strong> {item.nama}
                                            </p>
                                            <p>
                                                <strong>Jabatan:</strong> {item.jabatan}
                                            </p>
                                            <p className="whitespace-pre-line">
                                                <strong>Deskripsi:</strong> {item.deskripsi}
                                            </p>
                                            <p>
                                                <strong>Dibuat:</strong> {item.created_at}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                        <PejabatStrukturalPagination meta={meta} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayoutRedesign>
    );
};

export default PejabatStrukturalPage;
