// ProfilPage.tsx
import HeadingSmall from '@/components/heading-small';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';
import { Button } from '@/components/ui/button';
import { PenBox } from 'lucide-react';

const breadcrumbs = [
  { title: 'Profile', href: '/backoffice/en/profile' },
];

type Profile = {
  id: string;
  name: string;
  foto_url: string; // URL gambar
  description: string;
};

type PageProps = {
  profile: Profile;
};

export default function DetailProfilPage() {
  const { profile } = usePage<PageProps>().props;

  return (
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Profile">
        <meta name="description" content="Halaman Profil" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-col gap-4 p-4">
        <Card className="shadow-md">
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle>Profile</CardTitle>
            <Button asChild>
              <Link href={`/backoffice/en/profile/${profile.id}/edit`} className="flex items-center gap-1">
                <PenBox size={18} /> Edit
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6">
            <div className="w-full sm:w-1/3">
              <img
                src={profile.foto_url}
                alt={profile.name}
                className="w-full h-auto object-cover rounded-lg border"
              />
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-base leading-relaxed whitespace-pre-line">
                {profile.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayoutEn>
  );
}
