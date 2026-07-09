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
import AplikasiSection from "./aplikasi";
import LayananSection from "./layanan";

interface Post {
  id: number
  jenis: string
  kategori: string
  judul: string
  slug: string
  deskripsi: string
  gambar: string
  tanggal: string
  created_at: string
}

interface VideoInfo {
  id: number
  judul: string
  embed_url: string
}

interface Layanan {
    id: number;
    judul: string;
    deskripsi: string | null;
    link: string;
    gambar: string | null;
}

interface Props {
    sosialMedias: SosialMedia[];
    videoInfos: VideoInfo[];
    siaranPers: Post[];
    beritaFotos: Post[];
    beritas: Post[];
    pengumumans: Post[];
    layanans: Layanan[];
}

const BerandaPage = ({ sosialMedias, videoInfos, siaranPers, beritaFotos, beritas, pengumumans, layanans }: Props) => {
  return (
    <div>
      <Head title="Beranda">
        <meta name="description" content="Halaman Beranda" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* <SorotPratinjau /> */}
      <HeroCarousel />
      <Alert />
      <Tablist
        siaranPers={siaranPers}
        beritaFotos={beritaFotos}
        beritas={beritas}
        pengumumans={pengumumans}
      />
      <VideoSection videoInfos={videoInfos} />
      <LayananSection layanans={layanans}/>
      <SocialMediaSection sosialMedias={sosialMedias} />
    </div>
  );
};

BerandaPage.layout = (page: React.ReactNode) => (
  <MainLayout>{page}</MainLayout>
);

export default BerandaPage;