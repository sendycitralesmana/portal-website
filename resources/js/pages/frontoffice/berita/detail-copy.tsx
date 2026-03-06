import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { AppContainer } from "@/components/ui/app-container";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import { Header } from "../components/header";
import { Footer } from "../components/footer";

type NewsItem = {
    id: number;
    title: string;
    date: string;
};

type UserItem = {
    name: string;
};

type PageProps = {
    news: NewsItem[];
};

const ArtikelPage: React.FC = () => {

    const { news } = usePage<PageProps>().props
    console.log(news)

  const data = {
    id: 1,
    title: "Judul Berita Statik",
    created_at: "2025-06-01",
    cover: "/images/fondasi.png", // pastikan file ini bisa diakses via browser
    content: "<p>Ini adalah konten singkat dari berita yang ditampilkan.</p>",
    user: {
      name: "Penulis Statik",
    },
    documents: [
      {
        id: 1,
        name: "Lampiran Berita",
        url: "/documents/lampiran.pdf", // file ini juga harus ada di storage
      },
    ],
  };

  return (
    <>
      <Header />
      <Head title={data.title} />

      <main className="w-full">
        {/* Banner Cover */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5] min-h-[200px] overflow-hidden">
            <div className="absolute inset-0">
                <img
                src={data.cover}
                alt="cover"
                className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>
        </section>

        {/* Konten Berita */}
        <AppContainer className="flex flex-col gap-4 pt-5">
          <div className="flex flex-col gap-1">
            <small>{data.created_at}</small>
            <h2 className="font-bold text-2xl">{data.title}</h2>
            <small>Ditulis oleh {data.user.name}</small>
          </div>

          <article
            className="prose"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          {/* Dokumen */}
          {/* {data.documents.length > 0 && (
            <div className="flex flex-col gap-2 pt-5">
              <h3 className="font-semibold">Dokumen Terkait</h3>
              {data.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between border p-3 rounded"
                >
                  <span className="font-medium">{doc.name}</span>
                  <Button size="icon" asChild>
                    <a href={doc.url} target="_blank" download>
                      <DownloadIcon />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )} */}
        </AppContainer>
      </main>

      <Footer />
    </>
  );
};

export default ArtikelPage;

