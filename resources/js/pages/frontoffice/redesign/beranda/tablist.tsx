import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';

import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

interface Media {
    id: number;
    kategori: string;
    file: string;
    judul?: string;
    deskripsi?: string;
}

interface Post {
    id: number;
    jenis: string;
    kategori: string;
    judul: string;
    slug: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
    media?: Media[];
}

interface TablistProps {
    siaranPers: Post[];
    beritaFotos: Post[];
    beritaKegiatans: Post[];
    pengumumans: Post[];
}

/* ================= CARD GRID ================= */

function CardGrid({ posts, baseUrl }: { posts: Post[]; baseUrl: string }) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {posts.map((post) => (
                <Card
                    key={post.id}
                    className="border-border bg-background flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md"
                >
                    {/* IMAGE */}
                    {/* <img
            src={post.gambar}
            alt={post.judul}
            className="
              w-full
              object-cover
              aspect-square
            "
          /> */}

                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                        {/* Background blur */}
                        <img
                            src={post.gambar}
                            alt={post.judul}
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-lg"
                        />

                        {/* Main image (tidak kepotong) */}
                        <img src={post.gambar} alt={post.judul} className="relative h-full w-full object-contain" />
                    </div>

                    {/* CONTENT */}
                    <CardContent className="bg-muted/70 flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                        {/* TITLE WITH LINK */}
                        <Link
                            href={`${baseUrl}/${post.slug}`}
                            className="md:text-md text-foreground line-clamp-3 min-h-[44px] text-xs leading-snug font-semibold transition-colors hover:text-red-900 sm:min-h-[52px] md:min-h-[60px] lg:text-lg"
                        >
                            {post.judul}
                        </Link>

                        {/* DATE */}
                        <p className="text-muted-foreground mt-auto pt-2 text-[10px] sm:pt-3 sm:text-[11px] md:pt-4 md:text-xs lg:text-sm">
                            {post.tanggal}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

function BeritaFotoCard({ post }: { post: Post }) {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    const slides = [
    {
        id: `cover-${post.id}`,
        image: post.gambar,
        title: post.judul,
        description: post.deskripsi,
        date: post.tanggal,
    },

    ...(post.media?.map((item) => ({
        id: item.id,
        image: item.file,
        title: item.judul || post.judul,
        description: item.deskripsi || post.deskripsi,
        date: post.tanggal,
    })) ?? []),
];

const activeSlide = slides[current] ?? slides[0];

    useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        onSelect();

        api.on('select', onSelect);

        return () => {
            api.off('select', onSelect);
        };
    }, [api]);

    return (
        <Card className="border-border bg-background flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md">
            <div className="relative">
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                    }}
                >
                    <CarouselContent>
                        {slides.map((slide) => (
                            <CarouselItem key={slide.id}>
                                <div className="relative aspect-video overflow-hidden bg-black">
                                    <div className="absolute top-3 right-3 z-20 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
                                        {current + 1} / {slides.length}
                                    </div>

                                    <img
                                        src={slide.image}
                                        alt=""
                                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-lg"
                                    />

                                    <img
                                        src={slide.image}
                                        alt=""
                                        className="relative h-full w-full object-contain"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    {slides.length > 1 && (
                        <>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                        </>
                    )}
                </Carousel>
            </div>

            <CardContent className="bg-muted/70 flex flex-1 flex-col p-3 sm:p-4 md:p-5">
    <p className="text-muted-foreground mb-2 text-[10px] sm:text-[11px] md:text-xs">
        {activeSlide.date}
    </p>

    <Link
        href={`/redesign/berita-foto/${post.slug}`}
        className="text-foreground line-clamp-2 text-xs font-semibold transition-colors hover:text-red-900 md:text-sm lg:text-base"
    >
        {activeSlide.title}
    </Link>

    {activeSlide.description && (
        <p className="text-muted-foreground mt-2 line-clamp-3 text-xs md:text-sm">
            {activeSlide.description}
        </p>
    )}
</CardContent>
        </Card>
    );
}

function BeritaFotoGrid({ posts }: { posts: Post[] }) {
    return (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-6">
            {posts.map((post) => (
                <BeritaFotoCard
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
}

/* ================= TABS ================= */

export default function Tablist({ siaranPers, beritaFotos, beritaKegiatans, pengumumans }: TablistProps) {
    return (
        <section className="relative z-10 -mt-21 w-full py-12">
            <div className="container mx-auto px-4 md:px-6">
                <Tabs defaultValue="siaranPers">
                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto md:overflow-hidden">
                            <TabsList className="no-scrollbar flex w-max min-w-full gap-2 overflow-x-auto rounded-2xl bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-1.5 whitespace-nowrap shadow-lg backdrop-blur">
                                {[
                                    { value: 'siaranPers', label: 'Siaran Pers' },
                                    { value: 'beritaFoto', label: 'Berita Foto' },
                                    { value: 'beritaKegiatan', label: 'Berita Kegiatan' },
                                    { value: 'pengumuman', label: 'Pengumuman' },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-xl px-5 py-2.5 text-xs font-medium whitespace-nowrap text-white/80 transition-all duration-300 ease-out hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none data-[state=active]:scale-[1.02] data-[state=active]:bg-white data-[state=active]:text-red-900 data-[state=active]:shadow-md md:px-6 md:text-lg"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="siaranPers">
                        <CardGrid posts={siaranPers} baseUrl="/redesign/publikasi/siaran-pers" />
                    </TabsContent>

                    <TabsContent value="beritaFoto">
    <BeritaFotoGrid posts={beritaFotos} />
</TabsContent>

                    <TabsContent value="beritaKegiatan">
                        <CardGrid posts={beritaKegiatans} baseUrl="/redesign/publikasi/berita-kegiatan" />
                    </TabsContent>

                    <TabsContent value="pengumuman">
                        <CardGrid posts={pengumumans} baseUrl="/redesign/publikasi/pengumuman" />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
