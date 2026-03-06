// import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselApi,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// interface ApplicationItem {
//   id: number;
//   title: string;
//   url: string;
//   cover_url: string;
// }

// interface Props {
//   affiliates: ApplicationItem[];
// }

// const EnAfiliasiSection = ({ affiliates }: Props) => {
//   const [api, setApi] = useState<CarouselApi | undefined>();
//   const [current, setCurrent] = useState(0);
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!api) return;
//     setCount(api.scrollSnapList().length);
//     setCurrent(api.selectedScrollSnap() + 1);
//     api.on("select", () => {
//       setCurrent(api.selectedScrollSnap() + 1);
//     });
//   }, [api]);

//   return (
//     <section className="w-full py-6">
//       <div className="flex flex-col gap-4 items-center px-4">
//         <h2 className="font-bold max-w-2xl text-center text-sm sm:text-lg md:text-xl text-[color:var(--primary-navy)] dark:text-white">
//           Aplikasi External
//         </h2>

//         <Carousel className="w-full relative" setApi={setApi}>
//           <CarouselContent className="w-full flex justify-center">
//             {affiliates.map((app) => (
//               <CarouselItem
//                 key={app.id}
//                 className="px-1 basis-1/2 sm:basis-1/4 lg:basis-1/6 xl:basis-1/8 max-w-[160px]"
//               >
//                 <div className="bg-transparent shadow-sm rounded overflow-hidden group">
//                   <a
//                     href={app.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block h-full w-full"
//                   >
//                     <div className="p-0 relative w-full aspect-[4/3]">
//                       <img
//                         src={app.cover_url}
//                         alt={app.title}
//                         className="absolute inset-0 w-full h-full object-contain z-0 transition-transform duration-300 group-hover:scale-105 p-2 bg-black"
//                       />
//                       <div className="absolute inset-0 bg-black/40 group-hover:bg-primary/40 z-10 transition-colors duration-300" />
//                       <div className="relative z-20 flex items-end h-full p-1 sm:p-2">
//                         <p className="text-white text-[10px] sm:text-xs font-semibold leading-tight line-clamp-2 ml-1 uppercase">
//                           {app.title}
//                         </p>
//                       </div>
//                     </div>
//                   </a>
//                 </div>

//               </CarouselItem>
//             ))}
//           </CarouselContent>


//           <CarouselPrevious className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2" />
//           <CarouselNext className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2" />
//         </Carousel>
//       </div>
//     </section>
//   );
// };

// export { EnAfiliasiSection };

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ApplicationItem {
  id: number;
  title: string;
  url: string;
  cover_url: string;
}

interface Props {
  affiliates: ApplicationItem[];
}

const EnAfiliasiSection = ({ affiliates }: Props) => {
  const [api, setApi] = useState<CarouselApi | undefined>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="w-full py-6 mt-14">
      <div className="flex flex-col gap-4 items-center px-4">
        <h2 className="font-extrabold max-w-2xl text-center text-sm sm:text-lg md:text-xl text-[color:var(--primary-navy)] dark:text-white">
          INSTITUTIONAL PARTNERS
        </h2>

        <Carousel className="w-full xl:px-32 overflow-hidden" setApi={setApi}>
          <CarouselContent className="w-full flex !justify-start">
            {affiliates.map((app) => (
              <CarouselItem
                key={app.id}
                className="snap-start px-1 basis-1/2 sm:basis-1/4 lg:basis-1/6 xl:basis-1/8"
              >
                <div className="bg-transparent shadow-sm rounded overflow-hidden group">
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full w-full"
                  >
                    <div className="relative w-full aspect-[4/3]">
                      <img
                        src={app.cover_url}
                        alt={app.title}
                        className="absolute inset-0 w-full h-full object-contain z-0 transition-transform duration-300 rounded-2xl group-hover:scale-105 p-2"
                      />
                    </div>
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden xl:flex absolute left-14 top-1/2 -translate-y-1/2" />
          <CarouselNext className="hidden xl:flex absolute right-14 top-1/2 -translate-y-1/2" />
        </Carousel>

        {/* ✅ Pagination dots */}
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                current === i + 1 ? "bg-primary scale-110" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export { EnAfiliasiSection };
