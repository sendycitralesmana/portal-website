import HeadingSmall from '@/components/heading-small';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { AuthUser, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MoreHorizontal, PenBox, Plus, Search, Trash2 } from 'lucide-react';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import debounce from 'lodash/debounce';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination'
import ApplicationPagination from './pagination';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Aplikasi',
        href: '/backoffice/aplikasi',
    },
];

type ApplicationCategoryItem = {
    id: number;
    name: string;
}

type LinksType = {
    url: string;
    label: string;
    active: boolean;
}

type ApplicationItem = {
    id: number;
    application_category: ApplicationCategoryItem;
    title: string;
    description: string;
    url: string;
    cover: string;
    cover_url: string;
};

type ApplicationsItem = {
    data: ApplicationItem[]
    links: LinksType[]
    from: number
    to: number
    total: number
}

type PageProps = {
    applications: ApplicationsItem;
};

export default function AplikasiPage() {

//   const { auth } = usePage<{ auth: AuthUser }>().props;
  const { flash } = usePage<{ flash: { message?: string } }>().props
  const { applications } = usePage<PageProps>().props;
  console.log(applications);

  useEffect(() => {
    if (flash.message) {
        toast.success(flash.message)
    }
  }, [flash.message])

    // search functionality
    const handleSearch = useRef(
        debounce((query: string) => {
            router.get('/backoffice/aplikasi', { search: query }, { preserveState: true, replace: true });
        }, 500),
    ).current;

    // handle search change
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        handleSearch(query);
    };

    const handleDelete = (id: number) => {
        router.delete(`/backoffice/aplikasi/${id}/delete`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Apilkasi">
                <meta name="description" content="Halaman Tambah Apilkasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <Card className='shadow-md'>
                <CardHeader>
                    <CardTitle>Data Aplikasi</CardTitle>
                </CardHeader>
                <CardContent className='space-y-8'>
                    <div className='flex items-center justify-between'>
                        <div className="relative w-full sm:w-1/3">
                            <Input 
                                id={'search'} 
                                className="peer ps-9" 
                                placeholder="Cari ..." 
                                type="search" 
                                onChange={onSearchChange}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <Search size={16} aria-hidden="true" />
                            </div>
                        </div>
                        <Button>
                            <Link href='/backoffice/aplikasi/tambah' className='flex items-center'>
                                <Plus /> Tambah
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">No</TableHead>
                                    <TableHead>Sampul</TableHead>
                                    <TableHead>Kategori</TableHead>
                                    <TableHead>Judul</TableHead>
                                    {/* <TableHead>Deskripsi</TableHead> */}
                                    <TableHead>Link</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {applications.data?.map((app, index) => (
                                    <TableRow key={app.id}>
                                        <TableCell>{applications.from + index}</TableCell>
                                        <TableCell>
                                            <div className="w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded">
                                                <img
                                                src={app.cover_url}
                                                alt="foto"
                                                className="w-full h-full object-cover object-top"
                                                />
                                            </div>
                                        </TableCell>
                                        {/* <TableCell>{app.application_category.name}</TableCell> */}
                                        <TableCell>
                                            {app.application_category.name == 'Internal' 
                                            ? <Badge className='bg-green-600'>{app.application_category.name}</Badge>
                                            : <Badge className='bg-yellow-600'>{app.application_category.name}</Badge>}
                                        </TableCell>
                                        <TableCell>{app.title}</TableCell>
                                        {/* <TableCell>{app.description.substring(0, 50)}</TableCell> */}
                                        <TableCell>
                                            <a href={app.url} target='_blank' className='underline text-blue-600'>{app.url}</a><br />
                                            {/* <a href={app.url} className='underline text-blue-600'>Link 2</a> */}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Buka menu</span>
                                                    <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/backoffice/aplikasi/${app.id}/edit`} className=' flex items-center'>
                                                            <PenBox className='ml-1 mr-1' /> Ubah
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" className="w-full flex items-center justify-start p-0 px-2">
                                                                <Trash2 className='mr-1' /> Hapus
                                                            </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                Tindakan ini tidak dapat dibatalkan. Ini akan menghapus data secara permanen.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                {/* <AlertDialogAction>
                                                                    <Link href={`/backoffice/aplikasi/${app.id}/delete`}>
                                                                        Lanjutkan
                                                                    </Link>
                                                                </AlertDialogAction> */}
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(app.id)}
                                                                >
                                                                    Lanjutkan
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                    <ApplicationPagination applications={applications} />
                </CardFooter>
            </Card>
            </div>
        </AppLayout>
    );
}
