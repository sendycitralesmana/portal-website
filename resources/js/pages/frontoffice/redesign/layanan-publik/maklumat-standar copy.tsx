import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
                    <div className="flex flex-wrap justify-center gap-6">
                        
                    </div>
                </div>
            </div>
        </>
    );
};

MaklumatStandar.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default MaklumatStandar;
