import React from 'react';
import { AppContainer } from '@/components/ui/app-container';
import { Download } from 'lucide-react';
import MainLayout from '../layout/main';
import { Head } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

const data = [
  {
    title: 'Road Map dan Renstra',
    years: '2008 - 2012',
    image: '/images/fondasi.png',
    link: '/files/roadmap-2008-2012.pdf',
  },
  {
    title: 'Road Map dan Renstra',
    years: '2013 - 2018',
    image: '/images/fondasi.png',
    link: '/files/roadmap-2013-2018.pdf',
  },
  {
    title: 'Road Map dan Renstra',
    years: '2019 - 2023',
    image: '/images/fondasi.png',
    link: '/files/roadmap-2019-2023.pdf',
  },
  {
    title: 'Road Map dan Renstra',
    years: '2024 - 2029',
    image: '/images/fondasi.png',
    link: '/files/roadmap-2024-2029.pdf',
  },
];

const RoadmapPage = () => {
  return (
    <div className="flex flex-col">
      <Head title="Roadmap">
        <meta name="description" content="Halaman Roadmap" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Breadcrumb */}
      <div className="w-full mt-6 md:mt-10 mb-6 md:mb-12">
        <AppContainer>
          <Breadcrumb>
            <BreadcrumbList className="text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-semibold">
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                  Profil
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                  Roadmap & Rencana Strategis
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AppContainer>
      </div>

      {/* Title */}
      <div className="w-full mb-10 text-center">
        <AppContainer>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 max-w-4xl mx-auto leading-snug">
            ROAD MAP & RENCANA STRATEGIS <br />
            LEMBAGA PERLINDUNGAN SAKSI DAN KORBAN
          </h1>
        </AppContainer>
      </div>

      {/* Content */}
      <div className="w-full mb-20">
        <AppContainer>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 xl:gap-12 justify-center items-start">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center bg-transparent">
                {/* Gambar */}
                <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item.image}
                    alt={`${item.title} ${item.years}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center px-4 text-center">
                    <p className="text-white font-semibold text-sm md:text-base lg:text-lg leading-tight">
                      {item.title}
                    </p>
                    <p className="text-white font-semibold text-sm md:text-base lg:text-lg mt-1">
                      {item.years}
                    </p>
                  </div>
                </div>

                {/* Tombol Unduh */}
                <div className="mt-6 w-full max-w-[320px] flex justify-center">
                  <a
                    // href={item.link}
                    className="bg-blue-900 hover:bg-blue-800 text-white w-[95%] py-3 text-sm md:text-md font-semibold shadow-lg rounded flex items-center justify-center gap-2"
                  >
                    Unduh <Download strokeWidth={2.5} size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </AppContainer>
      </div>
    </div>
  );
};

RoadmapPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RoadmapPage;
