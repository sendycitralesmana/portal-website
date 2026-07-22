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
    lokasi: string;
    maps: string;
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
                                        {/* <div className="lg:col-span-4">
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
                                        </div> */}

                                        {/* MAP */}
                                        <div className="lg:col-span-4">
                                            <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-md md:h-[260px] lg:h-[320px] dark:border-slate-800">
                                                <a
                                                    // medan
                                                    // href="https://maps.app.goo.gl/Ap9CuZPZWWm2c3NEA"
                                                    // yogya
                                                    // href="https://maps.app.goo.gl/RZWkDHo4mH62F57EA"
                                                    // jateng
                                                    // href="https://maps.app.goo.gl/ES23qxDV4VYUayA99"
                                                    // jatim
                                                    // href="https://maps.app.goo.gl/FcmhXV8czi4mr1MH9"
                                                    // ntt
                                                    // href="https://maps.app.goo.gl/jgqFV89m6JBDwwg66"

                                                    href={item.lokasi}

                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block h-full w-full"
                                                >
                                                    <iframe
                                                        loading="lazy"
                                                        // medan
                                                        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5323.080816178832!2d98.66975589545282!3d3.579371079812623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313032b935cb77%3A0x8bcba1811c57f9a3!2sGedung%20Keuangan%20Negara%2C%20Jl.%20Pangeran%20Diponegoro%20No.30a%2C%20Madras%20Hulu%2C%20Kec.%20Medan%20Polonia%2C%20Kota%20Medan%2C%20Sumatera%20Utara%2020152!5e0!3m2!1sid!2sid!4v1784688515648!5m2!1sid!2sid"
                                                        // yogya
                                                        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.887420024843!2d110.38082007500515!3d-7.801741992218479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57793d946cfd%3A0x949c12cfaa18b322!2sGedung%20Keuangan%20Negara%20Yogyakarta!5e0!3m2!1sid!2sid!4v1784688863867!5m2!1sid!2sid"
                                                        // jateng
                                                        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.0471139775672!2d110.37695185872192!3d-6.987069099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b00112f5055%3A0xb2d6c3e17134c722!2sPerwakilan%20LPSK%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1784689051053!5m2!1sid!2sid"
                                                        // jatim
                                                        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.9862634697365!2d112.73016297591043!3d-7.242401371137913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f924374caf4f%3A0x4b671b9b04c89622!2sGedung%20Keuangan%20Negara%20I%20Surabaya!5e0!3m2!1sid!2sid!4v1784689405891!5m2!1sid!2sid"
                                                        // ntt
                                                        // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.9460687950605!2d123.59918177595007!3d-10.185035310038405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2c569b5b716ae9c5%3A0xb413c7467768d56c!2sKantor%20Gubernur%20Lama!5e0!3m2!1sid!2sid!4v1784689503465!5m2!1sid!2sid"
                                                        src={item.maps}
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
