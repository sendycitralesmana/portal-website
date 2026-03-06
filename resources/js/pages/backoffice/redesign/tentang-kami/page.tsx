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
import { FileText, Info, Pencil, Search as SearchIcon } from 'lucide-react';

import DeleteDialog from './delete-dialog';
import Filter from './filter';
import TentangKamiPagination from './pagination';

const TentangKamiPage = (props: any) => {
    const { data: tentangKamis = [], meta } = props.tentangKamis ?? {};

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
        route: '/redesign/backoffice/tentang-kami',
        values: params,
        only: ['tentangKamis'],
        onLoading: (loading) => setIsLoading(loading),
    });

    return (
        <AppLayoutRedesign>
            <Head title="Tentang Kami">
                <meta name="description" content="Halaman Tentang Kami" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Tentang Kami"
                        subtitle="Kelola data tentang kami yang ditampilkan pada halaman halaman publik."
                        icon={Info}
                    />
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
                                            <Button variant="ghost" onClick={() => onSortable('alamat')}>
                                                Alamat
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('telepon')}>
                                                Telepon
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('whatsapp')}>
                                                Whatsapp
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('email')}>
                                                Email
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('jam_operasional')}>
                                                Jam Operasional
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('latitude')}>
                                                Latitude
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button variant="ghost" onClick={() => onSortable('longitude')}>
                                                Longitude
                                                <IconArrowsDownUp className="ml-2 size-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                className="group inline-flex cursor-pointer"
                                                onClick={() => onSortable('created_at')}
                                            >
                                                Dibuat Pada
                                                <span className="text-muted-foreground ml-2 flex-none rounded">
                                                    <IconArrowsDownUp className="text-muted-foreground size-4" />
                                                </span>
                                            </Button>
                                        </TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {isLoading ? (
                                        skeletonRows.map((_, i) => (
                                            <TableRow key={i}>
                                                {Array.from({ length: 11 }).map((__, j) => (
                                                    <TableCell key={j} className="align-top">
                                                        <Skeleton className="h-4 w-full rounded bg-gradient-to-r from-blue-500 to-blue-700" />
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : tentangKamis.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={11} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                                                    <SearchIcon className="h-10 w-10 text-blue-500" />
                                                    <span className="text-sm">Tidak ada data</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        tentangKamis.map((item: any, index: number) => (
                                            <TableRow key={item.id}>
                                                <TableCell className="align-top">{index + 1 + (currentPage - 1) * perPage}</TableCell>

                                                <TableCell className="align-top">
                                                    {item.gambar ? (
                                                        <div className="max-w-[90px]">
                                                            <ImagePreviewDialog src={item.gambar} alt="gambar" />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray-400 italic">Tidak ada gambar</span>
                                                    )}
                                                </TableCell>

                                                <TableCell className="align-top break-words whitespace-normal">{item.alamat}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.telepon}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.whatsapp}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.email}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.jam_operasional}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.latitude}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.longitude}</TableCell>
                                                <TableCell className="align-top break-words whitespace-normal">{item.created_at}</TableCell>

                                                <TableCell className="align-top">
                                                    <div className="flex gap-2">
                                                        <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                            <Link href={`/redesign/backoffice/tentang-kami/${item.id}/edit`}>
                                                                <Pencil className="size-4" />
                                                            </Link>
                                                        </Button>
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
                            ) : tentangKamis.length === 0 ? (
                                <div className="py-20 text-center">
                                    <SearchIcon className="mx-auto h-10 w-10 animate-bounce text-blue-500" />
                                    <p className="mt-2 animate-pulse text-sm text-gray-500">Tidak ada data</p>
                                </div>
                            ) : (
                                tentangKamis.map((item: any, index: number) => (
                                    <div key={item.id} className="rounded-xl border bg-white p-4 shadow-sm dark:bg-gray-900">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-semibold">#{index + 1}</span>

                                            <div className="flex gap-2">
                                                <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                    <Link href={`/redesign/backoffice/tentang-kami/${item.id}/edit`}>
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <DeleteDialog id={item.id} />
                                            </div>
                                        </div>

                                        {item.gambar && (
                                            <div className="mt-3">
                                                <ImagePreviewDialog src={item.gambar} alt="gambar" />
                                            </div>
                                        )}

                                        <div className="mt-3 space-y-2 text-sm">
                                            <p>
                                                <strong>Alamat:</strong> {item.alamat}
                                            </p>
                                            <p>
                                                <strong>Telepon:</strong> {item.telepon}
                                            </p>
                                            <p>
                                                <strong>Whatsapp:</strong> {item.whatsapp}
                                            </p>
                                            <p>
                                                <strong>Email:</strong> {item.email}
                                            </p>
                                            <p className="whitespace-pre-line">
                                                <strong>Jam Operasional:</strong> {item.jam_operasional}
                                            </p>
                                            <p>
                                                <strong>Latitude:</strong> {item.latitude}
                                            </p>
                                            <p>
                                                <strong>Longitude:</strong> {item.longitude}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                        <TentangKamiPagination meta={meta} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayoutRedesign>
    );
};

export default TentangKamiPage;
