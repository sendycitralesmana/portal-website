'use client';

import { ModeToggle } from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import { ChevronDown, LoaderCircle, Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type PublikasiResult = {
    id: number;
    judul: string;
    slug: string;
    kategori: string;
};

type MenuItem = {
    label: string;
    href: string;
    external?: boolean;
};

const menus = ['Beranda', 'Layanan dan Informasi', 'Profil', 'Tugas dan Fungsi', 'Publikasi'];

/* ================= SUB MENU ================= */

const layananInformasiMenuItems: MenuItem[] = [
    {
        label: 'SIMPUSAKA',
        href: 'https://simpusaka.lpsk.go.id/layanan_simpusaka/',
        external: true,
    },
    {
        label: 'PPID',
        href: 'https://eppid.lpsk.go.id/',
        external: true,
    },
    {
        label: 'JDIH',
        href: 'https://jdih.lpsk.go.id/',
        external: true,
    },
    {
        label: 'FONDASI',
        href: 'https://limo.lpsk.go.id/apps/forms/s/oj7jdZAwAZ3z89aHCrdZNsEt',
        external: true,
    },
    {
        label: 'OPERA',
        href: 'https://hukum.lpsk.go.id/',
        external: true,
    },
    {
        label: 'LENTERA',
        href: 'https://e-learning.lpsk.go.id/',
        external: true,
    },
    {
        label: 'SSK',
        href: 'https://ssk.lpsk.go.id/',
        external: true,
    },
];

const profilMenuItems: MenuItem[] = [
    { label: 'Visi dan Misi', href: '/profil/visi-misi' },
    { label: 'Profil Pimpinan', href: '/profil/profil-pimpinan' },
    { label: 'Struktur Organisasi', href: '/profil/struktur-organisasi' },
    { label: 'Pejabat Struktural', href: '/profil/pejabat-struktural' },
    { label: 'Perwakilan Daerah', href: '/profil/perwakilan-daerah' },
];

const tugasFungsiMenuItems: MenuItem[] = [
    { label: 'Tugas', href: '/tugas-fungsi/tugas' },
    { label: 'Fungsi', href: '/tugas-fungsi/fungsi' },
    { label: 'Kewenangan', href: '/tugas-fungsi/kewenangan' },
    { label: 'Subjek Pelindungan', href: '/tugas-fungsi/subjek-pelindungan' },
    // { label: 'Tindak Pidana Prioritas', href: '/tugas-fungsi/tindak-pidana-prioritas' },
    { label: 'Tingkat Keseriusan Tindak Pidana', href: '/tugas-fungsi/tingkat-keseriusan-tindak-pidana' },
    { label: 'Program Pelindungan', href: '/tugas-fungsi/program-pelindungan' },
];

const publikasiMenuItems: MenuItem[] = [
    { label: 'Siaran Pers', href: '/publikasi/siaran-pers' },
    { label: 'Sosial Media', href: '/sosial-media' },
    { label: 'Berita Foto', href: '/berita-foto' },
    { label: 'Berita', href: '/publikasi/berita' },
    { label: 'Pengumuman', href: '/publikasi/pengumuman' },
    { label: 'Laporan', href: '/publikasi/laporan' },
    { label: 'Kajian dan Jurnal', href: '/publikasi/kajian-jurnal' },
    { label: 'Buku', href: '/publikasi/buku' },
    { label: 'Statistik', href: '/statistik' },
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

    const isHome = url === '/' || url === '/beranda';

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

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<PublikasiResult[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [searching, setSearching] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const keyword = search.trim();

        if (keyword.length < 3) {
            setSearchResults([]);
            setSearching(false);
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setSearching(true);

                const { data } = await axios.get(route('redesign.cari'), {
                    params: {
                        search: keyword,
                    },
                });

                setSearchResults(data);
            } catch (error) {
                console.error(error);
            } finally {
                setSearching(false);
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
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
                    <div className="relative flex h-20 items-center">
                        {/* LOGO */}
                        <div className="shrink-0">
                            <Link href="/beranda" className="flex items-center">
                                <img src="/images/logo-baru.png" alt="LPSK Logo" className="h-14 w-auto object-contain" />
                            </Link>
                        </div>

                        {/* DESKTOP MENU */}
                        <nav className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center gap-14 font-bold xl:flex">
                            {menus.map((menu) =>
                                menu === 'Beranda' ? (
                                    <Link
                                        key={menu}
                                        href="/beranda"
                                        onClick={closeMenu}
                                        className={cn(
                                            'flex h-full items-center border-transparent uppercase transition-colors duration-200 hover:border-amber-500 hover:text-amber-500',
                                            isTransparent ? 'text-slate-200' : 'text-slate-800 dark:text-slate-200',
                                        )}
                                    >
                                        {menu}
                                    </Link>
                                ) : (
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
                                ),
                            )}
                        </nav>

                        {/* RIGHT SECTION */}
                        <div className="ml-auto hidden items-center gap-4 xl:flex">
                            <div className="relative" ref={searchRef}>
                                <div className="relative">
                                    <Search
                                        size={16}
                                        className={cn(
                                            'absolute top-1/2 left-3 z-10 -translate-y-1/2 transition-all duration-300',
                                            isTransparent ? 'text-slate-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]' : 'text-muted-foreground',
                                        )}
                                    />

                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onFocus={() => setShowSearch(true)}
                                        placeholder="Cari publikasi..."
                                        className={cn(
                                            'w-[280px] rounded-full border py-2 pr-4 pl-9 text-sm transition-all duration-300 focus:ring-2 focus:ring-amber-500 focus:outline-none',
                                            isTransparent
                                                ? 'border-white/20 bg-white/10 text-slate-200 placeholder-white/70 backdrop-blur-md'
                                                : 'bg-muted border-border text-slate-900 dark:text-slate-200',
                                        )}
                                    />
                                </div>

                                {showSearch && search.trim().length >= 3 && (
                                    <div className="bg-background border-border absolute top-full right-0 mt-3 w-[800px] overflow-hidden rounded-2xl border shadow-2xl">
                                        <div className="border-b bg-gradient-to-r from-red-900 to-red-700 px-5 py-3 text-sm font-bold text-slate-200">
                                            Hasil Pencarian
                                        </div>

                                        <div className="max-h-[500px] overflow-y-auto">
                                            {searching ? (
                                                <div className="flex items-center justify-center gap-2 p-8 text-sm text-slate-500">
                                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                                    Mencari...
                                                </div>
                                            ) : searchResults.length > 0 ? (
                                                searchResults.map((item) => (
                                                    <Link
                                                        key={item.id}
                                                        href={`/publikasi/${item.kategori}/${item.slug}`}
                                                        onClick={() => {
                                                            setShowSearch(false);
                                                            setSearch('');
                                                        }}
                                                        className="hover:bg-muted/50 block border-b px-5 py-4 transition"
                                                    >
                                                        <div className="mb-1 text-xs font-semibold text-amber-600 uppercase">
                                                            {item.kategori.replaceAll('-', ' ')}
                                                        </div>

                                                        <div className="line-clamp-2 text-sm font-bold text-slate-700 dark:text-slate-200">
                                                            {item.judul}
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="p-8 text-center text-sm text-slate-500">Tidak ditemukan hasil.</div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <ModeToggle transparent={isTransparent} />
                        </div>

                        {/* MOBILE ACTION */}
                        <div className="ml-auto flex items-center gap-2 xl:hidden">
                            <button onClick={() => setMobileSearchOpen(true)} className="p-2">
                                <Search size={22} />
                            </button>

                            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2">
                                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
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
                                        <img src="/images/logo-baru.png" alt="Logo" className="w-full object-contain p-4" />
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

            {mobileSearchOpen && (
                <div className="bg-background fixed inset-0 z-[999] flex flex-col">
                    {/* Header */}
                    <div className="border-border flex h-20 shrink-0 items-center gap-3 border-b px-4">
                        <button onClick={() => setMobileSearchOpen(false)} className="shrink-0">
                            <X size={24} />
                        </button>

                        <div className="relative flex-1">
                            <Search size={18} className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2" />

                            <input
                                autoFocus
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari publikasi..."
                                className="bg-background border-border w-full rounded-full border py-2.5 pr-4 pl-10 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex-1 overflow-y-auto px-4 pb-6">
                        {search.length > 0 && (
                            <>
                                <div className="border-border border-b py-3 text-xs font-bold text-slate-500 uppercase">Hasil Pencarian</div>

                                {searching ? (
                                    <div className="flex items-center justify-center gap-2 py-10 text-sm text-slate-500">
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                        Mencari...
                                    </div>
                                ) : searchResults.length > 0 ? (
                                    searchResults.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/publikasi/${item.kategori}/${item.slug}`}
                                            onClick={() => {
                                                setMobileSearchOpen(false);
                                                setSearch('');
                                            }}
                                            className="hover:bg-muted/50 block border-b py-4"
                                        >
                                            <div className="mb-1 text-xs font-semibold text-amber-600 uppercase">
                                                {item.kategori.replaceAll('-', ' ')}
                                            </div>

                                            <div className="text-sm font-bold">{item.judul}</div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-6 text-center text-sm text-slate-500">Tidak ditemukan hasil.</div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="bg-background border-border fixed top-20 right-0 left-0 z-40 border-t shadow-lg xl:hidden">
                    {/* TOP SECTION (Search + ID + ModeToggle - Sejajar) */}
                    <div className="border-border bg-muted/40 border-b px-4 py-4">
                        <div className="flex items-center gap-3">
                            {/* Search */}
                            <div className="relative flex-1">
                            </div>

                            {/* Mode Toggle */}
                            <div className="shrink-0">
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                    {/* MENU LIST */}
                    {menus.map((menu) => {
                        if (menu === 'Beranda') {
                            return (
                                <div key={menu} className="border-border border-b">
                                    <Link href="/beranda" className="block px-6 py-4 font-bold" onClick={() => setMobileOpen(false)}>
                                        {menu}
                                    </Link>
                                </div>
                            );
                        }

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
