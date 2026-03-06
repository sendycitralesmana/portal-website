// import React from 'react'
// import MainLayout from '../layout/main'
// import Tablist from './tablist'
// import ShortcutLinks from './shortcut'
// import SocialMediaSection from './sosial-media'
// import HeroCarousel from './hero'
// import Alert from './alert'
// import { Head } from '@inertiajs/react'
// import SorotPratinjau from './sorot-pratinjau'

// const BerandaPage = () => {
//   return (
//     <div>
//       <Head title="Beranda">
//         <meta name="description" content="Halaman Beranda" />
//         <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
//       </Head>

//       {/* <SorotPratinjau />
//       <HeroCarousel />
//       <Alert />
//       <Tablist/> */}
//       {/* <ShortcutLinks /> */}
//       <SocialMediaSection  />
//     </div>
//   )
// }

// BerandaPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

// export default BerandaPage

import React from "react";
import MainLayout from "../layout/main";
import SocialMediaSection from "./sosial-media";
import { Head } from "@inertiajs/react";
import { SosialMedia } from "@/types/sosial-media";
import SorotPratinjau from "./sorot-pratinjau";
import HeroCarousel from "./hero";
import Alert from "./alert";
import Tablist from "./tablist";
import PermohonanPengajuanPerlindungan from "./permohonan-pengajuan-perlindungan";
import VideoSection from "./video-section";

interface Props {
  sosialMedias: SosialMedia[];
}

const BerandaPage = ({ sosialMedias }: Props) => {
  return (
    <div>
      <Head title="Beranda">
        <meta name="description" content="Halaman Beranda" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* <SorotPratinjau /> */}
      {/* <HeroCarousel /> */}
      <PermohonanPengajuanPerlindungan />
      <Alert />
      <Tablist/>
      {/* <ShortcutLinks /> */}
      {/* <VideoSection /> */}
      <SocialMediaSection sosialMedias={sosialMedias} />
    </div>
  );
};

BerandaPage.layout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default BerandaPage;