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
    title: 'Ketentuan Logo Resmi',
    image: '/images/fondasi.png',
  },
  {
    title: 'Logo Resmi LPSK',
    image: '/images/fondasi.png',
  },
  {
    title: 'Logo Resmi LPSK dengan Tulisan',
    image: '/images/fondasi.png',
  },
];

const LogoPage = () => {
  return (
    <div className="flex flex-col">
      <Head title="Ketentuan Logo Resmi">
        <meta name="description" content="Halaman Ketentuan Logo Resmi" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Breadcrumb */}
        <div className="w-full mt-6 md:mt-15 mb-6 md:mb-15">
            <AppContainer>
                <Breadcrumb>
                <BreadcrumbList className="text-lg md:text-xl text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
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
                        Ketentuan Logo Resmi
                    </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>
            </AppContainer>
        </div>

      {/* Content */}
      <div className="w-full md:mt-10 mb-20">
        <AppContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 justify-center items-start">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-transparent"
              >
                {/* Gambar diperbesar */}
                <div className="relative w-[360px] h-[400px] rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4 text-center">
                    <p className="text-white font-medium text-4xl leading-snug">
                      {item.title}
                    </p>
                  </div>
                </div>

                {/* Tombol Unduh Gambar */}
                <div className="mt-10 w-[340px]">
                  <a
                    href={item.image}
                    download
                    className="bg-[#FF0000] hover:bg-red-600 text-white w-full py-4 text-md font-semibold shadow-lg rounded flex items-center justify-center gap-2"
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

LogoPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default LogoPage;
