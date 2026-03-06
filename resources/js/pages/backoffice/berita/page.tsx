// BeritaPage.tsx
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, FileText, FileX, MoreHorizontal, PenBox, Plus, Search, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
} from "@/components/ui/alert-dialog";
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import debounce from 'lodash/debounce';
import PublikasiPagination from './pagination';
import BeritaPagination from './pagination';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Berita', href: '/backoffice/berita' },
];

type NewsCategoryItem = { id: number; name: string; };
type UserItem = { id: number; name: string; };
type LinksType = { url: string; label: string; active: boolean; };
type NewsItem = {
  id: number;
  news_category: NewsCategoryItem;
  user: UserItem;
  title: string;
  status: string;
  cover: string;
  cover_url: string;
  document_url: string;
  document_full_url: string;
  created_at: string;
};
type NewssItem = {
  data: NewsItem[];
  links: LinksType[];
  from: number;
  to: number;
  total: number;
};
type PageProps = {
  news: NewssItem;
  search: string;
};

export default function BeritaPage() {
  const { flash, news, search } = usePage<PageProps & { flash: { message?: string } }>().props;
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  console.log(news);

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleSearch = useRef(
    debounce((query: string) => {
      router.get('/backoffice/berita', { search: query }, { preserveState: true, replace: true });
    }, 500)
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleDelete = (id: number) => {
    router.delete(`/backoffice/berita/${id}/delete`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Berita">
          <meta name="description" content="Halaman Berita" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle>Data Berita</CardTitle>
          </CardHeader>
          <CardContent className='space-y-8'>
            <div className='flex items-center justify-between'>
              <div className="relative w-full sm:w-1/3">
                <Input
                  id={'search'}
                  className="peer ps-9"
                  placeholder="Cari ..."
                  type="search"
                  value={searchTerm}
                  onChange={onSearchChange}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <Search size={16} aria-hidden="true" />
                </div>
              </div>
              <Button>
                <Link href='/backoffice/berita/add' className='flex items-center'>
                  <Plus className="mr-1" /> Tambah
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Sampul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.data?.map((app, index) => (
                  <TableRow key={app.id}>
                    <TableCell>{news.from + index}</TableCell>
                    <TableCell>
                      <div className="w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded">
                        <img
                          src={app.cover_url}
                          alt="foto"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{app.news_category.name}</TableCell>
                    <TableCell>{app.user?.name}</TableCell>
                    <TableCell>
                      {app.title.length > 50 ? `${app.title.substring(0, 50)} ...` : app.title}
                    </TableCell>
                    <TableCell>
                        <span
                            className={`text-white px-2 py-1 rounded text-sm font-medium
                            ${app.status === 'DINAIKAN' ? 'bg-green-600' :
                                app.status === 'DIAJUKAN' ? 'bg-yellow-600' :
                                app.status === 'DITURUNKAN' ? 'bg-red-600' : 'bg-gray-400'}
                            `}
                        >
                            {app.status === 'DINAIKAN'
                            ? 'Dinaikan'
                            : app.status === 'DIAJUKAN'
                            ? 'Diajukan'
                            : app.status === 'DITURUNKAN'
                            ? 'Diturunkan'
                            : 'Tidak Diketahui'}
                        </span>
                    </TableCell>
                    <TableCell>{app.created_at}</TableCell>
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
                            <Link href={`/backoffice/berita/${app.id}/edit`} className='flex items-center'>
                              <PenBox className='ml-1 mr-1' /> Ubah
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/backoffice/berita/${app.id}/detail`} className='flex items-center'>
                              <Eye className='ml-1 mr-1' /> Detail
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
                                  <AlertDialogAction onClick={() => handleDelete(app.id)}>
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
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
            <BeritaPagination news={news} />
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
