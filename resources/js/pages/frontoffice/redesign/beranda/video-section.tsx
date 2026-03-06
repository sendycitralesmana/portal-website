"use client"

import * as React from "react"

export default function VideoSection() {
  const videos = [
    {
      title: "Apa itu LPSK",
      embedUrl: "https://www.youtube.com/embed/bXeuwlhv8N8",
    },
    {
      title: "Alur Permohonan",
      embedUrl: "https://www.youtube.com/embed/ScPAOgh6Klk",
    },
  ]

  return (
    <section className="w-full bg-gradient-to-r from-red-900 to-red-800 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Judul Section */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
          Video Informasi LPSK
        </h2>
        <div className="w-20 h-1 bg-amber-400 rounded-full mb-8 mx-auto"></div>

        {/* Grid Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div
              key={index}
              className="w-full rounded-xl overflow-hidden shadow-md bg-red-950"
            >
              {/* Video Embed */}
              <div className="relative aspect-video">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              {/* Judul Video */}
              <h3 className="mt-3 text-white font-semibold text-center">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}