import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface FungsiItem {
    id: number;
    kategori: string;
    judul: string | null;
    deskripsi: string;
    gambar: string | null;
}

interface Props {
    fungsis: FungsiItem[];
}

const Fungsi: PageWithLayout<Props> = ({ fungsis }) => {
    return (
        <>
            <Head title="Fungsi - LPSK" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Tugas & Fungsi / <span className="font-semibold">Fungsi</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
                    <div className="container mx-auto px-4">
                        <p className="text-2xl font-bold text-white md:text-3xl">FUNGSI</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-wrap justify-center gap-6">
                        {fungsis.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="relative flex w-full items-center justify-center overflow-hidden rounded-2xl border border-amber-800/50 p-6 text-center shadow-md transition-all duration-300 hover:shadow-amber-900/50 md:basis-[calc(50%-12px)] md:p-8 lg:max-w-[calc(33.333%-16px)] lg:basis-[calc(33.333%-16px)] dark:shadow-amber-900/30"
                            >
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300"></div>

                                <p className="text-justify text-sm leading-relaxed md:text-base">{item.deskripsi}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

Fungsi.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Fungsi;
