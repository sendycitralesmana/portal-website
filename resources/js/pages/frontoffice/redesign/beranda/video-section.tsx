// "use client";

// import { useState, useEffect } from "react";

// export default function VideoSection() {
//   const videos = [
//     {
//       id: 1,
//       title: "Apa itu LPSK",
//       embed_url: "https://www.youtube.com/embed/bXeuwlhv8N8",
//     },
//     {
//       id: 2,
//       title: "Alur Permohonan",
//       embed_url: "https://www.youtube.com/embed/qcf7t9m4gvg",
//     },
//   ];

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <section className="w-full px-4 xl:px-20 py-12">
//       <div className="container mx-auto">
//         <div className="grid gap-8 grid-cols-1 md:grid-cols-2">

//           {loading
//             ? Array.from({ length: videos.length || 2 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="w-full rounded-xl bg-gray-200 animate-pulse aspect-video"
//                 />
//               ))
//             : videos.map((video) => (
//                 <div key={video.id} className="w-full">

//                   {/* Judul */}
//                   <h3 className="text-lg font-semibold">
//                     {video.title}
//                   </h3>

//                   {/* Garis pemanis */}
//                   <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-3"></div>

//                   {/* Video */}
//                   <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition aspect-video">
//                     <iframe
//                       src={video.embed_url}
//                       title={video.title}
//                       className="w-full h-full border-0"
//                       allow="fullscreen"
//                       loading="lazy"
//                     />
//                   </div>

//                 </div>
//               ))}
//         </div>

//         {!loading && videos.length === 0 && (
//           <p className="text-gray-500 text-sm mt-4">
//             Belum ada video tersedia.
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }



"use client";

import { useState, useEffect } from "react";

interface VideoInfo {
  id: number
  judul: string
  embed_url: string
}

interface Props {
  videoInfos: VideoInfo[]
}

export default function VideoSection({ videoInfos }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full px-4 xl:px-20 py-12">
      <div className="container mx-auto">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">

          {loading
            ? Array.from({ length: videoInfos.length || 2 }).map((_, i) => (
                <div
                  key={i}
                  className="w-full rounded-xl bg-gray-200 animate-pulse aspect-video"
                />
              ))
            : videoInfos.map((video) => (
                <div key={video.id} className="w-full">

                  {/* Judul */}
                  <h3 className="text-lg font-semibold">
                    {video.judul}
                  </h3>

                  {/* Garis */}
                  <div className="w-16 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-3"></div>

                  {/* Video */}
                  <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition aspect-video">
                    <iframe
                      src={video.embed_url}
                      title={video.judul}
                      className="w-full h-full border-0"
                      allow="fullscreen"
                      loading="lazy"
                    />
                  </div>

                </div>
              ))}
        </div>

        {!loading && videoInfos.length === 0 && (
          <p className="text-gray-500 text-sm mt-4">
            Belum ada video tersedia.
          </p>
        )}
      </div>
    </section>
  );
}