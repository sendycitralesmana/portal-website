
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';
import { AuthUser, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard() {
  const { auth } = usePage<{ auth: AuthUser }>().props;

  return (
    <AppLayoutRedesign breadcrumbs={breadcrumbs}>
      <Head title="Beranda">
        <meta name="description" content="Halaman Beranda" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Content statistic */}
      <section className="py-6">

      </section>
    </AppLayoutRedesign>
  );
}
