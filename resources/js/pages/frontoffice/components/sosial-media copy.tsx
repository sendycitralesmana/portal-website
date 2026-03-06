import React, { useEffect } from "react";
import { Card } from "@/components/ui/card"; // Tetap impor Card untuk bagian Kominfo
import { Instagram, Youtube } from "lucide-react";

const SosialMediaSection: React.FC = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.komdigi.go.id/gpr-widget-kominfo.min.js";
    script.async = true;

    script.onerror = () => {
      console.error("Gagal memuat widget Kominfo.");
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="w-full py-10 mt-14">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Kiri - Kominfo */}
        <div className="col-span-1 hidden md:flex flex-col h-[660px]">
          <h2 className="text-xl font-extrabold text-[color:var(--primary-navy)] dark:text-white mb-3">
            GOVERMENT PUBLIC RELATIONS
          </h2>
          <Card className="flex-1 overflow-hidden rounded-lg shadow">
            <div
              id="gpr-kominfo-widget-container"
              className="w-full h-full"
            ></div>
          </Card>
        </div>

        {/* Kolom Kanan - Media Sosial */}
        <div className="col-span-1 md:col-span-2 flex flex-col md:h-[660px] min-h-[400px]">
          <h2 className="text-xl font-extrabold text-[color:var(--primary-navy)] dark:text-white mb-3">
            SOSIAL MEDIA LPSK
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
            {/* Instagram */}
            <div className="h-full shadow rounded-lg">
              <div className="p-3 h-full flex flex-col">
              <div className="bg-gradient-to-r from-pink-500 to-pink-700 text-white text-sm font-semibold px-3 py-1 rounded mb-2 flex items-center">

                  <Instagram className="w-6 h-6 mr-2" /> Instagram @infolpsk
                </div>
                <iframe
                  src="https://www.instagram.com/p/DMAamD9yqCE/embed"
                  className="w-full flex-1 border-0 rounded"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* TikTok */}
            <div className="h-full shadow rounded-lg">
              <div className="p-3 h-full flex flex-col">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white text-sm font-semibold px-3 py-1 rounded mb-2 flex items-center">
                  🎵 TikTok @infolpsk
                </div>
                <iframe
                  src="https://www.tiktok.com/embed/7379936296631799046"
                  className="w-full flex-1 border-0 rounded"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* YouTube */}
            <div className="h-full shadow rounded-lg">
              <div className="p-3 h-full flex flex-col">
                <div className="bg-gradient-to-r from-red-500 to-red-800 text-white text-sm font-semibold px-3 py-1 rounded mb-2 flex items-center">
                  <Youtube className="w-6 h-6 mr-2" /> YouTube @infolpsk
                </div>

                <iframe
                  src="https://www.youtube.com/embed/bXeuwlhv8N8"
                  className="w-full flex-1 border-0 rounded"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* X (Twitter) */}
            <div className="h-full shadow rounded-lg">
              <div className="p-3 h-full flex flex-col">
              <div className="bg-gradient-to-r from-gray-600 to-gray-800 text-white text-sm font-semibold px-3 py-1 rounded mb-2 flex items-center">
                  ✖️ X (Twitter) @infolpsk
                </div>
                <iframe
                  className="w-full flex-1 border-0 rounded"
                  src="https://twitframe.com/show?url=https://twitter.com/infoLPSK/status/1949682053743870292"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SosialMediaSection;
