import { Head, Link } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import MainLayout from '../../layout/main';

import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

import type { CarouselApi } from '@/components/ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

/**
 * Optional: reusable type untuk semua halaman Inertia
 */
type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface PublikasiMedia {
    id: number;
    kategori: string;
    judul: string;
    deskripsi: string;
    file: string;
    created_at: string;
}

interface Publikasi {
    id: number;
    jenis: string;
    kategori: string;
    judul: string;
    slug: string;
    deskripsi: string;
    gambar: string;
    created_at: string;
    media: PublikasiMedia[];
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

function BeritaFotoCard({ item }: { item: Publikasi }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const slides = [
        {
            id: `cover-${item.id}`,
            image: item.gambar,
            title: item.judul,
            description: item.deskripsi,
            date: item.created_at,
        },

        ...(item.media
            ?.filter((media) => media.kategori?.toLowerCase() === 'gambar')
            .map((media) => ({
                id: media.id,
                image: media.file,
                title: media.judul,
                description: media.deskripsi,
                date: media.created_at,
            })) ?? []),
    ];

    useEffect(() => {
        if (!api) return;

        const handleSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        handleSelect();

        api.on('select', handleSelect);

        return () => {
            api.off('select', handleSelect);
        };
    }, [api]);

    const activeSlide = slides[current] ?? slides[0];

    return (
        // diubah disini
        <div className="flex h-full flex-col overflow-hidden rounded-md border bg-[#eee] dark:bg-[#3a3a3a] p-4">
            <div className="mb-4">
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {slides.map((slide, index) => (
                            <CarouselItem key={`${slide.id}-${index}`}>
                                <div className="relative h-72 w-full overflow-hidden rounded-xl">
                                    <div className="absolute top-3 right-3 z-20 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
                                        {current + 1} / {slides.length}
                                    </div>

                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-md"
                                    />

                                    <img src={slide.image} alt={slide.title} className="relative h-full w-full object-contain" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {slides.length > 1 && (
                        <>
                            <CarouselPrevious className="absolute top-1/2 left-3 z-20 h-10 w-10 -translate-y-1/2 border-0 bg-black/70 text-white hover:bg-black hover:text-white" />

                            <CarouselNext className="absolute top-1/2 right-3 z-20 h-10 w-10 -translate-y-1/2 border-0 bg-black/70 text-white hover:bg-black hover:text-white" />
                        </>
                    )}
                </Carousel>
            </div>

            <div className="flex h-[170px] flex-col">
                <p className="mb-2 h-5 text-sm text-gray-600 dark:text-slate-200">{activeSlide.date}</p>

                <Link
                    href={`/redesign/berita-foto/${item.slug}`}
                    className="mb-3 block h-14 overflow-hidden text-lg font-semibold text-gray-900 dark:text-slate-200 dark:hover:text-amber-200 transition hover:text-red-900"
                >
                    {activeSlide.title}
                </Link>

                <p className="line-clamp-4 h-20 text-justify text-sm text-gray-700 dark:text-slate-300">{activeSlide.description}</p>
            </div>
        </div>
    );
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
                                <Search size={16} className='dark:text-slate-700'/>
                                <p className='dark:text-slate-700'>Cari</p>
                            </button>
                        </div>
                    </form>

                    {/* List */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {publikasis.data.length > 0 ? (
                            publikasis.data.map((item) => <BeritaFotoCard key={item.id} item={item} />)
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
