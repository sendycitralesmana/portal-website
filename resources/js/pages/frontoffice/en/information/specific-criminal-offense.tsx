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
import { Head } from "@inertiajs/react";

interface SectionProps {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, description, image, reverse = false }) => {
  return (
    <div className="container bg-background">
      <div className="mx-auto px-4 pb-10">
        <div
          className={`flex flex-col md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center gap-8`}
        >
          {/* Gambar - 1/3 */}
          <div className="w-full md:w-1/3 overflow-hidden rounded-2xl shadow-lg">
            <img
              src={image}
              alt={title}
              className="w-full h-[250px] md:h-[350px] object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Teks - 2/3 */}
          <div className="w-full md:w-2/3 space-y-4">
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

const SpecificCriminalOffenses = () => {
  return (
    <div className="flex flex-col">
      <Head title="Specific Criminal Offense">
          <meta name="description" content="Halaman Specific Criminal Offense" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      {/* Hero */}
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
                  Specific Criminal Offense
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Sections */}
      <Section
        title="TERRORISM"
        description="Acts that use violence or threats of violence intended to create terror..."
        image="/images/tindak-pidana-tertentu/teroris.jpg"
      />
      <Section
        title="GROSS HUMAN RIGHTS VIOLATIONS"
        description="Serious human rights violations include genocide, crimes against humanity..."
        image="/images/tindak-pidana-tertentu/ham.jpg"
        reverse
      />
      <Section
        title="CORRUPTION"
        description="Anyone who unlawfully enriches themselves or another person or corporation..."
        image="/images/tindak-pidana-tertentu/korupsi.jpg"
      />
      <Section
        title="MONEY LAUNDERING"
        description="Placing, transferring, spending, or concealing assets derived from a crime..."
        image="/images/tindak-pidana-tertentu/pencucian-uang.jpg"
        reverse
      />
      <Section
        title="NARCOTICS"
        description="Substances or drugs derived from plants or not, synthetic or semi-synthetic..."
        image="/images/tindak-pidana-tertentu/narkoba.jpg"
      />
      <Section
        title="HUMAN TRAFFICKING"
        description="The act of recruiting, transporting, harboring, sending, transferring..."
        image="/images/tindak-pidana-tertentu/perdagangan-manusia.jpg"
        reverse
      />
      <Section
        title="SEXUAL VIOLENCE AGAINST CHILDREN"
        description="Any act against a child that causes physical, psychological, or sexual harm..."
        image="/images/tindak-pidana-tertentu/kekerasan-seks-anak.jpg"
      />
      <Section
        title="TORTURE"
        description="Acts committed intentionally and unlawfully that cause pain or severe suffering..."
        image="/images/tindak-pidana-tertentu/penyiksaan.jpg"
        reverse
      />
      <Section
        title="AGGRAVATED ASSAULT"
        description="Assault that results in serious injury or lasting physical or mental damage."
        image="/images/tindak-pidana-tertentu/penganiayaan.jpg"
      />
    </div>
  );
};

SpecificCriminalOffenses.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default SpecificCriminalOffenses;
