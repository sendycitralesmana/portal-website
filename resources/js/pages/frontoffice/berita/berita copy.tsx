import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import PaginationComponent from "../components/pagination";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import MainLayout from "../layout/main";

interface ArtikelPageProps {
  slug: string;
  search?: string;
  page: number;
  per_page: number;
  data: {
    data: {
      id: number;
      title: string;
      cover: string | null;
      cover_url: string | null;
      created_at: string;
    }[];
    total: number;
  };
}

const ArtikelPage: React.FC<ArtikelPageProps> = ({
  slug,
  search = "",
  page,
  per_page,
  data,
}) => {
  const totalPages = Math.ceil(data.total / per_page);

  // Handle search submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const searchValue = formData.get("search")?.toString() || "";

    // Pindah halaman pertama dengan search query baru
    router.get(route(route().current()!, { slug }), { search: searchValue, page: 1 });
  };

  console.log(data);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {/* <Header /> */}
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <Head title={slug.charAt(0).toUpperCase() + slug.slice(1)} />


        <main className="w-full">
          {/* <section className="w-full aspect-[21/4] bg-primary-foreground flex items-center justify-center relative">
            <Breadcrumb className="pt-5 absolute top-0 left-0">
              <BreadcrumbList className="ml-20">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/berita">{slug.replace(/-/g, " ").toUpperCase()}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{slug.toUpperCase()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="text-center font-bold">{slug.replace(/-/g, " ").toUpperCase()}</h1>
          </section> */}

          <div className="mt-6 md:mt-10 mb-6 md:mb-10 container">
            <Breadcrumb>
              <BreadcrumbList className="text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="font-semibold">
                    Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-[color:var(--primary-navy)] dark:text-white">Berita</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white">
                  {slug
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <form onSubmit={onSubmit} className="container flex flex-row gap-2">
            <Input name="search" defaultValue={search} className="flex-1" placeholder={`Cari ${slug}`} />
            <Button type="submit" className="bg-blue-900 hover:bg-blue-800 dark:text-white">
              <SearchIcon />
            </Button>
          </form>

          <section className="container w-full">
            <section className="w-full grid grid-cols-1 lg:grid-cols-3 pt-5 gap-4">
              {data.data.map((item) => (
                <Link key={item.id} href={`/berita/${slug}/${item.id}`}>
                  <Card className="relative overflow-hidden aspect-[3/2] group bg-gray-100">
                    {/* Image Container */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.cover_url || "/images/background.webp"}
                        alt={item.title}
                        className="w-full h-full object-cover min-h-full transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/images/background.webp";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
                      <Badge className="w-fit mb-2 bg-red-700 dark:text-white text-base">
                        <small>{item.created_at}</small>
                      </Badge>
                      <p className="font-bold text-xl leading-snug">
                        {item.title.length > 60 ? item.title.slice(0, 57) + "..." : item.title}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </section>
          </section>
          <section className="py-6">
            <PaginationComponent currentPage={page} totalPages={totalPages} search={search} slug={slug} />
          </section>
        </main>
        {/* <Footer /> */}
      </ThemeProvider>
    </>
  );
};

ArtikelPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default ArtikelPage;
