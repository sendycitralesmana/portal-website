// import { useState, useEffect, useMemo } from "react";
// import { Instagram, Youtube, Music2 } from "lucide-react";
// import { SosialMedia, SocialPlatform } from "@/types/sosial-media";

// interface Props {
//   sosialMedias: SosialMedia[];
// }

// export default function SocialMediaSection({ sosialMedias }: Props) {
//   const [active, setActive] = useState<SocialPlatform>("instagram");
//   const [loading, setLoading] = useState(true);

//   const icons = [
//     { key: "instagram", icon: Instagram },
//     { key: "tiktok", icon: Music2 },
//     { key: "youtube", icon: Youtube },
//   ] as const;

//   // 🔥 Filter data berdasarkan platform aktif
//   const filteredData = useMemo(() => {
//     return sosialMedias.filter((item) => item.platform === active);
//   }, [sosialMedias, active]);

//   const aspectMap: Record<SocialPlatform, string> = {
//     instagram: "aspect-[12/16]",
//     tiktok: "aspect-[13/23]",
//     youtube: "aspect-video",
//   };

//   const gridMap: Record<SocialPlatform, string> = {
//     instagram: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
//     tiktok: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
//     youtube: "grid-cols-1 md:grid-cols-2",
//   };

//   useEffect(() => {
//     setLoading(true);
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, [active]);

//   return (
//     <section className="w-full px-4 xl:px-20 py-12">
//       <div className="container mx-auto">
//         <p className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
//           LPSK Sosial Media
//         </p>

//         <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mb-4"></div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Platform Icons */}
//           <div className="flex lg:flex-col gap-4 lg:w-20">
//             {icons.map(({ key, icon: Icon }) => (
//               <button
//                 key={key}
//                 onClick={() => setActive(key)}
//                 className={`flex items-center justify-center w-12 h-12 rounded-lg border transition cursor-pointer ${
//                   active === key
//                     ? "bg-red-700 text-white = border-amber-400 border-2"
//                     : "bg-white text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 <Icon size={22} />
//               </button>
//             ))}
//           </div>

//           {/* Content */}
//           <div className="flex-1">
//             <div className={`grid gap-4 ${gridMap[active]}`}>
//               {loading
//                 ? Array.from({ length: filteredData.length || 2 }).map(
//                     (_, i) => (
//                       <div
//                         key={i}
//                         className={`w-full rounded-xl bg-gray-200 animate-pulse ${aspectMap[active]}`}
//                       />
//                     )
//                   )
//                 : filteredData.map((item) => (
//                     <div
//                       key={item.id}
//                       className={`w-full rounded-xl overflow-hidden ${aspectMap[active]}`}
//                     >
//                       <iframe
//                         src={item.embed_url}
//                         className="w-full h-full border-0"
//                         allow="fullscreen"
//                         loading="lazy"
//                         scrolling="no"
//                       />
//                     </div>
//                   ))}
//             </div>

//             {/* Jika tidak ada data */}
//             {!loading && filteredData.length === 0 && (
//               <p className="text-gray-500 text-sm mt-4">
//                 Belum ada konten untuk platform ini.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState, useMemo } from "react";
import { Instagram, Youtube, Music2 } from "lucide-react";
import { SosialMedia, SocialPlatform } from "@/types/sosial-media";

interface Props {
  sosialMedias: SosialMedia[];
}

export default function SocialMediaSection({
  sosialMedias,
}: Props) {
  const [active, setActive] =
    useState<SocialPlatform>("instagram");

  const [loadedPlatforms, setLoadedPlatforms] =
    useState<SocialPlatform[]>(["instagram"]);

  const handlePlatformChange = (
    platform: SocialPlatform
  ) => {
    setActive(platform);

    if (!loadedPlatforms.includes(platform)) {
      setLoadedPlatforms((prev) => [
        ...prev,
        platform,
      ]);
    }
  };

  const icons = [
    { key: "instagram", icon: Instagram },
    { key: "tiktok", icon: Music2 },
    { key: "youtube", icon: Youtube },
  ] as const;

  const instagramData = useMemo(
    () =>
      sosialMedias.filter(
        (item) => item.platform === "instagram"
      ),
    [sosialMedias]
  );

  const tiktokData = useMemo(
    () =>
      sosialMedias.filter(
        (item) => item.platform === "tiktok"
      ),
    [sosialMedias]
  );

  const youtubeData = useMemo(
    () =>
      sosialMedias.filter(
        (item) => item.platform === "youtube"
      ),
    [sosialMedias]
  );

  const aspectMap: Record<SocialPlatform, string> = {
    instagram: "aspect-[12/17]",
    tiktok: "aspect-[13/23]",
    youtube: "aspect-video",
  };

  const gridMap: Record<SocialPlatform, string> = {
    instagram: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    tiktok: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    youtube: "grid-cols-1 md:grid-cols-2",
  };

  const getTikTokUrl = (url: string) => {
  return url.includes("?")
    ? `${url}&rel=0`
    : `${url}?rel=0`;
};

  const renderPlatform = (
    data: SosialMedia[],
    platform: SocialPlatform
  ) => {
    if (data.length === 0) {
      return (
        <p className="text-gray-500 text-sm mt-4">
          Belum ada konten untuk platform ini.
        </p>
      );
    }

    return (
      <div
        className={`grid gap-4 ${gridMap[platform]}`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className={`w-full rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${aspectMap[platform]}`}
          >
            {/* <iframe
              src={item.embed_url}
              className="w-full h-full border-0"
              allowFullScreen
              scrolling="no"
              title={`${platform}-${item.id}`}
            /> */}
            <iframe
  src={getTikTokUrl(item.embed_url)}
  className="w-full h-full border-0"
  allowFullScreen
  scrolling="no"
  title={`${platform}-${item.id}`}
/>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full px-4 xl:px-20 py-12">
      <div className="container mx-auto">
        <p className="text-lg md:text-xl lg:text-2xl font-bold mb-4">
          LPSK Sosial Media
        </p>

        <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mb-4" />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Platform Icons */}
          <div className="flex lg:flex-col gap-4 lg:w-20">
            {icons.map(({ key, icon: Icon }) => (
              <button
                key={key}
                onClick={() =>
                  handlePlatformChange(key)
                }
                className={`flex items-center justify-center w-12 h-12 rounded-lg border transition-all duration-200 cursor-pointer ${
                  active === key
                    ? "bg-red-700 text-white border-amber-400 border-2"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1">
            {loadedPlatforms.includes(
              "instagram"
            ) && (
              <div
                className={
                  active === "instagram"
                    ? "block"
                    : "hidden"
                }
              >
                {renderPlatform(
                  instagramData,
                  "instagram"
                )}
              </div>
            )}

            {loadedPlatforms.includes("tiktok") && (
              <div
                className={
                  active === "tiktok"
                    ? "block"
                    : "hidden"
                }
              >
                {renderPlatform(
                  tiktokData,
                  "tiktok"
                )}
              </div>
            )}

            {loadedPlatforms.includes(
              "youtube"
            ) && (
              <div
                className={
                  active === "youtube"
                    ? "block"
                    : "hidden"
                }
              >
                {renderPlatform(
                  youtubeData,
                  "youtube"
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}