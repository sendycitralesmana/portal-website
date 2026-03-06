// resources/js/Pages/backoffice/layanan-perlindunganPage.tsx

import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, PenBox } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import debounce from 'lodash/debounce';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Protection Service', href: '/backoffice/en/protection-service' },
];

type ProtectionServiceItem = {
  id: number;
  title: string;
  information: string;
  legal_basis: string;
  access_protection: string;
  cover: string;
  cover_url: string;
};

type PageProps = {
  protectionService: ProtectionServiceItem[];
  search: string;
  flash: { message?: string };
};

export default function LayananPerlindunganPage() {
  const { flash, protectionService, search } = usePage<PageProps>().props;
  const [searchTerm, setSearchTerm] = useState(search ?? '');

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleSearch = useRef(
    debounce((query: string) => {
      router.get('/backoffice/en/protection-service', { search: query }, { preserveState: true, replace: true });
    }, 500)
  ).current;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    handleSearch(query);
  };

  const maxData = 2;
  const canAddMore = protectionService.length < maxData;

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Protection Service">
        <meta name="description" content="Halaman Protection Service" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="flex h-full flex-1 flex-col gap- rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          {canAddMore && (
            <Button asChild>
              <Link href="/backoffice/en/protection-service/add" className="flex items-center">
                <Plus className="mr-2" size={16} />
                Add
              </Link>
            </Button>
          )}
        </div>

        <div className="flex flex-col space-y-6">
          {protectionService.map((item) => (
            <Card key={item.id} className="shadow-md rounded-lg p-4 mb-6 relative">
              {/* Tombol Edit */}
              <div className="absolute top-4 right-4">
                <Link href={`/backoffice/en/protection-service/${item.id}/edit`}>
                  <Button className="flex items-center gap-1">
                    <PenBox className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>
              </div>

              {/* Judul */}
              <h1 className="text-xl md:text-2xl font-bold text-[color:var(--primary-navy)] dark:text-white mb-4 uppercase text-center">
                {item.title}
              </h1>

              {/* Informasi + Gambar */}
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                {/* Informasi (3/4) */}
                <div className="w-full md:w-3/4">
                  <h2 className="text-base font-semibold text-[color:var(--primary-navy)] dark:text-white mb-2">
                    Information {item.title
                      ?.toLowerCase()
                      .replace(/\b\w/g, char => char.toUpperCase())}
                  </h2>
                  {/* <div
                    className="text-sm leading-relaxed text-justify text-gray-700 dark:text-white"
                    dangerouslySetInnerHTML={{ __html: item.information }}
                  /> */}
                  <div
                      className="prose max-w-none prose-sm md:prose-base dark:text-white"
                      dangerouslySetInnerHTML={{ __html: item.information }}
                    />
                </div>

                {/* Gambar (1/4) */}
                <div className="w-full md:w-1/4 flex justify-center">
                  {item.cover_url && (
                    <img
                      src={item.cover_url}
                      alt="Cover"
                      className="w-full h-full max-h-60 object-cover rounded-md border shadow-sm"
                    />
                  )}
                </div>
              </div>

              {/* Dasar Hukum */}
              <div className="mb-4">
                <h2 className="text-base font-semibold text-[color:var(--primary-navy)] dark:text-white mb-2">
                  Legal Basis
                </h2>
                {/* <div
                  className="text-sm leading-relaxed text-justify text-gray-700 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.legal_basis }}
                /> */}
                <div
                  className="prose max-w-none prose-sm md:prose-base dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.legal_basis }}
                />
              </div>

              {/* Akses Perlindungan */}
              <div>
                <h2 className="text-base font-semibold text-[color:var(--primary-navy)] dark:text-white mb-2">
                  Access Protection
                </h2>
                {/* <div
                  className="text-sm leading-relaxed text-justify text-gray-700 dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.access_protection }}
                /> */}
                <div
                  className="prose max-w-none prose-sm md:prose-base dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.access_protection }}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayoutEn>
  );
}
