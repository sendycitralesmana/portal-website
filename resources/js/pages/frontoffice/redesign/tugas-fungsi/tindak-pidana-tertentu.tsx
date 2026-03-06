import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import { motion } from "framer-motion";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface TindakPidanaTertentuItem {
  id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  gambar: string | null;
}

interface PageProps {
  tindakPidanaTertentus: TindakPidanaTertentuItem[];
}

interface SectionProps {
  judul: string;
  deskripsi: string;
  gambar: string | null;
  reverse?: boolean;
}

const Section: React.FC<SectionProps> = ({
  judul,
  deskripsi,
  gambar,
  reverse = false,
}) => {

  const imageSrc =
    gambar && gambar.trim() !== ""
      ? gambar
      : "/images/logo-lg.png";

  return (
    <div className="py-12">
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
        {/* Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-900 to-amber-600 rounded-t-3xl"></div>

        {/* Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-4/5"
          >
            <div className="overflow-hidden rounded-2xl shadow-sm bg-slate-50 dark:bg-background">
              <img
                src={imageSrc}
                alt={judul}
                onError={(e) => {
                  e.currentTarget.src = "/images/logo-lg.png";
                }}
                className="w-full h-[220px] md:h-[260px] object-contain"
              />
            </div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="w-full md:w-2/3 space-y-5">
          <div className="text-xs font-semibold tracking-widest text-amber-700 uppercase">
            Tindak Pidana
          </div>

          <h2 className="text-2xl md:text-3xl font-bold uppercase">
            {judul}
          </h2>

          <div className="w-14 h-1 bg-amber-700 rounded-full"></div>

          <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
            {deskripsi}
          </p>

          {/* <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="https://jdih.lpsk.go.id/"
              target="_blank"
              rel="noopener"
              className="bg-red-700 hover:bg-red-800 text-white text-sm px-5 py-2 rounded-lg transition shadow-sm"
            >
              JDIH
            </a>
            <a
              href="https://eppid.lpsk.go.id/"
              target="_blank"
              rel="noopener"
              className="bg-red-600 hover:bg-red-500 text-white text-sm px-5 py-2 rounded-lg transition shadow-sm"
            >
              EPPID
            </a>
          </div> */}
        </div>
      </motion.div>
    </div>
  );
};

const TindakPidanaTertentu: PageWithLayout<PageProps> = ({
  tindakPidanaTertentus,
}) => {
  return (
    <>
      <Head title="Tindak Pidana Tertentu - LPSK" />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Tugas & Fungsi /{" "}
            <span className="font-semibold">
              Tindak Pidana Tertentu
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-snug">
              Tindak Pidana Tertentu
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          {tindakPidanaTertentus.map((item, index) => (
            <Section
              key={item.id}
              judul={item.judul}
              deskripsi={item.deskripsi}
              gambar={item.gambar}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </>
  );
};

TindakPidanaTertentu.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default TindakPidanaTertentu;