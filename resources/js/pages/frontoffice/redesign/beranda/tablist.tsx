import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@inertiajs/react';

interface Post {
    id: number;
    jenis: string;
    kategori: string;
    judul: string;
    slug: string;
    deskripsi: string;
    gambar: string;
    tanggal: string;
}

interface TablistProps {
    siaranPers: Post[];
    beritaFotos: Post[];
    beritaKegiatans: Post[];
    pengumumans: Post[];
}

/* ================= CARD GRID ================= */

function CardGrid({ posts, baseUrl }: { posts: Post[]; baseUrl: string }) {
    return (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {posts.map((post) => (
                <Card
                    key={post.id}
                    className="border-border bg-background flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-md"
                >
                    {/* IMAGE */}
                    {/* <img
            src={post.gambar}
            alt={post.judul}
            className="
              w-full
              object-cover
              aspect-square
            "
          /> */}

                    <div className="relative aspect-video w-full overflow-hidden bg-black">
                        {/* Background blur */}
                        <img
                            src={post.gambar}
                            alt={post.judul}
                            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-lg"
                        />

                        {/* Main image (tidak kepotong) */}
                        <img src={post.gambar} alt={post.judul} className="relative h-full w-full object-contain" />
                    </div>

                    {/* CONTENT */}
                    <CardContent className="bg-muted/70 flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                        {/* TITLE WITH LINK */}
                        <Link
                            href={`${baseUrl}/${post.slug}`}
                            className="md:text-md text-foreground line-clamp-3 min-h-[44px] text-xs leading-snug font-semibold transition-colors hover:text-red-900 sm:min-h-[52px] md:min-h-[60px] lg:text-lg"
                        >
                            {post.judul}
                        </Link>

                        {/* DATE */}
                        <p className="text-muted-foreground mt-auto pt-2 text-[10px] sm:pt-3 sm:text-[11px] md:pt-4 md:text-xs lg:text-sm">
                            {post.tanggal}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

/* ================= TABS ================= */

export default function Tablist({ siaranPers, beritaFotos, beritaKegiatans, pengumumans }: TablistProps) {
    return (
        <section className="relative z-10 -mt-21 w-full py-12">
            <div className="container mx-auto px-4 md:px-6">
                <Tabs defaultValue="siaranPers">
                    <div className="overflow-x-auto">
                        <div className="overflow-x-auto md:overflow-hidden">
                            <TabsList className="no-scrollbar flex w-max min-w-full gap-2 overflow-x-auto rounded-2xl bg-gradient-to-br from-red-900 via-red-800 to-red-700 p-1.5 whitespace-nowrap shadow-lg backdrop-blur">
                                {[
                                    { value: 'siaranPers', label: 'Siaran Pers' },
                                    { value: 'beritaFoto', label: 'Berita Foto' },
                                    { value: 'beritaKegiatan', label: 'Berita Kegiatan' },
                                    { value: 'pengumuman', label: 'Pengumuman' },
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="relative flex shrink-0 cursor-pointer items-center justify-center rounded-xl px-5 py-2.5 text-xs font-medium whitespace-nowrap text-white/80 transition-all duration-300 ease-out hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-white/30 focus:outline-none data-[state=active]:scale-[1.02] data-[state=active]:bg-white data-[state=active]:text-red-900 data-[state=active]:shadow-md md:px-6 md:text-lg"
                                    >
                                        {tab.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <TabsContent value="siaranPers">
                        <CardGrid posts={siaranPers} baseUrl="/redesign/publikasi/siaran-pers" />
                    </TabsContent>

                    <TabsContent value="beritaFoto">
                        <CardGrid posts={beritaFotos} baseUrl="/redesign/publikasi/berita-foto" />
                    </TabsContent>

                    <TabsContent value="beritaKegiatan">
                        <CardGrid posts={beritaKegiatans} baseUrl="/redesign/publikasi/berita-kegiatan" />
                    </TabsContent>

                    <TabsContent value="pengumuman">
                        <CardGrid posts={pengumumans} baseUrl="/redesign/publikasi/pengumuman" />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}
