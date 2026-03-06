// // ExternalAppsSection.tsx
// import {
//     Carousel,
//     CarouselContent,
//     CarouselItem,
//     CarouselNext,
//     CarouselPrevious,
//   } from "@/components/ui/carousel";
//   import { Card, CardContent } from "@/components/ui/card";
  
//   type AppItem = {
//     title: string;
//     cover_url: string;
//     link: string;
//   };
  
//   const externalApps: AppItem[] = [
//     {
//       title: "E-Manajemen Penyidikan POLRI",
//       cover_url: "/images/background.webp",
//       link: "https://example.com/polri",
//     },
//     {
//       title: "CMS Publik Kejaksaan RI",
//       cover_url: "/images/background.webp",
//       link: "https://example.com/kejaksaan",
//     },
//     {
//       title: "E-Mindik BNN",
//       cover_url: "/images/background.webp",
//       link: "https://example.com/bnn",
//     },
//     {
//       title: "SDP Kemenkumham",
//       cover_url: "/images/background.webp",
//       link: "https://example.com/kemenkumham",
//     },
//     {
//       title: "KPK",
//       cover_url: "/images/background.webp",
//       link: "https://example.com/kpk",
//     },
//     {
//       title: "SP4N Lapor",
//       cover_url: "/images/background.webp",
//       link: "https://example.com/lapor",
//     },
//   ];
  
//   function AppCard({ app }: { app: AppItem }) {
//     return (
//       <Card className="overflow-hidden shadow w-full h-full">
//         <a href={app.link} target="_blank" rel="noopener noreferrer">
//           <CardContent className="p-0 relative group h-full">
//             <img
//               src={app.cover_url}
//               alt={app.title}
//               className="w-full h-40 object-cover group-hover:opacity-90 transition-all duration-300"
//             />
//             <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-sm font-semibold p-2">
//               {app.title}
//             </div>
//           </CardContent>
//         </a>
//       </Card>
//     );
//   }
  
//   export default function ExternalAppsSection() {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <h2 className="text-center text-xl font-bold mb-8 text-primary">
//           APLIKASI EKSTERNAL LPSK
//         </h2>
//         <div className="flex flex-col lg:flex-row gap-8 items-stretch">
//           {/* Grid kiri - sembunyi di mobile */}
//           <div className="hidden lg:grid grid-cols-3 gap-6 flex-1 ">
//             {externalApps.map((app, index) => (
//               <AppCard key={index} app={app} />
//             ))}
//           </div>
  
//           {/* Carousel kanan */}
//           <div className="w-full lg:w-[400px] relative">
//             <Carousel opts={{ align: "center" }} className="h-full relative">
//               <CarouselContent>
//                 {externalApps.map((app, index) => (
//                   <CarouselItem key={index} className="basis-full">
//                     {/* <AppCard app={app} /> */}
//                     <a href="https://robinops.bareskrim.polri.go.id/Account/Login?ReturnUrl=%2F" target="_blank" className="relative inline-block w-full max-w-sm">
//                       <img
//                         src="/images/background.webp"
//                         alt="image-carousel"
//                         className="w-full h-[450px] bg-white border shadow-lg rounded-2xl py-6 hover:opacity-90"
//                       />
//                       <div className="absolute bottom-6 left-0 w-full bg-black bg-opacity-60 text-white text-sm font-semibold p-2">
//                         E-Manajemen Penyidikan POLRI
//                       </div>
//                     </a>
//                   </CarouselItem>
//                 ))}
//               </CarouselContent>
  
//               {/* Positioning buttons inside carousel */}
//               <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 z-10" />
//               <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-6 z-10" />
//             </Carousel>
//           </div>
//         </div>
//       </div>
//     );
//   }
  

// ExternalAppsSection.tsx


// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { usePage } from "@inertiajs/react";
// import { useRef, useEffect, useState } from "react";

// type AppItem = {
//   title: string;
//   cover_url: string;
//   link: string;
// };

// type PageProps = {
//   applicationExternal: AppItem[];
// };

// export default function ExternalAppsSection() {
//   const { applicationExternal } = usePage<PageProps>().props;
//   const gridRef = useRef<HTMLDivElement>(null);
//   const [gridHeight, setGridHeight] = useState<number | null>(null);

//   useEffect(() => {
//     if (gridRef.current) {
//       setGridHeight(gridRef.current.offsetHeight);
//     }
//   }, [applicationExternal]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-center text-xl font-bold mb-8 text-[color:var(--primary-navy)] dark:text-white">
//         APLIKASI EKSTERNAL LPSK
//       </h2>

//       <div className="flex flex-col lg:flex-row gap-8 items-stretch">
//         {/* LEFT GRID */}
//         <div
//           ref={gridRef}
//           className="hidden lg:grid grid-cols-3 gap-6 flex-1"
//         >
//           {applicationExternal.map((app, index) => (
//             <div
//               key={index}
//               className="aspect-[4/3] relative overflow-hidden bg-transparent group rounded shadow"
//             >
//               <img
//                 src={app.cover_url}
//                 alt={app.title}
//                 className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-black/30 group-hover:bg-primary/40 z-10 transition-colors duration-300" />
//               <div className="relative z-20 p-3 h-full flex items-end">
//                 <a
//                   href={app.link}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-white font-bold text-xs sm:text-sm lg:text-base hover:underline uppercase"
//                 >
//                   {app.title}
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT CAROUSEL */}
//         <div
//           className="w-full lg:max-w-sm"
//           style={{ height: gridHeight || "auto" }}
//         >
//           <Carousel opts={{ align: "start" }} className="h-full">
//             <CarouselContent className="h-full flex">
//               {applicationExternal.map((app, index) => (
//                 <CarouselItem
//                   key={index}
//                   className="basis-1/2 sm:basis-1/3 px-2"
//                   style={{ height: gridHeight || "auto" }}
//                 >
//                   <div className="relative w-full h-full overflow-hidden rounded-xl shadow group">
//                     <img
//                       src={app.cover_url}
//                       alt={app.title}
//                       className="w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-105"
//                     />
//                     <div className="absolute inset-0 bg-black/30 group-hover:bg-primary/40 z-10 transition-colors duration-300" />
//                     <div className="relative z-20 p-4 h-full flex items-end">
//                       <a
//                         href={app.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-white font-bold text-sm hover:underline uppercase"
//                       >
//                         {app.title}
//                       </a>
//                     </div>
//                   </div>
//                 </CarouselItem>
//               ))}
//             </CarouselContent>

//             <CarouselPrevious className="left-1 top-1/2 -translate-y-1/2 z-10" />
//             <CarouselNext className="right-1 top-1/2 -translate-y-1/2 z-10" />
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { useRef, useEffect, useState } from "react";

type AppItem = {
  title: string;
  cover_url: string;
  link: string;
};

type PageProps = {
  applicationExternal: AppItem[];
};

export default function ExternalAppsSection() {
  const { applicationExternal } = usePage<PageProps>().props;

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number>(300);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  // Update height to match grid
  useEffect(() => {
    const updateHeight = () => {
      if (gridRef.current) {
        setGridHeight(gridRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Sync carousel index
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect(); // initial selection
    api.on("select", onSelect);

    return () => {
      if (api && api.off) {
        api.off("select", onSelect); // use .off if available
      }
    };
  }, [api]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-xl font-bold mb-8 text-[color:var(--primary-navy)] dark:text-white">
        APLIKASI EKSTERNAL LPSK
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* LEFT GRID */}
        <div ref={gridRef} className="hidden lg:grid grid-cols-3 gap-6 flex-1">
          {applicationExternal.map((app, index) => (
            <div
              key={index}
              className="aspect-[4/3] relative overflow-hidden bg-transparent group rounded shadow"
            >
              <img
                src={app.cover_url}
                alt={app.title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/40 z-10 transition-colors duration-300" />
              <div className="relative z-20 p-3 h-full flex items-end">
                <a
                  href={app.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold text-xs sm:text-sm lg:text-base hover:underline uppercase"
                >
                  {app.title}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT CAROUSEL */}
        <div className="w-full lg:w-[400px] relative">
          <Carousel
            opts={{ align: "center", loop: true }}
            setApi={setApi}
            className="h-full relative"
          >
            <CarouselContent>
              {applicationExternal.map((app, index) => (
                <CarouselItem key={index} className="basis-full">
                  <a
                    href={app.link}
                    target="_blank"
                    className="relative inline-block w-full"
                  >
                    <img
                      src={app.cover_url}
                      alt={app.title}
                      className="w-full object-cover rounded-2xl border shadow-lg hover:opacity-90"
                      style={{ height: gridHeight || 300 }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 z-10 rounded-2xl" />

                    {/* Title & Pagination Dots */}
                    <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col items-center justify-end pb-4">
                      <div className="text-white text-sm lg:text-base font-bold mb-2 text-center px-4">
                        {app.title}
                      </div>
                      <div className="flex justify-center gap-2">
                        {applicationExternal.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => api?.scrollTo(i)}
                            className={cn(
                              "h-2 w-2 rounded-full transition-all duration-300",
                              current === i
                                ? "bg-white scale-110"
                                : "bg-gray-400"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </a>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-2 z-30" />
            <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-2 z-30" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}





