import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import { motion } from "framer-motion";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface ProgramPerlindunganItem {
  id: number;
  kategori: string;
  judul: string;
  deskripsi: string;
  gambar: string | null;
}

interface PageProps {
  programPerlindungans: ProgramPerlindunganItem[];
}

interface SectionProps {
  judul: string;
  deskripsi: string;
}

const Section: React.FC<SectionProps> = ({ judul, deskripsi }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="relative h-full rounded-3xl p-8 shadow-md transition-shadow duration-500 hover:shadow-xl dark:shadow-amber-900/30"
    >
      {/* Accent Line */}
      <div className="absolute top-0 left-0 h-1 w-full rounded-t-3xl bg-gradient-to-r from-amber-900 to-amber-600"></div>

      <div className="space-y-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          Program Pelindungan
        </div>

        <h2 className="text-2xl font-bold uppercase md:text-3xl">
          {judul}
        </h2>

        <div className="h-1 w-14 rounded-full bg-amber-700"></div>

        <p className="text-justify text-base leading-relaxed text-gray-600 dark:text-gray-300">
          {deskripsi}
        </p>
      </div>
    </motion.div>
  );
};

const ProgramPerlindungan: PageWithLayout<PageProps> = ({
  programPerlindungans,
}) => {
  return (
    <>
      <Head title="Program Pelindungan - LPSK" />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
          <div className="container mx-auto px-4">
            Tugas & Fungsi /{" "}
            <span className="font-semibold">Program Pelindungan</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <p className="text-xl font-bold leading-snug text-white md:text-2xl lg:text-3xl">
              Program Pelindungan
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-8">
            {programPerlindungans.map((item) => (
              <div
                key={item.id}
                className="w-full lg:w-[calc(50%-16px)]"
              >
                <Section
                  judul={item.judul}
                  deskripsi={item.deskripsi}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

ProgramPerlindungan.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default ProgramPerlindungan;