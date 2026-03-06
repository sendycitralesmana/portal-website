import React from 'react';
import { AppContainer } from '@/components/ui/app-container';
import { Download } from 'lucide-react';
import MainLayout from '../layout/main';
import { Head, usePage } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type User = {
  id: number;
  name: string;
  foto: string | null;
  position: string | null;
  foto_url: string | null;
  description: string;
};

type PageProps = {
  users: User[];
};

const RoadmapPage = () => {
  const { users } = usePage<PageProps>().props;
  console.log(users);

  return (
    <div className="flex flex-col">
      <Head title="Pejabat">
        <meta name="description" content="Halaman Pejabat" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Breadcrumb */}
      {/* <div className="w-full mt-6 md:mt-10 mb-6 md:mb-12">
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
                  Pejabat
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AppContainer>
      </div> */}

      {/* Title */}
      <div className="w-full mt-10 mb-10">
        <AppContainer>
          <p className="text-xl text-center md:text-2xl lg:text-3xl font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 mx-auto leading-snug">
            PROFIL PIMPINAN 
            <br />LEMBAGA PERLINDUNGAN SAKSI DAN KORBAN 
            <br /> PERIODE 2024-2025
          </p>
        </AppContainer>
      </div>

      {/* Content */}
      <div className="w-full mb-20">
        <AppContainer>
          
            {users.map((user) => (
              <div className="w-full bg-background" key={user.id}>
                <div className="flex flex-col md:flex-row gap-5 py-5 items-stretch">
                  
                  {/* Gambar (mobile: urutan 1, desktop: kanan) */}
                  <div className="w-full md:w-1/4 flex order-1 md:order-2">
                    <div className="w-full relative md:h-full overflow-hidden rounded">
                      <div className="md:absolute md:top-0 md:left-0 md:w-full md:h-full">
                        <img
                          src={user.foto_url ?? "/images/background.webp"}
                          alt={user.name}
                          className="w-full h-auto md:h-full object-contain md:object-cover md:object-top"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Deskripsi (mobile: urutan 2, desktop: kiri) */}
                  <div className="w-full md:w-3/4 order-2 md:order-1">
                    <div className="h-full flex flex-col justify-start space-y-3">
                      <p className="font-bold text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">
                        {user.name}
                      </p>
                      <p className="font-bold text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white uppercase">
                        {user.position}
                      </p>
                      <div
                        className="leading-normal text-justify mt-1"
                        dangerouslySetInnerHTML={{
                          __html: user.description.replace(/\r\n/g, "<br>"),
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>
            ))}

        </AppContainer>
      </div>
    </div>
  );
};

RoadmapPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RoadmapPage;
