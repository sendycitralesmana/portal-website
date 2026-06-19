"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { motion } from "framer-motion"

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
    title: "Lembaga nonstruktural yang bertanggung jawab memberikan perlindungan dan bantuan kepada saksi dan korban. ",
    deskripsi: "Tujuannya untuk memberikan rasa aman kepada saksi dan/atau korban dalam memberikan keterangan dalam proses peradilan pidana.",
    // deskripsi: "",
    // image: "/images/hero1.webp",
    image: "/images/hero-1.png",
    href: null,
  },
  {
    title: null,
    // image: "/images/layanan_simpusaka1.webp",
    image: "/images/hero-2-crop.jpg",
    href: "https://simpusaka.lpsk.go.id/layanan_simpusaka",
    external: true,
  },
]

export default function HeroCarousel() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 6000,
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

                  {/* <img
                    src={slide.image}
                    alt={slide.title || "slide"}
                    className="
                      absolute inset-0
                      w-full h-full
                    "
                  /> */}

                  <img
  src={slide.image}
  alt={slide.title || "slide"}
  className="
    absolute inset-0
    w-full h-full
    object-cover
    object-bottom
  "
/>

                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4 sm:px-6">
                      <div className=" text-white space-y-1">

                        {/* Title */}
                        {slide.title && (
                          <p
                            className="
                              text-xs sm:text-lg md:text-3xl lg:text-4xl
                              font-semibold
                              leading-tight
                              mt-28 sm:mt-40 md:mt-60 lg:mt-86
                              px-10
                            "
                          >
                            {slide.title}
                          </p>
                        )}

                        {/* Deskripsi */}
                        {slide.deskripsi && (
                          <p
                            className="
                              hidden sm:block
                              text-sm md:text-lg
                              text-gray-200
                              leading-relaxed
                              px-10
                              font-semibold
                            "
                          >
                            {slide.deskripsi}
                          </p>
                        )}

                        {slide.href && (
                          <div className="flex justify-center lg:mt-108 mt-34">
                            <a
                              href={finalUrl || "#"}
                              target={slide.external ? "_blank" : "_self"}
                              rel="noopener noreferrer"
                            >
                              {/* <Button
                                size="sm"
                                className="
                                  bg-white
                                  font-bold
                                  text-black
                                  border-2
                                  border-white
                                  rounded-full
                                  
                                  flex items-center gap-1.5
                                  
                                  px-2 py-1 text-[10px]
                                  sm:px-4 sm:py-2 sm:text-xs
                                  md:px-10 md:py-6 md:text-base
                                  
                                  hover:bg-white
                                  hover:text-black
                                  transition-all
                                  duration-300
                                "
                              >
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                                Pengajuan Permohonan Perlindungan
                              </Button> */}
                              <motion.div
  initial={{ scale: 1 }}
  animate={{ scale: [1, 1.05, 1] }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{
    scale: 1.15,
    transition: { duration: 0.2 },
  }}
  whileTap={{ scale: 0.95 }}
>
  <Button
    size="sm"
    className="
      bg-white
      font-bold
      text-black
      border-2
      border-white
      rounded-full

      flex items-center gap-1.5

      px-2 py-1 text-[10px]
      sm:px-4 sm:py-2 sm:text-xs
      md:px-10 md:py-6 md:text-base

      shadow-lg
    "
  >
    <FileText className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
    Ajukan Perlindungan
  </Button>
</motion.div>
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