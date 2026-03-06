// RepresentativeDetailPage.tsx
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
import { PenBox } from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Perwakilan', href: '/backoffice/perwakilan' },
];

type RepresentativeItem = {
  id: string;
  chief_representative: string;
  office: string;
  address: string;
  phone: string;
  hotline: string;
  email: string;
  instagram: string;
  cover_url: string;
  longitude: string;
  latitude: string;
  created_at: string;
};

type PageProps = {
  representative: RepresentativeItem;
  flash: { message?: string };
};

const GoogleMapWrapper = ({ lat, lng }: { lat: number; lng: number }) => {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "AIzaSyA1MgLuZuyqR_OGY3ob3M52N46TDBRI_9k", // Ganti sesuai key kamu
    });
  
    const center = { lat, lng };
  
    if (!isLoaded) return <div className="text-lg">Loading map...</div>;
  
    return (
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={14}
      >
        <Marker position={center} />
      </GoogleMap>
    );
  };

export default function RepresentativeDetailPage() {
  const { representative, flash } = usePage<PageProps>().props;

    const lat = parseFloat(representative.latitude || "0");
    const lng = parseFloat(representative.longitude || "0");
    const hasValidCoordinates = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;

  useEffect(() => {
    if (flash.message) toast.success(flash.message);
  }, [flash.message]);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Detail Perwakilan">
        <meta name="description" content="Halaman Detail Perwakilan" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Detail Perwakilan</CardTitle>
            <Button asChild>
              <Link href={`/backoffice/perwakilan/${representative.id}/edit`} className="flex items-center gap-1">
                <PenBox size={18} /> Ubah
              </Link>
            </Button>
          </CardHeader>

          <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="w-full max-w-md mx-auto aspect-[4/3] overflow-hidden rounded shadow">
                    <img
                    src={representative.cover_url}
                    alt="Cover Perwakilan 1"
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-full max-w-md mx-auto aspect-[4/3] overflow-hidden rounded shadow">
                    {hasValidCoordinates ? (
                      <div className="w-full h-full overflow-hidden shadow">
                        <GoogleMapWrapper lat={lat} lng={lng} />
                      </div>
                    ) : (
                      <p className="text-base italic text-muted-foreground">Lokasi belum tersedia</p>
                    )}
                </div>
            </div>

            <div className="space-y-2 text-sm sm:text-base">
              <p><strong>Kantor:</strong> {representative.office}</p>
              <p><strong>Kepala Perwakilan:</strong> {representative.chief_representative}</p>
              <p><strong>Alamat:</strong> {representative.address}</p>
              <p><strong>Telepon:</strong> {representative.phone}</p>
              <p><strong>Hotline:</strong> {representative.hotline}</p>
              <p><strong>Email:</strong> {representative.email}</p>

              <hr className="my-3" />
              <p className="font-semibold text-base">Sosial Media</p>
              <p><strong>Instagram:</strong> <a href={representative.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">{representative.instagram}</a></p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}