// resources/js/Pages/Maklumat.tsx
import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Home, X } from "lucide-react";

const MaklumatPage = () => {
  return (
    <>
      <Head title="Maklumat">
        <meta name="description" content="Halaman Maklumat" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div
        className="w-screen h-screen flex items-center justify-center relative bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/background.webp')",
        }}
      >
        {/* Overlay blur lebih tebal */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xl"></div>

        {/* Container gambar */}
        <div className="relative z-10 max-w-4xl w-full px-4">
          {/* Gambar maklumat */}
          <img
            src="/images/sertifikat-maklumat.webp"
            alt="Maklumat Pelayanan Publik"
            className="w-full h-auto rounded-lg shadow-lg"
          />

          {/* Tombol close - jarak atas & kanan sama */}
          <Link
            href="/redesign/beranda"
            className="absolute top-4 right-8 bg-white rounded-md px-2 py-1 shadow hover:bg-gray-100 transition flex items-center justify-center"
            style={{
              // jika ingin pastikan ukuran tombol tetap, gunakan fixed size
              width: "32px",
              height: "32px",
            }}
          >
            <Home 
              className="h-5 w-5 text-gray-800"
              style={{
                strokeWidth: 3,
              }}
             />
          </Link>
        </div>
      </div>
    </>
  );
};

export default MaklumatPage;
