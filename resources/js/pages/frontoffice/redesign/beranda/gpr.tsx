import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

const Gpr: PageWithLayout = () => {

  useEffect(() => {
    const kominfoScript = document.createElement("script");
    kominfoScript.src =
      "https://widget.komdigi.go.id/gpr-widget-kominfo.min.js";
    kominfoScript.async = true;
    kominfoScript.onerror = () => {
      console.error("Gagal memuat widget Kominfo.");
    };
    document.body.appendChild(kominfoScript);

    return () => {
      document.body.removeChild(kominfoScript);
    };
  }, []);

  return (
    <>
      <Head title="GPR - LPSK" />

      <div className="min-h-screen ">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            <span className="font-semibold">
              Government Public Relations
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Government Public Relations
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-full max-w-4xl">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    whileHover={{ y: -4 }}
                    className="relative 
                        bg-white dark:bg-slate-900
                        rounded-2xl shadow-lg 
                        border border-red-100 dark:border-red-900/40
                        overflow-hidden p-8 md:p-10"
                    >
                    {/* Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400"></div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-center">
                        Government Public Relations - Komdigi
                    </h3>

                    <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mx-auto mt-4 mb-8"></div>

                    {/* Widget */}
                    <div
                        id="gpr-kominfo-widget-container"
                        className="w-full min-h-[450px]"
                    ></div>
                </motion.div>

            </div>
        </div>
      </div>
    </>
  );
};

Gpr.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default Gpr;