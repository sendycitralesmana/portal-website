// resources/js/Pages/PerwakilanPage.tsx

import React, { ReactNode } from "react";
import { Head, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import PaginationComponentNoSlug from "../components/pagination-noslug";
import MainLayout from "../layout/main";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppContainer } from "@/components/ui/app-container";

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

interface Office {
  id: number;
  office: string;
  chief_representative: string;
  address: string;
  phone: string;
  hotline: string;
  email: string;
  instagram: string;
  cover_url: string | null;
  created_at: string;
  latitude: string | null;
  longitude: string | null;
}

interface PerwakilanPageProps {
  search?: string;
  page: number;
  per_page: number;
  data: {
    data: Office[];
    total: number;
  };
}

type InertiaPage = React.FC<PerwakilanPageProps> & {
  layout?: (page: ReactNode) => ReactNode;
};

const PerwakilanPage: InertiaPage = ({
  search = "",
  page,
  per_page,
  data,
}) => {
  const totalPages = Math.ceil(data.total / per_page);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchValue = formData.get("search")?.toString() || "";
    router.get(route(route().current()!), { search: searchValue, page: 1 });
  };

  return (
    <>
      <Head title="Perwakilan" />
      <main className="w-full">

        {/* <div className="mt-6 md:mt-10 mb-6 md:mb-10">
          <AppContainer>
            <Breadcrumb>
              <BreadcrumbList className="text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="font-semibold">
                    Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-[color:var(--primary-navy)] dark:text-white">Profil</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white">
                    Profil Lembaga
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </AppContainer>
        </div> */}

        <div className="mb-10 mt-10">
          <AppContainer>
            <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-extrabold text-[color:var(--primary-navy)] dark:text-white leading-snug">
              LPSK Perwakilan Daerah
            </h1>
          </AppContainer>
        </div>

        {/* <AppContainer>
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              name="search"
              defaultValue={search}
              className="flex-1 text-base sm:text-lg"
              placeholder="Cari kantor perwakilan..."
            />
            <Button type="submit" className="bg-blue-900 hover:bg-blue-800 text-lg dark:text-white">
              <SearchIcon />
            </Button>
          </form>
        </AppContainer> */}

        <AppContainer>
          <section className="space-y-14 py-10">
            {data.data.map((item, index) => {
              const lat = parseFloat(item.latitude || "0");
              const lng = parseFloat(item.longitude || "0");
              const hasValidCoordinates = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;

              return (
                <div
                  key={item.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 border-b pb-10"
                >
                  <div className="space-y-6">
                    <p className="text-2xl sm:text-3xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                      {index + 1}. {item.office}
                    </p>

                    <div className="-mt-3">
                      <p className="font-semibold xl:text-2xl mb-3 text-base dark:text-white">{item.chief_representative}</p>
                      <p className="font-bold xl:text-2xl mb-1 text-[color:var(--primary-navy)] dark:text-white">Alamat</p>
                      <p className="text-base sm:text-lg text-justify">{item.address}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <p className="font-bold xl:text-2xl mb-2 text-[color:var(--primary-navy)] dark:text-white">Kontak</p>
                        <ul className="text-base sm:text-lg space-y-1">
                          <li><strong>Telepon:</strong> {item.phone}</li>
                          <li><strong>Hotline:</strong> {item.hotline}</li>
                          <li>
                            <strong>Email:</strong> <a href={`mailto:${item.email}`} className="">{item.email}</a>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold xl:text-2xl mb-1  dark:text-white">Media Sosial</p>
                        <p className="text-base sm:text-lg ">
                          <strong>Instagram</strong><br />
                          <a href={`https://instagram.com/${item.instagram}`} className=" hover:underline" target="_blank" rel="noopener noreferrer">{item.instagram}</a>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="px-8">
                      <h4 className="font-bold text-lg mb-2 text-[color:var(--primary-navy)] dark:text-white">Foto</h4>
                      <div className="w-full h-[320px] rounded-lg shadow overflow-hidden">
                        <img
                          src={item.cover_url || "/storage/images/background.webp"}
                          alt={`Foto Kantor ${item.office}`}
                          className="w-full h-full object-cover rounded-lg"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/storage/images/background.webp";
                          }}
                        />
                      </div>
                    </div>

                    <div className="px-8">
                      <h4 className="font-bold text-lg mb-2 text-[color:var(--primary-navy)] dark:text-white">Peta Lokasi</h4>
                      <div className="w-full h-[320px] rounded-lg shadow overflow-hidden">
                        {hasValidCoordinates ? (
                          <GoogleMapWrapper lat={lat} lng={lng} />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground italic text-base">
                            Lokasi belum tersedia
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </section>
        </AppContainer>

        {/* <AppContainer>
          <section className="py-6">
            <PaginationComponentNoSlug
              currentPage={page}
              totalPages={totalPages}
              search={search}
            />
          </section>
        </AppContainer> */}
      </main>
    </>
  );
};

PerwakilanPage.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default PerwakilanPage;
