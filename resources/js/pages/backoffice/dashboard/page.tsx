// Dashboard.tsx
import HeadingSmall from '@/components/heading-small';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { StatisticsPreview } from '@/pages/frontoffice/components/statistic-preview';
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
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Beranda">
        <meta name="description" content="Halaman Beranda" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Content statistic */}
      <section className="py-6">
        <StatisticsPreview />
      </section>
    </AppLayout>
  );
}
