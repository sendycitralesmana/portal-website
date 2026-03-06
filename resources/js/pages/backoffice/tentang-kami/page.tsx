// TentangKamiPage.tsx
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
import { PenBox, Plus, Trash2 } from 'lucide-react';
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
import { useEffect } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Tentang Kami', href: '/backoffice/tentang-kami' },
];

type AboutUsItem = {
  id: string;
  address: string;
  phone: string;
  hotline: string;
  whatsapp: string;
  email: string;
  faqs: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  created_at: string;
};

type PageProps = {
  aboutUs: AboutUsItem | null;
  flash: { message?: string };
};

export default function TentangKamiPage() {
  const { aboutUs, flash } = usePage<PageProps>().props;

  console.log(aboutUs);

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  const handleDelete = (id: string) => {
    router.delete(`/backoffice/tentang-kami/${id}/delete`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tentang Kami">
        <meta name="description" content="Halaman Tentang Kami" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Data Tentang Kami</CardTitle>
            {!aboutUs && (
              <Button asChild>
                <Link href="/backoffice/tentang-kami/add" className="flex items-center gap-1">
                  <Plus size={18} /> Tambah
                </Link>
              </Button>
            )}
          </CardHeader>

          <CardContent>
            {aboutUs ? (
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3">
                  <img
                    src="/images/logo-lpsk.png"
                    alt="Logo LPSK"
                    className="w-full h-auto object-cover rounded"
                  />
                </div>
                <div className="flex-1 space-y-2 text-sm sm:text-base">
                  <p><strong>Alamat:</strong> {aboutUs.address}</p>
                  <p><strong>Telepon:</strong> {aboutUs.phone}</p>
                  {/* <p><strong>Hotline:</strong> {aboutUs.hotline}</p> */}
                  <p><strong>Whatsapp:</strong> {aboutUs.whatsapp}</p>
                  <p><strong>Email:</strong> {aboutUs.email}</p>
                  {/* <p><strong>FAQs:</strong> {aboutUs.faqs}</p> */}

                  <hr className="my-3" />
                  <p className="font-semibold text-base">Sosial Media</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p><strong>Facebook:</strong> <a href={aboutUs.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{aboutUs.facebook}</a></p>
                    <p><strong>Instagram:</strong> <a href={aboutUs.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">{aboutUs.instagram}</a></p>
                    <p><strong>Twitter:</strong> <a href={aboutUs.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 underline">{aboutUs.twitter}</a></p>
                    <p><strong>YouTube:</strong> <a href={aboutUs.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 underline">{aboutUs.youtube}</a></p>
                    <p><strong>TikTok:</strong> <a href={aboutUs.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 underline">{aboutUs.tiktok}</a></p>
                  </div>
                </div>
              </div>
            ) : (
              <p>Tidak ada data.</p>
            )}
          </CardContent>


          {aboutUs && (
            <CardFooter className="flex justify-end gap-2">
              <Button asChild>
                <Link href={`/backoffice/tentang-kami/${aboutUs.id}/edit`} className="flex items-center gap-1">
                  <PenBox size={18} /> Ubah
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tindakan ini tidak dapat dibatalkan. Data akan dihapus secara permanen.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Batal</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(aboutUs.id)}>
                      Lanjutkan
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          )}
        </Card>
      </div>
    </AppLayout>
  );
}