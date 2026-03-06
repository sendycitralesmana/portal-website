import { useState } from "react"
import {
  Instagram,
  Youtube,
  Twitter,
  Music2,
} from "lucide-react"

type SocialPlatform =
  | "instagram"
  | "twitter"
  | "tiktok"
  | "youtube"

interface SocialItem {
  image: string
  link: string
}

const socialData: Record<SocialPlatform, SocialItem[]> = {
  instagram: [
    {
      image: "https://picsum.photos/600/850?random=ig1", // 12:17
      link: "https://www.instagram.com/p/DOIBo9IEm6F/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    },
    {
      image: "https://picsum.photos/600/850?random=ig2",
      link: "https://www.instagram.com/",
    },
    {
      image: "https://picsum.photos/600/850?random=ig3",
      link: "https://www.instagram.com/",
    },
  ],

  twitter: [
    {
      image: "https://picsum.photos/600/850?random=tw1", // 12:17
      link: "https://x.com/",
    },
    {
      image: "https://picsum.photos/600/850?random=tw2",
      link: "https://x.com/",
    },
    {
      image: "https://picsum.photos/600/850?random=tw3",
      link: "https://x.com/",
    },
    {
      image: "https://picsum.photos/600/850?random=tw4",
      link: "https://x.com/",
    },
  ],

  tiktok: [
    {
      image: "https://picsum.photos/650/1150?random=tt1", // 13:23
      link: "https://tiktok.com/",
    },
    {
      image: "https://picsum.photos/650/1150?random=tt2",
      link: "https://tiktok.com/",
    },
    {
      image: "https://picsum.photos/650/1150?random=tt3",
      link: "https://tiktok.com/",
    },
    {
      image: "https://picsum.photos/650/1150?random=tt4",
      link: "https://tiktok.com/",
    },
  ],

  youtube: [
    {
      image: "https://picsum.photos/800/450?random=yt1", // 16:9
      link: "https://youtube.com/",
    },
    {
      image: "https://picsum.photos/800/450?random=yt2",
      link: "https://youtube.com/",
    },
  ],
}

export default function SocialMediaSection() {
  const [active, setActive] =
    useState<SocialPlatform>("instagram")

  const icons = [
    { key: "instagram", icon: Instagram },
    { key: "twitter", icon: Twitter },
    { key: "tiktok", icon: Music2 },
    { key: "youtube", icon: Youtube },
  ] as const

  // Aspect ratio per platform
  const aspectMap: Record<SocialPlatform, string> = {
    instagram: "aspect-[12/17]",
    twitter: "aspect-[12/17]",
    tiktok: "aspect-[13/23]",
    youtube: "aspect-video",
  }

  // Grid layout per platform
  const gridMap: Record<SocialPlatform, string> = {
    instagram: "grid-cols-1 md:grid-cols-3",
    twitter: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    tiktok: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    youtube: "grid-cols-1 md:grid-cols-2",
  }

  return (
    <section className="w-full px-4 xl:px-20 py-12">
      <div className="container mx-auto">

        {/* Heading */}
        <h3 className="text-blue-900 text-2xl font-bold mb-6">
          LPSK Sosial Media
        </h3>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Icons */}
          <div className="flex lg:flex-col gap-4 lg:w-20">
            {icons.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`
                  flex items-center justify-center
                  w-12 h-12 rounded-lg
                  border transition
                  cursor-pointer
                  ${active === key
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-white text-gray-600 hover:bg-gray-100"}
                `}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>

          {/* Content Panel */}
          <div className="flex-1">
            <div className={`grid gap-4 ${gridMap[active]}`}>
              {socialData[active].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={item.image}
                    alt="social content"
                    className={`
                      w-full object-cover
                      ${aspectMap[active]}
                    `}
                  />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* ig */}
        <iframe
          src="https://www.instagram.com/p/DOIBo9IEm6F/embed"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.instagram.com/p/DVU6M3FEga9/embed"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.instagram.com/p/DU7pPl_kmQX/embed"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>

        {/* tiktok */}
        <iframe
          src="https://www.tiktok.com/embed/7610720933950541063"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7608470730887515400"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7606272380385643784"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.tiktok.com/embed/7605882599281560839"
          className="w-full flex-1 border-0 rounded"
          loading="lazy"
        ></iframe>

        {/* youtube */}
        <iframe
          src="https://www.youtube.com/embed/bXeuwlhv8N8"
          className="w-full flex-1 border-0 rounded"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/ScPAOgh6Klk"
          className="w-full flex-1 border-0 rounded"
          allowFullScreen
          loading="lazy"
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/A8Yg2-wq0zs"
          className="w-full flex-1 border-0 rounded"
          allowFullScreen
          loading="lazy"
        ></iframe>

      </div>
    </section>
  )
}