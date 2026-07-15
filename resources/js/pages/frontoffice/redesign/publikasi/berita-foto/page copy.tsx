import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../../layout/main';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

/**
 * Optional: reusable type untuk semua halaman Inertia
 */
type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface Publikasi {
    id: number;
    jenis: string;
    kategori: string;
    judul: string;
    slug: string;
    deskripsi: string;
    gambar: string;
    created_at: string;
}

interface Props {
    publikasis: {
        data: Publikasi[];
        meta: {
            from?: number;
            to?: number;
            total?: number;
            last_page?: number;
            links?: any[];
        };
    };
    state: {
        search: string;
    };
}

const BeritaFotoPage: PageWithLayout<Props> = ({ publikasis, state }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return null;
        }

        return date.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            <Head title="Publikasi">
                <meta name="description" content="Halaman Publikasi" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-sm text-white">
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
                    <form method="get" className="mb-6 rounded-2xl bg-[#3a3a3a] p-4 shadow-md">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
                            <label className="text-sm font-semibold text-white">Pencarian</label>

                            <div className="relative flex-1">
                                <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-white" />

                                <input
                                    type="text"
                                    name="search"
                                    defaultValue={state.search}
                                    placeholder="Masukkan kata pencarian"
                                    className="w-full rounded-full bg-[#6c6c6c] py-2 pr-4 pl-10 text-sm text-white placeholder-white outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-medium transition hover:bg-gray-200"
                            >
                                <Search size={16} />
                                Cari
                            </button>
                        </div>
                    </form>

                    {/* List */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {publikasis.data.length > 0 ? (
                            publikasis.data.map((item) => (
                                <div key={item.id} className="overflow-hidden rounded-md border bg-[#eee] p-4">
                                    <div className="relative mb-4 h-72 w-full overflow-hidden rounded-xl">
                                        {/* Background blur */}
                                        <img
                                            src={item.gambar}
                                            alt={item.judul}
                                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-md"
                                        />

                                        {/* Main image */}
                                        <img src={item.gambar} alt={item.judul} className="relative h-full w-full object-contain" />
                                    </div>

                                    <p className="mb-2 text-sm text-gray-600">{formatDate(item.created_at)}</p>

                                    <Link
                                        href={`/berita-foto/${item.slug}`}
                                        className="mb-3 block text-lg font-semibold text-gray-900 transition hover:text-red-900"
                                    >
                                        {item.judul}
                                    </Link>

                                    <p className="line-clamp-3 text-justify text-sm text-gray-700">{item.deskripsi}</p>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-10 text-center text-gray-600">Tidak ada Artikel yang tersedia</div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex w-full flex-col items-center justify-between gap-2 lg:flex-row">
                        <p className="text-muted-foreground text-sm">
                            Menampilkan{' '}
                            <span className="font-medium text-amber-600">
                                {publikasis.meta.from ?? 0} - {publikasis.meta.to ?? 0}
                            </span>{' '}
                            dari total <span className="font-medium text-amber-600">{publikasis.meta.total ?? 0}</span> data
                        </p>

                        {publikasis.meta.last_page && publikasis.meta.last_page > 1 && (
                            <div className="overflow-x-auto">
                                <Pagination>
                                    <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                        {publikasis.meta.links?.map((link: any, index: number) => (
                                            <PaginationItem key={index} className="mx-1 mb-1">
                                                <PaginationLink
                                                    href={link.url ?? '#'}
                                                    isActive={link.active}
                                                    className={`rounded-md px-3 py-1 transition-colors ${
                                                        link.active
                                                            ? 'bg-amber-600 text-white hover:bg-amber-700'
                                                            : 'hover:bg-amber-400 hover:text-white'
                                                    }`}
                                                >
                                                    {link.label.replace(/&laquo;/g, '«').replace(/&raquo;/g, '»')}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

/**
 * Layout Inertia
 */
BeritaFotoPage.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default BeritaFotoPage;
