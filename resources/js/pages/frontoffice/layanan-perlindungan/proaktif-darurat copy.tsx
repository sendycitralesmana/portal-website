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

      <div className="mb-10 mt-10">
        <AppContainer>
          <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-extrabold text-[color:var(--primary-navy)] dark:text-white leading-snug">
            TINDAKAN PROAKTIF
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
                  Informasi Tindakan Proaktif
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
              </div>
              <div>
                <img
                  src="/images/layanan-perlindungan.png" // Ganti dengan path gambar sesuai struktur Anda
                  alt="Tindakan Proaktif"
                  className="w-full max-h-92 object-cover rounded shadow"
                />
              </div>
            </section>

            {/* Dasar Hukum */}
            <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
              <p className="text-base lg:text-xl font-bold uppercase">
                Dasar Hukum
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Undang-Undang Nomor 31 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 13 Tahun 2006 tentang Perlindungan Saksi dan Korban
                </li>
                <li>
                  Undang-Undang Nomor 13 Tahun 2006 tentang Perlindungan Saksi dan Korban
                </li>
              </ul>
            </section>

            {/* Akses Perlindungan */}
            <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
              <p className="text-base lg:text-xl font-bold uppercase">
                Akses Perlindungan
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
          </div>
        </AppContainer>
      </div>

      <div className="mb-10 mt-10">
        <AppContainer>
          <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-extrabold text-[color:var(--primary-navy)] dark:text-white leading-snug">
            PERLINDUNGAN DARURAT
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
                  Informasi Perlindungan Darurat
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
                <p>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                </p>
              </div>
              <div>
                <img
                  src="/images/layanan-perlindungan.png" // Ganti dengan path gambar sesuai struktur Anda
                  alt="Tindakan Proaktif"
                  className="w-full max-h-92 object-cover rounded shadow"
                />
              </div>
            </section>

            {/* Dasar Hukum */}
            <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
              <p className="text-base lg:text-xl font-bold uppercase">
                Dasar Hukum
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Undang-Undang Nomor 31 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 13 Tahun 2006 tentang Perlindungan Saksi dan Korban
                </li>
                <li>
                  Undang-Undang Nomor 13 Tahun 2006 tentang Perlindungan Saksi dan Korban
                </li>
              </ul>
            </section>

            {/* Akses Perlindungan */}
            <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
              <p className="text-base lg:text-xl font-bold uppercase">
                Akses Perlindungan
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </section>
          </div>
        </AppContainer>
      </div>

      {protectionServices.map((service, index) => (
        <>
          <div className="mb-10 mt-10">
            <AppContainer>
              <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-extrabold text-[color:var(--primary-navy)] dark:text-white leading-snug">
                TINDAKAN PROAKTIF
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
                      Informasi Tindakan Proaktif
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                    <p>
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </p>
                  </div>
                  <div>
                    <img
                      src="/images/layanan-perlindungan.png" // Ganti dengan path gambar sesuai struktur Anda
                      alt="Tindakan Proaktif"
                      className="w-full max-h-92 object-cover rounded shadow"
                    />
                  </div>
                </section>

                {/* Dasar Hukum */}
                <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
                  <p className="text-base lg:text-xl font-bold uppercase">
                    Dasar Hukum
                  </p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Undang-Undang Nomor 31 Tahun 2014 tentang Perubahan atas Undang-Undang Nomor 13 Tahun 2006 tentang Perlindungan Saksi dan Korban
                    </li>
                    <li>
                      Undang-Undang Nomor 13 Tahun 2006 tentang Perlindungan Saksi dan Korban
                    </li>
                  </ul>
                </section>

                {/* Akses Perlindungan */}
                <section className="space-y-3 text-[color:var(--primary-navy)] dark:text-white">
                  <p className="text-base lg:text-xl font-bold uppercase">
                    Akses Perlindungan
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
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
