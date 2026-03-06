"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Link } from "@inertiajs/react"

export function PressCarousel() {
  const autoplay = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  const items = [
    "Press Conference on the Financial Services Sector Assessment December 2025",
    "OJK Releases New Regulation on Digital Banking Supervision",
    "Financial Stability Report Quarter IV 2025 Published",
    "OJK Strengthens Consumer Protection Policy Framework",
  ]

  return (
    <div className="relative -mt-16 md:-mt-20 z-20">
      <div className="container mx-auto px-6">

        <div className="bg-red-700 text-white rounded-xl shadow-xl px-8 py-4">

          <Carousel
            plugins={[autoplay.current]}
            opts={{
              loop: true,
              axis: "y",
            }}
            orientation="vertical"
            className="h-10"
          >
            <CarouselContent className="h-10">
              {items.map((text, index) => (
                <CarouselItem key={index} className="h-10 flex items-center">
                  <Link
                    href="#"
                    className="font-semibold text-sm md:text-base hover:underline"
                  >
                    {text}
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>

      </div>
    </div>
  )
}
