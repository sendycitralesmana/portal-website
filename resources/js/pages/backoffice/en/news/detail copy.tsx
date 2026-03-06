// ProfilPage.tsx
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PenBox } from 'lucide-react';
import { AppContainer } from '@/components/ui/app-container';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';

const breadcrumbs = [
  { title: 'News', href: '/backoffice/en/news' },
];

type NewsItem = {
  id: number;
  slug: string;
  title: string;
  content: string;
  cover_url: string | null;
  user: UserItem;
  document_name: string | null;
  document_url: string | null;
  news_category: newsCategoryItem;
  created_at: string;
};

type newsCategoryItem = {
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
  news: NewsItem;
};

export default function DetailProfilPage() {
  const { news } = usePage<PageProps>().props;
  console.log(news);

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="News">
        <meta name="description" content="Halaman News" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>News</CardTitle>
            <Button asChild>
              <Link href={`/backoffice/en/news/${news.id}/edit`} className="flex items-center gap-1">
                <PenBox size={18} /> Edit
              </Link>
            </Button>
          </CardHeader>
          <CardContent>

            <main className='w-full'>
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

              {/* Konten News */}
              <AppContainer className="flex flex-col gap-4 pt-5">
                <div className="flex flex-col gap-1">
                    <small>{news.created_at}</small>
                    <h2 className="font-bold text-2xl text-[color:var(--primary-navy)] dark:text-white">{news.title}</h2>
                    {news.user ? <small>Author {news.user.name}</small> : null}
                </div>

                <article
                    className="prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                />

                {/* Dokumen */}
                {news.document_url?.toLowerCase().endsWith(".pdf") && (
                    <div className="flex flex-col gap-4 pt-5 w-full">
                        <h3 className="font-semibold">Document</h3>
                        <div className="flex items-center justify-between border p-3 rounded">
                            <span className="font-medium truncate">{news.document_name}</span>
                            <Button size="icon" asChild className="bg-blue-900 hover:bg-blue-800 dark:text-white">
                                <a href={`/News/${news.news_category.slug}/${news.id}/preview-document`} target="_blank">
                                <DownloadIcon />
                                </a>
                            </Button>
                        </div>
                    </div>
                )}
              </AppContainer>
            </main>

          </CardContent>
        </Card>
      </div>
    </AppLayoutEn>
  );
}