import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  publication: Publications;
};

const EnPublicationPreview: React.FC<Props> = ({ publication }) => {

  console.log(publication);

  const [activeTab, setActiveTab] = useState("buku");

  const renderPublications = (data: PublicationItem[]) => (
    <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {data.map((item) => (
        // <Link key={item.id} href={`publikasi/[publication]/$item.slug`}>
        <Link key={item.id} href={`/en/publication/${activeTab}/${item.id}`}>
          <Card className="aspect-[3/4] relative rounded overflow-hidden group">
            <img
              src={item.cover_url ?? "/images/background.webp"}
              alt={item.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </Card>
        </Link>
      ))}
    </div>
  );

  return (
    <section className="w-full mt-14">
      <div className="container flex flex-col gap-5 items-center px-6 md:px-20">
        <h2 className="font-extrabold max-w-2xl text-center text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">PUBLICATION</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* <TabsList className="w-full">
            <TabsTrigger value="buku" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
              Buku
            </TabsTrigger>
            <TabsTrigger value="laporan" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
              Laporan
            </TabsTrigger>
            <TabsTrigger value="jurnal" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
              Jurnal
            </TabsTrigger>
            <TabsTrigger value="buletin" className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white dark:data-[state=active]:bg-red-600 dark:data-[state=active]:text-white">
              Buletin
            </TabsTrigger>
          </TabsList> */}
          {/* Custom TabsList */}
          <TabsList
            className="flex flex-wrap w-full border-b h-auto px-3 gap-2 justify-start"
          >
            <TabsTrigger
              value="buku"
              className="flex-grow text-center px-4 py-3 
                        text-sm md:text-base xl:text-lg font-semibold 
                        text-[color:var(--primary-navy)] dark:text-white 
                        relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400 
                        data-[state=active]:font-bold 
                        data-[state=active]:after:h-[6px] md:data-[state=active]:after:h-[8px] 
                        data-[state=active]:after:bg-red-600"
            >
              BOOK
            </TabsTrigger>

            <TabsTrigger
              value="laporan"
              className="flex-grow text-center px-4 py-3 
                        text-sm md:text-base xl:text-lg font-semibold 
                        text-[color:var(--primary-navy)] dark:text-white 
                        relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400 
                        data-[state=active]:font-bold 
                        data-[state=active]:after:h-[6px] md:data-[state=active]:after:h-[8px] 
                        data-[state=active]:after:bg-red-600"
            >
              REPORT
            </TabsTrigger>

            <TabsTrigger
              value="jurnal"
              className="flex-grow text-center px-4 py-3 
                        text-sm md:text-base xl:text-lg font-semibold 
                        text-[color:var(--primary-navy)] dark:text-white 
                        relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400 
                        data-[state=active]:font-bold 
                        data-[state=active]:after:h-[6px] md:data-[state=active]:after:h-[8px] 
                        data-[state=active]:after:bg-red-600"
            >
              JOURNAL
            </TabsTrigger>

            <TabsTrigger
              value="buletin"
              className="flex-grow text-center px-4 py-3 
                        text-sm md:text-base xl:text-lg font-semibold 
                        text-[color:var(--primary-navy)] dark:text-white 
                        relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400 
                        data-[state=active]:font-bold 
                        data-[state=active]:after:h-[6px] md:data-[state=active]:after:h-[8px] 
                        data-[state=active]:after:bg-red-600"
            >
              BULLETIN
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buku" className="flex flex-col items-center gap-4">
            {renderPublications(publication.buku)}
            <Button asChild className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white">
              <Link href="/en/publication/buku">Read More</Link>
            </Button>
          </TabsContent>

          <TabsContent value="laporan" className="flex flex-col items-center gap-4">
            {renderPublications(publication.laporan)}
            <Button asChild className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white">
              <Link href="/en/publication/laporan">Read More</Link>
            </Button>
          </TabsContent>

          <TabsContent value="jurnal" className="flex flex-col items-center gap-4">
            {renderPublications(publication.jurnal)}
            <Button asChild className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white">
              <Link href="/en/publication/jurnal">Read More</Link>
            </Button>
          </TabsContent>

          <TabsContent value="buletin" className="flex flex-col items-center gap-4">
            {renderPublications(publication.buletin)}
            <Button asChild className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white">
              <Link href="/en/publication/buletin">Read More</Link>
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export { EnPublicationPreview };
