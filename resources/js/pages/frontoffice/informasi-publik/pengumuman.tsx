import React from 'react';
import { AppContainer } from '@/components/ui/app-container';
import MainLayout from '../layout/main';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Dummy data
// const topAnnouncements = [
//   {
//     id: 1,
//     title: "Pengumuman Seleksi CPNS | SSCASN LPSK Tahun 2024",
//     date: "21 Juli 2025",
//     image: "/images/default.webp",
//   },
//   {
//     id: 2,
//     title: "Imbauan Pelaksanaan Upacara HUT 80 RI dan Pakaian Dinas",
//     date: "14 Agustus 2025",
//     image: "/images/default.webp",
//   },
//   {
//     id: 3,
//     title: "Jadwal Pelaksanaan dan Tata Cara Pengajuan Akreditasi Unit pada Kompetisi ASN 2025",
//     date: "21 Agustus 2025",
//     image: "/images/default.webp",
//   },
// ];

// const announcements = [
//   {
//     id: 4,
//     title: "Pimpinan LPSK Hadiri Peluncuran Australia Indonesia Partnership for Justice Phase 3 (AIPJ3)",
//     date: "Jakarta (28/7)",
//     excerpt:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...",
//   },
//   {
//     id: 5,
//     title: "LPSK Gelar Sosialisasi Perlindungan Saksi di Daerah",
//     date: "Jakarta (15/7)",
//     excerpt:
//       "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo...",
//   },
//   {
//     id: 6,
//     title: "Pengumuman Penerimaan Tenaga Ahli LPSK Tahun 2025",
//     date: "Jakarta (10/7)",
//     excerpt:
//       "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...",
//   },
//   {
//     id: 7,
//     title: "Workshop Perlindungan Korban Kekerasan Berbasis Gender",
//     date: "Jakarta (05/7)",
//     excerpt:
//       "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim...",
//   },
// ];

type AnnouncementItem = {
  id: number;
  title: string;
  content: string;
  cover_url: string | null;
  created_at: string;
};

type PageProps = {
  announcements: AnnouncementItem[];
  topAnnouncements: AnnouncementItem[];
};

function stripHtmlAndLimit(html: string = "", maxLength: number): string {
  const noImgHtml = html.replace(/<img[^>]*>/gi, '');
  const text = noImgHtml.replace(/<[^>]+>/g, '').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const RoadmapPage = () => {

  const { announcements, topAnnouncements } = usePage<PageProps>().props;
  console.log(announcements);
  console.log(topAnnouncements);

  return (
    <div className="flex flex-col">
      <Head title="Pengumuman">
        <meta name="description" content="Halaman Pengumuman" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Top Section with Blue Background */}
      <div className="w-full bg-[color:var(--primary-navy)] py-10">
        <AppContainer>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-white mb-8">
            PENGUMUMAN
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {topAnnouncements.map((item) => (
              <div key={item.id} className="overflow-hidden  border-0 px-6">
                <img
                  src={item.cover_url ?? "/images/default.webp"}
                  alt={item.title}
                  className="h-68 w-full object-cover rounded"
                />
                <div className="p-4 text-white">
                  <Link href={`/berita/pengumuman/${item.id}`} className="font-bold block hover:underline text-xl">
                    {item.title}
                  </Link>
                  <p className="text-base mt-2">{item.created_at}</p>
                </div>
              </div>
            ))}
          </div>
        </AppContainer>
      </div>

      {/* Content Section */}
      <section className=" w-full mt-10 mb-16">
        <AppContainer>
          <div className="grid md:grid-cols-2 gap-6">
            {announcements.map((item) => (
              <div key={item.id} className="p-6 rounded-2xl">
                <Link
                  href={`/berita/pengumuman/${item.id}`}
                  className="text-xl font-semibold text-[color:var(--primary-navy)] dark:text-white hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-base text-gray-600 mt-1 dark:text-white">{item.created_at} • Pengumuman</p>
                {/* <p className="text-base text-gray-700 mt-3 dark:text-white">{item.content}</p> */}
                <p className="text-base text-gray-700 mt-3 dark:text-white">
                  "{stripHtmlAndLimit(item.content ?? '', 600)}"
                </p>
              </div>
            ))}
          </div>
        </AppContainer>
      </section>

      {/* button lihat selengkapnya */}
      <div className="flex justify-start mb-10">
        <AppContainer>
          <Link href="/berita/pengumuman" className="w-fit self-start">
            <Button className="bg-blue-900 font-bold xl:text-lg px-16 text-white hover:bg-blue-800 cursor-pointer">
              Lihat Selengkapnya
            </Button>
          </Link>
        </AppContainer>
      </div>

    </div>
  );
};

RoadmapPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RoadmapPage;
