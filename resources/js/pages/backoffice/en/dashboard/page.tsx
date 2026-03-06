// Dashboard.tsx
import AppLayoutEn from '@/layouts/backoffice-en/app-layout-en';
import { EnStatisticsPreview } from '@/pages/frontoffice/en/components/statistic-preview';
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
    <AppLayoutEn breadcrumbs={breadcrumbs}>
      <Head title="Beranda">
        <meta name="description" content="Halaman Beranda" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Content statistic */}
      <section className="py-6">
        <EnStatisticsPreview />
      </section>
    </AppLayoutEn>
  );
}
