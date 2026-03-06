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
import { Eye, MoreHorizontal, PenBox, Plus, Search, Trash2 } from 'lucide-react';

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
import debounce from 'lodash/debounce';
import ProfilePagination from './pagination';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile',
        href: '/backoffice/en/profile',
    },
];

type ProfileCategoryItem = {
    id: number;
    name: string;
}

type LinksType = {
    url: string;
    label: string;
    active: boolean;
}

type ProfileItem = {
    id: number;
    profile_category: ProfileCategoryItem;
    name: string;
    description: string;
    foto: string;
    foto_url: string;
};

type ProfilesItem = {
    data: ProfileItem[]
    links: LinksType[]
    from: number
    to: number
    total: number
}

type PageProps = {
    profiles: ProfilesItem;
};

export default function ProfilPage() {

//   const { auth } = usePage<{ auth: AuthUser }>().props;
  const { flash } = usePage<{ flash: { message?: string } }>().props
  const { profiles } = usePage<PageProps>().props;
  console.log(profiles);

  useEffect(() => {
    if (flash.message) {
        toast.success(flash.message)
    }
  }, [flash.message])

    // search functionality
    const handleSearch = useRef(
        debounce((query: string) => {
            router.get('/backoffice/en/profile', { search: query }, { preserveState: true, replace: true });
        }, 500),
    ).current;

    // handle search change
    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        handleSearch(query);
    };

    const handleDelete = (id: number) => {
        router.delete(`/backoffice/en/profile/${id}/delete`);
    };

    return (
        <AppLayoutEn breadcrumbs={breadcrumbs}>
            <Head title="Profile">
                <meta name="description" content="Profile" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <Card className='shadow-md'>
                <CardHeader>
                    <CardTitle>Data Profile</CardTitle>
                </CardHeader>
                <CardContent className='space-y-8'>
                    <div className='flex items-center justify-between'>
                        <div className="relative w-full sm:w-1/3">
                            <Input 
                                id={'search'} 
                                className="peer ps-9" 
                                placeholder="Search ..." 
                                type="search" 
                                onChange={onSearchChange}
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                            <Search size={16} aria-hidden="true" />
                            </div>
                        </div>
                        <Button>
                            <Link href='/backoffice/en/profile/add' className='flex items-center'>
                                <Plus /> Add
                            </Link>
                        </Button>
                    </div>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">No</TableHead>
                                    <TableHead>Foto</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {profiles.data?.map((app, index) => (
                                    <TableRow key={app.id}>
                                        <TableCell>{profiles.from + index}</TableCell>
                                        {/* <TableCell>
                                            <img src={app.foto_url} alt="foto" className="w-24 h-24 sm:w-32 sm:h-32 object-foto rounded" />
                                        </TableCell> */}
                                        <TableCell>
                                            <div className="w-20 h-20 sm:w-32 sm:h-32 overflow-hidden rounded">
                                                <img
                                                src={app.foto_url}
                                                alt="foto"
                                                className="w-full h-full object-cover object-top"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>{app.name}</TableCell>
                                        <TableCell>{app.description.substring(0, 70)}</TableCell>
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
                                                        <Link href={`/backoffice/en/profile/${app.id}/edit`} className=' flex items-center'>
                                                            <PenBox className='ml-1 mr-1' /> Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/backoffice/en/profile/${app.id}/detail`} className=' flex items-center'>
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
                                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                    <ProfilePagination profiles={profiles} />
                </CardFooter>
            </Card>
            </div>
        </AppLayoutEn>
    );
}
