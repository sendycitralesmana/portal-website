// import HeadingSmall from '@/components/heading-small';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
// import AppLayout from '@/layouts/app-layout';
// import SettingsLayout from '@/layouts/settings/layout';
// import { AuthUser, type BreadcrumbItem } from '@/types';
// import { Head, usePage } from '@inertiajs/react';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Dashboard',
//         href: '/dashboard',
//     },
// ];

// export default function Dashboard() {

//   const { auth } = usePage<{ auth: AuthUser }>().props;

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Beranda">
//                 <meta name="description" content="Halaman Beranda" />
//                  <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
//             </Head>
//             <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
//                 <div className="grid auto-rows-min gap-4 md:grid-cols-3">
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
//                         <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                     </div>
//                 </div>
//                 <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
//                     <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }

import { Head, router } from '@inertiajs/react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell, RadarChart, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, Radar, LineChart, Line, PieChart, Pie, Legend,
} from 'recharts';

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import AppLayout from '@/layouts/app-layout';

type Stats = {
  user: number;
  application: number;
  profile: number;
  highlight: number;
  publication: number;
  news: number;
  representative: number;
};

type Props = {
  stats: Stats;
  selectedRange: string;
};

const ranges = [
    { label: 'Semua', value: 'all' },
    { label: 'Hari ini', value: 'today' },
    { label: '1 Minggu', value: '1minggu' },
    { label: '1 Bulan', value: '1bulan' },
    { label: '3 Bulan', value: '3bulan' },
    { label: '6 Bulan', value: '6bulan' },
    { label: '1 Tahun', value: '1tahun' },
  ];
  


export default function Dashboard({ stats, selectedRange }: Props) {
  const data = [
    { name: 'User', value: stats.user },
    { name: 'Application', value: stats.application },
    { name: 'Profile', value: stats.profile },
    { name: 'Highlight', value: stats.highlight },
    { name: 'Representative', value: stats.representative },
    { name: 'Publication', value: stats.publication },
    { name: 'News', value: stats.news },
  ];

  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
    '#8B5CF6', '#EC4899', '#22D3EE',
  ];

  return (
    <AppLayout breadcrumbs={[{ title: 'Beranda', href: '/backoffice/dashboard' }]}>
      <Head title="Beranda">
        <meta name="description" content="Halaman Beranda" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="p-4 space-y-6">
        <Card className="shadow-lg-md">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Data Statistik</CardTitle>
            </div>
            <div>
              <Select
                defaultValue={selectedRange}
                onValueChange={(val) => {
                  router.get('/backoffice/dashboard', { range: val }, { preserveState: true });
                }}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {ranges.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 overflow-x-auto pb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-w-[600px] sm:min-w-0">

              {/* Bar Chart */}
              <div className=" p-4 rounded shadow-lg">
                <p className="font-semibold mb-2">Bar Chart</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    className='text-black'
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                      {data.map((_, i) => (
                        <Cell key={i} fill={colors[i % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Pie Chart */}
              <div className=" p-4 rounded shadow-lg">
                <p className="font-semibold mb-2">Pie Chart</p>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      label
                    >
                      {data.map((_, i) => (
                        <Cell key={i} fill={colors[i % colors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Line Chart */}
              <div className=" p-4 rounded shadow-lg">
              <p className="font-semibold mb-2">Line Chart</p>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    className='text-black'
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      interval={0}
                      angle={-25}
                      textAnchor="end"
                    />
                    <YAxis />
                    <Tooltip />
                    <Line
                    
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Radar Chart */}
              <div className=" p-4 rounded shadow-lg">
                <p className="font-semibold mb-2">Radar Chart</p>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={data} className='text-black'>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Statistics"
                      dataKey="value"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
