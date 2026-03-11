import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

const statistikData = [
  {
    id: 1,
    judul: "Statistik Permohonan Perlindungan 2023",
    gambar: "/images/background.webp",
  },
  {
    id: 2,
    judul: "Statistik Permohonan Perlindungan 2024",
    gambar: "/images/background.webp",
  },
  {
    id: 3,
    judul: "Statistik Berdasarkan Jenis Tindak Pidana",
    gambar: "/images/logo-lg.png",
  },
];

const StatistikPage: PageWithLayout = () => {
  return (
    <>
      <Head title="Statistik">
        <meta name="description" content="Halaman Statistik" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Publikasi /{" "}
            <span className="font-semibold">
              Statistik
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Statistik
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {statistikData.map((item) => (
              <div key={item.id}>

                {/* Judul Statistik */}
                <p className="text-lg xl:text-xl font-semibold">
                  {item.judul}
                </p>

                {/* Garis pemanis */}
                <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-4"></div>

                {/* Dialog Preview */}

                <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
                  <div className="w-full h-[320px] flex items-center justify-center p-4">
                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="max-w-full max-h-full object-contain rounded transition duration-300"
                    />
                  </div>
                </div>

                {/* <Dialog>
                  <DialogTrigger asChild>

                    <div className="cursor-pointer rounded-xl overflow-hidden shadow-sm hover:shadow-md transition bg-white">
                      <div className="w-full h-[320px] flex items-center justify-center p-4">
                        <img
                          src={item.gambar}
                          alt={item.judul}
                          className="max-w-full max-h-full object-contain transition duration-300 hover:scale-105"
                        />
                      </div>
                    </div>

                  </DialogTrigger>

                  <DialogContent className="max-w-4xl">

                    <img
                      src={item.gambar}
                      alt={item.judul}
                      className="w-full h-auto object-contain"
                    />

                  </DialogContent>
                </Dialog> */}

              </div>
            ))}

          </div>

        </div>
      </div>
    </>
  );
};

StatistikPage.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default StatistikPage;