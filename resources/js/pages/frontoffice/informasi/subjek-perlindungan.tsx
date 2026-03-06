import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "../layout/main";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface SubjekSectionProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

const SubjekSection: React.FC<SubjekSectionProps> = ({ title, text, image, reverse = false }) => (
  <div className="w-full pb-10 bg-background">
    <div className="container mx-auto px-4">
      <div className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-8`}>
        
        {/* Gambar - 2/6 (1/3) */}
        <div className="w-full md:w-2/6 overflow-hidden rounded-2xl shadow-md group aspect-video">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Teks - 4/6 (2/3) */}
        <div className="w-full md:w-4/6 space-y-4">
          <h2 className="text-2xl font-bold text-[color:var(--primary-navy)] dark:text-white">{title}</h2>
          <p className="text-base leading-relaxed text-[color:var(--primary-navy)] dark:text-white">{text}</p>
          <div className="flex gap-4">
            <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <a href="https://jdih.lpsk.go.id/" target="_blank">JDIH</a>
            </Button>
            <Button size="sm" asChild className="bg-red-600 hover:bg-red-700 text-white">
              <a href="https://eppid.lpsk.go.id/" target="_blank">EPPID</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
);


const SubjekPerlindungan = () => {
  const sections = [
    {
      title: "SAKSI",
      text: "Orang yang dapat memberikan keterangan guna kepentingan penyelidikan, penyidikan, penuntutan dan pemeriksaan di sidang pengadilan tentang suatu tindak pidana yang ia dengar sendiri, ia lihat sendiri, dan/atau ia alami sendiri termasuk pula orang yang dapat memberikan keterangan yang berhubungan dengan suatu perkara pidana meskipun tidak ia dengar sendiri, tidak ia lihat sendiri dan tidak ia alami sendiri, sepanjang keterangan orang itu berhubungan dengan tindak pidana.",
      image: "/images/subjek-perlindungan/saksi.png",
    },
    {
      title: "KORBAN",
      text: "Orang yang mengalami penderitaan fisik, mental, dan/atau kerugian ekonomi yang diakibatkan oleh suatu tindak pidana.",
      image: "/images/subjek-perlindungan/korban.png",
      reverse: true,
    },
    {
      title: "SAKSI PELAKU",
      text: "Tersangka, terdakwa, atau terpidana yang bekerja sama dengan penegak hukum untuk mengungkap suatu tindak pidana dalam kasus yang sama.",
      image: "/images/subjek-perlindungan/saksi-pelaku.png",
    },
    {
      title: "PELAPOR",
      text: "Orang yang memberikan laporan, informasi, atau keterangan kepada penegak hukum mengenai tindak pidana yang akan, sedang, atau telah terjadi.",
      image: "/images/subjek-perlindungan/pelapor.png",
      reverse: true,
    },
    {
      title: "AHLI",
      text: "Orang yang memiliki keahlian di bidang tertentu yang diperlukan untuk membuat terang suatu perkara pidana guna kepentingan penyidikan, penuntutan, dan pemeriksaan di sidang pengadilan.",
      image: "/images/subjek-perlindungan/ahli.png",
    },
  ];

  return (
    <div className="flex flex-col">

      <Head title="Subjek Perlindungan">
        <meta name="description" content="Halaman Subjek Perlindungan" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      
      {/* Hero */}
      {/* <div className="relative h-[300px] md:h-[400px] w-full bg-slate-800 overflow-hidden">
        <img
          src="/images/fondasi.png"
          alt="Subjek Perlindungan"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">Subjek Perlindungan</h1>
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
                  Subjek Perlindungan
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <SubjekSection
          key={index}
          title={section.title}
          text={section.text}
          image={section.image}
          reverse={section.reverse}
        />
      ))}
    </div>
  );
}

SubjekPerlindungan.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default SubjekPerlindungan