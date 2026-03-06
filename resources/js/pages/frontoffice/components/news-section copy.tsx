import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type NewsItem = {
  id: number;
  title: string;
  date: string;
};

interface NewsSectionProps {
  artikel: NewsItem[];
  informasi: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ artikel, informasi }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.komdigi.go.id/gpr-widget-kominfo.min.js";
    script.async = true;

    script.onerror = () => {
      console.error(
        "Gagal memuat widget Kominfo: widget.kominfo.go.id tidak tersedia."
      );
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-4 container">
        <div className="col-span-1 hidden sm:block">
          <Card className="h-[600px] w-full relative overflow-hidden">
            <div id="gpr-kominfo-widget-container"></div>
          </Card>
        </div>

        <div className="col-span-3 md:col-span-2">
          <Tabs defaultValue="news" className="w-full">
            <TabsList className="w-full bg-neutral-200">
              <TabsTrigger value="news" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
                Berita / Artikel
              </TabsTrigger>
              <TabsTrigger value="information" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
                Informasi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="news">
              <Card>
                <CardContent className="flex flex-col gap-4 p-4">
                  {artikel.map((item) => (
                    <a key={item.id} href={`/berita/artikel/${item.id}`}>
                      <div className="p-2 rounded flex flex-col gap-1 cursor-pointer group hover:bg-neutral-100 dark:hover:bg-neutral-800">
                        <p className="font-bold text-sm sm:text-base group-hover:text-blue-900 text-[color:var(--primary-navy)] dark:text-white">
                          {item.title}
                        </p>
                        <small className="text-xs sm:text-sm group-hover:text-blue-900">
                          {item.date}
                        </small>
                        <Separator />
                      </div>
                    </a>
                  ))}
                  <a href="/berita/artikel" className="w-fit">
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
                    >
                      Lihat Selengkapnya
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="information">
              <Card>
                <CardContent className="flex flex-col gap-4 p-4">
                  {informasi.map((item) => (
                    <a key={item.id} href={`/berita/informasi/${item.id}`}>
                      <div className="p-2 rounded flex flex-col gap-1 cursor-pointer group hover:bg-neutral-100">
                        <p className="font-bold text-sm sm:text-base group-hover:text-blue-900 text-[color:var(--primary-navy)] dark:text-white">
                          {item.title}
                        </p>
                        <small className="text-xs sm:text-sm group-hover:text-blue-900">
                          {item.date}
                        </small>
                        <Separator />
                      </div>
                    </a>
                  ))}
                  <a href="/berita/informasi" className="w-fit">
                    <Button
                      size="sm"
                      className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
                    >
                      Lihat Selengkapnya
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
