"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Link } from "@inertiajs/react"

export default function Alert() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 7000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  const alerts = [
    "Waspada Hoaks: Akun resmi LPSK hanya melalui kanal resmi yang terverifikasi. Pastikan informasi berasal dari sumber terpercaya.",
    "Pengingat: LPSK tidak pernah meminta data pribadi atau biaya dalam bentuk apa pun melalui WhatsApp atau pesan pribadi.",
    "Hati-hati Penipuan: Jangan percaya pihak yang mengatasnamakan LPSK dan menjanjikan pelindungan atau kompensasi dengan imbalan tertentu.",
  ]

  return (
    <section className="relative w-full bg-gradient-to-l from-red-900 to-red-800 h-24 md:h-32 shadow-lg">

      {/* Floating Alert Box */}
      <div className="container mx-auto px-4 md:px-6 absolute -top-5 md:-top-10 left-1/2 -translate-x-1/2 w-full">
        <div className="bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 shadow-xl border-amber-400 border-2">

          <Carousel
            plugins={[autoplay.current]}
            opts={{
              loop: true,
              axis: "y",
            }}
            orientation="vertical"
            className="h-8 md:h-12"
          >
            <CarouselContent className="h-12 md:h-14">
              {alerts.map((text, index) => (
                <CarouselItem
                  key={index}
                  className="h-12 md:h-14 flex items-center"
                >
                  {/* <Link
                    href="#"
                    className="
                      font-semibold
                      text-sm md:text-lg
                      leading-snug
                      line-clamp-2 md:line-clamp-1
                      hover:opacity-90
                      transition
                    "
                  >
                    {text}
                  </Link> */}
                  <p
                    className="
                      font-medium
                      text-xs sm:text-sm md:text-lg
                      leading-snug
                      line-clamp-2 md:line-clamp-1
                    "
                  >
                    {text}
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>
      </div>

    </section>
  )
}