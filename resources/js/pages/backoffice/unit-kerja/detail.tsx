// ProfilPage.tsx
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DownloadIcon, PenBox } from 'lucide-react';
import { AppContainer } from '@/components/ui/app-container';

const breadcrumbs = [
  { title: 'Unit Kerja', href: '/backoffice/unit-kerja' },
];

type WorkUnitItem = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

type PageProps = {
  workUnit: WorkUnitItem;
};

export default function DetailProfilPage() {
  const { workUnit } = usePage<PageProps>().props;
  console.log(workUnit);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Unit Kerja">
        <meta name="description" content="Halaman Unit Kerja" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Unit Kerja</CardTitle>
            <Button asChild>
              <Link href={`/backoffice/unit-kerja/${workUnit.id}/edit`} className="flex items-center gap-1">
                <PenBox size={18} /> Ubah
              </Link>
            </Button>
          </CardHeader>
          <CardContent>

            <main className='w-full'>

              {/* Konten Berita */}
              <AppContainer className="flex flex-col gap-4 pt-5">
                <div className="flex flex-col gap-1">
                    <small>{workUnit.created_at}</small>
                    <h2 className="font-bold text-2xl text-[color:var(--primary-navy)] dark:text-white">{workUnit.title}</h2>
                </div>

                <article
                    className="prose prose-li:marker:text-black prose-ul:list-disc prose-ol:list-decimal prose-li:ml-4"
                    dangerouslySetInnerHTML={{ __html: workUnit.content }}
                />
              </AppContainer>
            </main>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}