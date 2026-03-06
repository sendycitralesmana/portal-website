import React, { ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import { AppContainer } from "@/components/ui/app-container";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import EnMainLayout from "../layout/main";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  cover_url: string | null;
  user: UserItem;
  news_category: NewsCategoryItem;
  documents: DocumentItem[];
  created_at: string;
};

type NewsCategoryItem = {
  slug: string;
};

type UserItem = {
  name: string;
};

type DocumentItem = {
  id: number;
  name: string;
  url: string;
};

type PageProps = {
  news: NewsItem;
};

const NewsDetailPage = () => {
  const { news } = usePage<PageProps>().props;

  return (
    <>
      <Head title={news.news_category.slug.charAt(0).toUpperCase() + news.news_category.slug.slice(1)} />
      <main className="w-full">
        {/* Banner Cover */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5] min-h-[200px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={news.cover_url ?? "/images/fondasi.png"}
              alt="cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </section>

        {/* Konten Berita */}
        <AppContainer className="flex flex-col gap-4 pt-5">
          <div className="flex flex-col gap-1">
            <small>{news.created_at}</small>
            <h2 className="font-bold text-2xl text-[color:var(--primary-navy)] dark:text-white">{news.title}</h2>
            {news.user && <small>Ditulis oleh {news.user.name}</small>}
          </div>

          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Dokumen */}
          {news.documents.length > 0 && (
            <div className="flex flex-col gap-4 pt-5">
              <h3 className="font-semibold">Dokumen Terkait</h3>
              <div className="grid grid-cols-3 gap-4">
                {news.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between border p-3 rounded"
                  >
                    <span className="font-medium truncate">{doc.name}</span>
                    <Button size="icon" asChild>
                      <a href={doc.url} target="_blank" download>
                        <DownloadIcon />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </AppContainer>
      </main>
    </>
  );
};

// ✅ Tambahkan properti layout secara manual
NewsDetailPage.layout = (page: ReactNode) => <EnMainLayout>{page}</EnMainLayout>;

export default NewsDetailPage;
