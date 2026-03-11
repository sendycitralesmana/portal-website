import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "@inertiajs/react"

interface Post {
  id: number
  jenis: string
  kategori: string
  judul: string
  slug: string
  deskripsi: string
  gambar: string
  tanggal: string
}

interface TablistProps {
  siaranPers: Post[]
  beritaFotos: Post[]
  beritaKegiatans: Post[]
  pengumumans: Post[]
}

/* ================= CARD GRID ================= */

function CardGrid({ posts, baseUrl }: { posts: Post[]; baseUrl: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-6">
      {posts.map((post) => (
        <Card
          key={post.id}
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
            src={post.gambar}
            alt={post.judul}
            className="
              w-full
              object-cover
              aspect-square
            "
          />

          {/* CONTENT */}
          <CardContent
            className="
            p-3 sm:p-4 md:p-5
            bg-muted/70
            flex flex-col flex-1
          "
          >
            {/* TITLE WITH LINK */}
            <Link
              href={`${baseUrl}/${post.slug}`}
              className="
                text-sm md:text-md lg:text-lg
                font-semibold
                leading-snug
                line-clamp-3
                text-foreground
                min-h-[44px] sm:min-h-[52px] md:min-h-[60px]
                hover:text-red-900
                transition-colors
              "
            >
              {post.judul}
            </Link>

            {/* DATE */}
            <p
              className="
              text-[10px] sm:text-[11px] md:text-xs lg:text-sm
              text-muted-foreground
              mt-auto
              pt-2 sm:pt-3 md:pt-4
            "
            >
              {post.tanggal}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/* ================= TABS ================= */

export default function Tablist({
  siaranPers,
  beritaFotos,
  beritaKegiatans,
  pengumumans,
}: TablistProps) {
  return (
    <section className="w-full py-12 -mt-21 z-10 relative">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs defaultValue="siaranPers">
          <div className="overflow-x-auto">
            <div className="overflow-x-auto md:overflow-hidden">
              <TabsList
                className="
                  flex md:grid md:grid-cols-4
                  w-max md:w-full
                  bg-gradient-to-l from-red-900 to-red-800
                  p-0
                  rounded-none
                "
              >
                <TabsTrigger
                  value="siaranPers"
                  className="border-t-amber-400 border-l-amber-400 border-r-amber-400 rounded-t-4xl h-full px-5 md:px-6 text-sm md:text-lg font-semibold whitespace-nowrap flex items-center justify-center leading-none text-white data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow data-[state=active]:rounded-t-4xl transition-all shrink-0 cursor-pointer"
                >
                  Siaran Pers
                </TabsTrigger>

                <TabsTrigger
                  value="beritaFoto"
                  className="border-t-amber-400 border-l-amber-400 border-r-amber-400 rounded-t-4xl h-full px-5 md:px-6 text-sm md:text-lg font-semibold whitespace-nowrap flex items-center justify-center leading-none text-white data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow data-[state=active]:rounded-t-4xl transition-all shrink-0 cursor-pointer"
                >
                  Berita Foto
                </TabsTrigger>

                <TabsTrigger
                  value="beritaKegiatan"
                  className="border-t-amber-400 border-l-amber-400 border-r-amber-400 rounded-t-4xl h-full px-5 md:px-6 text-sm md:text-lg font-semibold whitespace-nowrap flex items-center justify-center leading-none text-white data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow data-[state=active]:rounded-t-4xl transition-all shrink-0 cursor-pointer"
                >
                  Berita Kegiatan
                </TabsTrigger>

                <TabsTrigger
                  value="pengumuman"
                  className="border-t-amber-400 border-l-amber-400 border-r-amber-400 rounded-t-4xl h-full px-5 md:px-6 text-sm md:text-lg font-semibold whitespace-nowrap flex items-center justify-center leading-none text-white data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow data-[state=active]:rounded-t-4xl transition-all shrink-0 cursor-pointer"
                >
                  Pengumuman
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="siaranPers">
            <CardGrid
              posts={siaranPers}
              baseUrl="/redesign/publikasi/siaran-pers"
            />
          </TabsContent>

          <TabsContent value="beritaFoto">
            <CardGrid
              posts={beritaFotos}
              baseUrl="/redesign/publikasi/berita-foto"
            />
          </TabsContent>

          <TabsContent value="beritaKegiatan">
            <CardGrid
              posts={beritaKegiatans}
              baseUrl="/redesign/publikasi/berita-kegiatan"
            />
          </TabsContent>

          <TabsContent value="pengumuman">
            <CardGrid
              posts={pengumumans}
              baseUrl="/redesign/publikasi/pengumuman"
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}