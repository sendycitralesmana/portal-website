// resources/js/Pages/PejabatPage.tsx

import { AppContainer } from '@/components/ui/app-container';
import React from 'react';
import Flow from './flow';
import MainLayout from '../layout/main';
import { Head } from '@inertiajs/react';

const PejabatPage = () => {
  return (
    <>
    <Head title="Struktur">
        <meta name="description" content="Halaman Struktur" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
    </Head>
      <main className="flex flex-col gap-10 pb-20"> {/* Tambah padding bawah */}
        <section className="h-[400px] w-full bg-background">
          <div className="flex w-full h-full justify-center items-center relative">
            <div className="h-full w-full absolute bg-slate-800">
              <img
                src="/images/fondasi.png"
                alt="Fondasi"
                className="object-cover w-full h-full opacity-50"
              />
            </div>
            <div className="absolute inset-0 h-full w-full flex flex-col gap-2 justify-center items-center">
              <h1 className="text-3xl font-bold text-slate-100">Struktur Organisasi</h1>
              <h1 className="text-2xl font-bold text-slate-100">Lembaga Perlindungan Saksi dan Korban</h1>
            </div>
          </div>
        </section>

        <section className="w-full md:min-h-[500px]">
          <AppContainer>
            <Flow />
          </AppContainer>
        </section>
      </main>
    </>
  );
};

PejabatPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default PejabatPage;
