import { Head } from '@inertiajs/react';
import { Download, Eye, FileText } from 'lucide-react';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface MaklumatStandarItem {
    id: number;
    judul: string | null;
    deskripsi: string;
    file: string | null;
}

interface Props {
    maklumatStandars: MaklumatStandarItem[];
}

const MaklumatStandar: PageWithLayout<Props> = ({ maklumatStandars }) => {
    return (
        <>
            <Head title="Maklumat dan Standar Pelayanan Publik - LPSK" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Layanan Publik / <span className="font-semibold">Maklumat dan Standar Pelayanan Publik</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 py-8 shadow-lg">
                    <div className="container mx-auto px-4">
                        <p className="text-2xl font-bold text-white md:text-3xl">MAKLUMAT DAN STANDAR PELAYANAN PUBLIK</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="mx-auto max-w-5xl">
                        {/* Card Wrapper */}
                        <div className="dark:bg-muted overflow-hidden rounded-2xl border border-gray-200 bg-[#eee] p-5 shadow-md md:p-6 dark:border-slate-700">
                            <div className="flex flex-col gap-5">
                                {maklumatStandars.length > 0 ? (
                                    maklumatStandars.map((item, index) => (
                                        <div
                                            key={item.id}
                                            className={`flex flex-col gap-5 rounded-xl border-2 border-amber-300 bg-white p-5 shadow-sm transition-all duration-300 hover:border-amber-400 hover:shadow-md md:flex-row md:items-center md:justify-between md:px-6 dark:border-red-800 dark:bg-slate-900 ${
                                                index !== maklumatStandars.length - 1 ? '' : ''
                                            }`}
                                        >
                                            {/* Informasi File */}
                                            <div className="flex min-w-0 flex-1 items-center gap-4">
                                                {/* Icon */}
                                                <div className="flex shrink-0 items-center justify-center">
                                                    <FileText
                                                        className="h-10 w-10 text-red-700 md:h-12 md:w-12 dark:text-red-400"
                                                        strokeWidth={1.8}
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="min-w-0">
                                                    <h3 className="truncate text-base font-bold text-red-800 md:text-lg dark:text-red-400">
                                                        {item.judul ?? 'Tanpa Judul'}
                                                    </h3>

                                                    {item.deskripsi && (
                                                        <p className="mt-1 line-clamp-1 text-sm text-gray-600 dark:text-slate-300">
                                                            {item.deskripsi}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Buttons */}
                                            {item.file && (
                                                <div className="flex shrink-0 items-center gap-3">
                                                    {/* Preview */}
                                                    <a
                                                        href={item.file}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-200 hover:text-red-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-red-400"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        Preview
                                                    </a>

                                                    {/* Download */}
                                                    <a
                                                        href={item.file}
                                                        download
                                                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-red-800 dark:bg-red-700 dark:hover:bg-red-600"
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        Download
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl border border-dashed border-gray-300 bg-white py-16 text-center dark:border-slate-600 dark:bg-slate-900">
                                        <FileText className="mx-auto mb-4 h-12 w-12 text-red-700 dark:text-red-400" />

                                        <p className="text-sm text-gray-600 dark:text-slate-400">Belum ada dokumen yang tersedia.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

MaklumatStandar.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default MaklumatStandar;
