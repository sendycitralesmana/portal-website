import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { AppContainer } from "@/components/ui/app-container";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ThemeProvider } from "@/components/theme-provider";

type NewsItem = {
    id: number;
    title: string;
    content: string;
    cover_url: string | null;
    news_category: NewsCategoryItem;
    user: UserItem;
    document_name: string | null;
    document_url: string | null;
    documents: DocumentItem[];
    created_at: string;
};

type NewsCategoryItem = {
    slug: string;
};

type UserItem = {
    name: string;
}

type DocumentItem = {
    id: number;
    name: string;
    url: string;
}

type PageProps = {
    news: NewsItem;
};

const ArtikelPage: React.FC = () => {

    const { news } = usePage<PageProps>().props
    console.log(news)

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Header />
            <Head title={news.news_category.slug.charAt(0).toUpperCase() + news.news_category.slug.slice(1)}>
                <meta name="description" content={news.news_category.slug.charAt(0).toUpperCase() + news.news_category.slug.slice(1)} />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>
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
                        <p className="font-bold text-2xl lg:text-3xl text-[color:var(--primary-navy)] dark:text-white">{news.title}</p>
                        {news.user ? <small>Ditulis oleh {news.user.name}</small> : null}
                    </div>

                    <article
                        className="font-semibold prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 text-justify leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: news.content }}
                    />

                    {news.document_url?.toLowerCase().endsWith(".pdf") && (
                        <div className="flex flex-col gap-4 pt-5 w-full md:w-1/2">
                            <h3 className="font-semibold">Dokumen Terkait</h3>
                            <div className="flex items-center justify-between border p-3 rounded">
                                <span className="font-medium truncate">{news.document_name}</span>
                                <Button size="icon" asChild className="bg-blue-900 hover:bg-blue-800 dark:text-white">
                                    <a href={`/publikasi/${news.news_category.slug}/${news.id}/preview-document`} target="_blank">
                                    <DownloadIcon />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Dokumen */}
                    {news.documents.length > 0 && (
                        <div className="flex flex-col gap-4 pt-5">
                            <h3 className="font-semibold">Dokumen Terkait</h3>
                            <div className="flex items-center justify-between border p-3 rounded">
                                <span className="font-medium truncate">{news.document_name}</span>
                                <Button size="icon" asChild className="bg-blue-900 hover:bg-blue-800 dark:text-white">
                                    <a href={`/publikasi/${news.news_category.slug}/${news.id}/preview-document`} target="_blank">
                                    <DownloadIcon />
                                    </a>
                                </Button>
                            </div>
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
            <Footer />
        </ThemeProvider>
        
    </>
  );
};

export default ArtikelPage;

