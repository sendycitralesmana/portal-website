import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

const Tugas: PageWithLayout = () => {
    return (
        <>
            <Head title="Tugas - LPSK" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Tugas & Fungsi / <span className="font-semibold">Tugas</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
                    <div className="container mx-auto px-4">
                        <p className="text-2xl font-bold text-white md:text-3xl">TUGAS</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto flex min-h-[calc(100vh-180px)] items-center justify-center px-4 py-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-amber-200 bg-white px-8 py-14 text-center shadow-2xl"
                    >
                        {/* Background Decoration */}
                        <div className="absolute -top-24 -left-24 h-52 w-52 rounded-full bg-amber-300/20 blur-3xl" />
                        <div className="absolute -right-24 -bottom-24 h-52 w-52 rounded-full bg-red-400/15 blur-3xl" />

                        {/* Animated Icon */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, -5, 5, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="relative z-10 mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-amber-400 to-red-600 text-6xl shadow-xl"
                        >
                            🚧
                        </motion.div>

                        {/* Badge */}
                        <div className="relative z-10 mt-8 inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold tracking-wide text-amber-700">
                            UNDER DEVELOPMENT
                        </div>

                        {/* Title */}
                        <h2 className="relative z-10 mt-5 text-4xl font-bold text-gray-800">Coming Soon</h2>

                        {/* Divider */}
                        <div className="relative z-10 mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-red-700 via-amber-500 to-red-700" />

                        {/* Description */}
                        <p className="relative z-10 mt-6 text-lg leading-8 text-gray-600">
                            Halaman <span className="font-semibold text-red-700">Tugas</span> saat ini masih dalam proses pengembangan.
                        </p>

                        <p className="relative z-10 mt-2 text-gray-500">
                            Kami sedang menyiapkan konten yang lengkap dan informatif agar dapat memberikan layanan informasi terbaik. Silakan
                            kunjungi kembali dalam waktu dekat.
                        </p>

                        {/* Button */}
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            href="/beranda"
                            className="relative z-10 mt-10 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-700 to-red-600 px-7 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
                        >
                            ← Kembali ke Beranda
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

Tugas.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default Tugas;
