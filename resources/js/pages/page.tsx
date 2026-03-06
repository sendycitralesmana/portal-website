import { Head, usePage } from '@inertiajs/react';
import { Header } from './frontoffice/components/header';
import { Footer } from './frontoffice/components/footer';
import { Hero } from './frontoffice/components/hero';
import InformationSection from './frontoffice/components/information-preview';
import NewsSection from './frontoffice/components/news-section';
import ApplicationSection from './frontoffice/components/application-internal-section';
import { PublicationPreview } from './frontoffice/components/publication-preview';
import { StatisticsPreview } from './frontoffice/components/statistic-preview';

import { ThemeProvider } from '@/components/theme-provider';
import MapPage from './frontoffice/components/maps';
import ImageSliderModal from './frontoffice/components/highlight-preview';
import FloatingWidget from './frontoffice/components/floating-widget';
import MainLayout from './frontoffice/layout/main';

import ExternalAppsSection from './frontoffice/components/application-external-section';

import { AfiliasiSection }  from './frontoffice/components/afiliasi';
import IDMap from './frontoffice/components/map';
import SosialMediaSection from './frontoffice/components/sosial-media';

const Welcome = () => {
  const {
    artikel = [],
    informasi = [],
    application = [],
    publication = {
      buku: [],
      laporan: [],
      jurnal: [],
      buletin: [],
    },
    applicationExternal = [],
    affiliates = [],
    highlights = [],
    modals = []
  } = usePage<PageProps>().props;

  console.log(highlights);

  return (
    <>
        <Head title="Beranda">
          <meta name="description" content="Halaman Beranda" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        </Head>
        <main className="w-full space-y-2 ">
          {/* <MapPage /> */}
          {/* <IDMap /> */}
          <Hero highlights={highlights} />
          <InformationSection />
          <NewsSection artikel={artikel} informasi={informasi} application={application}/>
          <SosialMediaSection />
          {/* <ApplicationSection application={application} /> */}
          <StatisticsPreview />
          <PublicationPreview publication={publication} />
          {/* <ExternalAppsSection /> */}
          <AfiliasiSection affiliates={affiliates} />
          <FloatingWidget />
          <ImageSliderModal modals={modals} />
        </main>
    </>
  );
}

Welcome.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default Welcome;