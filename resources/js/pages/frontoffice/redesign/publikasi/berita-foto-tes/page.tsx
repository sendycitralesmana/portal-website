import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { ReactElement, ReactNode, useState } from 'react';
import MainLayout from '../../layout/main';

/**
 * Optional: reusable type untuk semua halaman Inertia
 */
type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface BeritaFoto {
    id: number;
    title: string;
    date: string;
    image: string;
    excerpt: string;
}

const BeritaFotoPage: PageWithLayout = () => {
    const [search, setSearch] = useState('');

    const beritaFoto: BeritaFoto[] = [
        {
            id: 1,
            title: 'Berita Foto: LPSK Berikan Perlindungan kepada Saksi Kasus Tindak Pidana Perdagangan Orang',
            date: '20 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'Dokumentasi kegiatan LPSK dalam memberikan perlindungan kepada saksi kasus tindak pidana perdagangan orang guna menjamin keamanan dan keberanian saksi dalam proses persidangan.',
        },
        {
            id: 2,
            title: 'Berita Foto: LPSK Dorong Penguatan Hak Restitusi bagi Korban Kekerasan Seksual',
            date: '13 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'Momen kegiatan LPSK dalam mendorong penguatan hak restitusi bagi korban kekerasan seksual sebagai bagian dari pemulihan dan perlindungan hukum.',
        },
        {
            id: 3,
            title: 'Berita Foto: Koordinasi LPSK dengan Aparat Penegak Hukum',
            date: '7 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'Dokumentasi koordinasi LPSK bersama aparat penegak hukum dalam rangka memperkuat sistem perlindungan saksi dan korban agar proses hukum berjalan aman dan adil.',
        },
        {
            id: 4,
            title: 'Berita Foto: LPSK Berikan Bantuan Medis dan Psikologis kepada Korban Terorisme',
            date: '2 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'Kegiatan pemberian bantuan medis dan rehabilitasi psikologis kepada korban tindak pidana terorisme sebagai bentuk dukungan negara dalam pemulihan korban.',
        },
        {
            id: 5,
            title: 'Berita Foto: Sosialisasi Mekanisme Permohonan Perlindungan',
            date: '28 Januari 2026',
            image: '/images/background.webp',
            excerpt:
                'Dokumentasi sosialisasi nasional LPSK mengenai mekanisme pengajuan permohonan perlindungan saksi dan korban kepada masyarakat.',
        },
        {
            id: 6,
            title: 'Berita Foto: Fasilitasi Pengajuan Kompensasi bagi Korban Pelanggaran HAM Berat',
            date: '22 Januari 2026',
            image: '/images/background.webp',
            excerpt:
                'Momen LPSK dalam memfasilitasi pengajuan kompensasi kepada pemerintah bagi korban pelanggaran hak asasi manusia berat.',
        },
        {
            id: 7,
            title: 'Berita Foto: Penguatan Layanan Perlindungan Darurat bagi Saksi Terancam',
            date: '15 Januari 2026',
            image: '/images/background.webp',
            excerpt:
                'Dokumentasi penguatan layanan perlindungan darurat LPSK bagi saksi yang menghadapi ancaman serius akibat keterangannya dalam proses hukum.',
        },
        {
            id: 8,
            title: 'Berita Foto: Peningkatan Kapasitas SDM Pendamping Korban',
            date: '10 Januari 2026',
            image: '/images/background.webp',
            excerpt:
                'Kegiatan pelatihan peningkatan kapasitas sumber daya manusia LPSK dalam memberikan pendampingan profesional dan berperspektif korban.',
        },
        {
            id: 9,
            title: 'Berita Foto: Sinergi LPSK dengan Pemerintah Daerah',
            date: '5 Januari 2026',
            image: '/images/background.webp',
            excerpt:
                'Dokumentasi kerja sama LPSK dengan pemerintah daerah untuk memperluas jangkauan perlindungan dan layanan bagi korban tindak pidana.',
        },
        {
            id: 10,
            title: 'Berita Foto: Komitmen Negara Hadir Melindungi Saksi dan Korban',
            date: '2 Januari 2026',
            image: '/images/background.webp',
            excerpt:
                'Potret kegiatan LPSK yang menegaskan komitmen negara dalam melindungi saksi dan korban melalui mekanisme perlindungan yang komprehensif dan berkelanjutan.',
        },
    ];

    const filteredData = beritaFoto.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Head title="Berita Foto">
                <meta name="description" content="Halaman Berita Foto" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-sm text-white border-b-amber-400 border-b-2">
                    <div className="container mx-auto px-4">
                        Publikasi / <span className="font-semibold">Berita Foto</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-700 to-red-900 py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-semibold text-white">Berita Foto</h1>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    {/* Search */}
                    <div className="mb-6 rounded-2xl bg-[#3a3a3a] p-4 shadow-md">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                            <label className="text-sm font-semibold text-white">Pencarian</label>

                            {/* Input with Icon */}
                            <div className="relative flex-1">
                                <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-white" />

                                <input
                                    type="text"
                                    placeholder="Masukkan kata pencarian"
                                    className="w-full rounded-full bg-[#6c6c6c] py-2 pr-4 pl-10 text-sm text-white placeholder-white outline-none"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            {/* Button with Icon */}
                            <button className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium transition hover:bg-gray-200">
                                <Search size={16} />
                                Cari
                            </button>
                        </div>
                    </div>

                    {/* List Container */}
                    <div className="overflow-hidden rounded-md border bg-[#eee]">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`flex flex-col gap-4 p-6 md:flex-row ${
                                        index !== filteredData.length - 1 ? 'border-b border-gray-400' : ''
                                    }`}
                                >
                                    <img src={item.image} alt={item.title} className="h-28 w-full rounded-xl object-cover md:w-40" />

                                    <div className="flex-1">
                                        <p className="mb-1 text-sm text-gray-600">{item.date}</p>
                                        <Link
                                            href={`/redesign/publikasi/berita-foto/${item.id}/detail`}
                                            className="mb-2 block cursor-pointer text-base font-semibold text-gray-900 transition hover:text-red-900 md:text-lg lg:text-xl"
                                        >
                                            {item.title}
                                        </Link>
                                        <p className="text-sm text-gray-700">{item.excerpt}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-10 text-center text-gray-600">Tidak ada Artikel yang tersedia</div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-10 flex items-center justify-end gap-2">
                        {/* Prev */}
                        <button className="h-10 w-10 rounded-lg bg-[#d1d5db] transition hover:bg-[#bfc3c9]">←</button>

                        {/* Pages */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <button
                                key={num}
                                className={`h-10 w-10 rounded-lg transition ${
                                    num === 1 ? 'bg-[#9ca3af] font-semibold text-black' : 'bg-[#d1d5db] hover:bg-[#bfc3c9]'
                                }`}
                            >
                                {num}
                            </button>
                        ))}

                        {/* Dots */}
                        <button className="h-10 w-10 rounded-lg bg-[#d1d5db]">...</button>

                        {/* Next */}
                        <button className="h-10 w-10 rounded-lg bg-[#d1d5db] transition hover:bg-[#bfc3c9]">→</button>
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * Layout Inertia (NO ERROR)
 */
BeritaFotoPage.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default BeritaFotoPage;