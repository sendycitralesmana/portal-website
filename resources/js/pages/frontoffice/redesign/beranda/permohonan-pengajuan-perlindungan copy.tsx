"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type PermohonanPengajuanPermohonan = {
  title: string
  image: string
  href: string
}

const slides: PermohonanPengajuanPermohonan[] = [
  {
    title:
      "Permohonan Pengajuan Perlindungan: Panduan Lengkap untuk Saksi dan Korban Tindak Pidana",
    image: "/images/alur-pengajuan-permohonan.png",
    href: "https://simpusaka.lpsk.go.id/layanan_simpusaka/",
  },
]

export default function PermohonanPengajuanPerlindungan() {
  const slide = slides[0]

  return (
    <section className="relative w-full">
      {/* MOBILE = aspect-video | DESKTOP = fixed height */}
      <div className="relative w-full aspect-video md:aspect-auto md:h-[720px] overflow-hidden bg-[#111d73] rounded-lg">
        
        {/* Image (FULL tampil, tidak terpotong) */}
        <img
          src={slide.image}
          alt={slide.title}
          className="absolute inset-0 w-full h-full object-contain pb-8"
        />

        {/* Overlay */}
        <div className="absolute inset-0" />

        {/* Content */}
        {/* <div className="relative z-10 h-full flex items-end pb-10 md:pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-xl md:max-w-2xl text-white">

              <p
                className="
                  text-base
                  md:text-xl
                  lg:text-2xl
                  xl:text-3xl
                  font-bold
                  leading-tight
                  mb-4 md:mb-8
                "
              >
                {slide.title}
              </p>

              <a
                href={slide.href}
                target="_blank"
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
                    px-4 sm:px-5 md:px-9
                    py-2 md:py-5
                    text-xs md:text-base
                    hover:bg-white
                    hover:text-black
                    transition-all
                    duration-300
                  "
                >
                  Alur Pengajuan Permohonan
                </Button>
              </a>

            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}