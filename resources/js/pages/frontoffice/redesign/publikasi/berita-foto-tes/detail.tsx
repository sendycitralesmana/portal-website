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

interface BeritaFoto {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string[];
}

interface ArtikelLain {
  id: number;
  title: string;
  image: string;
}

interface ImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

/**
 * =========================
 * CLASS DATA DETAIL
 * =========================
 */
class PublikasiDetailData {
  static beritaFoto: BeritaFoto = {
    id: 1,
    title:
      "Berita Foto: LPSK Gelar Sosialisasi Perlindungan Saksi dan Korban di Jakarta",
    date: "20 Februari 2026",
    image: "/images/background.webp",
    content: [
      "Jakarta, 20 Februari 2026. Lembaga Perlindungan Saksi dan Korban (LPSK) menggelar kegiatan sosialisasi perlindungan saksi dan korban di Jakarta.",
      "Kegiatan ini bertujuan meningkatkan pemahaman masyarakat mengenai hak-hak saksi dan korban dalam proses peradilan pidana.",
      "Dalam kegiatan tersebut, LPSK memaparkan berbagai bentuk perlindungan, mulai dari perlindungan fisik, bantuan medis, rehabilitasi psikologis, hingga fasilitasi restitusi dan kompensasi.",
      "Para peserta yang terdiri dari mahasiswa, aparat penegak hukum, dan masyarakat umum mengikuti kegiatan dengan antusias.",
      "Melalui kegiatan ini, LPSK berharap kesadaran publik terhadap pentingnya perlindungan saksi dan korban semakin meningkat."
    ],
  };

  // DATA GALERI STATIS
  static galeri: ImageItem[] = [
    {
      id: 1,
      src: "https://picsum.photos/id/1015/1600/900",
      title: "Foto 1",
      description: "Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan. Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif dan penuh antusiasme. Momen ini menggambarkan partisipasi aktif para peserta serta sinergi yang terjalin antar pihak dalam mendukung terlaksananya program secara optimal dan berkelanjutan.",
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
      description: "Potret situasi lapangan yang memperlihatkan implementasi program secara langsung.",
    },
    {
      id: 4,
      src: "https://picsum.photos/id/1015/1600/900",
      title: "Foto 4",
      description: "Dokumentasi kegiatan resmi yang dilaksanakan dalam suasana yang kondusif.",
    },
    {
      id: 5,
      src: "https://picsum.photos/id/1016/1600/900",
      title: "Foto 5",
      description: "Suasana interaksi dan diskusi yang berlangsung secara produktif.",
    },
    {
      id: 6,
      src: "https://picsum.photos/id/1018/1600/900",
      title: "Foto 6",
      description: "Potret situasi lapangan yang memperlihatkan implementasi program.",
    },
  ];
}

/**
 * =========================
 * CLASS DATA ARTIKEL LAIN
 * =========================
 */
class PublikasiRelatedData {
  static artikelLain: ArtikelLain[] = [
    { id: 2, title: "Berita Foto: LPSK Lakukan Pendampingan Korban Tindak Pidana", image: "/images/background.webp" },
    { id: 3, title: "Berita Foto: Sosialisasi Hak Korban di Lingkungan Kampus", image: "/images/background.webp" },
    { id: 4, title: "Berita Foto: Koordinasi LPSK dengan Aparat Penegak Hukum", image: "/images/background.webp" },
    { id: 5, title: "Berita Foto: LPSK Tingkatkan Layanan Darurat Perlindungan", image: "/images/background.webp" },
  ];
}

const DetailPublikasi: PageWithLayout = () => {
  const data = PublikasiDetailData.beritaFoto;
  const artikelLain = PublikasiRelatedData.artikelLain;
  const images = PublikasiDetailData.galeri;

  const [openGallery, setOpenGallery] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  return (
    <>
      <Head title={data.title} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-sm text-white border-b-amber-400 border-b-2">
            <div className="container mx-auto px-4">
                Publikasi / <span className="font-semibold">Berita Foto</span>
            </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-8">
          <div className="container mx-auto px-4">
            <p className="text-xl md:text-2xl font-semibold text-white">
              {data.title}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <p className="text-sm mb-6">{data.date}</p>

          {/* ================= PREVIEW GALERI ================= */}
          {images && images.length > 0 ? (

            /* ================= ADA GALERI ================= */
            <div
              onClick={() => setOpenGallery(true)}
              className="mb-10 grid grid-cols-3 gap-2 cursor-pointer"
            >
              {/* IMAGE BESAR KIRI */}
              <div className="col-span-2 aspect-[4/3] overflow-hidden rounded-lg">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* KANAN */}
              <div className="flex flex-col gap-2">
                
                {/* ATAS */}
                {images[0] && (
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={images[0].src}
                      alt={images[0].title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                {/* BAWAH + OVERLAY */}
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

            /* ================= TIDAK ADA GALERI ================= */
            <div className="mb-10">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          )}

          {/* ARTIKEL */}
          <div className="prose prose-sm max-w-none leading-relaxed">
            <p className="text-center font-bold mt-6">BERITA FOTO</p>

            <div className="mx-auto w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-4"></div>

            <p className="text-center font-semibold mb-6">
              {data.title.toUpperCase()}
            </p>

            {data.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* ARTIKEL LAIN */}
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

      {/* ================= MODAL GALERI ================= */}
      {openGallery && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white">
          
          {/* HEADER */}
          <div className="flex w-full items-center justify-between border-b border-white/10 px-8 py-4">
            <div className="text-sm font-medium">
              {activeIndex + 1} / {images.length}
            </div>

            <div className="flex items-center gap-4">
              <button onClick={() => setZoom((z) => z + 0.2)} className="cursor-pointer">
                <ZoomIn size={20} />
              </button>

              <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))} className="cursor-pointer">
                <ZoomOut size={20} />
              </button>

              <button onClick={() => setOpenGallery(false)} className="cursor-pointer">
                <X size={22} />
              </button>
            </div>
          </div>

          {/* MAIN */}
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

          {/* THUMBNAIL */}
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
                        activeIndex === index ? "border-white" : "border-transparent opacity-50"
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