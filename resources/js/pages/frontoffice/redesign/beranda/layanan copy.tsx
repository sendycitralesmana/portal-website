// interface ShortcutItem {
//     title: string;
//     description: string | null;
//     image: string | null;
//     link: string;
// }

// const shortcuts: ShortcutItem[] = [
//     {
//         title: 'JDIH',
//         description: 'Jaringan Dokumentasi dan Informasi Hukum',
//         image: '/images/jdih-1.png',
//         link: 'https://robinops.bareskrim.polri.go.id/Account/Login?ReturnUrl=%2F',
//     },
//     {
//         title: 'PPID',
//         description: 'Pejabat Pembina Informasi dan Dokumentasi',
//         image: '/images/ppid.png',
//         link: 'https://cms-publik.kejaksaan.go.id/',
//     },
//     {
//         title: 'SSK',
//         description: 'Sahabat Saksi Korban',
//         image: '/images/aplikasi/ssk.jpg',
//         link: 'https://ssk.lpsk.go.id/',
//     },
//     {
//         title: 'FONDASI',
//         description: 'Tingkat Lanjut Keputusan Rekomendasi',
//         image: null,
//         link: 'https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt',
//     },
//     {
//         title: 'SIMPUSAKA',
//         description: 'Sistem Informasi Perlindungan Saksi dan Korban',
//         image: null,
//         link: 'https://ssk.lpsk.go.id/',
//     },
//     {
//         title: 'OPERA',
//         description: 'Opini Penyusunan Peraturan di Lingkungan',
//         image: null,
//         link: 'https://hukum.lpsk.go.id/',
//     },
// ];

// export default function LayananSection() {
//     return (
//         <section id="tautan" className="w-full px-4 py-10 md:py-12 xl:px-20">
//             <div className="container mx-auto">
//                 {/* Header */}
//                 <div className="mb-6">
//                     <p className="text-lg font-bold md:text-xl lg:text-2xl">Tautan Pintas Layanan</p>
//                     <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-400"></div>
//                 </div>

//                 {/* Grid */}
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
//                     {shortcuts.map((item, index) => (
//                         <a
//                             key={index}
//                             href={item.link}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-amber-400 focus:outline-none"
//                         >
//                             {/* Image */}
//                             <div className="relative flex aspect-[4/3] items-center justify-center py-1">
//                                 <img
//                                     src={item.image ?? '/images/logo-baru.png'}
//                                     alt={item.title}
//                                     className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
//                                 />
//                             </div>

//                             {/* Content */}
//                             <div className="border-t border-gray-100 bg-gray-50 px-3 py-3 text-center">
//                                 <p className="block text-sm font-semibold text-gray-800 md:text-base lg:text-base">{item.title}</p>

//                                 <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-700 lg:text-sm">{item.description}</p>
//                             </div>

//                             {/* Hover Indicator */}
//                             <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-amber-400" />
//                         </a>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';

interface ShortcutItem {
    title: string;
    description: string | null;
    image: string | null;
    link: string;
}

interface Layanan {
    id: number;
    nama: string;
    judul: string;
    deskripsi: string | null;
    gambar: string | null;
}

const shortcuts: ShortcutItem[] = [
    {
        title: 'JDIH',
        description: 'Jaringan Dokumentasi dan Informasi Hukum',
        image: '/images/jdih-1.png',
        link: 'https://jdih.lpsk.go.id/',
    },
    {
        title: 'PPID',
        description: 'Pejabat Pembina Informasi dan Dokumentasi',
        image: '/images/ppid.png',
        link: 'https://eppid.lpsk.go.id/',
    },
    {
        title: 'SSK',
        description: 'Sahabat Saksi Korban',
        image: '/images/aplikasi/ssk.jpg',
        link: 'https://ssk.lpsk.go.id/',
    },
    {
        title: 'FONDASI',
        description: 'Tingkat Lanjut Keputusan Rekomendasi',
        image: null,
        link: 'https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt',
    },
    {
        title: 'SIMPUSAKA',
        description: 'Sistem Informasi Perlindungan Saksi dan Korban',
        image: null,
        link: 'https://simpusaka.lpsk.go.id/layanan_simpusaka/',
    },
    {
        title: 'OPERA',
        description: 'Opini Penyusunan Peraturan di Lingkungan',
        image: null,
        link: 'https://hukum.lpsk.go.id/',
    },
];

export default function LayananSection() {
    const autoplay = React.useRef(
        Autoplay({
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    );

    const Card = ({ item }: { item: ShortcutItem }) => (
        <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:ring-2 focus:ring-amber-400 focus:outline-none"
        >
            {/* Image */}
            <div className="relative flex aspect-[4/3] items-center justify-center py-1">
                <img
                    src={item.image ?? '/images/logo-baru.png'}
                    alt={item.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="border-t border-gray-100 bg-gray-50 px-3 py-3 text-center">
                <p className="text-sm font-semibold text-gray-800 md:text-base">{item.title}</p>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-700 lg:text-sm">{item.description}</p>
            </div>

            {/* Hover Indicator */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-all duration-300 group-hover:border-amber-400" />
        </a>
    );

    return (
        <section id="tautan" className="w-full px-4 py-10 md:py-12 xl:px-20">
            <div className="container mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <p className="text-lg font-bold md:text-xl lg:text-2xl">Tautan Pintas Layanan</p>
                    <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-400" />
                </div>

                {/* MOBILE CAROUSEL */}
                <div className="rounded-2xl bg-white p-4 shadow-md sm:hidden">
                    <Carousel
                        plugins={[autoplay.current]}
                        opts={{
                            loop: true,
                            align: 'start',
                        }}
                        className="relative w-full px-8"
                    >
                        <CarouselContent>
                            {shortcuts.map((item, index) => (
                                <CarouselItem key={index} className="basis-[85%]">
                                    <Card item={item} />
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious className="absolute top-1/2 left-0 -translate-y-1/2" />
                        <CarouselNext className="absolute top-1/2 right-0 -translate-y-1/2" />
                    </Carousel>
                </div>

                {/* DESKTOP GRID */}
                <div className="hidden grid-cols-3 gap-4 sm:grid lg:grid-cols-6">
                    {shortcuts.map((item, index) => (
                        <Card key={index} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}
