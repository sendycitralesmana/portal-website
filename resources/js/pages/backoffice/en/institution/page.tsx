// LembagaPage.tsx
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
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Institution', href: '/backoffice/en/institution' },
];

type InstitutionItem = {
  id: number;
  history: string;
  legal_basis: string;
  document: string;
  document_url: string;
  document_full_url: string;
  vision_cover: string;
  vision_cover_url: string;
  vision: string;
  mission_cover: string;
  mission_cover_url: string;
  mission: string;
  authority: string;
};

type PageProps = {
  institution: InstitutionItem;
  search: string;
};

export default function LembagaPage() {
  const { flash, institution, search } = usePage<PageProps & { flash: { message?: string } }>().props;
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  console.log(institution);

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleSearch = useRef(
    debounce((query: string) => {
      router.get('/backoffice/en/institution', { search: query }, { preserveState: true, replace: true });
    }, 500)
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    handleSearch(query);
  };

  const handleDelete = (id: number) => {
    router.delete(`/backoffice/en/institution/${id}/delete`);
  };

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Institution">
          <meta name="description" content="Halaman Institution" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle>Data Institution</CardTitle>
          </CardHeader>
          <CardContent className='space-y-8'>
            <div className='flex items-center justify-between'>
              <div className="relative w-full sm:w-1/3">
                
              </div>
              {institution ? (
                <Button>
                  <Link href={`/backoffice/en/institution/${institution.id}/edit`} className='flex items-center'>
                    <PenBox className="mr-1" /> Edit
                  </Link>
                </Button>
              ) : (
                <Button>
                  <Link href='/backoffice/en/institution/add' className='flex items-center'>
                    <Plus className="mr-1" /> Add
                  </Link>
                </Button>
              )}

            </div>

            {institution ? (
              <div className=" mx-auto px-4 py-8 space-y-16 text-justify text-sm md:text-base">
                {/* Judul */}
                {/* <h1 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase text-center mb-8 dark:text-white">
                  Institution Perlindungan Saksi dan Korban
                </h1> */}

                {/* SEJARAH */}
                <section>
                  <h2 className="font-bold text-blue-900 uppercase mb-2 dark:text-white">History of the birth of LPSK</h2>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-sm md:prose-base dark:text-white"
                    dangerouslySetInnerHTML={{ __html: institution.history }}
                  />
                </section>

                {/* DASAR HUKUM */}
                <section>
                  <h2 className="font-bold text-blue-900 uppercase mb-2 dark:text-white">Legal Basis</h2>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-sm md:prose-base dark:text-white"
                    dangerouslySetInnerHTML={{ __html: institution.legal_basis }}
                  />
                  {institution.document_url && (
                    <div className="mt-4">
                      <a
                        href={`/backoffice/lembaga/preview-document`}
                        className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                        target="_blank"
                      >
                        <FileText size={16} /> Download Document
                      </a>
                    </div>
                  )}
                </section>

                {/* VISI */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  {/* Image 1/3 — mobile: atas, desktop: kanan */}
                  <div className="order-1 md:order-2 w-full">
                    <img
                      src={institution.vision_cover_url}
                      alt="Visi"
                      className="w-full h-auto max-h-72 object-cover rounded shadow-md"
                    />
                  </div>

                  {/* Text 2/3 */}
                  <div className="md:col-span-2 order-2 md:order-1">
                    <h2 className="font-bold text-blue-900 uppercase mb-2 dark:text-white">Vision</h2>
                    <div
                      className="text-gray-700 leading-relaxed prose prose-sm md:prose-base text-justify dark:text-white"
                      dangerouslySetInnerHTML={{ __html: institution.vision }}
                    />
                  </div>
                </section>

                {/* MISI */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  {/* Image 1/3 — mobile: atas, desktop: kiri */}
                  <div className="order-1 md:order-none w-full">
                    <img
                      src={institution.mission_cover_url}
                      alt="Misi"
                      className="w-full h-auto max-h-72 object-cover rounded shadow-md"
                    />
                  </div>

                  {/* Text 2/3 */}
                  <div className="md:col-span-2 order-2">
                    <h2 className="font-bold text-blue-900 uppercase mb-2 dark:text-white">Mission</h2>
                    <div
                      className="text-gray-700 leading-relaxed prose prose-sm md:prose-base text-justify dark:text-white"
                      dangerouslySetInnerHTML={{ __html: institution.mission }}
                    />
                  </div>
                </section>

                {/* TUGAS DAN WEWENANG */}
                <section className="text-center">
                  <h2 className="font-bold text-blue-900 uppercase mb-4 dark:text-white">Duties and Function</h2>
                  <div
                    className="mx-auto max-w-4xl text-gray-700 leading-relaxed prose prose-sm md:prose-base text-justify dark:text-white"
                    dangerouslySetInnerHTML={{ __html: institution.authority }}
                  />
                </section>
              </div>
            ) : null}

          </CardContent>
        </Card>
      </div>
    </AppLayoutEn>
  );
}