import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";

type StrukturOrganisasiType = {
  gambar: string | null;
};

type PageProps = {
  strukturOrganisasi: StrukturOrganisasiType | null;
};

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

const StrukturOrganisasi: PageWithLayout<PageProps> = ({ strukturOrganisasi }) => {

  const imageSrc =
    strukturOrganisasi?.gambar ?? "/images/struktur-organisasi.webp";

  return (
    <>
      <Head title="Struktur Organisasi" />

      <div className="">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Profil /{" "}
            <span className="font-semibold">
              Struktur Organisasi
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
              Struktur Organisasi
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-12 bg-slate-50 dark:bg-background">
          <div className="w-full container">
            <div className="relative overflow-hidden shadow-xl rounded-md">
              <img
                src={imageSrc}
                alt="Struktur Organisasi"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

StrukturOrganisasi.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default StrukturOrganisasi;