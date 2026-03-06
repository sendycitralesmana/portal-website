import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import { motion } from "framer-motion";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface KewenanganItem {
  id: number;
  kategori: string;
  judul: string | null;
  deskripsi: string;
  gambar: string | null;
}

interface Props {
  kewenangans: KewenanganItem[];
}

const Kewenangan: PageWithLayout<Props> = ({ kewenangans }) => {
  return (
    <>
      <Head title="Kewenangan - LPSK" />

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Tugas & Fungsi /{" "}
            <span className="font-semibold">Kewenangan</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
          <div className="container mx-auto px-4">
            <p className="text-2xl md:text-3xl font-bold text-white">
              KEWENANGAN
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {kewenangans.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="relative 
                  rounded-2xl 
                  shadow-md 
                  hover:shadow-amber-900/50
                  transition-all duration-300
                  border border-amber-800/50
                  overflow-hidden 
                dark:shadow-amber-900/30
                  p-6 md:p-8"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300"></div>

                {/* Hanya tampilkan deskripsi */}
                <p className="text-sm md:text-base leading-relaxed text-center">
                  {item.deskripsi}
                </p>
              </motion.div>
            ))}

          </div>
        </div>

      </div>
    </>
  );
};

Kewenangan.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default Kewenangan;