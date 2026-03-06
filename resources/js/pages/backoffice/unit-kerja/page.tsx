// WorkUnitPage.tsx
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
import WorkUnitPagination from './pagination';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Unit Kerja', href: '/backoffice/unit-kerja' },
];

type LinksType = { url: string; label: string; active: boolean; };
type WorkUnitItem = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};
type WorkUnitsItem = {
  data: WorkUnitItem[];
  links: LinksType[];
  from: number;
  to: number;
  total: number;
};
type PageProps = {
  workUnits: WorkUnitsItem;
  search: string;
};

function stripHtmlAndLimit(html: string = "", maxLength: number): string {
  const noImgHtml = html.replace(/<img[^>]*>/gi, '');
  const text = noImgHtml.replace(/<[^>]+>/g, '').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

export default function WorkUnitPage() {
  const { flash, workUnits, search } = usePage<PageProps & { flash: { message?: string } }>().props;
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleSearch = useRef(
    debounce((query: string) => {
      router.get('/backoffice/unit-kerja', { search: query }, { preserveState: true, replace: true });
    }, 500)
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleDelete = (id: number) => {
    router.delete(`/backoffice/unit-kerja/${id}/delete`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Unit Kerja">
          <meta name="description" content="Halaman Unit Kerja" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle>Data Unit Kerja</CardTitle>
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
                <Link href='/backoffice/unit-kerja/add' className='flex items-center'>
                  <Plus className="mr-1" /> Tambah
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Konten</TableHead>
                  <TableHead>Dibuat</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workUnits.data?.map((app, index) => (
                  <TableRow key={app.id}>
                    <TableCell>{workUnits.from + index}</TableCell>
                    <TableCell>
                      {app.title.length > 50 ? `${app.title.substring(0, 50)} ...` : app.title}
                    </TableCell>
                    <TableCell>
                      {stripHtmlAndLimit(app.content ?? '', 100)}
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
                            <Link href={`/backoffice/unit-kerja/${app.id}/edit`} className='flex items-center'>
                              <PenBox className='ml-1 mr-1' /> Ubah
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/backoffice/unit-kerja/${app.id}/detail`} className='flex items-center'>
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
            <WorkUnitPagination workUnits={workUnits} />
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
}
