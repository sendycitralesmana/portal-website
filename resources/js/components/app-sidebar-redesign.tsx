import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link, usePage } from '@inertiajs/react';
import {
    Briefcase,
    Building2,
    ChevronDown,
    ChevronRight,
    Gavel,
    Info,
    LayoutGrid,
    MapPin,
    Network,
    Newspaper,
    Scale,
    Share2,
    Shield,
    ShieldCheck,
    Target,
    User,
    Users,
    Youtube,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogo from './app-logo';
import ModeToggleTabs from './mode-toggle-tabs';

export function AppSidebarRedesign() {
    const { url } = usePage();

    const isBeranda = url.startsWith('/backoffice/beranda');
    const isTentangKami = url.startsWith('/backoffice/tentang-kami');
    const isVideoInfo = url.startsWith('/backoffice/video-info');
    const isSosialMedia = url.startsWith('/backoffice/sosial-media');
    const isLayanan = url.startsWith('/backoffice/layanan');
    const isPublikasi = url.startsWith('/backoffice/publikasi');
    const isPengguna = url.startsWith('/backoffice/pengguna');

    // PROFIL
    const isProfil = url.startsWith('/backoffice/profil');
    const isVisiMisi = url.startsWith('/backoffice/profil/visi-misi');
    const isProfilPimpinan = url.startsWith('/backoffice/profil/profil-pimpinan');
    const isStrukturOrganisasi = url.startsWith('/backoffice/profil/struktur-organisasi');
    const isPejabatStruktural = url.startsWith('/backoffice/profil/pejabat-struktural');
    const isPerwakilanDaerah = url.startsWith('/backoffice/profil/perwakilan-daerah');

    // TUGAS & FUNGSI
    const isTugasFungsi = url.startsWith('/backoffice/tugas-fungsi');
    const isKewenangan = url.startsWith('/backoffice/tugas-fungsi/kewenangan');
    const isSubjekTerlindung = url.startsWith('/backoffice/tugas-fungsi/subjek-terlindung');
    const isTindakPidana = url.startsWith('/backoffice/tugas-fungsi/tindak-pidana-tertentu');
    const isProgramPerlindungan = url.startsWith('/backoffice/tugas-fungsi/program-perlindungan');

    const [dropdownProfilTerbuka, setDropdownProfilTerbuka] = useState(false);
    const [dropdownTugasTerbuka, setDropdownTugasTerbuka] = useState(false);

    useEffect(() => {
        if (isProfil) setDropdownProfilTerbuka(true);
    }, [isProfil]);

    useEffect(() => {
        if (isTugasFungsi) setDropdownTugasTerbuka(true);
    }, [isTugasFungsi]);

    const activeClass = 'bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-md hover:opacity-90';
    const hoverClass = 'hover:bg-muted';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/backoffice/beranda" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <nav className="space-y-1">
                    <hr />

                    <Link
                        href="/backoffice/beranda"
                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                            isBeranda ? activeClass : hoverClass
                        }`}
                    >
                        <LayoutGrid className="h-4 w-4" />
                        <span>Beranda</span>
                    </Link>

                    <Link
                        href="/backoffice/tentang-kami"
                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                            isTentangKami ? activeClass : hoverClass
                        }`}
                    >
                        <Info className="h-4 w-4" />
                        <span>Tentang Kami</span>
                    </Link>

                    <Link
                        href="/backoffice/sosial-media"
                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                            isSosialMedia ? activeClass : hoverClass
                        }`}
                    >
                        <Share2 className="h-4 w-4" />
                        <span>Sosial Media</span>
                    </Link>

                    <Link
                        href="/backoffice/layanan"
                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                            isLayanan ? activeClass : hoverClass
                        }`}
                    >
                        <Briefcase className="h-4 w-4" />
                        <span>Layanan</span>
                    </Link>

                    <Link
                        href="/backoffice/video-info"
                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                            isVideoInfo ? activeClass : hoverClass
                        }`}
                    >
                        <Youtube className="h-4 w-4" />
                        <span>Video Info</span>
                    </Link>

                    <Link
                        href="/backoffice/publikasi"
                        className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                            isPublikasi ? activeClass : hoverClass
                        }`}
                    >
                        <Newspaper className="h-4 w-4" />
                        <span>Publikasi</span>
                    </Link>

                    {/* <Link
            href="/backoffice/pengguna"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
              isPengguna ? activeClass : hoverClass
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Pengguna</span>
          </Link> */}

                    {/* DROPDOWN PROFIL */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setDropdownProfilTerbuka((prev) => !prev)}
                            className={`flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                                isProfil ? activeClass : hoverClass
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Building2 className="h-4 w-4" />
                                <span>Profil</span>
                            </div>
                            {dropdownProfilTerbuka ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {dropdownProfilTerbuka && (
                            <div className="mt-1 ml-6 space-y-1">
                                <Link
                                    href="/backoffice/profil/visi-misi"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isVisiMisi ? activeClass : hoverClass}`}
                                >
                                    <Target className="h-4 w-4" />
                                    <span>Visi & Misi</span>
                                </Link>

                                <Link
                                    href="/backoffice/profil/profil-pimpinan"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isProfilPimpinan ? activeClass : hoverClass}`}
                                >
                                    <User className="h-4 w-4" />
                                    <span>Profil Pimpinan</span>
                                </Link>

                                <Link
                                    href="/backoffice/profil/struktur-organisasi"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isStrukturOrganisasi ? activeClass : hoverClass}`}
                                >
                                    <Network className="h-4 w-4" />
                                    <span>Struktur Organisasi</span>
                                </Link>

                                <Link
                                    href="/backoffice/profil/pejabat-struktural"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isPejabatStruktural ? activeClass : hoverClass}`}
                                >
                                    <Users className="h-4 w-4" />
                                    <span>Pejabat Struktural</span>
                                </Link>

                                <Link
                                    href="/backoffice/profil/perwakilan-daerah"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isPerwakilanDaerah ? activeClass : hoverClass}`}
                                >
                                    <MapPin className="h-4 w-4" />
                                    <span>Perwakilan Daerah</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* DROPDOWN TUGAS & FUNGSI */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setDropdownTugasTerbuka((prev) => !prev)}
                            className={`flex w-full items-center justify-between gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                                isTugasFungsi ? activeClass : hoverClass
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Briefcase className="h-4 w-4" />
                                <span>Tugas & Fungsi</span>
                            </div>
                            {dropdownTugasTerbuka ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                        </button>

                        {dropdownTugasTerbuka && (
                            <div className="mt-1 ml-6 space-y-1">
                                <Link
                                    href="/backoffice/tugas-fungsi/kewenangan"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isKewenangan ? activeClass : hoverClass}`}
                                >
                                    <Scale className="h-4 w-4" />
                                    <span>Kewenangan</span>
                                </Link>

                                <Link
                                    href="/backoffice/tugas-fungsi/subjek-terlindung"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isSubjekTerlindung ? activeClass : hoverClass}`}
                                >
                                    <Shield className="h-4 w-4" />
                                    <span>Subjek Pelindungan</span>
                                </Link>

                                <Link
                                    href="/backoffice/tugas-fungsi/tindak-pidana-tertentu"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${isTindakPidana ? activeClass : hoverClass}`}
                                >
                                    <Gavel className="h-4 w-4" />
                                    <span>Tingkat Keseriusan Tindak Pidana</span>
                                </Link>

                                <Link
                                    href="/backoffice/tugas-fungsi/program-perlindungan"
                                    className={`flex items-center gap-2 rounded px-3 py-2 text-sm ${
                                        isProgramPerlindungan ? activeClass : hoverClass
                                    }`}
                                >
                                    <ShieldCheck className="h-4 w-4" />
                                    <span>Program Pelindungan</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </nav>
            </SidebarContent>

            <SidebarFooter>
                <ModeToggleTabs />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
