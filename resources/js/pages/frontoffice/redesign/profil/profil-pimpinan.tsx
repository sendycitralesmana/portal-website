import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/main";

/* ===============================
   TYPES
================================= */

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface Profil {
  id: number;
  nama: string;
  deskripsi: string;
  jabatan: string; // WAJIB
  foto: string | null; // BOLEH NULL
}

interface PageProps {
  profilPimpinans: Profil[];
}

/* ===============================
   CARD COMPONENT
================================= */

const ProfilCard = ({ profil }: { profil: Profil }) => {
  const fotoSrc = profil.foto
    ? `/storage/${profil.foto}`
    : "/images/logo-lg.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
      className="relative  rounded-2xl shadow-lg border border-amber-100 dark:border-amber-900/40 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400"></div>

      <div className="p-6 md:p-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* FOTO */}
          <div className="md:col-span-4">
            <div className="w-full h-[280px] md:h-[360px] bg-gray-50 dark:bg-slate-800 flex items-start justify-center rounded-xl overflow-hidden">
              <img
                src={fotoSrc}
                alt={profil.nama}
                className="h-full object-contain"
              />
            </div>
          </div>

          {/* DESKRIPSI */}
          <div className="md:col-span-8 space-y-4">
            
            {/* NAMA */}
            <h3 className="text-2xl md:text-3xl font-bold ">
              {profil.nama}
            </h3>

            {/* JABATAN */}
            <p className="text-sm md:text-base font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">
              {profil.jabatan}
            </p>

            <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full"></div>

            {/* DESKRIPSI */}
            {profil.deskripsi
              ?.split("\n")
              .filter((p) => p.trim() !== "")
              .map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-gray-700 dark:text-gray-300"
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ===============================
   PAGE
================================= */

const ProfilPimpinan: PageWithLayout<PageProps> = ({
  profilPimpinans = [],
}) => {
  return (
    <>
      <Head title="Profil Pimpinan - LPSK" />

      <div className="min-h-screen">
        
        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Profil / <span className="font-semibold">Profil Pimpinan</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
          <div className="container mx-auto px-4">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Profil Pimpinan
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 space-y-16">
          {profilPimpinans.length > 0 ? (
            profilPimpinans.map((profil) => (
              <ProfilCard key={profil.id} profil={profil} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              Data profil pimpinan belum tersedia.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

/* ===============================
   LAYOUT
================================= */

ProfilPimpinan.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default ProfilPimpinan;