
// import { Link, usePage } from '@inertiajs/react';
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from '@/components/ui/sidebar';
// import { NavFooter } from '@/components/nav-footer';
// import { NavMain } from '@/components/nav-main';
// import { NavUser } from '@/components/nav-user';
// import AppLogo from './app-logo';

// import {
//   LayoutGrid,
//   Users,
//   AppWindow,
//   UserPen,
//   GalleryHorizontal,
//   BookCheck,
//   Newspaper,
//   Folder,
//   BookOpen,
//   Building,
//   BookUser,
// } from 'lucide-react';
// import { ElementType } from 'react';
// import { useMemo } from 'react';

// // ✅ Tipe disatukan di file ini
// export type NavItem = {
//   title: string;
//   href: string;
//   icon: ElementType;
// };

// // ✅ Mendapatkan pathname saat ini dari page props inertia
// export function AppSidebar() {
//   const { url } = usePage();

//   // ✅ Cek apakah path sekarang cocok sebagian
//   const isActive = (href: string) => url.startsWith(href);

//   const mainNavItems: NavItem[] = [
//     { title: 'Beranda', href: '/backoffice/dashboard', icon: LayoutGrid },
//     { title: 'Pengguna', href: '/backoffice/pengguna', icon: Users },
//     { title: 'Aplikasi', href: '/backoffice/aplikasi', icon: AppWindow },
//     { title: 'Profil', href: '/backoffice/profil', icon: UserPen },
//     { title: 'Sorot', href: '/backoffice/sorot', icon: GalleryHorizontal },
//     { title: 'Publikasi', href: '/backoffice/publikasi', icon: BookCheck },
//     { title: 'Berita', href: '/backoffice/berita', icon: Newspaper },
//     { title: 'Perwakilan', href: '/backoffice/perwakilan', icon: Building },
//     { title: 'Tentang Kami', href: '/backoffice/tentang-kami', icon: BookUser },
//   ];

//   const footerNavItems: NavItem[] = [
//     // { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: Folder },
//     // { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen },
//   ];

//   return (
//     <Sidebar collapsible="icon" variant="inset">
//       <SidebarHeader>
//         <SidebarMenu>
//           <SidebarMenuItem>
//             <SidebarMenuButton size="lg" asChild>
//               <Link href="/backoffice/dashboard" prefetch>
//                 <AppLogo />
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarHeader>

//       <SidebarContent>
//         <NavMain items={mainNavItems} currentUrl={url} />
//       </SidebarContent>

//       <SidebarFooter>
//         <NavFooter items={footerNavItems} className="mt-auto" />
//         <NavUser />
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

// app-sidebar-id.tsx
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutGrid,
  Users,
  AppWindow,
  UserPen,
  GalleryHorizontal,
  BookCheck,
  Newspaper,
  Landmark,
  Info,
  Eye,
  Target,
  ChevronDown,
  ChevronRight,
  Folder,
  BookOpen,
  Handshake,
  Building,
  Briefcase,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import AppLogo from './app-logo';
import { NavUser } from '@/components/nav-user';
import { useState, useEffect } from 'react';

export function AppSidebar() {
  const { url } = usePage();

  const isDashboard = url.startsWith('/backoffice/dashboard');
  const isPengguna = url.startsWith('/backoffice/pengguna');
  const isAplikasi = url.startsWith('/backoffice/aplikasi');
  const isAfiliasi = url.startsWith('/backoffice/afiliasi');
  const isProfil = url.startsWith('/backoffice/profil');
  const isSorot = url.startsWith('/backoffice/sorot');
  const isPublikasi = url.startsWith('/backoffice/publikasi');
  const isBerita = url.startsWith('/backoffice/berita');
  const isPerwakilan = url.startsWith('/backoffice/perwakilan');
  const isTentangKami = url.startsWith('/backoffice/tentang-kami');
  const isKonten = url.startsWith('/backoffice/konten');
  const isLembaga = url.startsWith('/backoffice/lembaga');
  const isStruktur = url.startsWith('/backoffice/struktur');
  const isLayananPerlindungan = url.startsWith('/backoffice/layanan');
  const isUnitKerja = url.startsWith('/backoffice/unit-kerja');
  const isVisi = url.startsWith('/backoffice/konten/visi');
  const isMisi = url.startsWith('/backoffice/konten/misi');

  const [dropdownKontenTerbuka, setDropdownKontenTerbuka] = useState(false);

  useEffect(() => {
    if (isKonten) {
      setDropdownKontenTerbuka(true);
    }
  }, [isKonten]);

  const activeClass = 'bg-blue-900 hover:bg-blue-800 text-white dark:bg-blue-900 dark:text-white';
  const hoverClass = 'hover:bg-muted';

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/backoffice/dashboard" prefetch>
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
            href="/backoffice/dashboard"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isDashboard ? activeClass : hoverClass}`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Beranda</span>
          </Link>

          <Link
            href="/backoffice/pengguna"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isPengguna ? activeClass : hoverClass}`}
          >
            <Users className="h-4 w-4" />
            <span>Pengguna</span>
          </Link>

          <Link
            href="/backoffice/aplikasi"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isAplikasi ? activeClass : hoverClass}`}
          >
            <AppWindow className="h-4 w-4" />
            <span>Aplikasi</span>
          </Link>

          <Link
            href="/backoffice/afiliasi"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isAfiliasi ? activeClass : hoverClass}`}
          >
            <Handshake className="h-4 w-4" />
            <span>Mitra Lembaga</span>
          </Link>

          {/* <Link
            href="/backoffice/profil"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isProfil ? activeClass : hoverClass}`}
          >
            <UserPen className="h-4 w-4" />
            <span>Profil</span>
          </Link> */}

          <Link
            href="/backoffice/sorot"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isSorot ? activeClass : hoverClass}`}
          >
            <GalleryHorizontal className="h-4 w-4" />
            <span>Sorot</span>
          </Link>

          <Link
            href="/backoffice/publikasi"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isPublikasi ? activeClass : hoverClass}`}
          >
            <BookCheck className="h-4 w-4" />
            <span>Publikasi</span>
          </Link>

          <Link
            href="/backoffice/berita"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isBerita ? activeClass : hoverClass}`}
          >
            <Newspaper className="h-4 w-4" />
            <span>Berita</span>
          </Link>

          <Link
            href="/backoffice/perwakilan"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isPerwakilan ? activeClass : hoverClass}`}
          >
            <Landmark className="h-4 w-4" />
            <span>Perwakilan</span>
          </Link>

          <Link
            href="/backoffice/layanan-perlindungan"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isLayananPerlindungan ? activeClass : hoverClass}`}
          >
            <Newspaper className="h-4 w-4" />
            <span>Layanan Perlindungan</span>
          </Link>

          <Link
            href="/backoffice/tentang-kami"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isTentangKami ? activeClass : hoverClass}`}
          >
            <Info className="h-4 w-4" />
            <span>Tentang Kami</span>
          </Link>

          <div className="px-3 pt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Organisasi
          </div>

          <Link
            href="/backoffice/profil"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isProfil ? activeClass : hoverClass}`}
          >
            <UserPen className="h-4 w-4" />
            <span>Pimpinan</span>
          </Link>

          <Link
            href="/backoffice/struktur"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isStruktur ? activeClass : hoverClass}`}
          >
            <UserPen className="h-4 w-4" />
            <span>Struktur</span>
          </Link>

          <Link
            href="/backoffice/lembaga"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isLembaga ? activeClass : hoverClass}`}
          >
            <Building className="h-4 w-4" />
            <span>Lembaga</span>
          </Link>

          <Link
            href="/backoffice/unit-kerja"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isUnitKerja ? activeClass : hoverClass}`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Unit Kerja</span>
          </Link>

          {/* Dropdown Konten */}
          {/* <div>
            <button
              type="button"
              onClick={() => setDropdownKontenTerbuka((prev) => !prev)}
              className={`w-full flex items-center justify-between gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isKonten ? activeClass : hoverClass}`}
            >
              <div className="flex items-center gap-3">
                <BookCheck className="h-4 w-4" />
                <span>Konten</span>
              </div>
              {dropdownKontenTerbuka ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {dropdownKontenTerbuka && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  href="/backoffice/konten/visi"
                  className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
                    isVisi
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>Visi</span>
                </Link>
                <Link
                  href="/backoffice/konten/misi"
                  className={`flex items-center gap-2 rounded px-3 py-2 text-sm font-medium transition-colors ${
                    isMisi
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-white'
                      : 'hover:bg-muted text-muted-foreground'
                  }`}
                >
                  <Target className="h-4 w-4" />
                  <span>Misi</span>
                </Link>
              </div>
            )}
          </div> */}
        </nav>
      </SidebarContent>

      <SidebarFooter>
        {/* <div className="mt-auto space-y-1">
          <Link
            href="https://github.com/laravel/react-starter-kit"
            className="flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Folder className="h-4 w-4" />
            <span>Repositori</span>
          </Link>
          <Link
            href="https://laravel.com/docs/starter-kits#react"
            className="flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <BookOpen className="h-4 w-4" />
            <span>Dokumentasi</span>
          </Link>
        </div> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
