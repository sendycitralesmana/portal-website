import React from "react";
import MainLayout from "../layout/main";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { AppContainer } from "@/components/ui/app-container";

interface SectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, description, image, reverse = false }) => {
  return (
    <div className="container bg-background">
      <div className=" mx-auto px-4 pb-10">
        <div
          className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-8`}
        >
          <div className="w-full md:w-1/2 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-[250px] md:h-[350px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-[color:var(--primary-navy)] dark:text-white">{title}</h2>
            <p className="text-base leading-relaxed text-[color:var(--primary-navy)] dark:text-white">{description}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://jdih.lpsk.go.id/"
                target="_blank"
                rel="noopener"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                JDIH
              </a>
              <a
                href="https://eppid.lpsk.go.id/"
                target="_blank"
                rel="noopener"
                className="bg-red-600 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg transition"
              >
                EPPID
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TindakPidanaTertentu = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      {/* <div className="relative h-[300px] md:h-[400px] w-full bg-slate-800 overflow-hidden">
        <img
          src="/images/fondasi.png"
          alt="Kasus Prioritas"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Tindak Pidana Tertentu</h1>
        </div>
      </div> */}

      <div className="mt-6 md:mt-10 mb-6 md:mb-10">
        <div className="container">
          <Breadcrumb>
            <BreadcrumbList className="text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-semibold">
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white">
                  Tindak Pidana Tertentu
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Sections */}
      <Section
        title="TERORISME"
        description="Perbuatan yang menggunakan kekerasan atau ancaman kekerasan..."
        image="/images/tindak-pidana-tertentu/teroris.jpg"
      />
      <Section
        title="PELANGGARAN HAM BERAT"
        description="Pelanggaran hak asasi manusia yang berat meliputi kejahatan genosida..."
        image="/images/tindak-pidana-tertentu/ham.jpg"
        reverse
      />
      <Section
        title="KORUPSI"
        description="Setiap orang yang secara melawan hukum melakukan perbuatan memperkaya diri..."
        image="/images/tindak-pidana-tertentu/korupsi.jpg"
      />
      <Section
        title="PENCUCIAN UANG"
        description="Menempatkan, mentransfer, mengalihkan, membelanjakan, membayarkan..."
        image="/images/tindak-pidana-tertentu/pencucian-uang.jpg"
        reverse
      />
      <Section
        title="NARKOBA"
        description="Zat atau obat yang berasal dari tanaman atau bukan tanaman, baik sintetis..."
        image="/images/tindak-pidana-tertentu/narkoba.jpg"
      />
      <Section
        title="PERDAGANGAN MANUSIA"
        description="Tindakan perekrutan, pengangkutan, penampungan, pengiriman, pemindahan..."
        image="/images/tindak-pidana-tertentu/perdagangan-manusia.jpg"
        reverse
      />
      <Section
        title="KEKERASAN SEKSUAL PADA ANAK"
        description="Kekerasan adalah setiap perbuatan terhadap Anak yang berakibat..."
        image="/images/tindak-pidana-tertentu/kekerasan-seks-anak.jpg"
      />
      <Section
        title="PENYIKSAAN"
        description="Tindakan dengan sengaja dan melawan hukum menimbulkan kesakitan..."
        image="/images/tindak-pidana-tertentu/penyiksaan.jpg"
        reverse
      />
      <Section
        title="PENGANIAYAAN BERAT"
        description="Penganiayaan yang menyebabkan timbulnya dampak luka berat."
        image="/images/tindak-pidana-tertentu/penganiayaan.jpg"
      />
    </div>
  );
};

TindakPidanaTertentu.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default TindakPidanaTertentu;
