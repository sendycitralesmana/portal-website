import { AppContainer } from '@/components/ui/app-container'
import React from 'react'
import MainLayout from '../layout/main'
import { Head, usePage } from '@inertiajs/react'

const pejabatData = {
  sekretarisJenderal: {
    nama: 'Sriyana, S.H, LL.M, DFM',
    jabatan: 'Sekretaris Jenderal',
    gambar: '/images/struktur-profile.png',
  },
  kepalaBiro: [
    {
      nama: 'Fifiana Fitri Amalia., S.E., M.E., Ak.',
      jabatan: 'Kepala Biro Umum dan Kepegawaian',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Dr. M. Ramdan, S.H., M.Si.',
      jabatan: 'Kepala Biro Penelaahan Permohonan',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Dr. M. Ramdan, S.H., M.Si.',
      jabatan: 'Plt. Kepala Biro Hukum, Kerja Sama dan Hubungan Masyarakat',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Dr. Roy Haris Oktabian, S.STP, M.Si',
      jabatan: 'Kepala Biro Pemenuhan Hak Saksi dan Korban',
      gambar: '/images/struktur-profile.png',
    },
  ],
  kepalaBagian: [
    {
      nama: 'Arief Suryadi, S.E.',
      jabatan: 'Kepala Bagian Kerumahtanggaan',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Ida Swastika, S.E.',
      jabatan: 'Kepala Bagian Pengawasan',
      gambar: '/images/struktur-profile.png',
    },
  ],
  perwakilanDaerah: [
    {
      nama: 'Erlince Ully Artha Tobing, S.Sos., M.Si.',
      jabatan: 'Kepala Perwakilan LPSK Medan',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Novita Prima Dewi, S.IP',
      jabatan: 'Kepala Perwakilan LPSK Yogyakarta',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Asri Oktaviany Wahono, S.H.',
      jabatan: 'Kepala Perwakilan LPSK Jawa Tengah',
      gambar: '/images/struktur-profile.png',
    },
    {
      nama: 'Andri Umar Sidik, S.T.',
      jabatan: 'Kepala Perwakilan LPSK Jawa Timur',
      gambar: '/images/struktur-profile.png',
    },
  ],
  tenagaAhli: [
    { nama: 'Abdanev Jopa C, S.H.', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Ali Nur Sahid, S.H.I., M.I.Kom', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Amalia Mahsunah, S.H.', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Galih Prihanto Jati, S.E', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Irfan Maulana, SIP., M.AP.', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'M. Tommy Permana, S.sos.', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Muhammad Busyroil Fuad, S.H., M.H', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Pascalis Risdiana FP, SE', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Rianto Wicaksono, S.H.', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Syahrial Martanto Wiryawan, S.H', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
    { nama: 'Yulisa Maharani, S.H., M.H.', jabatan: 'Tenaga Ahli', gambar: '/images/struktur-profile.png' },
  ],
  
}

type StructureItem = {
  id: number;
  category: string;
  name: string;
  description: string;
  position: string | null;
  foto: string;
  foto_url: string | null;
};

type PageProps = {
  sekjen: StructureItem;
  kepalaBiro: StructureItem[];
  kepalaBagian: StructureItem[];
  kepalaPerwakilan: StructureItem[];
  tenagaAhli: StructureItem[];
};

const PejabatPage = () => {

  const { sekjen, kepalaBiro, kepalaBagian, kepalaPerwakilan, tenagaAhli } = usePage<PageProps>().props;

  console.log(sekjen, kepalaBiro, kepalaBagian, kepalaPerwakilan, tenagaAhli);

  return (
    <div className="flex flex-col">
      <Head title="Struktur Organisasi">
        <meta name="description" content="Struktur Organisasi LPSK" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="w-full mt-9 mb-6">
        <AppContainer>
          <p className="text-center text-xl md:text-2xl lg:text-3xl font-bold text-[color:var(--primary-navy)] dark:text-white leading-snug">
            STRUKTUR ORGANISASI
          </p>
        </AppContainer>
      </div>

      {/* Sekretaris Jenderal */}
      <AppContainer>
        <div className="flex flex-col items-center text-center mb-8">
          <img src={sekjen.foto_url || '/images/foto-default.jpg'} alt={pejabatData.sekretarisJenderal.nama} className="w-60 h-60 object-top rounded shadow" />
          <p className="mt-4 font-bold text-xl text-[color:var(--primary-navy)] dark:text-white">{sekjen.name}</p>
          <p className="text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white">{sekjen.position}</p>
        </div>
      </AppContainer>

      {/* Kepala Biro */}
      <AppContainer>
        <p className="text-center font-bold text-lg md:text-xl lg:text-2xl text-[color:var(--primary-navy)] dark:text-white mb-6 uppercase">
          Kepala Biro Lembaga Perlindungan Saksi dan Korban
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {kepalaBiro.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={item.foto_url ?? "/images/foto-default.jpg"} alt={item.name} className="w-60 h-60 object-top rounded shadow" />
              <p className="mt-4 text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">{item.name}</p>
              <p className="text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white mt-1">{item.position}</p>
            </div>
          ))}
        </div>
      </AppContainer>

      <AppContainer>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-2">
          {/* Judul Kiri: Kepala Bagian (span 2 kolom) */}
          <div className="md:col-span-2">
            <p className="text-center font-bold text-base md:text-xl lg:text-2xl text-[color:var(--primary-navy)] dark:text-white mb-4 uppercase">
              Kepala Bagian Lembaga Perlindungan Saksi dan Korban
            </p>
          </div>

          {/* Judul Kanan: Kepala Perwakilan Daerah (span 4 kolom) */}
          <div className="md:col-span-4">
            <p className="text-center font-bold text-base md:text-xl lg:text-2xl text-[color:var(--primary-navy)] dark:text-white mb-4 uppercase">
              Kepala Perwakilan LPSK Daerah
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-20">
          {/* 2 Data Kepala Bagian */}
          {kepalaBagian.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={item.foto_url ?? "/images/foto-default.jpg"}
                alt={item.name}
                className="w-48 h-52 object-top rounded shadow"
              />
              <p className="mt-3 font-bold text-[color:var(--primary-navy)] dark:text-white text-sm md:text-lg">{item.name}</p>
              <p className="text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white mt-1">{item.position}</p>
            </div>
          ))}

          {/* 4 Data Kepala Perwakilan Daerah */}
          {kepalaPerwakilan.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={item.foto_url ?? "/images/foto-default.jpg"}
                alt={item.name}
                className="w-48 h-52 object-top rounded shadow"
              />
              <p className="mt-3 font-bold text-[color:var(--primary-navy)] dark:text-white text-sm md:text-xl">{item.name}</p>
              <p className="text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white mt-1">{item.position}</p>
            </div>
          ))}
        </div>
      </AppContainer>

      {/* Tenaga Ahli */}
      {/* <AppContainer>
        <p className="text-center font-bold text-lg md:text-xl lg:text-2xl text-[color:var(--primary-navy)] dark:text-white mb-6 uppercase">
          Tenaga Ahli Lembaga Perlindungan Saksi dan Korban
        </p>

        <div className="w-full flex flex-wrap justify-center md:px-4 lg:px-4 mb-20">
          {pejabatData.tenagaAhli.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center 
                        basis-1/2 md:basis-1/4 lg:basis-1/6 mb-8"
            >
              <img
                src={item.foto_url}
                alt={item.name}
                className="w-48 h-52 object-top rounded shadow mb-3"
              />
              <p className="font-bold text-[color:var(--primary-navy)] dark:text-white text-base md:text-xl">
                {item.name}
              </p>
              <p className="text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white mt-1">
                {item.jabatan}
              </p>
            </div>
          ))}
        </div>
      </AppContainer> */}

      {/* Tenaga Ahli */}
      <AppContainer>
        <p className="text-center font-bold text-lg md:text-xl lg:text-2xl text-[color:var(--primary-navy)] dark:text-white mb-6 uppercase">
          Tenaga Ahli Lembaga Perlindungan Saksi dan Korban
        </p>

        {/* <div className="w-full flex flex-wrap justify-center md:px-4 lg:px-4 mb-20">
          {tenagaAhli.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center 
                        basis-1/2 md:basis-1/4 lg:basis-1/6 mb-8 p-4"
            >
              <img
                src={item.foto_url ?? "/images/foto-default.jpg"}
                alt={item.name}
                className="w-48 h-52 object-top rounded shadow mb-3"
              />
              <p className="font-bold text-[color:var(--primary-navy)] dark:text-white text-base md:text-xl shadow-sm dark:shadow-white/20">
                {item.name}
              </p>
              <p className="w-full text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white mt-1 shadow-sm dark:shadow-white/20">
                {item.position}
              </p>

            </div>
          ))}
        </div> */}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:px-4 lg:px-4 mb-20">
          {[0, 1].map((col) => (
            <div key={col} className="flex flex-col gap-6">
              {tenagaAhli.slice(col * 6, col * 6 + 6).map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 bg-white dark:bg-neutral-900 rounded shadow-sm"
                >
                  {/* Foto jika ingin diaktifkan */}
                  {/* <img
                    src={item.foto_url}
                    alt={item.name}
                    className="w-40 h-52 object-top rounded shadow mb-3"
                  /> */}

                  <p className="font-bold text-[color:var(--primary-navy)] dark:text-white text-base md:text-xl shadow-sm dark:shadow-white/20">
                    {item.name}
                  </p>
                  <p className="text-lg font-semibold text-[color:var(--primary-navy)] dark:text-white mt-1 shadow-sm dark:shadow-white/20">
                    {item.position}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

      </AppContainer>

    </div>
  )
}

PejabatPage.layout = (page: React.ReactNode) => <MainLayout children={page} />

export default PejabatPage
