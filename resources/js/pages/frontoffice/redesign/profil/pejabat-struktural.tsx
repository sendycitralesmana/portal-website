// import { Head } from '@inertiajs/react';
// import { motion } from 'framer-motion';
// import { useState } from 'react';

// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { ReactElement, ReactNode } from 'react';
// import MainLayout from '../layout/main';

// type PageWithLayout<P = {}> = {
//     (props: P): ReactElement;
//     layout?: (page: ReactElement) => ReactNode;
// };

// interface Pejabat {
//     kategori: string;
//     nama: string;
//     jabatan: string;
//     deskripsi: string | null;
//     foto: string | null;
// }

// interface Props {
//     sekretarisJenderals: Pejabat[];
//     kepalaBiroLpsks: Pejabat[];
//     kepalaBagianLpsks: Pejabat[];
//     kepalaPerwakilanLpskDaerahs: Pejabat[];
//     tenagaAhliLpsks: Pejabat[];
// }

// /* ===============================
//    CARD COMPONENT (red THEME)
// ================================= */

// const PejabatCard: React.FC<{
//     nama: string;
//     jabatan: string;
//     foto?: string | null;
//     deskripsi?: string | null;
//     showImage?: boolean;
// }> = ({ nama, jabatan, foto, deskripsi, showImage = true }) => {
//     const imageSrc = foto ?? '/images/logo-baru.png';

//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//                 whileHover={{ y: -8 }}
//                 onClick={() => setOpen(true)}
//                 className="group relative flex h-full cursor-pointer flex-col items-center rounded-xl border border-amber-100 p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl dark:border-amber-900/40 dark:shadow-amber-900/30"
//             >
//                 <div className="absolute top-0 left-0 h-1 w-full rounded-t-xl bg-gradient-to-r from-amber-800 to-amber-500"></div>

//                 {showImage && (
//                     <div className="relative mb-4 h-36 w-28 overflow-hidden rounded-lg shadow-sm ring-2 ring-amber-100 dark:ring-amber-900/40">
//                         <img
//                             src={imageSrc}
//                             alt={nama}
//                             className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
//                         />
//                     </div>
//                 )}

//                 <div className="w-full">
//                     <div className="flex h-[48px] items-center justify-center">
//                         <p className="line-clamp-2 text-center text-sm font-semibold lg:text-sm">{nama}</p>
//                     </div>

//                     <div className="mt-1 flex h-[52px] items-start justify-center">
//                         <p className="line-clamp-3 text-center text-xs text-amber-700/80 lg:text-sm dark:text-amber-300">{jabatan}</p>
//                     </div>
//                 </div>
//             </motion.div>

//             <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent className="max-h-[90vh] w-[95vw] !max-w-[740px]">
//                     <DialogHeader>
//                         <DialogTitle className="text-xl">{nama}</DialogTitle>
//                         <DialogDescription>{jabatan}</DialogDescription>
//                     </DialogHeader>

//                     <div className="space-y-5">
//                         {showImage && (
//                             <div className="flex justify-center">
//                                 <div className="overflow-hidden rounded-lg border border-amber-100 p-2">
//                                     <img src={imageSrc} alt={nama} className="h-48 object-contain sm:h-72" />
//                                 </div>
//                             </div>
//                         )}

//                         <div className="bg-muted/40 rounded-lg p-4">
//                             <div className="max-h-[35vh] overflow-y-auto pr-2 sm:max-h-[40vh]">
//                                 <p className="text-sm leading-7 whitespace-pre-line">{deskripsi}</p>
//                             </div>
//                         </div>
//                     </div>
//                 </DialogContent>
//             </Dialog>
//         </>
//     );
// };

// /* ===============================
//    SECTION WRAPPER
// ================================= */

// interface SectionProps {
//     title: string;
//     data: Pejabat[];
//     cols?: string;
//     center?: boolean;
//     showImage?: boolean;
// }

// const Section: React.FC<SectionProps> = ({ title, data, cols = 'lg:grid-cols-4', center = false, showImage = true }) => {
//     if (!data || data.length === 0) return null;

//     return (
//         <section className="space-y-8">
//             <div className="text-center">
//                 <h2 className="relative inline-block text-xl font-bold">{title}</h2>
//                 <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
//             </div>

//             {center ? (
//                 <div className="flex flex-wrap justify-center gap-8">
//                     {data.map((item, index) => (
//                         <PejabatCard
//                             key={index}
//                             nama={item.nama}
//                             jabatan={item.jabatan}
//                             foto={item.foto}
//                             showImage={showImage}
//                             deskripsi={item.deskripsi}
//                         />
//                     ))}
//                 </div>
//             ) : (
//                 // <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-8`}>
//                 <div className={`grid ${cols} gap-8`}>
//                     {data.map((item, index) => (
//                         <PejabatCard
//                             key={index}
//                             nama={item.nama}
//                             jabatan={item.jabatan}
//                             foto={item.foto}
//                             showImage={showImage}
//                             deskripsi={item.deskripsi}
//                         />
//                     ))}
//                 </div>
//             )}
//         </section>
//     );
// };

// /* ===============================
//    PAGE
// ================================= */

// const PejabatStruktural: PageWithLayout<Props> = ({
//     sekretarisJenderals,
//     kepalaBiroLpsks,
//     kepalaBagianLpsks,
//     kepalaPerwakilanLpskDaerahs,
//     tenagaAhliLpsks,
// }) => {
//     return (
//         <>
//             <Head title="Pejabat Struktural - LPSK" />

//             <div className="min-h-screen">
//                 {/* Breadcrumb */}
//                 <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
//                     <div className="container mx-auto px-4">
//                         Profil / <span className="font-semibold">Pejabat Struktural</span>
//                     </div>
//                 </div>

//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 shadow-md md:py-8">
//                     <div className="container mx-auto px-4">
//                         <p className="text-xl font-bold text-white md:text-2xl lg:text-3xl">Pejabat Struktural</p>
//                     </div>
//                 </div>

//                 {/* Content */}
//                 <div className="container mx-auto space-y-14 px-4 py-16">
//                     <Section title="Sekretaris Jenderal" data={sekretarisJenderals} center />

//                     <Section title="Kepala Biro LPSK" data={kepalaBiroLpsks} cols="grid-cols-2 md:grid-cols-2 lg:grid-cols-4" />

//                     <div className="grid grid-cols-1 gap-12 lg:grid-cols-7">
//                         {/* KIRI - 2 DATA */}
//                         <section className="space-y-8 lg:col-span-2">
//                             <div className="text-center">
//                                 <h2 className="text-xl font-bold">Kepala Bagian LPSK</h2>
//                                 <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
//                             </div>

//                             <div className="grid grid-cols-2 items-stretch gap-6">
//                                 {kepalaBagianLpsks.map((item, index) => (
//                                     <div key={index} className={kepalaBagianLpsks.length === 1 ? 'col-span-2 flex justify-center' : 'h-full'}>
//                                         <div className={kepalaBagianLpsks.length === 1 ? 'w-full max-w-[260px]' : 'h-full'}>
//                                             <PejabatCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} deskripsi={item.deskripsi} />
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* KANAN - 5 DATA */}
//                         <section className="space-y-8 lg:col-span-5">
//                             <div className="text-center">
//                                 <h2 className="text-xl font-bold">Kepala Perwakilan LPSK Daerah</h2>
//                                 <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
//                             </div>

//                             <div className="grid grid-cols-2 items-stretch gap-6 md:grid-cols-3 lg:grid-cols-5">
//                                 {kepalaPerwakilanLpskDaerahs.map((item, index) => {
//                                     const isLastSingleMobile =
//                                         kepalaPerwakilanLpskDaerahs.length % 2 === 1 && index === kepalaPerwakilanLpskDaerahs.length - 1;

//                                     const remainingMd = kepalaPerwakilanLpskDaerahs.length % 3;

//                                     const isLastTwoMd = remainingMd === 2 && index >= kepalaPerwakilanLpskDaerahs.length - 2;

//                                     return (
//                                         <div
//                                             key={index}
//                                             className={[
//                                                 'h-full',
//                                                 isLastSingleMobile ? 'col-span-2 justify-self-center' : '',
//                                                 isLastTwoMd ? 'md:col-span-1' : '',
//                                             ].join(' ')}
//                                         >
//                                             <PejabatCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} deskripsi={item.deskripsi} />
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </section>
//                     </div>

//                     {/* Khusus Tenaga Ahli → TANPA FOTO */}
//                     <Section title="Tenaga Ahli LPSK" data={tenagaAhliLpsks} cols="grid-cols-2 md:grid-cols-2 lg:grid-cols-4" showImage={false} />
//                 </div>
//             </div>
//         </>
//     );
// };

// PejabatStruktural.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

// export default PejabatStruktural;




import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface Pejabat {
    kategori: string;
    nama: string;
    jabatan: string;
    deskripsi: string | null;
    foto: string | null;
}

interface Props {
    sekretarisJenderals: Pejabat[];
    kepalaBiroLpsks: Pejabat[];
    kepalaBagianLpsks: Pejabat[];
    kepalaPerwakilanLpskDaerahs: Pejabat[];
    tenagaAhliLpsks: Pejabat[];
}

/* ===============================
   CARD COMPONENT (red THEME)
================================= */

const PejabatCard: React.FC<{
    nama: string;
    jabatan: string;
    foto?: string | null;
    deskripsi?: string | null;
    showImage?: boolean;
    clickable?: boolean;
}> = ({
    nama,
    jabatan,
    foto,
    deskripsi,
    showImage = true,
    clickable = true,
}) => {
    const imageSrc = foto ?? '/images/logo-baru.png';

    const [open, setOpen] = useState(false);

    return (
        <>
            <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    whileHover={clickable ? { y: -8 } : undefined}
    onClick={clickable ? () => setOpen(true) : undefined}
    className={`group relative flex h-full flex-col items-center rounded-xl border border-amber-100 p-6 text-center shadow-md transition-all duration-300 dark:border-amber-900/40 dark:shadow-amber-900/30 ${
        clickable ? 'cursor-pointer hover:shadow-xl' : ''
    }`}
>
                <div className="absolute top-0 left-0 h-1 w-full rounded-t-xl bg-gradient-to-r from-amber-800 to-amber-500"></div>

                {showImage && (
                    <div className="relative mb-4 h-36 w-28 overflow-hidden rounded-lg shadow-sm ring-2 ring-amber-100 dark:ring-amber-900/40">
                        <img
                            src={imageSrc}
                            alt={nama}
                            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}

                <div className="w-full">
                    <div className="flex h-[48px] items-center justify-center">
                        <p className="line-clamp-2 text-center text-sm font-semibold lg:text-sm">{nama}</p>
                    </div>

                    <div className="mt-1 flex h-[65px] items-start justify-center">
                        <p className="line-clamp-4 text-center text-xs text-amber-700/80 lg:text-sm dark:text-amber-300">{jabatan}</p>
                    </div>
                </div>
            </motion.div>

            {clickable && (
              <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent className="max-h-[90vh] w-[95vw] !max-w-[740px]">
                      <DialogHeader>
                          <DialogTitle className="text-xl">{nama}</DialogTitle>
                          <DialogDescription>{jabatan}</DialogDescription>
                      </DialogHeader>

                      <div className="space-y-5">
                          {showImage && (
                              <div className="flex justify-center">
                                  <div className="overflow-hidden rounded-lg border border-amber-100 p-2">
                                      <img src={imageSrc} alt={nama} className="h-48 object-contain sm:h-72" />
                                  </div>
                              </div>
                          )}

                          <div className="bg-muted/40 rounded-lg p-4">
                              <div className="max-h-[35vh] overflow-y-auto pr-2 sm:max-h-[40vh]">
                                  <p className="text-sm leading-7 whitespace-pre-line">{deskripsi}</p>
                              </div>
                          </div>
                      </div>
                  </DialogContent>
              </Dialog>

            )}
        </>
    );
};

/* ===============================
   SECTION WRAPPER
================================= */

interface SectionProps {
    title: string;
    data: Pejabat[];
    cols?: string;
    center?: boolean;
    showImage?: boolean;
    clickable?: boolean;
}

const Section: React.FC<SectionProps> = ({
    title,
    data,
    cols = 'lg:grid-cols-4',
    center = false,
    showImage = true,
    clickable = true,
}) => {
    if (!data || data.length === 0) return null;

    return (
        <section className="space-y-8">
            <div className="text-center">
                <h2 className="relative inline-block text-xl font-bold">{title}</h2>
                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
            </div>

            {center ? (
                <div className="flex flex-wrap justify-center gap-8">
                    {data.map((item, index) => (
                        <PejabatCard
                            key={index}
                            nama={item.nama}
                            jabatan={item.jabatan}
                            foto={item.foto}
                            showImage={showImage}
                            deskripsi={item.deskripsi}
                            clickable={clickable}
                        />
                    ))}
                </div>
            ) : (
                // <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-8`}>
                <div className={`grid ${cols} gap-8`}>
                    {data.map((item, index) => (
                        <PejabatCard
                            key={index}
                            nama={item.nama}
                            jabatan={item.jabatan}
                            foto={item.foto}
                            showImage={showImage}
                            deskripsi={item.deskripsi}
                            clickable={clickable}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

/* ===============================
   PAGE
================================= */

const PejabatStruktural: PageWithLayout<Props> = ({
    sekretarisJenderals,
    kepalaBiroLpsks,
    kepalaBagianLpsks,
    kepalaPerwakilanLpskDaerahs,
    tenagaAhliLpsks,
}) => {
    return (
        <>
            <Head title="Pejabat Struktural - LPSK" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Profil / <span className="font-semibold">Pejabat Struktural</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 shadow-md md:py-8">
                    <div className="container mx-auto px-4">
                        <p className="text-xl font-bold text-white md:text-2xl lg:text-3xl">Pejabat Struktural</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto space-y-14 px-4 py-16">
                    <Section title="Sekretaris Jenderal" data={sekretarisJenderals} center />

                    <Section title="Kepala Biro LPSK" data={kepalaBiroLpsks} cols="grid-cols-2 md:grid-cols-2 lg:grid-cols-4" />

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-7">
                        {/* KIRI - 2 DATA */}
                        <section className="space-y-8 lg:col-span-2">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">Kepala Bagian LPSK</h2>
                                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
                            </div>

                            <div className="grid grid-cols-2 items-stretch gap-6">
                                {kepalaBagianLpsks.map((item, index) => (
                                    <div key={index} className={kepalaBagianLpsks.length === 1 ? 'col-span-2 flex justify-center' : 'h-full'}>
                                        <div className={kepalaBagianLpsks.length === 1 ? 'w-full max-w-[260px]' : 'h-full'}>
                                            <PejabatCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} deskripsi={item.deskripsi} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* KANAN - 5 DATA */}
                        <section className="space-y-8 lg:col-span-5">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">Kepala Perwakilan LPSK Daerah</h2>
                                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
                            </div>

                            <div className="grid grid-cols-2 items-stretch gap-6 md:grid-cols-3 lg:grid-cols-5">
                                {kepalaPerwakilanLpskDaerahs.map((item, index) => {
                                    const isLastSingleMobile =
                                        kepalaPerwakilanLpskDaerahs.length % 2 === 1 && index === kepalaPerwakilanLpskDaerahs.length - 1;

                                    const remainingMd = kepalaPerwakilanLpskDaerahs.length % 3;

                                    const isLastTwoMd = remainingMd === 2 && index >= kepalaPerwakilanLpskDaerahs.length - 2;

                                    return (
                                        <div
                                            key={index}
                                            className={[
                                                'h-full',
                                                isLastSingleMobile ? 'col-span-2 justify-self-center' : '',
                                                isLastTwoMd ? 'md:col-span-1' : '',
                                            ].join(' ')}
                                        >
                                            <PejabatCard nama={item.nama} jabatan={item.jabatan} foto={item.foto} deskripsi={item.deskripsi} />
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </div>

                    {/* Khusus Tenaga Ahli → TANPA FOTO */}
                    <Section title="Tenaga Ahli LPSK" data={tenagaAhliLpsks} cols="grid-cols-2 md:grid-cols-2 lg:grid-cols-4" showImage={false} clickable={false}/>
                </div>
            </div>
        </>
    );
};

PejabatStruktural.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default PejabatStruktural;
