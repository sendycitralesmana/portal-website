import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface KewenanganItem {
    id: number;
    kategori: string;
    judul: string | null;
    deskripsi: string;
    gambar: string | null;
}

interface Props {
    kewenangans: KewenanganItem[];
}

const Kewenangan: PageWithLayout<Props> = ({ kewenangans }) => {
    return (
        <>
            <Head title="Kewenangan - LPSK" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Tugas & Fungsi / <span className="font-semibold">Kewenangan</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
                    <div className="container mx-auto px-4">
                        <p className="text-2xl font-bold text-white md:text-3xl">KEWENANGAN</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {kewenangans.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ y: -6 }}
                                className="relative overflow-hidden rounded-2xl border border-amber-800/50 p-6 shadow-md transition-all duration-300 hover:shadow-amber-900/50 md:p-8 dark:shadow-amber-900/30"
                            >
                                {/* Accent Line */}
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300"></div>

                                {/* Hanya tampilkan deskripsi */}
                                <p className="text-center text-sm leading-relaxed md:text-base">{item.deskripsi}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
            </div>
        </>
    );
};

Kewenangan.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Kewenangan;
