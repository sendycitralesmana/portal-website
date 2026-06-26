import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import { motion } from "framer-motion";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface SubjekTerlindungItem {
  id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  gambar: string | null;
}

interface PageProps {
  subjekTerlindungs: SubjekTerlindungItem[];
}

interface SubjekSectionProps {
  judul: string;
  deskripsi: string;
  gambar: string;
  reverse?: boolean;
}

const SubjekSection: React.FC<SubjekSectionProps> = ({
  judul,
  deskripsi,
  gambar,
  reverse = false,
}) => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -4 }}
          className={`relative flex flex-col md:flex-row ${
            reverse ? "md:flex-row-reverse" : ""
          } items-center gap-10
                dark:shadow-amber-900/30 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-500 p-8`}
        >
          {/* Accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-900 to-amber-600 rounded-t-3xl"></div>

          {/* Gambar */}
          <div className="w-full md:w-2/6 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-4/5 md:w-3/4 relative"
            >
              <div className="overflow-hidden rounded-2xl shadow-sm bg-slate-50 dark:bg-background p-4">
                <img
                  src={gambar && gambar.trim() !== "" ? gambar : "/images/logo-lg.png"}
                  alt={judul}
                  className="w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>

          {/* Text */}
          <div className="w-full md:w-4/6 space-y-5">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-semibold tracking-widest text-amber-700 uppercase"
            >
              Subjek Perlindungan
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold uppercase">
              {judul}
            </h2>

            <div className="w-14 h-1 bg-amber-700 rounded-full"></div>

            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300 text-justify">
              {deskripsi}
            </p>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SubjekTerlindung: PageWithLayout<PageProps> = ({
  subjekTerlindungs,
}) => {
  return (
    <>
      <Head title="Subjek Terlindung - LPSK" />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Tugas & Fungsi /{" "}
            <span className="font-semibold">Subjek Terlindung</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
              Subjek Terlindung
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="py-10">
          {subjekTerlindungs.map((item, index) => (
            <SubjekSection
              key={item.id}
              judul={item.judul}
              deskripsi={item.deskripsi}
              gambar={item.gambar ? item.gambar : "/images/logo-lg.png"}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

SubjekTerlindung.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default SubjekTerlindung;