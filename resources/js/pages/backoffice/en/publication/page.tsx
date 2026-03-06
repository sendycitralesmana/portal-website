// PublicationPage.tsx
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
import PublicationPagination from './pagination';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Publication', href: '/backoffice/en/publication' },
];

type PublicationCategoryItem = { id: number; name: string; };
type LinksType = { url: string; label: string; active: boolean; };
type PublicationItem = {
  id: number;
  publication_category: PublicationCategoryItem;
  title: string;
  status: string;
  cover: string;
  cover_url: string | null;
  document_url: string;
  document_full_url: string;
};
type PublicationsItem = {
  data: PublicationItem[];
  links: LinksType[];
  from: number;
  to: number;
  total: number;
};
type PageProps = {
  publications: PublicationsItem;
  search: string;
};

export default function PublicationPage() {
  const { flash, publications, search } = usePage<PageProps & { flash: { message?: string } }>().props;
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleSearch = useRef(
    debounce((query: string) => {
      router.get('/backoffice/en/publication', { search: query }, { preserveState: true, replace: true });
    }, 500)
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleDelete = (id: number) => {
    router.delete(`/backoffice/en/publication/${id}/delete`);
  };

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Publication">
        <meta name="description" content="Halaman Publication" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle>Data Publication</CardTitle>
          </CardHeader>
          <CardContent className='space-y-8'>
            <div className='flex items-center justify-between'>
              <div className="relative w-full sm:w-1/3">
                <Input
                  id={'search'}
                  className="peer ps-9"
                  placeholder="Search ..."
                  type="search"
                  value={searchTerm}
                  onChange={onSearchChange}
                />
                <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                  <Search size={16} aria-hidden="true" />
                </div>
              </div>
              <Button>
                <Link href='/backoffice/en/publication/add' className='flex items-center'>
                  <Plus className="mr-1" /> Add
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Cover</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publications.data?.map((app, index) => (
                  <TableRow key={app.id}>
                    <TableCell>{publications.from + index}</TableCell>
                    <TableCell>
                      <div className="w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded">
                        <img
                          src={app.cover_url ?? '/images/default.webp'}
                          alt="foto"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.document_url ? (
                        <a href={`/backoffice/en/publication/${app.id}/preview-document`} target="_blank">
                          <FileText className="mr-1 text-red-600 w-8 h-8" />
                        </a>
                      ) : (
                        <span className="text-gray-400 w-8 h-8">
                          <FileX className="mr-1" />
                        </span>
                      )}
                    </TableCell>
                    <TableCell>{app.publication_category?.name}</TableCell>
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
                            ? 'Published'
                            : app.status === 'DIAJUKAN'
                            ? 'Draft'
                            : app.status === 'DITURUNKAN'
                            ? 'Unpublished'
                            : 'Unknown'}
                        </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/backoffice/en/publication/${app.id}/edit`} className='flex items-center'>
                              <PenBox className='ml-1 mr-1' /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/backoffice/en/publication/${app.id}/detail`} className='flex items-center'>
                              <Eye className='ml-1 mr-1' /> Detail
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="w-full flex items-center justify-start p-0 px-2">
                                  <Trash2 className='mr-1' /> Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                      This action cannot be undone. It will permanently delete the data.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDelete(app.id)}>
                                    Continue
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
            <PublicationPagination publications={publications} />
          </CardFooter>
        </Card>
      </div>
    </AppLayoutEn>
  );
}
