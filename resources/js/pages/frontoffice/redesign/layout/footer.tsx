import { ChevronRight, Mail, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TentangKami {
    id: number;
    alamat: string;
    telepon: string;
    hotline: string;
    whatsapp: string;
    email: string;
    jam_operasional: string;
    latitude: string;
    longitude: string;
    gambar: string | null;
}

export default function Footer() {
    const [data, setData] = useState<TentangKami | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/backoffice/tentang-kami/api');
                if (!res.ok) throw new Error('Failed to fetch data');
                const json: TentangKami = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <footer className="bg-gradient-to-r from-zinc-900 to-zinc-700 text-white">
            {/* Top Footer */}
            <div className="container mx-auto px-6 py-8 xl:px-0">
                <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-12">
                    {/* Address */}
                    <div className="xl:col-span-5">
                        <h5 className="mb-4 text-xl font-semibold">Lembaga Perlindungan Saksi dan Korban</h5>
                        {loading ? (
                            <div className="space-y-2">
                                <div className="h-4 w-full max-w-[250px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                                <div className="h-4 w-full max-w-[300px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                                <div className="h-4 w-full max-w-[200px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                            </div>
                        ) : (
                            <p className="text-sm leading-relaxed break-words whitespace-pre-line text-zinc-300">{data?.alamat}</p>
                        )}
                    </div>

                    {/* Hubungi Kami */}
                    <div className="xl:col-span-4">
                        <h5 className="mb-4 text-xl font-semibold">Hubungi Kami</h5>
                        <div className="grid grid-cols-1 gap-y-4 text-sm text-zinc-300 sm:grid-cols-2">
                            {loading ? (
                                <>
                                    <div className="h-4 w-full max-w-[150px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                                    <div className="h-4 w-full max-w-[150px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                                    <div className="h-4 w-full max-w-[150px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2">
                                        <Phone size={16} /> Hotline {data?.hotline}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <img src="/images/wa_icon.png" alt="WhatsApp" className="h-5 w-5 object-contain" />
                                        Whatsapp {data?.whatsapp}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} /> Email {data?.email}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Artikel GPR */}
                    <div className="xl:col-span-3">
                        <h5 className="mb-4 text-xl font-semibold">Artikel GPR</h5>
                        {loading ? (
                            <div className="space-y-2">
                                <div className="h-4 w-full max-w-[180px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                                <div className="h-4 w-full max-w-[250px] animate-pulse rounded bg-gradient-to-r from-zinc-700 to-zinc-600"></div>
                            </div>
                        ) : (
                            <>
                                <p className="mb-4 text-sm text-zinc-300">Informasi dan artikel terbaru Humas Pemerintahan.</p>
                                <a href="/gpr" className="inline-flex items-center gap-2 text-sm font-medium transition hover:text-blue-400">
                                    Selengkapnya
                                    <ChevronRight size={16} />
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t-2 border-amber-400 bg-gradient-to-r from-red-900 to-red-600">
                <div className="container mx-auto flex flex-col items-start justify-between gap-4 px-6 py-6 text-sm text-white md:flex-row md:items-center xl:px-0">
                    <div>© Copyright Lembaga Perlindungan Saksi dan Korban {new Date().getFullYear()}</div>
                    <div>{/* Optional right content */}</div>
                </div>
            </div>
        </footer>
    );
}
