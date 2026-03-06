// resources/js/Pages/PejabatPage.tsx

import React from 'react';
// import { Head } from '@inertiajs/inertia-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import MainLayout from '../layout/main';
// import Layout from '@/Layouts/MainLayout';

const PejabatPage = () => {
  return (
    <>
    <Head title="Unit Kerja">
        <meta name="description" content="Halaman Unit Kerja" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
    </Head>
            <main className="space-y-10 w-screen">
                <section className="h-[400px] w-full bg-background">
                <div className="flex w-full h-full justify-center items-center relative">
                    <div className="h-full w-full absolute bg-slate-800">
                    <img
                        src="/images/fondasi.png"
                        alt="Fondasi"
                        className="object-cover w-full h-full opacity-50"
                    />
                    </div>
                    <div className="absolute inset-0 h-full w-full flex flex-col gap-2 justify-center items-center">
                    <h1 className="text-3xl font-bold text-slate-100">Unit Kerja Lembaga Perlindungan Saksi Dan Korban</h1>
                    </div>
                </div>
                </section>

                <section className="container w-full space-y-10 mt-10">
                    <div className="w-full grid grid-cols-4 gap-5">
                        <Card className="col-span-4 p-10 text-center">
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                {/* className="font-bold max-w-2xl text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white" */}
                                <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                                Sekretariat Jenderal
                                </AccordionTrigger>
                                <AccordionContent>
                                Sekretariat Jenderal Lembaga Perlindungan Saksi dan Korban yang selanjutnya disebut 
                                Sekretariat Jenderal dipimpin oleh Sekretaris Jenderal. Sekretaris Jenderal berada dibawah 
                                dan bertanggung jawab kepada Pimpinan LPSK. 
                                Sekretariat Jenderal bertugas menyelenggarakan pemberian dukungan administratif dan 
                                substantif kepada LPSK. 
                                Dalam melaksanakan tugas diatas, Sekretariat Jenderal menyelenggarakan fungsi sebagai 
                                berikut: 
                                a. Penyelenggaraan koordinasi, sinkronisasi dan integrasi administrasi kegiatan LPSK; 
                                b. Penyusunan rencana dan program Sekretariat Jenderal; 
                                c. Pembinaan dan pemberian dukungan administrasi yang meliputi ketatausahaan, 
                                kepegawaian dan keanggotaan, keuangan, kerumahtanggaan, kerjasama, hubungan 
                                masyarakat, arsip dan dokumentasi; 
                                d. Koordinasi dan penyusunan peraturan perundang-undangan, pelaksanaan advokasi 
                                hukum, serta organisasi dan tata laksana; 
                                e. Pengelolaan barang milik/kekayaan negara dan layanan pengadaan barang/jasa 
                                pemerintah; 
                                f. 
                                Pemberian dukungan analisis dan pendapat permasalahan hukum; 
                                g. Pemberian dukungan pelayanan permohonan dan pemenuhan hak saksi dan korban; 
                                h. Pengawasan atas pelaksanaan tugas di lingkungan Sekretariat Jenderal; dan 
                                i. 
                                Pelaksanaan fungsi lain yang diberikan oleh Pimpinan LPSK 
                                Sekretariat Jenderal terdiri atas: 
                                a. Biro Umum dan Kepegawaian 
                                Biro Umum dan Kepegawaian bertugas untuk melaksanakan penyusunan rencana dan 
                                program, melaksanakan urusan perbendaharaan, keuangan, kerumahtanggaan, sistem 
                                informasi, ketatausahaan, persuratan, arsip dan pelaporan, pengelolaan kepegawaian, 
                                keanggotaan dan pengelolaan barang milik/kekayaan negara, serta layanan pengadaan 
                                barang/jasa pemerintah. 
                                Dalam melaksanakan tugas sebagaimana diatas, Biro Umum dan Kepegawaian 
                                menyelenggarakan fungsi: 
                                1) Penyiapan penyusunan rencana program dan rencana laporan; 
                                2) Pelaksanaan urusan perbendaharaan, akuntansi dan verifikasi keuangan; 
                                9 | H a l a m a n 
                                PENGEMBANGAN WEBSITE LPSK 
                                3) Pelaksanaan urusan kerumahtanggaan, sistem informasi teknologi dan data; 
                                4) Pengelolaan administrasi kepegawaian dan keanggotaan, serta pengembangan 
                                sumber daya manusia; 
                                5) Pelaksanaan urusan tata usaha, persuratan, arsip, dokumentasi dan pengelolaan 
                                perpustakaan; 
                                6) Pengelolaan barang milik/kekayaan negara dan layanan pengadaan barang/jasa 
                                pemerintah; 
                                7) Pelaksanaan
                                pemantauan,
                                evaluasi
                                dan
                                pelaporan
                                di
                                Perlindungan Saksi dan Korban serta Sekretariat Jenderal; 
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                        </Card>

                        <Card className="col-span-1 p-10 text-center h-fit">
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                                Biro Penelaahan Permohonan
                                </AccordionTrigger>
                                <AccordionContent>
                                Biro Penelaahan Permohonan bertugas melaksanakan pemberian dukungan analisis dan 
                                pendapat permasalahan hukum serta dukungan pelayanan permohonan saksi dan korban.
                                Dalam melaksanakan tugas sebagaimana diatas, Biro Penelaahan Permohonan 
                                menyelenggarakan fungsi: 
                                1) Penyiapan penerimaan, penelaahan, investigasi dan penilaian permohonan; 
                                2) Penyiapan analisis dan pendapat permasalahan hukum; 
                                3) Penyiapan fasilitasi penghitungan nilai kompensasi dan restitusi serta perlindungan 
                                darurat; 
                                4) Penyiapan dukungan persidangan dan administrasi putusan; 
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                        </Card>

                        <Card className="col-span-1 p-10 text-center h-fit">
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                                Biro Pemenuhan Hak Saksi dan Korban
                                </AccordionTrigger>
                                <AccordionContent>
                                Biro Pemenuhan Hak Saksi dan Korban bertugas melaksanakan pemberian dukungan 
                                pemenuhan hak saksi dan korban. 
                                Dalam melaksanakan tugas sebagaimana diatas, Biro Pemenuhan Hak Saksi dan Korban 
                                menyelenggarakan fungsi: 
                                1) Penyiapan pelayanan perlindungan dan dukungan hak prosedural bagi saksi dan 
                                korban; 
                                2) Penyiapan pelayanan bantuan dan fasilitasi layanan kompensasi dan restitusi bagi 
                                saksi dan korban; 
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                        </Card>

                        <Card className="col-span-1 p-10 text-center h-fit">
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                                Biro Hukum, Kerja Sama dan Hubungan Masyarakat
                                </AccordionTrigger>
                                <AccordionContent>
                                Biro Hukum, Kerjasama dan Hubungan Masyarakat bertugas untuk melaksanakan 
                                penyusunan peraturan perundang-undangan, advokasi hukum, penataan organisasi dan 
                                tata laksana, kerjasama, hubungan masyarakat serta keprotokolan. 
                                Dalam melaksanakan tugas sebagaimana diatas, Biro Hukum, Kerjasama dan Hubungan 
                                Masyarakat menyelenggarakan fungsi: 
                                1) Penyiapan koordinasi dan penyusunan peraturan perundang-undangan; 
                                2) Penyiapan koordinasi dan pelaksanaan advokasi serta pertimbangan hukum; 
                                3) Penyiapan koordinasi dan penataan organisasi serta tata laksana; 
                                4) Penyiapan koordinasi dan pelaksanaan kerjasama; 
                                5) Penyiapan koordinasi dan pelaksanaan hubungan masyarakat dan keprotokolan; 
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                        </Card>

                        <Card className="col-span-1 p-10 text-center h-fit">
                            <Accordion type="single" collapsible>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                                Biro Umum dan Kepegawaian
                                </AccordionTrigger>
                                <AccordionContent>
                                Biro Umum dan Kepegawaian bertugas untuk melaksanakan penyusunan rencana dan 
                                program, melaksanakan urusan perbendaharaan, keuangan, kerumahtanggaan, sistem 
                                informasi, ketatausahaan, persuratan, arsip dan pelaporan, pengelolaan kepegawaian, 
                                keanggotaan dan pengelolaan barang milik/kekayaan negara, serta layanan pengadaan 
                                barang/jasa pemerintah. 
                                Dalam melaksanakan tugas sebagaimana diatas, Biro Umum dan Kepegawaian 
                                menyelenggarakan fungsi: 
                                1) Penyiapan penyusunan rencana program dan rencana laporan; 
                                2) Pelaksanaan urusan perbendaharaan, akuntansi dan verifikasi keuangan; 
                                9 | H a l a m a n 
                                PENGEMBANGAN WEBSITE LPSK 
                                3) Pelaksanaan urusan kerumahtanggaan, sistem informasi teknologi dan data; 
                                4) Pengelolaan administrasi kepegawaian dan keanggotaan, serta pengembangan 
                                sumber daya manusia; 
                                5) Pelaksanaan urusan tata usaha, persuratan, arsip, dokumentasi dan pengelolaan 
                                perpustakaan; 
                                6) Pengelolaan barang milik/kekayaan negara dan layanan pengadaan barang/jasa 
                                pemerintah; 
                                7) Pelaksanaan
                                pemantauan,
                                evaluasi
                                dan
                                pelaporan
                                di
                                Perlindungan Saksi dan Korban serta Sekretariat Jenderal; 
                                </AccordionContent>
                            </AccordionItem>
                            </Accordion>
                        </Card>
                    </div>
                </section>
            </main>
    </>
  );
};

PejabatPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default PejabatPage;
