import { AppContainer } from '@/components/ui/app-container'
import React from 'react'
import MainLayout from '../layout/main'
import { Head } from '@inertiajs/react'

const pejabatData = [
  {
    nama: 'Dr. M. Ramdan, S.H., M.Si.',
    jabatan: 'Kepala Biro Penelaahan Permohonan, Plt. Kepala Biro Hukum, Kerja Sama dan Hubungan Masyarakat',
    gambar: '/images/struktur-profile.png',
  },
  {
    nama: 'Dr. Roy Haris Oktabian, S.STP, M.Si',
    jabatan: 'Kepala Biro Pemenuhan Hak Saksi dan Korban',
    gambar: '/images/struktur-profile.png',
  },
  {
    nama: 'Fifiana Fitri Amalia., S.E., M.E., Ak.',
    jabatan: 'Kepala Biro Umum dan Kepegawaian',
    gambar: '/images/struktur-profile.png',
  },
]

const PejabatPage = () => {
  return (
    <div className="flex flex-col">
      <Head title="Pejabat">
        <meta name="description" content="Halaman Pejabat" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Title */}
      <div className="w-full mt-10 mb-10">
        <AppContainer>
          <p className="text-xl text-center md:text-2xl lg:text-3xl font-bold text-[color:var(--primary-navy)] dark:text-white leading-snug">
            STRUKTUR ORGANISASI
            <br />
            KEPALA BIRO LEMBAGA PERLINDUNGAN SAKSI DAN KORBAN
          </p>
        </AppContainer>
      </div>

      {/* Content */}
      <div className="w-full mb-20">
        <AppContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pejabatData.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img
                  src={item.gambar}
                  alt={item.nama}
                  className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover rounded shadow"
                />
                <p className="mt-4 text-blue-900 font-bold text-base md:text-2xl">
                  {item.nama}
                </p>
                <p className="text-xl text-gray-700 mt-2 ">{item.jabatan}</p>
              </div>
            ))}
          </div>
        </AppContainer>

        {/* Tambahkan konten lainnya di sini berupa gambar w full h-96 */}
        <AppContainer className=''>
          <img
            src="/images/struktur-bagan.png"
            alt="Struktur Organisasi"
            className="sm:mt-16 md:mt-20 xl:mt-24 w-full h-full object-cover rounded shadow"
          />
        </AppContainer>
      </div>
    </div>
  )
}

PejabatPage.layout = (page: React.ReactNode) => <MainLayout children={page} />

export default PejabatPage
