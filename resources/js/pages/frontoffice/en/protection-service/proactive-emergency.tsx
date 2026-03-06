import React from "react"
import { AppContainer } from "@/components/ui/app-container"
import MainLayout from "../layout/main"
import { Head, usePage } from "@inertiajs/react"

type User = {
  id: number;
  title: string;
  information: string;
  legal_basis: string;
  access_protection: string;
  cover: string | null;
  cover_url: string | null;
};

type PageProps = {
  protectionServices: User[];
};

const InstitutionPage = () => {

  const { protectionServices } = usePage<PageProps>().props;
  console.log(protectionServices);

  return (
    <div className="flex flex-col">
      <Head title="Profil Lembaga">
        <meta name="description" content="Halaman Profil Lembaga" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      {protectionServices.map((service, index) => (
        <>
          <div className="mb-10 mt-10">
            <AppContainer>
              <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-extrabold text-[color:var(--primary-navy)] dark:text-white leading-snug">
                {service.title}
              </h1>
            </AppContainer>
          </div>

          <div className="mb-20">
            <AppContainer>
              <div className="space-y-10 text-gray-800 text-sm md:text-base text-justify">
                
                {/* Informasi Tindakan Proaktif */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="md:col-span-2 space-y-3 text-[color:var(--primary-navy)] dark:text-white">
                    <p className="text-base lg:text-xl font-bold uppercase">
                      Information {service.title}
                    </p>
                    <div
                      className="prose max-w-none prose-sm md:prose-base dark:text-white"
                      dangerouslySetInnerHTML={{ __html: service.information }}
                    />
                  </div>
                  <div>
                    <img
                      src={service.cover_url ?? "/images/background.webp"}
                      alt="Tindakan Proaktif"
                      className="w-full max-h-92 object-cover rounded shadow"
                    />
                  </div>
                </section>

                {/* Dasar Hukum */}
                <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
                  <p className="text-base lg:text-xl font-bold uppercase">
                    Legal Basis
                  </p>
                  <div
                    className="prose max-w-none prose-sm md:prose-base dark:text-white"
                    dangerouslySetInnerHTML={{ __html: service.legal_basis }}
                  />
                </section>

                {/* Akses Perlindungan */}
                <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
                  <p className="text-base lg:text-xl font-bold uppercase">
                    Access Protection
                  </p>
                  <div
                    className="prose max-w-none prose-sm md:prose-base dark:text-white"
                    dangerouslySetInnerHTML={{ __html: service.access_protection }}
                  />
                </section>
              </div>
            </AppContainer>
          </div>
        </>
      ))}
      
    </div>
  )
}

InstitutionPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default InstitutionPage
