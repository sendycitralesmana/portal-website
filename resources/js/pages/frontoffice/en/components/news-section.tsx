// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";

// type NewsItem = {
//   id: number;
//   title: string;
//   date: string;
//   content?: string;
// };

// interface NewsSectionProps {
//   artikel: NewsItem[];
//   informasi: NewsItem[];
//   application: ApplicationItem[];
// }

// function stripHtmlAndLimit(html: string = "", maxLength: number): string {
//   // Hapus tag <img>
//   const noImgHtml = html.replace(/<img[^>]*>/gi, '');

//   // Ambil teks tanpa HTML
//   const text = noImgHtml.replace(/<[^>]+>/g, '').trim();

//   // Potong teks hingga maxLength
//   return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
// }


// const NewsSection: React.FC<NewsSectionProps> = ({ artikel, informasi, application }) => {

//   console.log(artikel);

//   return (
//     <section className="w-full mt-14">
//       <div className="container grid grid-cols-1 md:grid-cols-[55%_45%] gap-6 h-[650px]">
//         {/* LEFT */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
//           {application.map((item, index) => (
//             <a
//               key={index}
//               href={item.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="relative h-full rounded-lg overflow-hidden shadow-md group"
//             >
//               <img
//                 src={item.cover_url}
//                 alt={item.title}
//                 className="absolute top-0 left-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition duration-300"
//               />
//               <div className="absolute bottom-0 left-0 w-full p-4 text-white font-extrabold text-2xl drop-shadow-md leading-snug">
//                 {item.title}
//               </div>
//             </a>
//           ))}
//         </div>

//         {/* RIGHT */}
//         <div className="h-full flex flex-col overflow-hidden">
//           <Tabs defaultValue="news" className="w-full h-full flex flex-col">
//             {/* Custom TabsList */}
//             <TabsList className="flex w-full  text-base font-semibold border-b h-16">
//               <TabsTrigger
//                 value="news"
//                 className="flex-1 relative px-4 py-4 text-[color:var(--primary-navy)] dark:text-white text-xl xl:text-2xl 
//                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400 
//                   data-[state=active]:font-extrabold 
//                   data-[state=active]:after:h-[8px] data-[state=active]:after:bg-red-600"
//               >
//                 BERITA/ARTIKEL
//               </TabsTrigger>
//               <TabsTrigger
//                 value="information"
//                 className="flex-1 relative px-4 py-4 text-[color:var(--primary-navy)] dark:text-white text-xl xl:text-2xl 
//                   after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400 
//                   data-[state=active]:font-extrabold 
//                   data-[state=active]:after:h-[8px] data-[state=active]:after:bg-red-600"
//               >
//                 PENGUMUMAN
//               </TabsTrigger>
//             </TabsList>

//             {/* Content */}
//             <TabsContent value="news" className="flex-1 flex flex-col h-full overflow-hidden">
//               <Card className="flex-1 flex flex-col h-full overflow-hidden">
//                 <CardContent className="flex flex-col gap-4 h-full overflow-hidden">
//                   <div className="overflow-y-auto flex-1 pr-2">
//                     {artikel.map((item) => (
//                       <a key={item.id} href={`/berita/artikel/${item.id}`}>
//                         <div className="p-2 rounded cursor-pointer group hover:bg-neutral-100 dark:hover:bg-neutral-800">
//                           <p className="font-bold text-base group-hover:text-blue-900 text-[color:var(--primary-navy)] dark:text-white leading-snug">
//                             {item.title}
//                           </p>
//                           <small className="text-sm font-semibold text-gray-900 dark:text-white">{item.date}</small>
//                           {/* <p className="text-sm text-gray-700 dark:text-white mt-1">
//                             {item.content }
//                           </p> */}
//                           <p className="text-sm font-semibold text-gray-700 dark:text-white mt-1">
//                             "{stripHtmlAndLimit(item.content ?? '', 50)}"
//                           </p>
//                           <Separator className="mt-3" />
//                         </div>
//                       </a>
//                     ))}
//                   </div>
//                   <a href="/berita/artikel" className="w-fit self-start">
//                     <Button className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700">
//                       Read More
//                     </Button>
//                   </a>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="information" className="flex-1 flex flex-col h-full overflow-hidden">
//               <Card className="flex-1 flex flex-col h-full overflow-hidden">
//                 <CardContent className="flex flex-col gap-4 h-full overflow-hidden">
//                   <div className="overflow-y-auto flex-1 pr-2">
//                     {informasi.map((item) => (
//                       <a key={item.id} href={`/berita/informasi/${item.id}`}>
//                         <div className="p-2 rounded cursor-pointer group hover:bg-neutral-100 dark:hover:bg-neutral-800">
//                           <p className="font-bold text-base group-hover:text-blue-900 text-[color:var(--primary-navy)] dark:text-white leading-snug">
//                             {item.title}
//                           </p>
//                           <small className="text-sm font-semibold text-gray-900 dark:text-white">{item.date}</small>
//                           {/* <p className="text-sm text-gray-700 dark:text-white mt-1">
//                             {item.content}
//                           </p> */}
//                           <p className="text-sm font-semibold text-gray-700 dark:text-white mt-1">
//                             "{stripHtmlAndLimit(item.content ?? '', 50)}"
//                           </p>
//                           <Separator className="mt-3" />
//                         </div>
//                       </a>
//                     ))}
//                   </div>
//                   <a href="/berita/informasi" className="w-fit self-start">
//                     <Button className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700">
//                       Read More
//                     </Button>
//                   </a>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewsSection;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type NewsItem = {
  id: number;
  title: string;
  date: string;
  content?: string;
};

type ApplicationItem = {
  title: string;
  url: string;
  cover_url: string;
};

interface NewsSectionProps {
  artikel: NewsItem[];
  informasi: NewsItem[];
  application: ApplicationItem[];
}

function stripHtmlAndLimit(html: string = "", maxLength: number): string {
  const noImgHtml = html.replace(/<img[^>]*>/gi, '');
  const text = noImgHtml.replace(/<[^>]+>/g, '').trim();
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

const EnNewsSection: React.FC<NewsSectionProps> = ({ artikel, informasi, application }) => {
  return (
    <section className="w-full mt-14">
      <div className="container grid grid-cols-1 md:grid-cols-[33.33%_66.66%] gap-6 h-[650px]">
        
        {/* LEFT SIDE */}
        <div className="grid grid-rows-3 gap-4 h-full">
          {application.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-lg overflow-hidden shadow-md group"
            >
              <img
                src={item.cover_url}
                alt={item.title}
                className="absolute top-0 left-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full p-4 text-white font-extrabold text-xl drop-shadow-md leading-snug">
                {item.title}
              </div>
            </a>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="h-full flex flex-col overflow-hidden">
          <Tabs defaultValue="news" className="w-full h-full flex flex-col">
            
            {/* Tabs Header */}
            

            <TabsList
              className="flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar border-b h-16 px-2 gap-2"
            >
              <TabsTrigger
                value="news"
                className="snap-start flex-shrink-0 min-w-[180px] text-center relative px-4 py-2
                  text-sm sm:text-base md:text-lg xl:text-xl font-semibold
                  text-[color:var(--primary-navy)] dark:text-white
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400
                  data-[state=active]:font-bold
                  data-[state=active]:after:h-[6px] md:data-[state=active]:after:h-[8px]
                  data-[state=active]:after:bg-red-600"
              >
                NEWS / ARTICLE
              </TabsTrigger>

              <TabsTrigger
                value="information"
                className="snap-start flex-shrink-0 min-w-[180px] text-center relative px-4 py-2
                  text-sm sm:text-base md:text-lg xl:text-xl font-semibold
                  text-[color:var(--primary-navy)] dark:text-white
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-red-400
                  data-[state=active]:font-bold
                  data-[state=active]:after:h-[6px] md:data-[state=active]:after:h-[8px]
                  data-[state=active]:after:bg-red-600"
              >
                ANNOUNCEMENT
              </TabsTrigger>
            </TabsList>

            {/* BERITA/ARTIKEL */}
            <TabsContent value="news" className="flex-1 flex flex-col h-full overflow-hidden">
              <Card className="flex-1 flex flex-col h-full overflow-hidden">
                <CardContent className="flex flex-col gap-4 h-full overflow-hidden">
                  <div className="overflow-y-auto flex-1 pr-2">
                    {artikel.map((item) => (
                      <a key={item.id} href={`/en/news/artikel/${item.id}`}>
                        <div className="p-1 rounded cursor-pointer group hover:bg-neutral-100 dark:hover:bg-neutral-800">
                          <p className="font-bold text-lg group-hover:text-blue-900 text-[color:var(--primary-navy)] dark:text-white leading-snug">
                            {item.title}
                          </p>
                          <small className="text-sm font-semibold text-gray-900 dark:text-white">{item.date}</small>
                          <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">
                            "{stripHtmlAndLimit(item.content ?? '', 300)}"
                          </p>
                          <Separator className="mt-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                  <a href="/en/news/artikel" className="w-fit self-start">
                    <Button className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700">
                      Read More
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PENGUMUMAN */}
            <TabsContent value="information" className="flex-1 flex flex-col h-full overflow-hidden">
              <Card className="flex-1 flex flex-col h-full overflow-hidden">
                <CardContent className="flex flex-col gap-4 h-full overflow-hidden">
                  <div className="overflow-y-auto flex-1 pr-2">
                    {informasi.map((item) => (
                      <a key={item.id} href={`/berita/informasi/${item.id}`}>
                        <div className="p-1 rounded cursor-pointer group hover:bg-neutral-100 dark:hover:bg-neutral-800">
                          <p className="font-bold text-lg group-hover:text-blue-900 text-[color:var(--primary-navy)] dark:text-white leading-snug">
                            {item.title}
                          </p>
                          <small className="text-sm font-semibold text-gray-900 dark:text-white">{item.date}</small>
                          <p className="text-base font-semibold text-gray-800 dark:text-white mt-1">
                            "{stripHtmlAndLimit(item.content ?? '', 300)}"
                          </p>
                          <Separator className="mt-3" />
                        </div>
                      </a>
                    ))}
                  </div>
                  <a href="/en/news/informasi" className="w-fit self-start">
                    <Button className="bg-red-600 font-bold xl:text-lg px-16 text-white hover:bg-red-700">
                      Read More
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

export default EnNewsSection;
