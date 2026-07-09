import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
    showImage?: boolean;
}> = ({ nama, jabatan, foto, showImage = true }) => {
    const imageSrc = foto ?? '/images/logo-baru.png';

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col items-center rounded-xl border border-amber-100 p-6 text-center shadow-md transition-all duration-300 hover:shadow-xl dark:border-amber-900/40 dark:shadow-amber-900/30"
        >
            <div className="absolute top-0 left-0 h-1 w-full rounded-t-xl bg-gradient-to-r from-amber-800 to-amber-500"></div>

            {showImage && (
                <div className="relative mb-4 h-36 w-28 overflow-hidden rounded-lg shadow-sm ring-2 ring-amber-100 dark:ring-amber-900/40">
                    <img src={imageSrc} alt={nama} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
                </div>
            )}

            <p className="text-sm font-semibold">{nama}</p>

            <p className="mt-1 text-xs text-amber-700/80 dark:text-amber-300">{jabatan}</p>
        </motion.div>
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
}

const Section: React.FC<SectionProps> = ({ title, data, cols = 'lg:grid-cols-4', center = false, showImage = true }) => {
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
                        <PejabatCard key={index} nama={item.nama} jabatan={item.jabatan} foto={item.foto} showImage={showImage} />
                    ))}
                </div>
            ) : (
                // <div className={`grid grid-cols-1 md:grid-cols-2 ${cols} gap-8`}>
                <div className={`grid ${cols} gap-8`}>
                    {data.map((item, index) => (
                        <PejabatCard key={index} nama={item.nama} jabatan={item.jabatan} foto={item.foto} showImage={showImage} />
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
                <div className="container mx-auto space-y-24 px-4 py-16">
                    <Section title="Sekretaris Jenderal" data={sekretarisJenderals} center />

                    <Section title="Kepala Biro LPSK" data={kepalaBiroLpsks} cols="grid-cols-2 md:grid-cols-3 lg:grid-cols-4" />

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-7">
                        {/* KIRI - 2 DATA */}
                        <section className="space-y-8 lg:col-span-2">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">Kepala Bagian LPSK</h2>
                                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {kepalaBagianLpsks.map((item, index) => (
                                    <PejabatCard key={index} nama={item.nama} jabatan={item.jabatan} foto={item.foto} />
                                ))}
                            </div>
                        </section>

                        {/* KANAN - 5 DATA */}
                        <section className="space-y-8 lg:col-span-5">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">Kepala Perwakilan LPSK Daerah</h2>
                                <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-amber-800 to-amber-500"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
                                {kepalaPerwakilanLpskDaerahs.map((item, index) => (
                                    <PejabatCard key={index} nama={item.nama} jabatan={item.jabatan} foto={item.foto} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Khusus Tenaga Ahli → TANPA FOTO */}
                    <Section title="Tenaga Ahli LPSK" data={tenagaAhliLpsks} cols="grid-cols-2 md:grid-cols-2 lg:grid-cols-3" showImage={false} />
                </div>
            </div>
        </>
    );
};

PejabatStruktural.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default PejabatStruktural;
