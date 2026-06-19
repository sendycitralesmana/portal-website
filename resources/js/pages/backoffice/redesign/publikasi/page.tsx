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
import { Eye, FileText, ImageIcon, MapPin, Newspaper, Pencil, Plus, Search as SearchIcon } from 'lucide-react';

import DeleteDialog from './delete-dialog';
import Filter from './filter';
import PublikasiPagination from './pagination';
import publikasi from '@/pages/frontoffice/publikasi/publikasi';

const PublikasiPage = (props: any) => {
    const { data: publikasis = [], meta } = props.publikasis ?? {};

    const [params, setParams] = useState({
        ...props.state,
        load: props.state.load.toString(),
    });

    const [isLoading, setIsLoading] = useState(true);
    const skeletonRows = Array.from({ length: 10 });

    const currentPage = meta?.current_page ?? 1;
    const perPage = meta?.per_page ?? 10;

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
        route: '/redesign/backoffice/publikasi',
        values: params,
        only: ['publikasis'],
        onLoading: (loading) => setIsLoading(loading),
    });

    return (
        <AppLayoutRedesign>
            <Head title="Publikasi">
                <meta name="description" content="Halaman Publikasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Publikasi"
                        subtitle="Kelola data publikasi yang ditampilkan pada halaman publikasi."
                        icon={Newspaper}
                    />

                    <Button variant="blue" size="lg" asChild>
                        <Link href="/redesign/backoffice/publikasi/create">
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
                                        <TableHead>Gambar</TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('jenis')}>
                                                Jenis
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('kategori')}>
                                                Kategori
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('judul')}>
                                                Judul
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('slug')}>
                                                Slug
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('deskripsi')}>
                                                Deskripsi
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>Media</TableHead>
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
                                                {Array.from({ length: 9 }).map((__, j) => (
                                                    <TableCell key={j} className="align-top">
                                                        <Skeleton className="h-4 w-full rounded bg-gradient-to-r from-blue-500 to-blue-700" />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : publikasis.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={9} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                                                    <SearchIcon className="h-10 w-10 text-blue-500" />
                                                    <span className="text-sm">Tidak ada data</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        publikasis.map((item: any, index: number) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="align-top">{index + 1 + (currentPage - 1) * perPage}</TableCell>

                                                <TableCell className="align-top">
                                                    {item.gambar ? (
                                                        <div className="">
                                                            <ImagePreviewDialog src={item.gambar} alt={item.kantor} />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Tidak ada gambar</span>
                                                    )}
                                                </TableCell>

                                                <TableCell className="align-top break-words whitespace-normal">{item.jenis}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.kategori}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.judul ?? '-'}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.slug ?? '-'}</TableCell>
                                                {/* <TableCell className="align-top max-w-[300px]">
                                                <div
                                                    className="line-clamp-2 break-words"
                                                    dangerouslySetInnerHTML={{ __html: item.deskripsi ?? '-' }}
                                                />
                                                </TableCell> */}
                                                <TableCell className="align-top">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html: (() => {
                                                                const temp = document.createElement('div');
                                                                temp.innerHTML = item.deskripsi ?? '-';

                                                                const text = temp.textContent || temp.innerText || '';

                                                                return text.length > 50
                                                                    ? `${text.substring(0, 50)}...`
                                                                    : text;
                                                            })(),
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {(() => {

                                                        const gambarCount = item.media?.filter((m: any) => m.kategori === 'gambar').length ?? 0;
                                                        const dokumenCount = item.media?.filter((m: any) => m.kategori === 'dokumen').length ?? 0;

                                                        return (
                                                            <div className="flex items-center gap-3">

                                                                {gambarCount > 0 && (
                                                                    <div className="flex items-center gap-1 text-blue-500">
                                                                        <ImageIcon className="size-4" />
                                                                        <span className="text-xs">{gambarCount}</span>
                                                                    </div>
                                                                )}

                                                                {dokumenCount > 0 && (
                                                                    <div className="flex items-center gap-1 text-red-500">
                                                                        <FileText className="size-4" />
                                                                        <span className="text-xs">{dokumenCount}</span>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        );

                                                    })()}
                                                </TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.created_at ?? '-'}</TableCell>

                                                <TableCell className="align-top">
                                                    <div className="flex gap-2">
                                                        <Button className="bg-blue-500" variant="link" size="sm" asChild>
                                                            <Link href={`/redesign/backoffice/publikasi/${item.id}/detail`}>
                                                                <Eye className="size-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                            <Link href={`/redesign/backoffice/publikasi/${item.id}/edit`}>
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
                            ) : publikasis.length === 0 ? (
                                <div className="py-20 text-center">
                                    <SearchIcon className="mx-auto h-10 w-10 animate-bounce text-blue-500" />
                                    <p className="mt-2 animate-pulse text-sm text-gray-500">Tidak ada data</p>
                                </div>
                            ) : (
                                publikasis.map((item: any, index: number) => (
                                    <div key={item.id} className="rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold">#{index + 1}</span>

                                            <div className="flex gap-2">
                                                <Button className="bg-blue-500" variant="link" size="sm" asChild>
                                                    <Link href={`/redesign/backoffice/publikasi/${item.id}/detail`}>
                                                        <Eye className="size-4" />
                                                    </Link>
                                                </Button>
                                                <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                    <Link href={`/redesign/backoffice/publikasi/${item.id}/edit`}>
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <DeleteDialog id={item.id} />
                                            </div>
                                        </div>

                                        {item.gambar && (
                                            <div className="mt-3">
                                                <ImagePreviewDialog src={item.gambar} alt={item.kantor} />
                                            </div>
                                        )}

                                        <div className="mt-3 space-y-2 text-sm">
                                            <p>
                                                <strong>Jenis:</strong> {item.jenis}
                                            </p>
                                            <p>
                                                <strong>Kategori:</strong> {item.kategori}
                                            </p>
                                            <p>
                                                <strong>Judul:</strong> {item.judul ?? '-'}
                                            </p>
                                            <p>
                                                <strong>Slug:</strong> {item.slug ?? '-'}
                                            </p>
                                            <p>
                                                <strong>Deskripsi:</strong>
                                            </p>
                                            <div
                                                className="prose max-w-none"
                                                dangerouslySetInnerHTML={{ __html: item.deskripsi }}
                                                />
                                            <p>
                                                <strong>Dibuat Pada:</strong> {item.created_at ?? '-'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                        <PublikasiPagination meta={meta}/>
                    </CardFooter>
                </Card>
            </div>
        </AppLayoutRedesign>
    );
};

export default PublikasiPage;
