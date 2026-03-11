import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Head } from '@inertiajs/react';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

const statistikData = [
    {
        id: 1,
        judul: 'Statistik Permohonan Perlindungan 2023',
        gambar: "https://quickchart.io/chart?c={type:'bar',data:{labels:['Jan','Feb','Mar','Apr','Mei'],datasets:[{label:'Permohonan',data:[12,19,8,15,10]}]}}",
    },
    {
        id: 2,
        judul: 'Statistik Permohonan Perlindungan 2024',
        gambar: "https://quickchart.io/chart?c={type:'line',data:{labels:['Jan','Feb','Mar','Apr','Mei'],datasets:[{label:'Permohonan',data:[5,9,7,12,14]}]}}",
    },
    {
        id: 3,
        judul: 'Statistik Berdasarkan Jenis Tindak Pidana',
        gambar: "https://quickchart.io/chart?c={type:'pie',data:{labels:['Korupsi','Narkoba','Penipuan','Kekerasan'],datasets:[{data:[30,25,20,25]}]}}",
    },
];

const StatistikPage: PageWithLayout = () => {
    return (
        <>
            <Head title="Statistik">
                <meta name="description" content="Halaman Statistik" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Publikasi / <span className="font-semibold">Statistik</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl leading-snug font-semibold text-white md:text-2xl">Statistik</h2>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {statistikData.map((item) => (
                            <div key={item.id}>
                                {/* Judul Statistik */}
                                <p className="text-lg font-semibold xl:text-xl">{item.judul}</p>

                                {/* Garis pemanis */}
                                <div className="mt-2 mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-amber-700 to-amber-400"></div>

                                {/* Dialog Preview */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="cursor-pointer overflow-hidden rounded-xl shadow-sm transition hover:shadow-md">
                                            <div className="flex h-[220px] w-full items-center justify-center p-3 sm:h-[260px] sm:p-4 md:h-[320px]">
                                                <img
                                                    src={item.gambar}
                                                    alt={item.judul}
                                                    className="max-h-full max-w-full object-contain transition duration-300 hover:scale-105"
                                                />
                                            </div>
                                        </div>
                                    </DialogTrigger>

                                    {/* Dialog Preview Responsive */}
                                    <DialogContent className="w-[95vw] p-3 sm:max-w-3xl sm:p-4 md:max-w-4xl">
                                        <img src={item.gambar} alt={item.judul} className="h-auto w-full object-contain" />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

StatistikPage.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default StatistikPage;
