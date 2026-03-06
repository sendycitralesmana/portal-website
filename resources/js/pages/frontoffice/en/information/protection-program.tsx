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

const ProtectionProgram = () => {
  const sections = [
    {
      title: "PHYSICAL PROTECTION",
      text: "Security and escort, placement in a safe house, new identity, medical assistance, and giving testimony without appearing directly in court, as well as psychosocial rehabilitation support.",
      image: "/images/program-perlindungan/perlindungan-fisik.jpg",
    },
    {
      title: "PROCEDURAL PROTECTION",
      text: "Assistance, interpreter services, case progress updates, transportation cost reimbursement, legal advice, and temporary living allowance in accordance with Article 5 of Law No. 13/2006.",
      image: "/images/program-perlindungan/perlindungan-prosedural.jpg",
    },
    {
      title: "LEGAL PROTECTION",
      text: "Witnesses, victims, cooperating perpetrators, and/or reporters cannot be legally prosecuted for the testimony/report provided in good faith.",
      image: "/images/program-perlindungan/perlindungan-hukum.jpg",
    },
    {
      title: "MEDICAL, PSYCHOLOGICAL, AND PSYCHOSOCIAL ASSISTANCE",
      text: "Medical aid for victims, psychological rehabilitation for trauma recovery, and psychosocial assistance to restore social-spiritual well-being including education and employment.",
      image: "/images/program-perlindungan/bantuan-medis.jpg",
    },
    {
      title: "RESTITUTION AND COMPENSATION FACILITATION",
      text: "Restitution is provided by the perpetrator to the victim, while compensation is given by the state if the perpetrator is unable to cover the damages.",
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
                <BreadcrumbLink href="/en/" className="font-semibold">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white">
                  Protection Program
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

ProtectionProgram.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ProtectionProgram;
