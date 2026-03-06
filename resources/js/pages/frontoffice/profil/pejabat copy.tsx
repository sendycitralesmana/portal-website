import { Head, usePage } from '@inertiajs/react';
import React, { ReactNode } from 'react';
import MainLayout from '../layout/main';

type User = {
  id: number;
  name: string;
  foto: string | null;
  foto_url: string | null;
  description: string;
};

type PageProps = {
  users: User[];
};

// ✅ Tambahkan tipe halaman dengan properti layout
type InertiaPage = React.FC & {
  layout?: (page: ReactNode) => ReactNode;
};

const PejabatPage: InertiaPage = () => {
  const { users } = usePage<PageProps>().props;

  return (
    <>
      <Head title="Pejabat">
        <meta name="description" content="Halaman Pejabat" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <main className="flex flex-col gap-10">
        <div className="h-[400px] w-full bg-background">
          <div className="flex w-full h-full justify-center items-center relative">
            <div className="h-full w-full absolute bg-slate-800">
              <img
                src="/images/fondasi.png"
                alt=""
                className="object-cover opacity-50 w-full h-full"
              />
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <h1 className="text-3xl font-bold text-slate-100">Profil Pimpinan</h1>
            </div>
          </div>
        </div>

        {users.map((user) => (
          <div className="w-full relative bg-background" key={user.id}>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-6 md:grid-cols-12 gap-5 py-5">
                <div className="col-span-3 xl:px-5 group">
                  <div className="h-[300px] md:h-full w-full relative overflow-hidden rounded">
                    <img
                      src={user.foto_url ?? "/images/background.webp"}
                      alt={user.name}
                      className="object-cover w-full h-full group-hover:scale-125 transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="col-span-9 px-3 xl:px-5">
                  <div className="h-full flex flex-col justify-center space-y-2">
                    <h1 className="font-bold max-w-2xl text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">
                      {user.name}
                    </h1>
                    <div
                      className="leading-normal"
                      dangerouslySetInnerHTML={{
                        __html: user.description.replace(/\r\n/g, '<br>'),
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* {users.map((user) => (
              <div className="w-full relative bg-background" key={user.id}>
                <div className="">
                  <div className="grid grid-cols-6 md:grid-cols-12 gap-5 py-5">
                    <div className="col-span-3 xl:px-5 group">
                      <div className="h-[300px] md:h-full w-full relative overflow-hidden rounded">
                        <img
                          src={user.foto_url ?? "/images/background.webp"}
                          alt={user.name}
                          className="object-cover w-full h-full group-hover:scale-125 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="col-span-9 px-3 xl:px-5">
                      <div className="h-full flex flex-col justify-center space-y-2">
                        <p className="font-bold text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white uppercase">
                          {user.name}
                        </p>
                        <p className="font-bold text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">
                          {user.name}
                        </p>
                        <div
                          className="leading-normal text-justify"
                          dangerouslySetInnerHTML={{
                            __html: user.description.replace(/\r\n/g, '<br>'),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
      </main>
    </>
  );
};

// ✅ Properti layout didefinisikan secara aman
PejabatPage.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default PejabatPage;
