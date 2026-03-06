import React from 'react';
import { AppContainer } from '@/components/ui/app-container';
import { Download } from 'lucide-react';
import MainLayout from '../layout/main';
import { Head } from '@inertiajs/react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

const RoadmapPage = () => {
  return (
    <div className="flex flex-col">
      <Head title="Unit Kerja">
        <meta name="description" content="Halaman Unit Kerja" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Breadcrumb */}
      <div className="w-full mt-6 md:mt-10 mb-6 md:mb-12">
        <AppContainer>
          <Breadcrumb>
            <BreadcrumbList className="text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-semibold">
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                  Profil
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                  Unit Kerja
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AppContainer>
      </div>

      {/* Title */}
      <div className="w-full mb-10 text-center">
        <AppContainer>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 max-w-4xl mx-auto leading-snug">
            UNIT KERJA <br />
            LEMBAGA PERLINDUNGAN SAKSI DAN KORBAN
          </h1>
        </AppContainer>
      </div>

        {/* Content */}
        <section className="container w-full space-y-10 mt-10">
            <div className="w-full grid grid-cols-4 gap-5">
                <Card className="col-span-4 p-10 bg-neutral-100 dark:bg-neutral-800 shadow-lg">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger className="w-full justify-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white text-center">
                            Sekretariat Jenderal
                        </AccordionTrigger>
                        <AccordionContent className="text-justify">
                            <div className="flex flex-col md:flex-row gap-6">
                            {/* Gambar di sebelah kiri */}
                            <div className="w-full md:w-1/3 flex justify-center">
                                <img
                                src="/images/fondasi.png"
                                alt="Struktur Sekretariat"
                                className="rounded-lg max-h-[300px] object-contain"
                                />
                            </div>

                            {/* Deskripsi di sebelah kanan */}
                            <div className="w-full md:w-2/3 space-y-4 text-sm md:text-base">
                                <p>
                                Sekretariat Jenderal Lembaga Perlindungan Saksi dan Korban yang selanjutnya disebut
                                Sekretariat Jenderal dipimpin oleh Sekretaris Jenderal. Sekretaris Jenderal berada di bawah
                                dan bertanggung jawab kepada Pimpinan LPSK. Sekretariat Jenderal bertugas menyelenggarakan
                                pemberian dukungan administratif dan substantif kepada LPSK.
                                </p>
                                <p>
                                Dalam melaksanakan tugas di atas, Sekretariat Jenderal menyelenggarakan fungsi sebagai berikut:
                                <br />
                                a. Penyelenggaraan koordinasi, sinkronisasi dan integrasi administrasi kegiatan LPSK;
                                <br />
                                b. Penyusunan rencana dan program Sekretariat Jenderal;
                                <br />
                                c. Pembinaan dan pemberian dukungan administrasi yang meliputi ketatausahaan,
                                kepegawaian dan keanggotaan, keuangan, kerumahtanggaan, kerjasama, hubungan
                                masyarakat, arsip dan dokumentasi;
                                <br />
                                d. Koordinasi dan penyusunan peraturan perundang-undangan, pelaksanaan advokasi
                                hukum, serta organisasi dan tata laksana;
                                <br />
                                e. Pengelolaan barang milik/kekayaan negara dan layanan pengadaan barang/jasa
                                pemerintah;
                                <br />
                                f. Pemberian dukungan analisis dan pendapat permasalahan hukum;
                                <br />
                                g. Pemberian dukungan pelayanan permohonan dan pemenuhan hak saksi dan korban;
                                <br />
                                h. Pengawasan atas pelaksanaan tugas di lingkungan Sekretariat Jenderal; dan
                                <br />
                                i. Pelaksanaan fungsi lain yang diberikan oleh Pimpinan LPSK
                                </p>
                                <p>
                                Sekretariat Jenderal terdiri atas:
                                <br />
                                a. Biro Umum dan Kepegawaian: melaksanakan rencana dan program, perbendaharaan, sistem informasi,
                                ketatausahaan, kepegawaian, pengadaan barang/jasa, dsb.
                                <br />
                                Fungsi:
                                <br />
                                1) Penyiapan program dan laporan;
                                <br />
                                2) Perbendaharaan dan akuntansi;
                                <br />
                                3) Sistem informasi dan kerumahtanggaan;
                                <br />
                                4) Pengembangan SDM dan keanggotaan;
                                <br />
                                5) Arsip dan dokumentasi;
                                <br />
                                6) Pengelolaan barang milik negara;
                                <br />
                                7) Pemantauan dan evaluasi.
                                </p>
                            </div>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

                <Card className="col-span-1 p-10 bg-neutral-100 dark:bg-neutral-800 shadow-lg text-justify h-fit">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                            Biro Penelaahan Permohonan
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="w-full flex justify-center mb-4">
                            <img
                                src="/images/fondasi.png"
                                alt="Struktur Sekretariat"
                                className="rounded-lg max-h-[300px] object-contain"
                            />
                            </div>
                            <p>
                            Biro Penelaahan Permohonan bertugas melaksanakan pemberian dukungan analisis dan pendapat
                            permasalahan hukum serta dukungan pelayanan permohonan saksi dan korban.
                            </p>
                            <p className="mt-4">
                            Dalam melaksanakan tugas sebagaimana di atas, Biro Penelaahan Permohonan menyelenggarakan fungsi:
                            </p>
                            <ul className="list-decimal list-inside mt-2 space-y-1">
                            <li>Penyiapan penerimaan, penelaahan, investigasi dan penilaian permohonan;</li>
                            <li>Penyiapan analisis dan pendapat permasalahan hukum;</li>
                            <li>
                                Penyiapan fasilitasi penghitungan nilai kompensasi dan restitusi serta perlindungan darurat;
                            </li>
                            <li>Penyiapan dukungan persidangan dan administrasi putusan;</li>
                            </ul>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

                <Card className="col-span-1 p-10 bg-neutral-100 dark:bg-neutral-800 shadow-lg text-justify h-fit">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                            Biro Pemenuhan Hak Saksi dan Korban
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="w-full flex justify-center mb-4">
                            <img
                                src="/images/fondasi.png"
                                alt="Struktur Sekretariat"
                                className="rounded-lg max-h-[300px] object-contain"
                            />
                            </div>

                            <p>
                            Biro Pemenuhan Hak Saksi dan Korban bertugas melaksanakan pemberian dukungan 
                            pemenuhan hak saksi dan korban.
                            </p>

                            <p className="mt-4">
                            Dalam melaksanakan tugas sebagaimana di atas, Biro Pemenuhan Hak Saksi dan Korban 
                            menyelenggarakan fungsi:
                            </p>

                            <ul className="list-decimal list-inside mt-2 space-y-1">
                            <li>
                                Penyiapan pelayanan perlindungan dan dukungan hak prosedural bagi saksi dan korban;
                            </li>
                            <li>
                                Penyiapan pelayanan bantuan dan fasilitasi layanan kompensasi dan restitusi bagi saksi dan korban;
                            </li>
                            </ul>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

                <Card className="col-span-1 p-10 bg-neutral-100 dark:bg-neutral-800 shadow-lg text-justify h-fit">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                            Biro Hukum, Kerja Sama dan Hubungan Masyarakat
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="w-full flex justify-center mb-4">
                            <img
                                src="/images/fondasi.png"
                                alt="Struktur Sekretariat"
                                className="rounded-lg max-h-[300px] object-contain"
                            />
                            </div>

                            <p>
                            Biro Hukum, Kerja Sama dan Hubungan Masyarakat bertugas untuk melaksanakan 
                            penyusunan peraturan perundang-undangan, advokasi hukum, penataan organisasi dan 
                            tata laksana, kerja sama, hubungan masyarakat serta keprotokolan.
                            </p>

                            <p className="mt-4">
                            Dalam melaksanakan tugas sebagaimana di atas, Biro Hukum, Kerja Sama dan Hubungan 
                            Masyarakat menyelenggarakan fungsi:
                            </p>

                            <ul className="list-decimal list-inside mt-2 space-y-1">
                            <li>Penyiapan koordinasi dan penyusunan peraturan perundang-undangan;</li>
                            <li>Penyiapan koordinasi dan pelaksanaan advokasi serta pertimbangan hukum;</li>
                            <li>Penyiapan koordinasi dan penataan organisasi serta tata laksana;</li>
                            <li>Penyiapan koordinasi dan pelaksanaan kerja sama;</li>
                            <li>Penyiapan koordinasi dan pelaksanaan hubungan masyarakat dan keprotokolan;</li>
                            </ul>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

                <Card className="col-span-1 p-10 bg-neutral-100 dark:bg-neutral-800 shadow-lg text-justify h-fit">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                        <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                            Biro Umum dan Kepegawaian
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="w-full flex justify-center mb-4">
                            <img
                                src="/images/fondasi.png"
                                alt="Struktur Sekretariat"
                                className="rounded-lg max-h-[300px] object-contain"
                            />
                            </div>

                            <p>
                            Biro Umum dan Kepegawaian bertugas untuk melaksanakan penyusunan rencana dan 
                            program, melaksanakan urusan perbendaharaan, keuangan, kerumahtanggaan, sistem 
                            informasi, ketatausahaan, persuratan, arsip dan pelaporan, pengelolaan kepegawaian, 
                            keanggotaan dan pengelolaan barang milik/kekayaan negara, serta layanan pengadaan 
                            barang/jasa pemerintah.
                            </p>

                            <p className="mt-4">
                            Dalam melaksanakan tugas sebagaimana di atas, Biro Umum dan Kepegawaian 
                            menyelenggarakan fungsi:
                            </p>

                            <ul className="list-decimal list-inside mt-2 space-y-1">
                            <li>Penyiapan penyusunan rencana program dan rencana laporan;</li>
                            <li>Pelaksanaan urusan perbendaharaan, akuntansi dan verifikasi keuangan;</li>
                            <li>Pelaksanaan urusan kerumahtanggaan, sistem informasi teknologi dan data;</li>
                            <li>Pengelolaan administrasi kepegawaian dan keanggotaan, serta pengembangan sumber daya manusia;</li>
                            <li>Pelaksanaan urusan tata usaha, persuratan, arsip, dokumentasi dan pengelolaan perpustakaan;</li>
                            <li>Pengelolaan barang milik/kekayaan negara dan layanan pengadaan barang/jasa pemerintah;</li>
                            <li>Pelaksanaan pemantauan, evaluasi dan pelaporan di lingkungan Perlindungan Saksi dan Korban serta Sekretariat Jenderal.</li>
                            </ul>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>

            </div>
        </section>
    </div>
  );
};

RoadmapPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RoadmapPage;
