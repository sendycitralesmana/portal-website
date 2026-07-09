import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ReactElement, ReactNode } from 'react';
import MainLayout from '../layout/main';

import { Instagram, Mail, MapPin, Music2, Phone, Youtube } from 'lucide-react';

type PageWithLayout<P = {}> = {
    (props: P): ReactElement;
    layout?: (page: ReactElement) => ReactNode;
};

interface Office {
    id: number;
    kantor: string;
    alamat: string;
    telepon: string;
    email: string;
    whatsapp: string;
    twitter: string;
    tiktok: string;
    youtube: string;
    instagram: string;
    gambar: string | null;
    latitude: string;
    longitude: string;
    link: string | null;
}

interface Props {
    perwakilanDaerahs: Office[];
}

/* =============================== PAGE ================================= */

const PerwakilanDaerah: PageWithLayout<Props> = ({ perwakilanDaerahs }) => {
    return (
        <>
            <Head title="Perwakilan Daerah" />

            <div className="min-h-screen">
                {/* Breadcrumb */}
                <div className="border-b-2 border-b-amber-400 bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs text-white md:text-sm">
                    <div className="container mx-auto px-4">
                        Profil / <span className="font-semibold">Perwakilan Daerah</span>
                    </div>
                </div>

                {/* Header */}
                <div className="bg-gradient-to-r from-red-800 to-red-600 py-10 shadow-lg">
                    <div className="container mx-auto px-4">
                        <p className="text-2xl font-bold text-white md:text-3xl">Perwakilan Daerah</p>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto space-y-12 px-4 py-16">
                    {perwakilanDaerahs.map((item, index) => {
                        const lat = parseFloat(item.latitude);
                        const lng = parseFloat(item.longitude);

                        return (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="group relative overflow-hidden rounded-3xl border border-slate-200 shadow-xl transition-all duration-500 hover:shadow-2xl dark:border-slate-800"
                            >
                                {/* Accent Line */}
                                <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-900 via-amber-600 to-amber-400"></div>

                                <div className="space-y-8 p-6 md:p-10">
                                    {/* Title */}
                                    <div>
                                        <p className="text-sm font-semibold tracking-wide text-amber-600 uppercase dark:text-amber-400">
                                            Perwakilan Daerah
                                        </p>
                                        <h3 className="mt-1 text-2xl font-bold md:text-3xl">
                                            {item.link ? (
                                                <a
                                                    href={item.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-800 transition-colors hover:text-amber-600 dark:text-white dark:hover:text-amber-400"
                                                >
                                                    {item.kantor}
                                                </a>
                                            ) : (
                                                <span className="text-slate-800 dark:text-white">{item.kantor}</span>
                                            )}
                                        </h3>
                                        <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-amber-700 to-amber-400"></div>
                                    </div>

                                    {/* GRID */}
                                    <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
                                        {/* FOTO */}
                                        {/* <div className="lg:col-span-4">
                                            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md md:h-[260px] lg:h-[320px] dark:border-slate-800">
                                                <img
                                                    src={item.gambar ?? '/images/logo-baru.png'}
                                                    alt={`Foto ${item.kantor}`}
                                                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                />
                                            </div>
                                        </div> */}

                                        {/* FOTO */}
                                        <div className="lg:col-span-4">
                                            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md md:h-[260px] lg:h-[320px] dark:border-slate-800">
                                                <img
                                                    src={item.gambar ?? '/images/logo-baru.png'}
                                                    alt={`Foto ${item.kantor}`}
                                                    className={`h-full w-full transition-transform duration-500 group-hover:scale-105 ${
                                                        item.gambar ? 'object-cover' : 'object-contain'
                                                    }`}
                                                />
                                            </div>
                                        </div>

                                        {/* INFO */}
                                        <div className="flex flex-col justify-between text-sm text-slate-700 md:text-base lg:col-span-4 dark:text-slate-300">
                                            <div className="space-y-5">
                                                {/* Alamat */}
                                                <div>
                                                    <p className="flex items-center gap-2 text-justify font-semibold text-slate-900 dark:text-white">
                                                        <MapPin className="h-4 w-4 text-red-600" />
                                                        Alamat
                                                    </p>
                                                    <p className="mt-1 leading-relaxed">{item.alamat}</p>
                                                </div>

                                                {/* Sosial Media */}
                                                <div className="space-y-2 text-sm">
                                                    <p className="mb-2 font-semibold text-slate-900 dark:text-white">Sosial Media</p>

                                                    <div className="grid grid-cols-[120px_1fr] gap-y-2">
                                                        {item.email && (
                                                            <>
                                                                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                                                    <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                                    Email
                                                                </span>
                                                                <a
                                                                    href={`mailto:${item.email}`}
                                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                                >
                                                                    {item.email}
                                                                </a>
                                                            </>
                                                        )}

                                                        {item.telepon && (
                                                            <>
                                                                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                                                    <Phone className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                                    Telepon
                                                                </span>
                                                                <a
                                                                    href={`tel:${item.telepon}`}
                                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                                >
                                                                    {item.telepon}
                                                                </a>
                                                            </>
                                                        )}

                                                        {item.whatsapp && (
                                                            <>
                                                                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                                                    {/* <MessageCircle className="h-4 w-4 text-green-600" /> */}
                                                                    <img
                                                                        src="/images/wa_icon.png"
                                                                        alt="WhatsApp"
                                                                        className="h-5 w-5 object-contain"
                                                                    />
                                                                    WhatsApp
                                                                </span>
                                                                <a
                                                                    href={`https://wa.me/${item.whatsapp}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                                >
                                                                    {item.whatsapp}
                                                                </a>
                                                            </>
                                                        )}

                                                        {item.instagram && (
                                                            <>
                                                                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                                                    <Instagram className="h-4 w-4 text-pink-600" />
                                                                    Instagram
                                                                </span>
                                                                <a
                                                                    href={`https://instagram.com/${item.instagram}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                                >
                                                                    @{item.instagram}
                                                                </a>
                                                            </>
                                                        )}

                                                        {item.tiktok && (
                                                            <>
                                                                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                                                    <Music2 className="h-4 w-4 text-black dark:text-white" />
                                                                    TikTok
                                                                </span>
                                                                <a
                                                                    href={`https://tiktok.com/@${item.tiktok}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                                >
                                                                    {item.tiktok}
                                                                </a>
                                                            </>
                                                        )}

                                                        {item.youtube && (
                                                            <>
                                                                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                                                                    <Youtube className="h-4 w-4 text-red-600" />
                                                                    YouTube
                                                                </span>
                                                                <a
                                                                    href={`https://youtube.com/@${item.youtube}`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline dark:text-blue-400"
                                                                >
                                                                    {item.youtube}
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* MAP */}
                                        <div className="lg:col-span-4">
                                            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md md:h-[260px] lg:h-[320px] dark:border-slate-800">
                                                <a
                                                    href={`https://www.google.com/maps?q=${lat},${lng}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block h-full w-full"
                                                >
                                                    <iframe
                                                        loading="lazy"
                                                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.01}%2C${lng + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lng}`}
                                                        className="pointer-events-none h-full w-full border-0"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 hover:bg-black/10" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

PerwakilanDaerah.layout = (page: ReactElement) => <MainLayout>{page}</MainLayout>;

export default PerwakilanDaerah;
