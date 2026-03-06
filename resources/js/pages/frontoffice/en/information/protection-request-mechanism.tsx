import { Link } from "@inertiajs/react";
import React from "react";
import MainLayout from "../layout/main";

const ProtectionRequestProcedure = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Hero */}
      <div className="relative h-[400px] w-full bg-background overflow-hidden">
        <div className="absolute inset-0 bg-slate-800">
          <img
            src="/images/fondasi.png"
            alt="Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-3xl font-bold text-slate-100 text-center px-4">
            How to Apply for Protection
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="w-full relative md:h-auto bg-background px-4">
        <div className="max-w-7xl mx-auto py-10 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Image Section */}
          <div className="md:col-span-4">
            <div className="relative h-64 md:h-full overflow-hidden rounded-lg shadow-md group">
              <img
                src="/images/background.webp"
                alt="Illustration"
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Text + Contact Section */}
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-xl font-semibold">Protection Request Submission</h2>
            <p className="text-white-100">
              The public can apply for protection to LPSK through various available channels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <a
                href="https://api.whatsapp.com/send/?phone=6285770010048&text=Hallo+LPSK+saya+mau+bertanya"
                target="_blank"
                className="bg-green-500 hover:bg-green-600 transition rounded-lg p-4 flex items-center gap-3 shadow text-white"
              >
                <i className="fas fa-comments text-lg"></i>
                <span className="font-semibold">WhatsApp</span>
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=lpsk.perlindungan.sipali.app"
                target="_blank"
                className="bg-white border rounded-lg p-4 flex items-center gap-3 shadow"
              >
                <i className="fab fa-google-play text-lg text-gray-700"></i>
                <span className="font-semibold text-gray-800">Play Store</span>
              </a>

              <div className="bg-red-500 rounded-lg p-4 flex items-center gap-3 shadow text-white">
                <i className="fas fa-phone-alt text-lg"></i>
                <span className="font-semibold">Hotline: 1500 - 148</span>
              </div>

              <div className="bg-blue-500 rounded-lg p-4 flex items-center gap-3 shadow text-white">
                <i className="fas fa-envelope text-lg"></i>
                <span className="font-semibold">Email: lpsk_ri@lpsk.go.id</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProtectionRequestProcedure.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default ProtectionRequestProcedure;
