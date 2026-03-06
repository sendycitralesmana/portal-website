import React from "react";
import MainLayout from "../layout/main";
import { Head, Link } from "@inertiajs/react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface SectionProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, text, image, reverse = false }) => (
  <div className="w-full bg-background pb-10">
    <div className="container mx-auto px-4">
      <div
        className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-8`}
      >
        {/* Gambar - 1/3 */}
        <div className="w-full md:w-1/3 overflow-hidden rounded-2xl shadow-md group aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Teks - 2/3 */}
        <div className="w-full md:w-2/3 space-y-4">
          <h2 className="text-2xl font-bold text-[color:var(--primary-navy)] dark:text-white">{title}</h2>
          <p className="text-base leading-relaxed text-[color:var(--primary-navy)] dark:text-white">{text}</p>
          <div className="flex gap-4">
            <a
              href="https://jdih.lpsk.go.id/"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              JDIH
            </a>
            <a
              href="https://eppid.lpsk.go.id/"
              target="_blank"
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              EPPID
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const ProgramPerlindungan = () => {
  const sections = [
    {
      title: "PERLINDUNGAN FISIK",
      text: "Pengamanan dan pengawalan, penempatan di rumah aman, mendapat identitas baru, bantuan medis dan pemberian kesaksian tanpa hadir langsung di pengadilan, bantuan rehabilitasi psiko-sosial.",
      image: "/images/program-perlindungan/perlindungan-fisik.jpg",
    },
    {
      title: "PERLINDUNGAN PROSEDURAL",
      text: "Pendampingan, mendapat penerjemah, informasi perkembangan kasus, penggantian biaya transportasi, nasihat hukum, bantuan biaya hidup sementara sesuai Pasal 5 UU 13/2006.",
      image: "/images/program-perlindungan/perlindungan-prosedural.jpg",
    },
    {
      title: "PERLINDUNGAN HUKUM",
      text: "Saksi, Korban, Saksi Pelaku, dan/atau Pelapor tidak dapat dituntut secara hukum atas kesaksian/laporan yang diberikan dengan iktikad baik.",
      image: "/images/program-perlindungan/perlindungan-hukum.jpg",
    },
    {
      title: "BANTUAN MEDIS, PSIKOLOGIS, dan PSIKOSOSIAL",
      text: "Bantuan medis untuk korban, rehabilitasi psikologis untuk trauma, dan bantuan psikososial untuk pemulihan sosial-spiritual termasuk pendidikan dan pekerjaan.",
      image: "/images/program-perlindungan/bantuan-medis.jpg",
    },
    {
      title: "FASILITASI RESTITUSI DAN KOMPENSASI",
      text: "Restitusi diberikan oleh pelaku kepada korban, sedangkan kompensasi diberikan oleh negara jika pelaku tidak mampu mengganti kerugian.",
      image: "/images/program-perlindungan/fasilitas-retitusi.jpg",
    },
  ];

  return (
    <div className="flex flex-col">
      <Head title="Program Perlindungan">
          <meta name="description" content="Halaman Program Perlindungan" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      {/* Hero */}
      {/* <div className="relative h-[300px] md:h-[400px] w-full bg-slate-800 overflow-hidden">
        <img
          src="/images/fondasi.png"
          alt="Program Perlindungan"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Program Perlindungan</h1>
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
                  Program Perlindungan
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <Section
          key={index}
          title={section.title}
          text={section.text}
          image={section.image}
          reverse={index % 2 !== 0}
        />
      ))}
    </div>
  );
};

ProgramPerlindungan.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ProgramPerlindungan;
