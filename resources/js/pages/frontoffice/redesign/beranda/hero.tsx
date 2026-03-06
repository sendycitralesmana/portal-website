"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "@inertiajs/react"

type Slide = {
  title: string
  image: string
  href: string
  external?: boolean
}

const slides: Slide[] = [
  {
    title: "Peran Lembaga Perlindungan Saksi dan Korban dalam Sistem Peradilan Indonesia",
    image: "https://picsum.photos/1200/600?random=1",
    href: "/publikasi/ai-governance",
  },
  {
    title: "Penguatan Hak dan Keamanan Saksi serta Korban Tindak Pidana",
    image: "https://picsum.photos/1200/600?random=2",
    href: "https://www.instagram.com/",
    external: true,
  },
  {
    title: "Strategi Perlindungan dan Pemulihan Korban oleh LPSK",
    image: "https://picsum.photos/1200/600?random=3",
    href: "/publikasi/carbon-trading",
  },
]

export default function HeroCarousel() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  return (
    <section className="relative w-full">
      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((slide, index) => {
            const finalUrl = slide.external
              ? slide.href.startsWith("http")
                ? slide.href
                : `https://${slide.href}`
              : slide.href

            return (
              <CarouselItem key={index}>
                {/* MOBILE = aspect-video | DESKTOP = fixed height */}
                <div className="relative w-full aspect-video md:aspect-auto md:h-[720px] overflow-hidden">

                  {/* Background */}
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4 sm:px-6">
                      <div className="max-w-xl md:max-w-2xl text-white">

                        {/* Responsive Title */}
                        <p
                          className="
                            text-base
                            md:text-2xl
                            lg:text-3xl
                            xl:text-4xl
                            font-bold
                            leading-tight
                            mb-4 md:mb-8
                          "
                        >
                          {slide.title}
                        </p>

                        {/* Button */}
                        {slide.external ? (
                          <p
                            
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="
                                bg-transparent
                                text-white
                                border-[2px]
                                border-white
                                rounded-full
                                px-5 sm:px-6 md:px-10
                                py-3 md:py-6
                                text-xs md:text-base
                                hover:bg-white
                                hover:text-black
                                transition-all
                                duration-300
                              "
                            >
                              Lihat Selengkapnya
                            </Button>
                          </p>
                        ) : (
                          <p >
                            <Button
                              size="sm"
                              className="
                                bg-transparent
                                text-white
                                border-[2px]
                                border-white
                                rounded-full
                                px-5 sm:px-6 md:px-10
                                py-3 md:py-6
                                text-xs md:text-base
                                hover:bg-white
                                hover:text-black
                                transition-all
                                duration-300
                              "
                            >
                              Lihat Selengkapnya
                            </Button>
                          </p>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>

        {/* Navigation */}
        <CarouselPrevious
          className="
            left-3 md:left-36
            top-[71%] -translate-y-0
            bg-white/30 backdrop-blur-md
            border-none text-white
            hover:bg-white/50
          "
        >
          <ChevronLeft size={36} className="md:w-8 md:h-8" />
        </CarouselPrevious>

        <CarouselNext
          className="
            right-3 md:right-36
            top-[71%] -translate-y-0
            bg-white/30 backdrop-blur-md
            border-none text-white
            hover:bg-white/50
          "
        >
          <ChevronRight size={36} className="md:w-8 md:h-8" />
        </CarouselNext>

      </Carousel>
    </section>
  )
}