
import { Head, Link } from '@inertiajs/react';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';

import HeaderTitle from '@/components/header-title';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useFilter } from '@/hooks/use-filter';
import { IconArrowsDownUp } from '@tabler/icons-react';
import { FileText, Pencil, Plus, Search as SearchIcon, Target } from 'lucide-react';
import { useState } from 'react';
import DeleteDialog from './delete-dialog';
import Filter from './filter';
import VisiMisiPagination from './pagination';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import ImagePreviewDialog from '@/components/image-preview-dialog';

const VisiMisiPage = (props: any) => {
    const { data: visiMisis, meta } = props.visiMisis;
    const [params, setParams] = useState({
        ...props.state,
        load: props.state.load.toString(),
    });
    const [isLoading, setIsLoading] = useState(true);
    const skeletonRows = Array.from({ length: 10 });

    const onSortable = (field: string) => {
        setParams({
            ...params,
            field: field,
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
        route: '/backoffice/profil/visi-misi',
        values: params,
        only: ['visiMisis'],
        onLoading: (loading) => setIsLoading(loading),
    });

    return (
        <AppLayoutRedesign>
            <Head title="Visi & Misi">
                <meta name="description" content="Halaman Visi & Misi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="flex w-full flex-col">
                <div className="mb-8 flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title="Visi & Misi"
                        subtitle="Kelola data visi misi yang ditampilkan pada halaman profil."
                        icon={Target}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <Filter
                            params={params}
                            setParams={setParams}
                            resetParams={resetParams}
                            total={meta.total}
                        />
                    </CardHeader>

                    <CardContent>
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex cursor-pointer"
                                            onClick={() => onSortable('id')}
                                        >
                                            #
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        Gambar
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex cursor-pointer"
                                            onClick={() => onSortable('kategori')}
                                        >
                                            Kategori
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex cursor-pointer"
                                            onClick={() => onSortable('deskripsi')}
                                        >
                                            Deskripsi
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="group inline-flex cursor-pointer"
                                            onClick={() => onSortable('created_at')}
                                        >
                                            Dibuat Pada
                                            <span className="ml-2 flex-none rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="text-center">
                                {isLoading
                                    ? skeletonRows.map((_, i) => (
                                          <TableRow key={i}>
                                              {Array.from({ length: 8 }).map((__, j) => (
                                                  <TableCell key={j}>
                                                      <Skeleton className="h-4 w-full rounded bg-gradient-to-r from-blue-500 to-blue-700" />
                                                  </TableCell>
                                              ))}
                                          </TableRow>
                                      ))
                                    : visiMisis.length === 0 ? (
                                          <TableRow>
                                              <TableCell colSpan={8} className="py-20 text-center">
                                                  <div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400 animate-fade-in">
                                                    <SearchIcon className="h-10 w-10 animate-bounce text-blue-500 dark:text-blue-400" />
                                                    <span className="text-sm animate-pulse">Tidak ada data</span>
                                                </div>
                                              </TableCell>
                                          </TableRow>
                                      ) : (
                                          visiMisis.map((visiMisi: any, index: number) => (
                                              <TableRow key={visiMisi.id}>
                                                  <TableCell>
                                                      {index + 1 + (meta.current_page - 1) * meta.per_page}
                                                  </TableCell>
                                                  <TableCell>
                                                        {visiMisi.gambar ? (
                                                            <ImagePreviewDialog
                                                                src={visiMisi.gambar}
                                                                alt={visiMisi.kategori}
                                                            />
                                                        ) : (
                                                            <span className="text-sm text-gray-400 italic">
                                                                Tidak ada gambar
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                  <TableCell>{visiMisi.kategori}</TableCell>
                                                  <TableCell className="whitespace-normal break-words max-w-3xl">
                                                        {visiMisi.deskripsi
                                                            ?.split("\n")
                                                            .filter((p: string) => p.trim() !== "")
                                                            .map((paragraph: string, i: number) => (
                                                                <p
                                                                    key={i}
                                                                    className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-2 text-justify"
                                                                >
                                                                    {paragraph}
                                                                </p>
                                                            ))}
                                                    </TableCell>
                                                  <TableCell>{visiMisi.created_at}</TableCell>
                                                  <TableCell>
                                                      <div className="flex items-center gap-x-1">
                                                          <Button className="bg-amber-400" variant="link" size="sm" asChild>
                                                              <Link href={`/backoffice/profil/visi-misi/${visiMisi.id}/edit`}>
                                                                  <Pencil className="size-4" />
                                                              </Link>
                                                          </Button>
                                                          {/* <DeleteDialog id={visiMisi.id} /> */}
                                                      </div>
                                                  </TableCell>
                                              </TableRow>
                                          ))
                                      )}
                            </TableBody>
                        </Table>
                    </CardContent>

                    <CardFooter className="flex w-full flex-col items-center justify-between border-t py-2 lg:flex-row">
                        <VisiMisiPagination meta={meta} />
                    </CardFooter>
                </Card>
            </div>
        </AppLayoutRedesign>
    );
};

export default VisiMisiPage;
