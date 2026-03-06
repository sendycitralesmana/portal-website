import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { AppContainer } from "@/components/ui/app-container";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  cover_url: string | null;
  news_category: NewsCategoryItem;
  user: UserItem;
  document_name: string | null;
  document_url: string | null;
  documents: RelationItem[];
  images: RelationItem[];
  created_at: string;
};

type NewsCategoryItem = { slug: string };
type UserItem = { name: string };
type RelationItem = { id: number; name: string; url: string; full_url: string };
type PageProps = { news: NewsItem };

const ArtikelPage: React.FC = () => {
  const { news } = usePage<PageProps>().props;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <Head title={news.news_category.slug.charAt(0).toUpperCase() + news.news_category.slug.slice(1)}>
        <meta
          name="description"
          content={news.news_category.slug.charAt(0).toUpperCase() + news.news_category.slug.slice(1)}
        />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <main className="w-full">
        {/* Banner Cover */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5] min-h-[200px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={news.cover_url ?? "/images/default.webp"}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </section>

        <AppContainer className="flex flex-col gap-4 pt-5">
          {/* Header Berita */}
          <div className="flex flex-col gap-1">
            <small>{news.created_at}</small>
            <p className="font-bold text-2xl lg:text-3xl text-[color:var(--primary-navy)] dark:text-white">
              {news.title}
            </p>
            {news.user && <small>Ditulis oleh {news.user.name}</small>}
          </div>

          {/* Konten */}
          <article
            className="font-semibold prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 text-justify leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Dokumen */}
          {news.documents.length > 0 && (
            <div className="flex flex-col gap-4 pt-5">
              <h3 className="font-semibold text-[color:var(--primary-navy)] dark:text-white">Dokumen Terkait</h3>
              <div className="grid grid-cols-3 gap-4">
                {news.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between border p-3 rounded">
                    <span className="font-medium truncate">{doc.name}</span>
                    <Button size="icon" asChild>
                      <a href={`/berita/document/${doc.id}`} target="_blank">
                        <DownloadIcon />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gambar */}
          {news.images.length > 0 && (
            <div className="flex flex-col gap-4 pt-5">
              <h3 className="font-semibold text-[color:var(--primary-navy)] dark:text-white">Gambar Terkait</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {news.images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group rounded overflow-hidden shadow hover:shadow-lg transition"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <img
                          src={image.full_url}
                          alt={image.name}
                          className="w-full h-40 object-cover cursor-pointer"
                        //   onClick={() => setSelectedImage(image.full_url)}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl p-0">
                        <img src={selectedImage ?? image.full_url} alt={image.name} className="w-full h-auto" />
                      </DialogContent>
                    </Dialog>

                    {/* Tombol Download */}
                    <a
                      href={`/berita/image/${image.id}`}
                      download
                      onClick={(e) => e.stopPropagation()} // cegah klik tembus ke image
                      className="absolute top-2 right-2 bg-black/60 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition z-50"
                      title="Download Gambar"
                    >
                      <DownloadIcon className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AppContainer>
      </main>

      <Footer />
    </ThemeProvider>
  );
};

export default ArtikelPage;
