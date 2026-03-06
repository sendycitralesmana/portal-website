import React, { useEffect, useState } from "react";
import { Phone, Mail, ChevronRight } from "lucide-react";

interface TentangKami {
  id: number;
  alamat: string;
  telepon: string;
  whatsapp: string;
  email: string;
  jam_operasional: string;
  latitude: string;
  longitude: string;
  gambar: string | null;
}

export default function Footer() {
  const [data, setData] = useState<TentangKami | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/redesign/backoffice/tentang-kami/api");
        if (!res.ok) throw new Error("Failed to fetch data");
        const json: TentangKami = await res.json();
        setData(json);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-zinc-900 to-zinc-700 text-white">
      {/* Top Footer */}
      <div className="container mx-auto px-6 xl:px-0 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Address */}
          <div>
            <h5 className="text-xl font-semibold mb-4">
              Lembaga Perlindungan Saksi dan Korban
            </h5>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-full max-w-[250px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
                <div className="h-4 w-full max-w-[300px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
                <div className="h-4 w-full max-w-[200px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
              </div>
            ) : (
              <p className="text-sm text-zinc-300 leading-relaxed">{data?.alamat}</p>
            )}
          </div>

          {/* Hubungi Kami */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Hubungi Kami</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 text-sm text-zinc-300">
              {loading ? (
                <>
                  <div className="h-4 w-full max-w-[150px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
                  <div className="h-4 w-full max-w-[150px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
                  <div className="h-4 w-full max-w-[150px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> {data?.telepon}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> {data?.whatsapp}
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} /> {data?.email}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Artikel GPR */}
          <div>
            <h5 className="text-xl font-semibold mb-4">Artikel GPR</h5>
            {loading ? (
              <div className="space-y-2">
                <div className="h-4 w-full max-w-[180px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
                <div className="h-4 w-full max-w-[250px] rounded bg-gradient-to-r from-zinc-700 to-zinc-600 animate-pulse"></div>
              </div>
            ) : (
              <>
                <p className="text-sm text-zinc-300 mb-4">
                  Informasi dan artikel terbaru Humas Pemerintahan.
                </p>
                <a
                  href="/redesign/gpr"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:text-blue-400 transition"
                >
                  Selengkapnya
                  <ChevronRight size={16} />
                </a>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gradient-to-r from-red-900 to-red-600 border-amber-400 border-t-2">
        <div className="container mx-auto px-6 xl:px-0 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-white">
          <div>
            © Copyright Lembaga Perlindungan Saksi dan Korban {new Date().getFullYear()} 
          </div>
          <div>{/* Optional right content */}</div>
        </div>
      </div>
    </footer>
  );
}