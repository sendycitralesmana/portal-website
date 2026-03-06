import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import { motion } from "framer-motion";
import MainLayout from "../layout/main";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface Pejabat {
  kategori: string;
  nama: string;
  jabatan: string;
  foto: string | null;
}

interface Props {
  sekretarisJenderals: Pejabat[];
  kepalaBiroLpsks: Pejabat[];
  kepalaBagianLpsks: Pejabat[];
  kepalaPerwakilanLpskDaerahs: Pejabat[];
  tenagaAhliLpsks: Pejabat[];
}

/* ===============================
   CARD COMPONENT (BLUE THEME)
================================= */

const PejabatCard: React.FC<{
  nama: string;
  jabatan: string;
  foto?: string | null;
  showImage?: boolean;
}> = ({ nama, jabatan, foto, showImage = true }) => {
  const imageSrc = foto ?? "/images/logo-lg.png";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col items-center text-center bg-white dark:bg-slate-900 
                dark:shadow-blue-900/30 rounded-xl 
                 shadow-md hover:shadow-xl 
                 border border-blue-100 dark:border-blue-900/40
                 transition-all duration-300 p-6"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-800 to-blue-500 rounded-t-xl"></div>

      {showImage && (
        <div className="relative w-28 h-36 rounded-lg overflow-hidden shadow-sm mb-4 ring-2 ring-blue-100 dark:ring-blue-900/40">
          <img
            src={imageSrc}
            alt={nama}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <p className="font-semibold text-sm text-blue-900 dark:text-blue-200">
        {nama}
      </p>

      <p className="text-xs text-blue-700/80 dark:text-blue-300 mt-1">
        {jabatan}
      </p>
    </motion.div>
  );
};

/* ===============================
   SECTION WRAPPER
================================= */

interface SectionProps {
  title: string;
  data: Pejabat[];
  cols?: string;
  center?: boolean;
  showImage?: boolean;
}

const Section: React.FC<SectionProps> = ({
  title,
  data,
  cols = "lg:grid-cols-4",
  center = false,
  showImage = true,
}) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 inline-block relative">
          {title}
        </h2>
        <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-blue-800 to-blue-500 rounded-full"></div>
      </div>

      {center ? (
        <div className="flex justify-center gap-8 flex-wrap">
          {data.map((item, index) => (
            <PejabatCard
              key={index}
              nama={item.nama}
              jabatan={item.jabatan}
              foto={item.foto}
              showImage={showImage}
            />
          ))}
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-8`}>
          {data.map((item, index) => (
            <PejabatCard
              key={index}
              nama={item.nama}
              jabatan={item.jabatan}
              foto={item.foto}
              showImage={showImage}
            />
          ))}
        </div>
      )}
    </section>
  );
};

/* ===============================
   PAGE
================================= */

const PejabatStruktural: PageWithLayout<Props> = ({
  sekretarisJenderals,
  kepalaBiroLpsks,
  kepalaBagianLpsks,
  kepalaPerwakilanLpskDaerahs,
  tenagaAhliLpsks,
}) => {
  return (
    <>
      <Head title="Pejabat Struktural - LPSK" />

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-blue-700 to-blue-900 py-3 text-xs md:text-sm text-white">
          <div className="container mx-auto px-4">
            Profil /{" "}
            <span className="font-semibold">
              Pejabat Struktural
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-900 py-6 md:py-8 shadow-md">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
              Pejabat Struktural
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 space-y-24">

          <Section
            title="Sekretaris Jenderal"
            data={sekretarisJenderals}
            center
          />

          <Section
            title="Kepala Biro LPSK"
            data={kepalaBiroLpsks}
            cols="lg:grid-cols-4"
          />

          {/* <Section
            title="Kepala Bagian LPSK"
            data={kepalaBagianLpsks}
            center
          />

          <Section
            title="Kepala Perwakilan LPSK Daerah"
            data={kepalaPerwakilanLpskDaerahs}
            cols="lg:grid-cols-5"
          /> */}

          <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">

  {/* KIRI - 2 DATA */}
  <section className="lg:col-span-2 space-y-8">
    <div className="text-center">
      <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200">
        Kepala Bagian LPSK
      </h2>
      <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-blue-800 to-blue-500 rounded-full"></div>
    </div>

    <div className="grid grid-cols-2 gap-6">
    {kepalaBagianLpsks.map((item, index) => (
      <PejabatCard
        key={index}
        nama={item.nama}
        jabatan={item.jabatan}
        foto={item.foto}
      />
    ))}
  </div>
  </section>

  {/* KANAN - 5 DATA */}
  <section className="lg:col-span-5 space-y-8">
    <div className="text-center">
      <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200">
        Kepala Perwakilan LPSK Daerah
      </h2>
      <div className="mx-auto mt-3 w-20 h-1 bg-gradient-to-r from-blue-800 to-blue-500 rounded-full"></div>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {kepalaPerwakilanLpskDaerahs.map((item, index) => (
        <PejabatCard
          key={index}
          nama={item.nama}
          jabatan={item.jabatan}
          foto={item.foto}
        />
      ))}
    </div>
  </section>

</div>

          {/* Khusus Tenaga Ahli → TANPA FOTO */}
          <Section
            title="Tenaga Ahli LPSK"
            data={tenagaAhliLpsks}
            cols="lg:grid-cols-3"
            showImage={false}
          />

        </div>
      </div>
    </>
  );
};

PejabatStruktural.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default PejabatStruktural;