"use client"

import * as React from "react"
import { Link } from "@inertiajs/react"

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
      <div className="relative w-full aspect-video md:aspect-auto md:h-[960px] overflow-hidden bg-[#111d73]">
        
        <a
          href={slide.href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-contain pb-10 cursor-pointer"
          />
        </a>

      </div>
    </section>
  )
}