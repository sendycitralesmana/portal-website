import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FileText } from 'lucide-react';

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
    file: string | null;
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
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                }}
                                whileHover={{ y: -6 }}
                                className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-amber-800/50 p-6 shadow-md transition-all duration-300 hover:shadow-amber-900/50 md:basis-[calc(50%-12px)] md:p-8 lg:max-w-[calc(33.333%-16px)] lg:basis-[calc(33.333%-16px)] dark:shadow-amber-900/30"
                            >
                                {/* Top accent */}
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300" />

                                {/* Deskripsi */}
                                <p className="text-justify text-sm leading-relaxed md:text-base">{item.deskripsi}</p>

                                {/* PDF */}
                                {item.file && (
                                    <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button
                                                    type="button"
                                                    className="group mx-auto flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-600 transition-all duration-300 hover:border-red-300 hover:bg-red-100 hover:shadow-md dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40"
                                                    title="Lihat dokumen PDF"
                                                >
                                                    <FileText className="size-6 transition-transform duration-300 group-hover:scale-110" />

                                                    <span className="text-sm font-semibold cursor-pointer">Lihat</span>
                                                </button>
                                            </DialogTrigger>

                                            <DialogContent className="!h-[95vh] !w-[95vw] !max-w-[95vw] overflow-hidden p-3 sm:!max-w-[95vw] sm:p-4">
                                                <div className="flex h-full min-h-0 flex-col">
                                                    <div className="mb-3 flex shrink-0 items-center gap-2">
                                                        <FileText className="size-5 text-red-600" />

                                                        <h3 className="font-semibold">Dokumen PDF</h3>
                                                    </div>

                                                    <iframe
                                                        src={item.file}
                                                        title={`Preview PDF ${item.id}`}
                                                        className="min-h-0 w-full flex-1 rounded-lg border"
                                                    />
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
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
