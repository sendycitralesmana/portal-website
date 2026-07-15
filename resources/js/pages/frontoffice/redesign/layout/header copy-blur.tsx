"use client"

import { useEffect, useState } from "react"
import { Search, X, Menu, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, usePage } from "@inertiajs/react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

type MenuItem = {
  label: string
  href: string
  external?: boolean
}

const menus = [
  "Layanan dan Informasi",
  "Profil",
  "Tugas dan Fungsi",
  "Publikasi",
]

/* ================= SUB MENU ================= */

const layananInformasiMenuItems: MenuItem[] = [
  {
    label: "Permohonan Perlindungan (SIMPUSAKA)",
    href: "https://simpusaka.lpsk.go.id/layanan_simpusaka/",
    external: true,
  },
  {
    label: "e-PPID",
    href: "https://eppid.lpsk.go.id/",
    external: true,
  },
  {
    label: "Pengaduan Masyarakat",
    href: "https://www.lapor.go.id/",
    external: true,
  },
  {
    label: "JDIH",
    href: "https://jdih.lpsk.go.id/",
    external: true,
  },
]

const profilMenuItems: MenuItem[] = [
  { label: "Visi dan Misi", href: "/profil/visi-misi" },
  { label: "Profil Pimpinan", href: "/profil/profil-pimpinan" },
  { label: "Struktur Organisasi", href: "/profil/struktur-organisasi" },
  { label: "Pejabat Struktural", href: "/profil/pejabat-struktural" },
  { label: "Perwakilan Daerah", href: "/profil/perwakilan-daerah" },
]

const tugasFungsiMenuItems: MenuItem[] = [
  { label: "Kewenangan", href: "/tugas-fungsi/kewenangan" },
  { label: "Subjek Terlindung", href: "/tugas-fungsi/subjek-terlindung" },
  { label: "Tindak Pidana Prioritas", href: "/tugas-fungsi/tindak-pidana-prioritas" },
  { label: "Program Perlindungan", href: "/tugas-fungsi/program-perlindungan" },
]

const publikasiMenuItems: MenuItem[] = [
  { label: "Siaran Pers", href: "/publikasi/siaran-pers" },
  { label: "Sosial Media", href: "/sosial-media" },
  { label: "Berita Kegiatan", href: "/publikasi/berita-kegiatan" },
  { label: "Berita Foto", href: "/publikasi/berita-foto" },
  { label: "Pengumuman", href: "/publikasi/pengumuman" },
  { label: "Laporan", href: "/publikasi/laporan" },
  { label: "Kajian dan Jurnal", href: "/publikasi/kajian-jurnal" },
  { label: "Buku", href: "/publikasi/buku" },
  { label: "Statistik", href: "/statistik" },
]

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileActive, setMobileActive] = useState<string | null>(null)

  const { url } = usePage()

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }

  const closeMenu = () => setActiveMenu(null)

  const getMenuItems = (): MenuItem[] => {
    switch (activeMenu) {
      case "Layanan dan Informasi":
        return layananInformasiMenuItems
      case "Profil":
        return profilMenuItems
      case "Tugas dan Fungsi":
        return tugasFungsiMenuItems
      case "Publikasi":
        return publikasiMenuItems
      default:
        return []
    }
  }
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">

        <div className="md:pl-16 lg:pl-24 mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link href="/beranda" className="flex items-center">
              <img
                src="/images/logo-baru.png"
                alt="LPSK Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex gap-14 font-bold h-full items-center">
              {menus.map((menu) => (
                <button
                  key={menu}
                  onClick={() => toggleMenu(menu)}
                  className={cn(
                    "h-full flex items-center border-b-2 transition-colors duration-200 cursor-pointer",
                    activeMenu === menu
                      ? "text-amber-700 border-amber-700"
                      : "border-transparent hover:text-amber-700"
                  )}
                >
                  {menu}
                </button>
              ))}
            </nav>

            {/* RIGHT SECTION */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input className="bg-muted pl-9 pr-4 py-1.5 rounded-full text-sm border border-border focus:outline-none focus:ring-2 focus:ring-amber-500 transition" />
              </div>

              {/* <div className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center text-xs font-medium border-amber-400 border-2">
                ID
              </div> */}

              <ModeToggle />
            </div>

            {/* MOBILE HAMBURGER */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* DESKTOP MEGA MENU */}
        {activeMenu && (
          <div className="absolute left-0 right-0 flex justify-center top-20 hidden md:flex">
            <div className="w-full max-w-7xl bg-background border border-border shadow-xl rounded-b-2xl overflow-hidden ">

              <div className="bg-gradient-to-r from-red-900 to-red-700 text-white px-6 py-3 flex justify-between items-center border-amber-400 border-b-2">
                <span className="font-bold text-sm">{activeMenu}</span>
                <button className="cursor-pointer border-amber-400 border-2 rounded-2xl" onClick={closeMenu}>
                  <X size={16} />
                </button>
              </div>

              <div className="grid grid-cols-4 h-[420px]">

                <div className="col-span-1 bg-muted/60 p-6 border-r border-border">
                  <div className="mb-5 bg-gradient-to-l from-red-900 to-red-700 rounded-2xl border-amber-400 border-2">
                    <img
                      src="/images/logo-baru.png"
                      alt="Logo"
                      className="w-full object-contain p-4"
                    />
                  </div>

                  <p className="text-sm leading-relaxed font-bold">
                    Informasi lengkap terkait {activeMenu?.toLowerCase()} tersedia
                    pada menu di samping.
                  </p>
                </div>

                <div className="col-span-1 bg-muted border-r border-border overflow-y-auto">
                  {getMenuItems().map((item, index) =>
                    item.external ? (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMenu}
                        className="block px-6 py-4 text-sm font-bold border-b border-border hover:bg-amber-50 dark:hover:bg-amber-600 transition"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={closeMenu}
                        className="block px-6 py-4 text-sm font-bold border-b border-border hover:bg-amber-50 dark:hover:bg-amber-600 transition"
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>

                <div className="col-span-2 bg-background p-6" />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-20 left-0 right-0 bg-background border-t border-border shadow-lg z-40">

          {/* TOP SECTION (Search + ID + ModeToggle - Sejajar) */}
          <div className="px-4 py-4 border-b border-border bg-muted/40">
            <div className="flex items-center gap-3">

              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  placeholder="Cari..."
                  className="w-full bg-background pl-9 pr-3 py-2 rounded-full text-sm border border-border focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                />
              </div>

              {/* ID */}
              {/* <div className="w-9 h-9 bg-red-900 text-white rounded-full flex items-center justify-center text-xs font-medium shrink-0">
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
              menu === "Layanan dan Informasi"
                ? layananInformasiMenuItems
                : menu === "Profil"
                ? profilMenuItems
                : menu === "Tugas dan Fungsi"
                ? tugasFungsiMenuItems
                : menu === "Publikasi"
                ? publikasiMenuItems
                : []

            const isOpen = mobileActive === menu

            return (
              <div key={menu} className="border-b border-border">
                <button
                  onClick={() =>
                    setMobileActive(isOpen ? null : menu)
                  }
                  className="w-full flex items-center justify-between px-6 py-4 font-bold"
                >
                  {menu}

                  <ChevronDown
                    size={18}
                    className={cn(
                      "transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
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
                          className="block px-8 py-3 text-sm border-t border-border"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={index}
                          href={item.href}
                          className="block px-8 py-3 text-sm border-t border-border"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* <div className="h-20" /> */}
    </>
  )
}