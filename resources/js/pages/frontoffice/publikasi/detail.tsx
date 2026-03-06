import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { AppContainer } from "@/components/ui/app-container";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ThemeProvider } from "@/components/theme-provider";

type PublicationItem = {
    id: number;
    slug: string;
    title: string;
    content: string;
    cover_url: string | null;
    user: UserItem;
    document_name: string | null;
    document_url: string | null;
    publication_category: PublicationCategoryItem;
    created_at: string;
};

type PublicationCategoryItem = {
    id: number;
    slug: string;
}

type UserItem = {
    name: string;
}

type DocumentItem = {
    id: number;
    name: string;
    url: string;
}

type PageProps = {
    publication: PublicationItem;
};

const ArtikelPage: React.FC = () => {

    const { publication } = usePage<PageProps>().props
    console.log(publication)

  return (
    <>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Header />
            <Head title={publication.publication_category.slug.charAt(0).toUpperCase() + publication.publication_category.slug.slice(1)} />
                <main className="w-full">
                    {/* Banner Cover */}
                    <section className="relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5] min-h-[200px] overflow-hidden">
                        <div className="absolute inset-0">
                            <img
                            src={publication.cover_url ?? "/images/default.webp"}
                            alt="cover"
                            className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    </section>

                    {/* Konten Berita */}
                    <AppContainer className="flex flex-col gap-4 pt-5">
                    <div className="flex flex-col gap-1">
                        <small>{publication.created_at}</small>
                        <h2 className="font-bold text-2xl text-[color:var(--primary-navy)] dark:text-white">{publication.title}</h2>
                        {publication.user ? <small>Ditulis oleh {publication.user.name}</small> : null}
                    </div>

                    <article
                        className="prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4 text-justify leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: publication.content }}
                    />


                    {/* Dokumen */}
                    {publication.document_url?.toLowerCase().endsWith(".pdf") && (
                        <div className="flex flex-col gap-4 pt-5 w-full md:w-1/2">
                            <h3 className="font-semibold">Dokumen Terkait</h3>
                            <div className="flex items-center justify-between border p-3 rounded">
                                <span className="font-medium truncate">{publication.document_name}</span>
                                <Button size="icon" asChild className="bg-blue-900 hover:bg-blue-800 dark:text-white">
                                    <a href={`/publikasi/${publication.publication_category.slug}/${publication.id}/preview-document`} target="_blank">
                                    <DownloadIcon />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Dokumen */}
                    {/* {publication.documents.length > 0 && (
                        <div className="flex flex-col gap-4 pt-5">
                            <h3 className="font-semibold">Dokumen Terkait</h3>
                            <div className="grid grid-cols-3 gap-4">
                            {publication.documents.map((doc) => (
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
                        )} */}
                    </AppContainer>
                </main>
            <Footer />
        </ThemeProvider>
        
    </>
  );
};

export default ArtikelPage;

