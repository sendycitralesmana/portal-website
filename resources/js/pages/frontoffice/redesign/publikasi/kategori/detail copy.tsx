import { Head, Link } from "@inertiajs/react";
import { ReactElement, ReactNode, useState } from "react";
import MainLayout from "../../layout/main";

import { X, ZoomIn, ZoomOut } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface Publikasi {
  jenis: string;
  kategori: string;
  judul: string;
  slug: string;
  deskripsi: string;
  gambar: string;
  created_at: string;
}

interface Props {
  publikasi: Publikasi;
}

/**
 * =========================
 * DATA GALERI (TETAP STATIS)
 * =========================
 */

interface ImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

const images: ImageItem[] = [
  {
    id: 1,
    src: "https://picsum.photos/id/1015/1600/900",
    title: "Foto 1",
    description:
      "Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme.",
  },
  {
    id: 2,
    src: "https://picsum.photos/id/1016/1600/900",
    title: "Foto 2",
    description: "Suasana interaksi dan diskusi yang berlangsung secara produktif.",
  },
  {
    id: 3,
    src: "https://picsum.photos/id/1018/1600/900",
    title: "Foto 3",
    description:
      "Potret situasi lapangan yang memperlihatkan implementasi program secara langsung.",
  },
];

/**
 * =========================
 * DATA ARTIKEL LAIN (TETAP STATIS)
 * =========================
 */

interface ArtikelLain {
  id: number;
  title: string;
  image: string;
}

const artikelLain: ArtikelLain[] = [
  {
    id: 2,
    title: "Berita Foto: LPSK Lakukan Pendampingan Korban Tindak Pidana",
    image: "/images/background.webp",
  },
  {
    id: 3,
    title: "Berita Foto: Sosialisasi Hak Korban di Lingkungan Kampus",
    image: "/images/background.webp",
  },
  {
    id: 4,
    title: "Berita Foto: Koordinasi LPSK dengan Aparat Penegak Hukum",
    image: "/images/background.webp",
  },
  {
    id: 5,
    title: "Berita Foto: LPSK Tingkatkan Layanan Darurat Perlindungan",
    image: "/images/background.webp",
  },
];

const DetailPublikasi: PageWithLayout<Props> = ({ publikasi }) => {
  const [openGallery, setOpenGallery] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <Head title={publikasi.judul} />

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Publikasi / <span className="font-semibold">{publikasi.kategori}</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-8">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl font-semibold text-white">
              {publikasi.judul}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">

          <p className="text-sm mb-6">{formatDate(publikasi.created_at)}</p>

          {/* PREVIEW GALERI */}
          {images && images.length > 0 ? (

            <div
              onClick={() => setOpenGallery(true)}
              className="mb-10 grid grid-cols-3 gap-2 cursor-pointer"
            >

              <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={publikasi.gambar}
                  alt={publikasi.judul}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex flex-col gap-2">

                {images[0] && (
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={images[0].src}
                      alt={images[0].title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                {images[1] && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={images[1].src}
                      alt={images[1].title}
                      className="w-full h-full object-cover"
                    />

                    {images.length > 2 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xl font-semibold">
                        +{images.length - 2}
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          ) : (

            <div className="mb-10">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                <img
                  src={publikasi.gambar}
                  alt={publikasi.judul}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          )}

          {/* ARTIKEL */}
          <div className="prose prose-sm max-w-none leading-relaxed">

            <p className="text-center font-bold mt-6">{publikasi.kategori}</p>

            <div className="mx-auto w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-4"></div>

            <p className="text-center font-semibold mb-6">
              {publikasi.judul.toUpperCase()}
            </p>

            <div dangerouslySetInnerHTML={{ __html: publikasi.deskripsi }} />

          </div>

          {/* ARTIKEL LAIN (MASIH STATIS) */}
          <div className="mt-12">

            <h3 className="text-base md:text-lg font-semibold mb-2">
              Artikel Lain
            </h3>

            <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mb-4"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {artikelLain.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm">

                  <div
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />

                  <div className="p-3 text-xs md:text-sm font-medium">
                    <Link href="#">
                      {item.title}
                    </Link>
                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>
      </div>

      {/* MODAL GALERI */}
      {openGallery && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white">

          <div className="flex w-full items-center justify-between border-b border-white/10 px-8 py-4">

            <div className="text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>

            <div className="flex items-center gap-4">

              <button onClick={() => setZoom((z) => z + 0.2)}>
                <ZoomIn size={20} />
              </button>

              <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))}>
                <ZoomOut size={20} />
              </button>

              <button onClick={() => setOpenGallery(false)}>
                <X size={22} />
              </button>

            </div>

          </div>

          <div className="flex flex-1 items-center justify-center px-12 md:px-20">

            <Swiper
              modules={[Thumbs, Navigation]}
              navigation
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                setZoom(1);
              }}
              thumbs={{
                swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className="h-full w-full"
            >

              {images.map((img) => (
                <SwiperSlide key={img.id}>

                  <div className="flex h-full flex-col items-center justify-center">

                    <div className="overflow-hidden rounded-xl">

                      <img
                        src={img.src}
                        alt={img.title}
                        style={{ transform: `scale(${zoom})` }}
                        className="max-h-[60vh] w-auto object-contain shadow-2xl transition"
                      />

                    </div>

                    <div className="text-center max-w-7xl mt-6 px-6">

                      <p className="text-lg font-semibold">{img.title}</p>

                      <p className="mt-2 text-sm text-white/70">
                        {img.description}
                      </p>

                    </div>

                  </div>

                </SwiperSlide>
              ))}

            </Swiper>

          </div>

          <div className="flex justify-center pb-8">

            <div className="w-full max-w-3xl">

              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                slidesPerView={6}
                freeMode
                watchSlidesProgress
              >

                {images.map((img, index) => (

                  <SwiperSlide key={img.id}>

                    <div
                      className={`aspect-square w-20 overflow-hidden rounded-md border-2 ${
                        activeIndex === index
                          ? "border-white"
                          : "border-transparent opacity-50"
                      }`}
                    >
                      <img src={img.src} className="w-full h-full object-cover" />
                    </div>

                  </SwiperSlide>

                ))}

              </Swiper>

            </div>

          </div>

        </div>
      )}

    </>
  );
};

DetailPublikasi.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default DetailPublikasi;