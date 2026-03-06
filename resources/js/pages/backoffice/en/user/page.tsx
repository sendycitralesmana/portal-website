// UserPage.tsx
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
import { FileText, FileX, MoreHorizontal, PenBox, Plus, Search, Trash2 } from 'lucide-react';
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
import UserPagination from './pagination';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';
import { Badge } from '@/components/ui/badge';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'User', href: '/backoffice/en/user' },
];

type roleItem = { id: number; name: string; };

type LinksType = { url: string; label: string; active: boolean; };
type UserItem = {
  id: number;
  name: string;
  email: string;
  foto_url: string | null;
  role: roleItem;
  created_at: string;
};
type UsersItem = {
  data: UserItem[];
  links: LinksType[];
  from: number;
  to: number;
  total: number;
};
type PageProps = {
  users: UsersItem;
  search: string;
};

export default function UserPage() {
  const { flash, users, search } = usePage<PageProps & { flash: { message?: string } }>().props;
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  console.log(users);

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleSearch = useRef(
    debounce((query: string) => {
      router.get('/backoffice/en/user', { search: query }, { preserveState: true, replace: true });
    }, 500)
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleDelete = (id: number) => {
    router.delete(`/backoffice/en/user/${id}/delete`);
  };

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="User" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle>Data User</CardTitle>
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
                <Link href='/backoffice/en/user/add' className='flex items-center'>
                  <Plus className="mr-1" /> Add
                </Link>
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Foto</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.data?.map((app, index) => (
                  <TableRow key={app.id}>
                    <TableCell>{users.from + index}</TableCell>
                    <TableCell>
                      <div className="w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded">
                        <img
                          src={ app.foto_url ?? '/images/foto-default.jpg' }
                          alt="foto"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      {app.role.id === 1 ? (
                        <Badge className="bg-green-500 text-white">Supervisor</Badge>
                      ) : app.role.id === 2 ? (
                        <Badge className="bg-yellow-500 text-black">Contributor</Badge>
                      ) : (
                        <Badge>{app.role.name}</Badge>
                      )}
                    </TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Action</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/backoffice/en/user/${app.id}/edit`} className='flex items-center'>
                              <PenBox className='ml-1 mr-1' /> Edit
                            </Link>
                          </DropdownMenuItem>
                          {/* <DropdownMenuItem asChild>
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
                          </DropdownMenuItem> */}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
            <UserPagination users={users} />
          </CardFooter>
        </Card>
      </div>
    </AppLayoutEn>
  );
}
