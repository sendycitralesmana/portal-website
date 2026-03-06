import { Button } from "@/components/ui/button";
import { Head, Link } from "@inertiajs/react";
import MainLayout from "../layout/main";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface SubjectSectionProps {
  title: string;
  text: string;
  image: string;
  reverse?: boolean;
}

const SubjectSection: React.FC<SubjectSectionProps> = ({ title, text, image, reverse = false }) => (
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

const ProtectionSubjects = () => {
  const sections = [
    {
      title: "WITNESS",
      text: "A person who can provide testimony for the purpose of investigation, prosecution, and trial regarding a criminal act they personally heard, saw, and/or experienced, including someone who can provide related information even if not directly perceived, as long as it is relevant to the case.",
      image: "/images/subjek-perlindungan/saksi.png",
    },
    {
      title: "VICTIM",
      text: "A person who suffers physical, psychological, and/or economic harm caused by a criminal act.",
      image: "/images/subjek-perlindungan/korban.png",
      reverse: true,
    },
    {
      title: "WITNESS PERPETRATOR",
      text: "A suspect, defendant, or convict who cooperates with law enforcement to disclose a criminal act in the same case.",
      image: "/images/subjek-perlindungan/saksi-pelaku.png",
    },
    {
      title: "REPORTER",
      text: "An individual who reports or provides information to law enforcement about a crime that is about to occur, is ongoing, or has occurred.",
      image: "/images/subjek-perlindungan/pelapor.png",
      reverse: true,
    },
    {
      title: "EXPERT",
      text: "An individual with specialized knowledge required to clarify a criminal case for the purposes of investigation, prosecution, and court trial.",
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
                <BreadcrumbLink href="/en/" className="font-semibold">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white">
                  Protection Subject
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <SubjectSection
          key={index}
          title={section.title}
          text={section.text}
          image={section.image}
          reverse={section.reverse}
        />
      ))}
    </div>
  );
};

ProtectionSubjects.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default ProtectionSubjects;
