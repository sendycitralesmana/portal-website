import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface Post {
  title: string
  image: string
  date: string
}

/* ================= DATA ================= */

const siaranPers: Post[] = [
  {
    title: "Press Release: The Importance of Insurance Literacy...",
    image: "/images/logo-lg.png",
    date: "February 13, 2026",
  },
  {
    title: "Press Release: OJK Hands Over Suspect SAS...",
    image: "/images/logo-lg.png",
    date: "February 12, 2026",
  },
  {
    title: "Joint Press Release: OJK, LPS, and BPS...",
    image: "/images/logo-lg.png",
    date: "February 10, 2026",
  },
  {
    title: "OJK Strengthens Integrity in Financing Industry",
    image: "/images/logo-lg.png",
    date: "February 9, 2026",
  },
]

const beritaFoto: Post[] = [
  {
    title:
      "Financial Services Industry Annual Meeting (PTIJK) 2026 Book",
    image: "/images/logo-lg.png",
    date: "February 5, 2026",
  },
  {
    title:
      "Financial Services Industry Annual Meeting (PTIJK) 2026 Book",
    image: "/images/logo-lg.png",
    date: "February 5, 2026",
  },
  {
    title:
      "Financial Services Industry Annual Meeting (PTIJK) 2026 Book",
    image: "/images/logo-lg.png",
    date: "February 5, 2026",
  },
  {
    title:
      "Financial Services Industry Annual Meeting (PTIJK) 2026 Book",
    image: "/images/logo-lg.png",
    date: "February 5, 2026",
  },
]

const beritaKegiatan: Post[] = [
  {
    title: "Public Lecture at University Event",
    image: "/images/logo-lg.png",
    date: "February 12, 2026",
  },
  {
    title: "Public Lecture at University Event",
    image: "/images/logo-lg.png",
    date: "February 12, 2026",
  },
  {
    title: "Public Lecture at University Event",
    image: "/images/logo-lg.png",
    date: "February 12, 2026",
  },
  {
    title: "Public Lecture at University Event",
    image: "/images/logo-lg.png",
    date: "February 12, 2026",
  },
]

const pengumuman: Post[] = [
  {
    title:
      "Implementation of Business Licenses – PT AMB Insurance Broker",
    image: "/images/logo-lg.png",
    date: "February 18, 2026",
  },
  {
    title:
      "Implementation of Business Licenses – PT AMB Insurance Broker",
    image: "/images/logo-lg.png",
    date: "February 18, 2026",
  },
  {
    title:
      "Implementation of Business Licenses – PT AMB Insurance Broker",
    image: "/images/logo-lg.png",
    date: "February 18, 2026",
  },
  {
    title:
      "Implementation of Business Licenses – PT AMB Insurance Broker",
    image: "/images/logo-lg.png",
    date: "February 18, 2026",
  },
]

/* ================= CARD GRID ================= */

function CardGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
      {posts.map((post, index) => (
        <Card
          key={index}
          className="
            rounded-2xl
            overflow-hidden
            border
            border-border
            bg-background
            shadow-sm
            hover:shadow-md
            transition-all
            h-full
            flex
            flex-col
          "
        >
          {/* IMAGE */}
          <img
            src={post.image}
            alt={post.title}
            className="
              w-full
              
              object-cover
              aspect-square
            "
          />

          {/* CONTENT */}
          <CardContent className="
            p-3 sm:p-4 md:p-5
            bg-muted/70
            flex flex-col flex-1
          ">
            
            {/* TITLE */}
            <p className="
              text-sm md:text-md lg:text-lg
              font-semibold
              leading-snug
              line-clamp-3
              text-foreground
              min-h-[44px] sm:min-h-[52px] md:min-h-[60px]
            ">
              {post.title}
            </p>

            {/* DATE */}
            <p className="
              text-[10px] sm:text-[11px] md:text-xs lg:text-sm
              text-muted-foreground
              mt-auto
              pt-2 sm:pt-3 md:pt-4
            ">
              {post.date}
            </p>

          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ================= TABS ================= */

export default function Tablist() {
  return (
    // ❗ DESKTOP TETAP SAMA
    <section className="w-full py-12 -mt-21  z-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs defaultValue="siaranPers">
          
          {/* 👇 WRAP UNTUK SCROLL MOBILE */}
          <div className="overflow-x-auto">
            <div className="overflow-x-auto md:overflow-hidden">
              <TabsList
                className="
                  flex md:grid md:grid-cols-4
                  w-max md:w-full
                  bg-gradient-to-l from-blue-900 to-blue-800
                  p-0
                  rounded-none
                "
              >
                <TabsTrigger
                  value="siaranPers"
                  className="
                    h-full
                    px-5 md:px-6
                    text-sm md:text-lg
                    font-semibold
                    whitespace-nowrap
                    flex items-center justify-center
                    leading-none
                    text-white
                    rounded-none
                    data-[state=active]:bg-white
                    data-[state=active]:text-blue-900
                    data-[state=active]:shadow
                    data-[state=active]:rounded-t-4xl
                    transition-all
                    shrink-0
                    cursor-pointer
                  "
                >
                  Siaran Pers
                </TabsTrigger>

                <TabsTrigger
                  value="beritaFoto"
                  className="
                    h-full
                    px-5 md:px-6
                    text-sm md:text-lg
                    font-semibold
                    whitespace-nowrap
                    flex items-center justify-center
                    leading-none
                    text-white
                    rounded-none
                    data-[state=active]:bg-white
                    data-[state=active]:text-blue-900
                    data-[state=active]:shadow
                    data-[state=active]:rounded-t-4xl
                    transition-all
                    shrink-0
                    cursor-pointer
                  "
                >
                  Berita Foto
                </TabsTrigger>

                <TabsTrigger
                  value="beritaKegiatan"
                  className="
                    h-full
                    px-5 md:px-6
                    text-sm md:text-lg
                    font-semibold
                    whitespace-nowrap
                    flex items-center justify-center
                    leading-none
                    text-white
                    rounded-none
                    data-[state=active]:bg-white
                    data-[state=active]:text-blue-900
                    data-[state=active]:shadow
                    data-[state=active]:rounded-t-4xl
                    transition-all
                    shrink-0
                    cursor-pointer
                  "
                >
                  Berita Kegiatan
                </TabsTrigger>

                <TabsTrigger
                  value="pengumuman"
                  className="
                    h-full
                    px-5 md:px-6
                    text-sm md:text-lg
                    font-semibold
                    whitespace-nowrap
                    flex items-center justify-center
                    leading-none
                    text-white
                    rounded-none
                    data-[state=active]:bg-white
                    data-[state=active]:text-blue-900
                    data-[state=active]:shadow
                    data-[state=active]:rounded-t-4xl
                    transition-all
                    shrink-0
                    cursor-pointer
                  "
                >
                  Pengumuman
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="siaranPers">
            <CardGrid posts={siaranPers} />
          </TabsContent>

          <TabsContent value="beritaFoto">
            <CardGrid posts={beritaFoto} />
          </TabsContent>

          <TabsContent value="beritaKegiatan">
            <CardGrid posts={beritaKegiatan} />
          </TabsContent>

          <TabsContent value="pengumuman">
            <CardGrid posts={pengumuman} />
          </TabsContent>

        </Tabs>
      </div>
    </section>
  )
}