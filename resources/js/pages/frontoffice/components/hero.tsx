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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@inertiajs/react";

interface HeroProps {
  highlights: {
    id: number;
    news?: {
      title: string;
      cover_url: string;
      created_at: string;
      id: number;
      news_category: { slug: string };
    };
  }[];
}

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
      <div className="w-screen max-w-[100vw] overflow-hidden">
        <Carousel
          className="w-screen"
          setApi={setApi}
          plugins={[Autoplay({ delay: 4000 })]}
        >
          <CarouselContent>
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

          <CarouselPrevious className="hidden xl:flex absolute left-5 top-1/2 -translate-y-1/2 z-20" />
          <CarouselNext className="hidden xl:flex absolute right-5 top-1/2 -translate-y-1/2 z-20" />

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pb-12">
            <div className="flex gap-3">
              {highlights.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-3 w-3 rounded-full transition-all duration-300",
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
    <CarouselItem className="w-screen">
      <div className="relative w-full h-[500px] sm:h-[600px] md:aspect-video overflow-hidden">
        {/* Background image */}
        <img
          src={cover}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover object-center z-[-1]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 sm:px-10 md:px-16 lg:px-24 xl:px-62 py-22 text-neutral-100">
          <p className="text-2xl sm:text-3xl md:text-3xl xl:text-4xl font-extrabold leading-snug drop-shadow-md">
            {title}
          </p>
          {redirect && (
            <Button
              asChild
              className="mt-4 px-10 bg-red-700 hover:bg-red-600 text-base md:text-lg font-semibold w-fit"
            >
              <Link href={redirect}>Baca Selengkapnya</Link>
            </Button>
          )}
        </div>
      </div>
    </CarouselItem>
  );
};

export { Hero };
