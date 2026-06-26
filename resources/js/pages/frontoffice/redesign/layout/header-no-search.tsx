'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type MenuItem = {
    label: string;
    href: string;
    external?: boolean;
};

const menus = ['Layanan dan Informasi', 'Profil', 'Tugas dan Fungsi', 'Publikasi'];

/* ================= SUB MENU ================= */

const layananInformasiMenuItems: MenuItem[] = [
    {
        label: 'JDIH',
        href: 'https://jdih.lpsk.go.id/',
        external: true,
    },
    {
        label: 'PPID',
        href: 'https://eppid.lpsk.go.id/',
        external: true,
    },
    {
        label: 'SSK',
        href: 'https://ssk.lpsk.go.id/',
        external: true,
    },
    {
        label: 'FONDASI',
        href: 'https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt',
        external: true,
    },
    {
        label: 'Permohonan Perlindungan (SIMPUSAKA)',
        href: 'https://simpusaka.lpsk.go.id/layanan_simpusaka/',
        external: true,
    },
    {
        label: 'OPERA',
        href: 'https://hukum.lpsk.go.id/',
        external: true,
    },
    // {
    //     label: 'Pengaduan Masyarakat',
    //     href: 'https://www.lapor.go.id/',
    //     external: true,
    // },
];

const profilMenuItems: MenuItem[] = [
    { label: 'Visi dan Misi', href: '/redesign/profil/visi-misi' },
    { label: 'Profil Pimpinan', href: '/redesign/profil/profil-pimpinan' },
    { label: 'Struktur Organisasi', href: '/redesign/profil/struktur-organisasi' },
    { label: 'Pejabat Struktural', href: '/redesign/profil/pejabat-struktural' },
    { label: 'Perwakilan Daerah', href: '/redesign/profil/perwakilan-daerah' },
];

const tugasFungsiMenuItems: MenuItem[] = [
    { label: 'Kewenangan', href: '/redesign/tugas-fungsi/kewenangan' },
    { label: 'Subjek Pelindungan', href: '/redesign/tugas-fungsi/subjek-pelindungan' },
    { label: 'Tindak Pidana Prioritas', href: '/redesign/tugas-fungsi/tindak-pidana-prioritas' },
    { label: 'Program Pelindungan', href: '/redesign/tugas-fungsi/program-pelindungan' },
];

const publikasiMenuItems: MenuItem[] = [
    { label: 'Siaran Pers', href: '/redesign/publikasi/siaran-pers' },
    { label: 'Sosial Media', href: '/redesign/sosial-media' },
    { label: 'Berita Kegiatan', href: '/redesign/publikasi/berita-kegiatan' },
    { label: 'Berita Foto', href: '/redesign/berita-foto' },
    { label: 'Berita', href: '/redesign/publikasi/berita' },
    { label: 'Pengumuman', href: '/redesign/publikasi/pengumuman' },
    { label: 'Laporan', href: '/redesign/publikasi/laporan' },
    { label: 'Kajian dan Jurnal', href: '/redesign/publikasi/kajian-jurnal' },
    { label: 'Buku', href: '/redesign/publikasi/buku' },
    { label: 'Statistik', href: '/redesign/statistik' },
];

export default function Header() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileActive, setMobileActive] = useState<string | null>(null);

    const { url } = usePage();

    const toggleMenu = (menu: string) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };

    const closeMenu = () => setActiveMenu(null);

    const isHome = url === '/' || url === '/redesign/beranda';

    const getMenuItems = (): MenuItem[] => {
        switch (activeMenu) {
            case 'Layanan dan Informasi':
                return layananInformasiMenuItems;
            case 'Profil':
                return profilMenuItems;
            case 'Tugas dan Fungsi':
                return tugasFungsiMenuItems;
            case 'Publikasi':
                return publikasiMenuItems;
            default:
                return [];
        }
    };
    const [scrolled, setScrolled] = useState(false);
    const isTransparent = isHome && !scrolled;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 right-0 left-0 z-50 border-b transition-all duration-300 ${
                    isHome
                        ? scrolled
                            ? 'border-border bg-white/80 text-slate-700 shadow-sm backdrop-blur-md dark:bg-slate-900/80 dark:text-slate-200'
                            : 'border-transparent bg-transparent text-slate-200'
                        : 'border-border bg-white/80 text-slate-700 shadow-sm backdrop-blur-md dark:bg-slate-900/80 dark:text-slate-200'
                }`}
            >
                <div className="mx-auto px-6 md:pl-16 lg:pl-24">
                    <div className="flex h-20 items-center justify-between">
                        {/* LOGO */}
                        <Link href="/redesign/beranda" className="flex items-center">
                            <img src="/images/logo-lg.png" alt="LPSK Logo" className="h-14 w-auto object-contain" />
                        </Link>

                        {/* DESKTOP MENU */}
                        <nav className="hidden h-full items-center gap-14 font-bold lg:flex">
                            {menus.map((menu) => (
                                <button
                                    key={menu}
                                    onClick={() => toggleMenu(menu)}
                                    className={cn(
                                        'flex h-full cursor-pointer items-center border-b-2 uppercase transition-colors duration-200',
                                        isTransparent ? 'text-slate-200' : 'text-slate-800 dark:text-slate-200',
                                        activeMenu === menu ? 'border-amber-500 text-amber-500' : 'border-transparent hover:text-amber-500',
                                    )}
                                >
                                    {menu}
                                </button>
                            ))}
                        </nav>

                        {/* RIGHT SECTION */}
                        <div className="hidden items-center gap-4 lg:flex">
                            <div className="relative">
                                <div className="relative">
                                    <Search
                                        size={16}
                                        className={cn(
                                            'absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-all duration-300',
                                            isTransparent ? 'text-slate-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]' : 'text-muted-foreground',
                                        )}
                                    />

                                    <input
                                        className={cn(
                                            'rounded-full border py-1.5 pr-4 pl-9 text-sm transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:outline-none',
                                            isTransparent
                                                ? 'border-white/20 bg-white/10 text-slate-200 placeholder-white/70 backdrop-blur-md'
                                                : 'bg-muted border-border text-slate-700 dark:text-slate-200',
                                        )}
                                        placeholder="Cari..."
                                    />
                                </div>
                            </div>

                            {/* <div className="w-8 h-8 bg-red-700 text-slate-200 rounded-full flex items-center justify-center text-xs font-medium border-amber-400 border-2">
                ID
              </div> */}

                            {/* <ModeToggle /> */}
                            <ModeToggle transparent={isTransparent} />
                        </div>

                        {/* MOBILE HAMBURGER */}
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 lg:hidden">
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* DESKTOP MEGA MENU */}
                {activeMenu && (
                    <div className="absolute top-20 right-0 left-0 flex hidden justify-center text-slate-700 md:flex dark:text-slate-200">
                        <div className="bg-background border-border w-full max-w-7xl overflow-hidden rounded-b-2xl border shadow-xl">
                            <div className="flex items-center justify-between border-b-2 border-amber-400 bg-gradient-to-r from-red-900 to-red-700 px-6 py-3 text-slate-200">
                                <span className="text-sm font-bold">{activeMenu}</span>
                                <button className="cursor-pointer rounded-2xl border-2 border-amber-400" onClick={closeMenu}>
                                    <X size={16} />
                                </button>
                            </div>

                            <div className="grid h-[420px] grid-cols-4">
                                <div className="bg-muted/60 border-border col-span-1 border-r p-6">
                                    <div className="mb-5 rounded-2xl border-2 border-amber-400 bg-gradient-to-l from-red-900 to-red-700">
                                        <img src="/images/logo-lg.png" alt="Logo" className="w-full object-contain p-4" />
                                    </div>

                                    <p className="text-sm leading-relaxed font-bold">
                                        Informasi lengkap terkait {activeMenu?.toLowerCase()} tersedia pada menu di samping.
                                    </p>
                                </div>

                                <div className="bg-muted border-border col-span-1 overflow-y-auto border-r">
                                    {getMenuItems().map((item, index) =>
                                        item.external ? (
                                            <a
                                                key={index}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={closeMenu}
                                                className="border-border block border-b px-6 py-4 text-sm font-bold transition hover:bg-amber-50 dark:hover:bg-amber-600"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link
                                                key={index}
                                                href={item.href}
                                                onClick={closeMenu}
                                                className="border-border block border-b px-6 py-4 text-sm font-bold transition hover:bg-amber-50 dark:hover:bg-amber-600"
                                            >
                                                {item.label}
                                            </Link>
                                        ),
                                    )}
                                </div>

                                <div className="bg-background col-span-2 p-6" />
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="bg-background border-border fixed top-20 right-0 left-0 z-40 border-t shadow-lg lg:hidden">
                    {/* TOP SECTION (Search + ID + ModeToggle - Sejajar) */}
                    <div className="border-border bg-muted/40 border-b px-4 py-4">
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search size={16} className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />
                                <input
                                    placeholder="Cari..."
                                    className="bg-background border-border w-full rounded-full border py-2 pr-3 pl-9 text-sm transition focus:ring-2 focus:ring-red-500 focus:outline-none"
                                />
                            </div>

                            {/* ID */}
                            {/* <div className="w-9 h-9 bg-red-900 text-slate-200 rounded-full flex items-center justify-center text-xs font-medium shrink-0">
                ID
              </div> */}

                            {/* Mode Toggle */}
                            <div className="shrink-0">
                                <ModeToggle />
                            </div>
                        </div>
                    </div>

                    {/* MENU LIST */}
                    {menus.map((menu) => {
                        const items =
                            menu === 'Layanan dan Informasi'
                                ? layananInformasiMenuItems
                                : menu === 'Profil'
                                  ? profilMenuItems
                                  : menu === 'Tugas dan Fungsi'
                                    ? tugasFungsiMenuItems
                                    : menu === 'Publikasi'
                                      ? publikasiMenuItems
                                      : [];

                        const isOpen = mobileActive === menu;

                        return (
                            <div key={menu} className="border-border border-b">
                                <button
                                    onClick={() => setMobileActive(isOpen ? null : menu)}
                                    className="flex w-full items-center justify-between px-6 py-4 font-bold"
                                >
                                    {menu}

                                    <ChevronDown size={18} className={cn('transition-transform duration-300', isOpen && 'rotate-180')} />
                                </button>

                                {isOpen && (
                                    <div className="bg-muted/40">
                                        {items.map((item, index) =>
                                            item.external ? (
                                                <a
                                                    key={index}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="border-border block border-t px-8 py-3 text-sm"
                                                >
                                                    {item.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    className="border-border block border-t px-8 py-3 text-sm"
                                                    onClick={() => setMobileOpen(false)}
                                                >
                                                    {item.label}
                                                </Link>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* <div className="h-20" /> */}
            {!isHome && <div className="h-20" />}
        </>
    );
}
