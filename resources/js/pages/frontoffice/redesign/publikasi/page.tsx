import { Head } from '@inertiajs/react';
import { ReactElement, ReactNode, useState } from 'react';
import MainLayout from '../layout/main';

/**
 * Optional: reusable type untuk semua halaman Inertia
 */
type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface PressRelease {
    id: number;
    title: string;
    date: string;
    image: string;
    excerpt: string;
}

const Publikasi: PageWithLayout = () => {
    const [search, setSearch] = useState('');

    const pressReleases: PressRelease[] = [
        {
            id: 1,
            title: 'Siaran Pers: OJK Beri Sanksi Pegiat Media Sosial dan Pelaku Manipulasi Harga di Pasar Modal',
            date: '20 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'Otoritas Jasa Keuangan (OJK) pada Jumat ini menetapkan sanksi administratif kepada seorang pegiat media sosial pasar modal dan kepada tiga pihak yang terbukti melakukan manipulasi harga perdagangan saham.',
        },
        {
            id: 2,
            title: 'Siaran Pers: Pentingnya Literasi Asuransi untuk Perlindungan Risiko dan Kesehatan Finansial Bagi Generasi Muda, Kuliah Umum ADK OJK di Universitas Jember',
            date: '13 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'OJK terus meningkatkan literasi dan inklusi keuangan, khususnya di sektor perasuransian bagi generasi muda sebagai fondasi ketahanan keuangan masyarakat dan perekonomian nasional.',
        },
        {
            id: 3,
            title: 'Siaran Pers: OJK Tetapkan Sanksi Tegas atas Pelanggaran Pasar Modal oleh PT Repower Asia Indonesia Tbk',
            date: '7 Februari 2026',
            image: '/images/background.webp',
            excerpt:
                'Otoritas Jasa Keuangan (OJK) menetapkan sanksi administratif dan/atau Perintah Tertulis kepada pihak-pihak terkait atas pelanggaran ketentuan di bidang Pasar Modal.',
        },
    ];

    const filteredData = pressReleases.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <Head title="Publikasi - Siaran Pers" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-sm text-white border-b-amber-400 border-b-2">
                    <div className="container mx-auto px-4">
                        Publikasi / <span className="font-semibold">Siaran Pers</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-700 to-red-900 py-8">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-semibold text-white">Siaran Pers</h1>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-8">
                    {/* Search */}
                        <div className="bg-[#3a3a3a] rounded-2xl p-4 mb-6 shadow-md">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                            <label className="text-white font-semibold text-sm">
                                Pencarian
                            </label>

                            <input
                                type="text"
                                placeholder="Masukkan kata pencarian"
                                className="flex-1 px-4 py-2 rounded-full outline-none 
                                        bg-[#6c6c6c] text-white placeholder-white 
                                        text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <button className="bg-white px-5 py-2 rounded-full font-medium text-sm">
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
                                        <h2 className="mb-2 font-semibold text-gray-900">{item.title}</h2>
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
Publikasi.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Publikasi;
