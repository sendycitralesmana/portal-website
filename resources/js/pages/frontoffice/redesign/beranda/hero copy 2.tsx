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

type Slide = {
  title: string | null
  deskripsi?: string
  image: string
  href: string | null
  external?: boolean
}

const slides: Slide[] = [
  {
    // title: "Lembaga Perlindungan Saksi dan Korban",
    title: "",
    // deskripsi: "Lembaga nonstruktural yang bertanggung jawab memberikan perlindungan dan bantuan kepada saksi dan korban.",
    deskripsi: "",
    image: "/images/hero.webp",
    href: null,
  },
  {
    title: null,
    image: "/images/layanan_simpusaka.webp",
    href: "https://simpusaka.lpsk.go.id/layanan_simpusaka",
    external: true,
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
            const finalUrl =
              slide.external && slide.href
                ? slide.href.startsWith("http")
                  ? slide.href
                  : `https://${slide.href}`
                : slide.href

            return (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-video md:aspect-auto md:h-[760px] overflow-hidden">

                 {/* Background blur */}
                  <div
                    className="absolute inset-0 bg-cover bg-center blur-md scale-105"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />

                  {/* Image utama (tidak terpotong) */}
                  <img
                    src={slide.image}
                    alt={slide.title || "slide"}
                    className="
                      absolute inset-0
                      w-full h-full
                      
                    "
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4 sm:px-6">
                      <div className=" text-white space-y-1">

                        {/* Title */}
                        {slide.title && (
                          <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                            {slide.title}
                          </p>
                        )}

                        {/* Deskripsi */}
                        {slide.deskripsi && (
                          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed">
                            {slide.deskripsi}
                          </p>
                        )}

                        {slide.href && (
                          <div className="flex justify-center lg:mt-40 mt-24">
                            <a
                              href={finalUrl || "#"}
                              target={slide.external ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                            >
                              <Button
                                size="sm"
                                className="
                                  bg-transparent
                                  text-white
                                  border-2
                                  border-white
                                  rounded-full
                                  px-6 md:px-10
                                  py-3 md:py-6
                                  text-xs md:text-base
                                  hover:bg-white
                                  hover:text-black
                                  transition-all
                                  duration-300
                                "
                              >
                                Buat Permohonan Perlindungan
                              </Button>
                            </a>
                          </div>
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
            top-[71%]
            bg-white/60 backdrop-blur-md
            border-none text-black
          "
        >
          <ChevronLeft size={36} />
        </CarouselPrevious>

        <CarouselNext
          className="
            right-3 md:right-36
            top-[71%]
            bg-white/60 backdrop-blur-md
            border-none text-black
          "
        >
          <ChevronRight size={36} />
        </CarouselNext>
      </Carousel>
    </section>
  )
}