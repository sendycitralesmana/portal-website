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

interface VisiMisiItem {
  id: number;
  kategori: string; // 'visi' | 'misi'
  deskripsi: string;
  gambar: string | null; // tetap didefinisikan
}

interface PageProps {
  visiMisis: VisiMisiItem[];
}

/* ===============================
   PAGE
================================= */

const VisiMisi: PageWithLayout<PageProps> = ({
  visiMisis = [],
}) => {
  return (
    <>
      <Head title="Visi & Misi - LPSK" />

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Profil / <span className="font-semibold">Visi & Misi</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
          <div className="container mx-auto px-4">
            <p className="text-2xl md:text-3xl font-bold text-white">
              Visi & Misi
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 space-y-12">
          {visiMisis.length > 0 ? (
            visiMisis.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -6 }}
                className="relative  rounded-2xl shadow-lg border border-amber-100 dark:border-amber-900/40 overflow-hidden p-8 md:p-10"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400"></div>

                {/* KATEGORI */}
                <h3 className="text-2xl md:text-3xl font-bold  uppercase">
                  {item.kategori}
                </h3>

                <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-3 mb-6"></div>

                {/* DESKRIPSI */}
                {item.deskripsi
                  .split("\n")
                  .filter((p) => p.trim() !== "")
                  .map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-4 text-justify"
                    >
                      {paragraph}
                    </p>
                  ))}
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Data visi dan misi belum tersedia.
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

VisiMisi.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default VisiMisi;