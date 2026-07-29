'use client';

import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';

type Slide = {
    title: string;
    subtitle?: string;
    deskripsi?: string;
    buttonText?: string;
    image: string;
    href: string | null;
    external?: boolean;
};

const slides: Slide[] = [
    {
        title: 'LPSK',
        subtitle: 'Lembaga Pelindungan Saksi dan Korban',
        deskripsi: 'Lembaga Pelindungan Saksi dan Korban adalah lembaga negara yang didirikan dan bertanggung jawab untuk menangani pemberian pelindungan dan bantuan pada saksi dan korban.',
        image: '/images/banner-3.jpg',
        href: null,
    },
    {
        title: 'SIMPUSAKA',
        subtitle: 'Sistem Informasi Pelindungan Saksi dan Korban',
        deskripsi: 'Layanan Permohonan Pelindungan Digital Melalui Aplikasi SIMPUSAKA',
        buttonText: 'Ajukan Permohonan Pelindungan',
        image: '/images/banner-2.jpg',
        href: 'https://simpusaka.lpsk.go.id/layanan_simpusaka',
        external: true,
    },
    {
        title: 'Dirgahayu',
        subtitle: 'Lembaga Pelindungan Saksi dan Korban',
        deskripsi: '8 Agustus\n2008-2026',
        buttonText: 'Panduan Visual',
        image: '/images/banner-6.jpeg',
        href: 'https://limo.lpsk.go.id/s/LqnrPQW5RHTjMKe',
        external: true,
    },
];

export default function HeroCarousel() {
    const autoplay = React.useRef(
        Autoplay({
            delay: 6000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
        }),
    );

    return (
        <section className="relative w-full">
            <Carousel plugins={[autoplay.current]} opts={{ loop: true }} className="w-full">
                <CarouselContent>
                    {slides.map((slide, index) => {
                        const finalUrl =
                            slide.external && slide.href ? (slide.href.startsWith('http') ? slide.href : `https://${slide.href}`) : slide.href;

                        return (
                            <CarouselItem key={index}>
                                <div className="relative h-[300px] w-full overflow-hidden sm:h-[450px] md:h-[650px] lg:h-[920px]">
                                    {/* Background Image */}
                                    <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover object-center" />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#001B4D]/95 via-[#002B7F]/60 to-transparent" />
                                    {/* <div className="absolute inset-0 bg-gradient-to-r from-[#001B4D]/75 via-[#002B7F]/40 to-transparent" /> */}

                                    {/* Content */}
                                    <div className="relative z-10 flex h-full items-center">
                                        <div className="container mx-auto px-5 lg:px-12">
                                            <div className="max-w-5xl">
                                                {/* Title */}
                                                <p className="mb-1 text-lg font-bold text-yellow-400 sm:text-2xl md:mb-2 md:text-4xl lg:text-5xl">
                                                    {slide.title}
                                                </p>

                                                {/* Subtitle */}
                                                {slide.subtitle && (
                                                    <p className="mb-2 text-sm font-semibold text-white sm:text-lg md:mb-4 md:text-2xl lg:text-3xl">
                                                        {slide.subtitle}
                                                    </p>
                                                )}

                                                {/* Description */}
                                                {/* {slide.deskripsi && (
                                                    <p className="mb-3 max-w-xl text-[12px] leading-snug text-white/90 sm:text-sm md:mb-6 md:max-w-2xl md:text-lg md:leading-relaxed lg:max-w-4xl lg:text-xl">
                                                        {slide.deskripsi}
                                                    </p>
                                                )} */}
                                                {slide.deskripsi && ( <p className="mb-3 max-w-xl whitespace-pre-line text-[12px] leading-snug text-white/90 sm:text-sm md:mb-6 md:max-w-2xl md:text-lg md:leading-relaxed lg:max-w-4xl lg:text-xl">
                                                    {slide.deskripsi} </p>
                                                )}

                                                {/* Button */}
                                                {slide.href && (
                                                    <a href={finalUrl || '#'} target={slide.external ? '_blank' : '_self'} rel="noopener noreferrer">
                                                        <motion.div
                                                            initial={{ scale: 1 }}
                                                            animate={{ scale: [1, 1.04, 1] }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: 'easeInOut',
                                                            }}
                                                            whileHover={{
                                                                scale: 1.08,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.96,
                                                            }}
                                                            className="inline-block"
                                                        >
                                                            <Button className="h-7 rounded-md bg-white hover:bg-amber-300 px-3 text-[10px] font-medium text-black shadow-lg md:h-10 md:px-5 md:text-sm">
                                                                {slide.buttonText}
                                                            </Button>
                                                        </motion.div>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                {/* Navigation */}
                <CarouselPrevious className="top-[81%] left-3 border-none bg-white/60 text-black dark:text-white backdrop-blur-md md:left-36">
                    <ChevronLeft size={36} />
                </CarouselPrevious>

                <CarouselNext className="top-[81%] right-3 border-none bg-white/60 text-black dark:text-white backdrop-blur-md md:right-36">
                    <ChevronRight size={36} />
                </CarouselNext>
            </Carousel>
        </section>
    );
}
