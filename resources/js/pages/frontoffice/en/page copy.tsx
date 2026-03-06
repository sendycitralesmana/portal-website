import { Head, usePage } from '@inertiajs/react';
import EnMainLayout from './layout/main';
import EnSectionMap from './components/maps';
import { EnHero } from './components/hero';
import EnInformationSection from './components/information-preview';
import EnNewsSection from './components/news-section';
import EnApplicationSection from './components/application-internal-section';
import { EnPublicationPreview } from './components/publication-preview';
import { EnStatisticsPreview } from './components/statistic-preview';
import { EnApplicationExternalSection } from './components/application-external-section-copy';
import EnFloatingTabButtons from './components/floating-widget';
import EnImageSliderModal from './components/highlight-preview';
import EnExternalAppsSection from './components/application-external-section';
import { EnAfiliasiSection } from './components/afiliasi';

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
        <main className="w-full space-y-16 ">
          {/* <EnSectionMap /> */}
          <EnHero highlights={highlights} />
          <EnInformationSection />
          <EnNewsSection artikel={artikel} informasi={informasi} />
          <EnApplicationSection application={application} />
          <EnPublicationPreview publication={publication} />
          <EnStatisticsPreview />
          {/* <EnApplicationExternalSection applicationExternal={applicationExternal} /> */}
          {/* <EnExternalAppsSection /> */}
          {/* <EnAfiliasiSection applicationExternal={applicationExternal} /> */}
          {/* <EnFloatingTabButtons /> */}
          {/* <EnImageSliderModal modals={modals} /> */}
        </main>
    </>
  );
}

Welcome.layout = (page: React.ReactNode) => <EnMainLayout children={page} />;

export default Welcome;