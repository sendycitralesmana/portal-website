// ProfilPage.tsx
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PenBox } from 'lucide-react';
import { AppContainer } from '@/components/ui/app-container';

const breadcrumbs = [
  { title: 'Publikasi', href: '/backoffice/publikasi' },
];

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

export default function DetailProfilPage() {
  const { publication } = usePage<PageProps>().props;
  console.log(publication);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Publikasi">
        <meta name="description" content="Halaman Publikasi" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Publikasi</CardTitle>
            <Button asChild>
              <Link href={`/backoffice/publikasi/${publication.id}/edit`} className="flex items-center gap-1">
                <PenBox size={18} /> Ubah
              </Link>
            </Button>
          </CardHeader>
          <CardContent>

            <main className='w-full'>
              {/* Banner Cover */}
              <section className="relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/5] min-h-[200px] overflow-hidden">
                  <div className="absolute inset-0">
                      <img
                      src={publication.cover_url ?? "/images/fondasi.png"}
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
                    className="prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4"
                    dangerouslySetInnerHTML={{ __html: publication.content }}
                />

                {/* Dokumen */}
                {publication.document_url?.toLowerCase().endsWith(".pdf") && (
                    <div className="flex flex-col gap-4 pt-5 w-full">
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
              </AppContainer>
            </main>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}