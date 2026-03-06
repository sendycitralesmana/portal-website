import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

const Hero: React.FC<HeroProps> = ({ highlights }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="w-full overflow-hidden">
      <div className="mx-auto">
        <Carousel
          className="w-screen" // <- ubah dari container ke w-screen
          setApi={setApi}
          plugins={[Autoplay({ delay: 4000 })]}
        >
          <CarouselContent className="w-full">
            {highlights.map((item) => (
              <HeroItem
                key={item.id}
                title={item.news?.title}
                cover={item.news?.cover_url}
                date={item.news?.created_at}
                redirect={`/berita/${item.news?.news_category.slug}/${item.news?.id}`}
              />
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden xl:flex absolute left-5 top-1/2 -translate-y-1/2" />
          <CarouselNext className="hidden xl:flex absolute right-5 top-1/2 -translate-y-1/2" />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <div className="flex gap-2">
              {highlights.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    {
                      "bg-white scale-125": current === index + 1,
                      "bg-neutral-500": current !== index + 1,
                    }
                  )}
                />
              ))}
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

type HeroItemProps = {
  title: string;
  cover: string;
  date?: string;
  redirect?: string;
};

const HeroItem: React.FC<HeroItemProps> = ({ title, cover, date, redirect }) => {
  return (
    <CarouselItem className="w-full">
      <div className="w-full h-[560px] md:aspect-video relative overflow-hidden">
        <div className="h-full w-full text-neutral-100 py-16 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32">
          <div className="container flex flex-col h-full w-full z-10 justify-end gap-4">
            <p className="font-extrabold pl-6 text-2xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl leading-tight drop-shadow-md">
              {title}
            </p>
            {redirect && (
              <Button
                asChild
                className="px-16 w-fit bg-red-700 hover:bg-red-600 dark:text-white text-base md:text-lg font-semibold"
              >
                <Link href={redirect} className="ml-4 md:ml-6">Baca Selengkapnya</Link>
              </Button>
            )}
          </div>
        </div>
        <img
          src={cover}
          alt={title}
          className="absolute rounded top-0 left-0 w-full h-full object-cover object-center -z-20"
        />
        <div className="h-full w-full absolute top-0 -z-10 bg-neutral-950/40" />
      </div>
    </CarouselItem>
  );
};


export { Hero };
