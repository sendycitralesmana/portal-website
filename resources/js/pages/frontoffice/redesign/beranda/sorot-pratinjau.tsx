import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import clsx from "clsx";
import { Link } from "@inertiajs/react";

export default function SorotPratinjau() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(true);

  // 🔹 Data statis 3 item
  const data = [
    {
      id: 1,
      slug: "kegiatan",
      title: "LPSK Perkuat Sinergi Perlindungan Saksi",
      content:
        "LPSK terus meningkatkan koordinasi dengan berbagai lembaga dalam upaya memberikan perlindungan maksimal kepada saksi dan korban.",
      image: "https://picsum.photos/1200/800?random=1",
    },
    {
      id: 2,
      slug: "edukasi",
      title: "Edukasi Publik Tentang Hak Korban",
      content:
        "Program edukasi publik digencarkan untuk meningkatkan pemahaman masyarakat terhadap hak-hak korban tindak pidana.",
      image: "https://picsum.photos/1200/800?random=2",
    },
    {
      id: 3,
      slug: "kerjasama",
      title: "Kerjasama Antar Lembaga Penegak Hukum",
      content:
        "Kerjasama lintas sektor menjadi kunci dalam memperkuat sistem perlindungan saksi dan korban di Indonesia.",
      image: "https://picsum.photos/1200/800?random=3",
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
      <div className="relative w-[90vw] max-w-4xl h-[80vh] bg-slate-900 text-white rounded-lg overflow-hidden shadow-lg">

        {/* Slider */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.map((item, i) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 relative flex flex-col justify-end min-w-0"
            >
              <img
                src={item.image}
                alt="Sorot Pratinjau"
                className={clsx(
                  "absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-700",
                  i === currentIndex ? "opacity-100" : "opacity-0"
                )}
              />

              <div className="relative z-10 w-full h-full flex flex-col justify-end px-6 pb-24 bg-gradient-to-t from-black/60 via-black/10 to-transparent">
                <Link
                  href={`/berita/${item.slug}/${item.id}`}
                  className="text-2xl font-bold lg:text-4xl leading-snug break-words"
                >
                  {item.title}
                </Link>

                <p className="mt-2 text-base lg:text-lg text-slate-200 leading-relaxed">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Left Button */}
        <button
          onClick={() =>
            setCurrentIndex((currentIndex - 1 + data.length) % data.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-900 z-20 cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Right Button */}
        <button
          onClick={() =>
            setCurrentIndex((currentIndex + 1) % data.length)
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-900 z-20 cursor-pointer"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 bg-white text-black rounded hover:bg-red-600 hover:text-white p-1 z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={clsx(
                "h-3 w-3 rounded-full transition-all duration-300",
                i === currentIndex
                  ? "bg-blue-900 scale-125"
                  : "bg-slate-300 opacity-70 hover:opacity-100"
              )}
            />
          ))}
        </div>

      </div>
    </div>
  );
}