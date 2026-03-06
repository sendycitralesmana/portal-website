// import { useState, useEffect } from "react";
// import { Instagram, Youtube, Twitter, Music2 } from "lucide-react";

// type SocialPlatform = "instagram" | "tiktok" | "youtube";

// interface IframeItem {
//   src: string;
// }

// const iframeData: Record<SocialPlatform, IframeItem[]> = {
//   instagram: [
//     { src: "https://www.instagram.com/p/DVIv_ysEp8I/embed" },
//     { src: "https://www.instagram.com/p/DVU6M3FEga9/embed" },
//     { src: "https://www.instagram.com/p/DU7pPl_kmQX/embed" },
//   ],
//   tiktok: [
//   {
//     src: "https://www.tiktok.com/player/v1/7610720933950541063?controls=1&description=0&music_info=0",
//   },
//   {
//     src: "https://www.tiktok.com/player/v1/7608470730887515400?controls=1&description=0&music_info=0",
//   },
//   {
//     src: "https://www.tiktok.com/player/v1/7605542577844096274?controls=1&description=0&music_info=0",
//   },
//   {
//     src: "https://www.tiktok.com/player/v1/7605882599281560839?controls=1&description=0&music_info=0",
//   },
// ],
//   youtube: [
//     { src: "https://www.youtube.com/embed/bXeuwlhv8N8" },
//     { src: "https://www.youtube.com/embed/ScPAOgh6Klk" },
//   ],
// };

// export default function SocialMediaSection() {
//   const [active, setActive] = useState<SocialPlatform>("instagram");
//   const [loading, setLoading] = useState(true);

//   const icons = [
//     { key: "instagram", icon: Instagram },
//     { key: "tiktok", icon: Music2 },
//     { key: "youtube", icon: Youtube },
//   ] as const;

//   const aspectMap: Record<SocialPlatform, string> = {
//     instagram: "aspect-[12/16]",
//     tiktok: "aspect-[13/23]",
//     youtube: "aspect-video",
//   };

//   const gridMap: Record<SocialPlatform, string> = {
//     instagram: "grid-cols-1 md:grid-cols-3",
//     tiktok: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
//     youtube: "grid-cols-1 md:grid-cols-2",
//   };

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, [active]);

//   return (
//     <section className="w-full px-4 xl:px-20 py-12">
//       <div className="container mx-auto">
//         <h3 className="text-red-700 text-2xl font-bold mb-6">LPSK Sosial Media</h3>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Left Icons */}
//           <div className="flex lg:flex-col gap-4 lg:w-20">
//             {icons.map(({ key, icon: Icon }) => (
//               <button
//                 key={key}
//                 onClick={() => setActive(key)}
//                 className={`flex items-center justify-center w-12 h-12 rounded-lg border transition cursor-pointer ${
//                   active === key
//                     ? "bg-red-700 text-white border-red-700"
//                     : "bg-white text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Icon size={22} />
//               </button>
//             ))}
//           </div>

//           {/* Content Panel */}
//           <div className="flex-1">
//             <div className={`grid gap-4 ${gridMap[active]}`}>
//               {loading
//                 ? Array.from({ length: iframeData[active].length }).map((_, i) => (
//                     <div
//                       key={i}
//                       className={`w-full rounded-xl bg-gray-200 animate-pulse ${aspectMap[active]}`}
//                     />
//                   ))
//                 : iframeData[active].map((item, idx) => (
//                     <div
//                       key={idx}
//                       className={`w-full rounded-xl overflow-hidden ${aspectMap[active]}`}
//                     >
//                       <iframe
//                         src={item.src}
//                         className="w-full h-full border-0"
//                         allow="fullscreen"
//                         loading="lazy"
//                         scrolling="no"
//                       />
//                     </div>
//                   ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { Instagram, Youtube, Music2 } from "lucide-react";
import { SosialMedia, SocialPlatform } from "@/types/sosial-media";

interface Props {
  sosialMedias: SosialMedia[];
}

export default function SocialMediaSection({ sosialMedias }: Props) {
  const [active, setActive] = useState<SocialPlatform>("instagram");
  const [loading, setLoading] = useState(true);

  const icons = [
    { key: "instagram", icon: Instagram },
    { key: "tiktok", icon: Music2 },
    { key: "youtube", icon: Youtube },
  ] as const;

  // 🔥 Filter data berdasarkan platform aktif
  const filteredData = useMemo(() => {
    return sosialMedias.filter((item) => item.platform === active);
  }, [sosialMedias, active]);

  const aspectMap: Record<SocialPlatform, string> = {
    instagram: "aspect-[12/16]",
    tiktok: "aspect-[13/23]",
    youtube: "aspect-video",
  };

  const gridMap: Record<SocialPlatform, string> = {
    instagram: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    tiktok: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    youtube: "grid-cols-1 md:grid-cols-2",
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <section className="w-full px-4 xl:px-20 py-12">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold mb-4">
          LPSK Sosial Media
        </h3>

        <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mb-4"></div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Platform Icons */}
          <div className="flex lg:flex-col gap-4 lg:w-20">
            {icons.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`flex items-center justify-center w-12 h-12 rounded-lg border transition cursor-pointer ${
                  active === key
                    ? "bg-red-700 text-white = border-amber-400 border-2"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className={`grid gap-4 ${gridMap[active]}`}>
              {loading
                ? Array.from({ length: filteredData.length || 2 }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className={`w-full rounded-xl bg-gray-200 animate-pulse ${aspectMap[active]}`}
                      />
                    )
                  )
                : filteredData.map((item) => (
                    <div
                      key={item.id}
                      className={`w-full rounded-xl overflow-hidden ${aspectMap[active]}`}
                    >
                      <iframe
                        src={item.embed_url}
                        className="w-full h-full border-0"
                        allow="fullscreen"
                        loading="lazy"
                        scrolling="no"
                      />
                    </div>
                  ))}
            </div>

            {/* Jika tidak ada data */}
            {!loading && filteredData.length === 0 && (
              <p className="text-gray-500 text-sm mt-4">
                Belum ada konten untuk platform ini.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}