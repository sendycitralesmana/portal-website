import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { ChevronDown, MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageToggle from "./language-toggle";

interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

const menu: MenuItem[] = [
  { name: "Beranda", path: "/" },
  {
    name: "Profil",
    path: "/profil",
    children: [
      { name: "Profil Lembaga", path: "/profil/lembaga" },
      { name: "Pejabat", path: "/profil/pejabat" },
      { name: "Struktur Organisasi", path: "/profil/struktur" },
      { name: "Unit Kerja", path: "/profil/unit-kerja" },
      { name: "Roadmap dan Rencana Strategi", path: "/profil/roadmap" },
      { name: "Ketentuan Logo Resmi", path: "/profil/ketentuan-logo" },
    ],
  },
  { name: "Perwakilan", path: "/perwakilan" },
  {
    name: "Layanan",
    path: "/layanan",
    children: [
      { name: "Maklumat Pelayanan", path: "/layanan/maklumat-pelayanan" },
      { name: "Standar Pelayanan Publik di lingkungan LPSK", path: "/layanan/pelayanan-publik" },
      { name: "Standar Pelayanan Penerimaan Permohonan", path: "/layanan/penerimaan-permohonan" },
      { name: "Standar Pelayanan Pemberian Pelayanan Darurat", path: "/layanan/pemberian-perlindungan-darurat" },
      { name: "Standar Pelayanan Tindakan Proaktif", path: "/layanan/tindakan-proaktif" },
      { name: "Standar Pelayanan Pemberian Perlindungan", path: "/layanan/pemberian-perlindungan" },
      { name: "Standar Pelayanan Permintaan Informasi Publik LPSK", path: "/layanan/permintaan-informasi-publik" },
      { name: "Laporan Surver Kepuasan Masyarakat", path: "/layanan/laporan-survey" },
      { name: "Pengaduan Pelayanan Publik", path: "https://docs.google.com/forms/d/e/1FAIpQLScZtI-6ViU-TwZ4dfqhtE2kqj3HzKsFru_-Smx7RroqhOmSWg/viewform?pli=1" },
      { name: "LAPOR!!", path: "https://www.lapor.go.id/" },
    ],
  },
  { name: "JDIH", path: "https://jdih.lpsk.go.id/" },
  { name: "PPID", path: "https://e-ppid.bpk.go.id/" },
  {
    name: "Berita",
    path: "/berita",
    children: [
      { name: "Artikel", path: "/berita/artikel" },
      { name: "Berita", path: "/berita/berita" },
      { name: "Informasi", path: "/berita/informasi" },
      { name: "Warta Hukum", path: "/berita/warta-hukum" },
      { name: "Siaran Pers", path: "/berita/siaran-pers" },
    ],
  },
  {
    name: "Publikasi",
    path: "/publikasi",
    children: [
      { name: "Foto", path: "/publikasi/foto" },
      { name: "Buletin", path: "/publikasi/buletin" },
      { name: "Kegiatan", path: "/publikasi/kegiatan" },
      { name: "Buku", path: "/publikasi/buku" },
      { name: "Policy Papper", path: "/publikasi/policy-papper" },
      { name: "Jurnal", path: "/publikasi/jurnal" },
      { name: "Laporan", path: "/publikasi/laporan" },
    ],
  },
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full top-0 sticky z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 dark:bg-gray-900/80 backdrop-blur-sm shadow-md"
          : "bg-background dark:bg-gray-900"
      }`}
    >
      <section className="md:px-10 mx-auto flex items-center justify-between py-2">
        <div className="relative h-[90px] w-[230px] shrink-0 flex items-center justify-center">
          <img
            src="/images/logo-lpsk.png"
            alt="LPSK Logo"
            className="object-contain h-[70px] w-full"
          />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-between">
          <nav className="flex gap-5 justify-center items-center w-full uppercase">
            {menu.map(({ name, path, children }) => {
              const isExternal = path.startsWith("http");
              if (children?.length) {
                return (
                  <div key={name} className="relative group">
                    <div className="px-4 py-4 h-[50px] flex gap-1 items-center cursor-pointer select-none font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                      <span className="group-hover:text-blue-600">{name}</span>
                      <ChevronDown size={16} className="text-slate-600 group-hover:text-blue-600 group-hover:rotate-180 transition-all" />
                    </div>
                    <div className="absolute top-full left-0 z-20 hidden group-hover:block bg-white shadow rounded w-[300px]">
                      <Card className="border-none shadow-none rounded p-1">
                        {children.map(({ name: childName, path: childPath }) => {
                          const isExternalChild = childPath.startsWith("http");
                          return isExternalChild ? (
                            <a
                              key={childName}
                              href={childPath}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block py-1 px-4 text-sm font-medium text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:bg-primary/15 rounded transition"
                            >
                              {childName}
                            </a>
                          ) : (
                            <Link
                              key={childName}
                              href={childPath}
                              className="block py-1 px-4 text-sm font-medium text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:bg-primary/15 rounded transition"
                            >
                              {childName}
                            </Link>
                          );
                        })}
                      </Card>
                    </div>
                  </div>
                );
              }

              const baseClass =
                "hover:text-blue-600 px-4 py-4 h-[50px] flex items-center font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600";

              return isExternal ? (
                <a key={name} href={path} target="_blank" rel="noopener noreferrer" className={baseClass}>
                  {name}
                </a>
              ) : (
                <Link key={name} href={path} className={baseClass}>
                  {name}
                </Link>
              );
            })}
          </nav>
          <div className="pl-4 shrink-0 flex items-center gap-2">
            <ModeToggle />
            <LanguageToggle />
          </div>
        </div>

        <div className="flex gap-2 items-center lg:hidden ml-auto pr-4">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="border-2 h-8 w-8">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-[color:var(--primary-navy)] dark:text-white">LPSK</SheetTitle>
                <SheetDescription className="text-left text-[color:var(--primary-navy)] dark:text-white font-bold">
                  Lembaga Perlindungan Saksi dan Korban
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-5 flex flex-col text-sm uppercase">
                {menu.map(({ name, path, children }) => {
                  const isExternal = path.startsWith("http");
                  return (
                    <div key={name} className="mb-2">
                      {children ? (
                        <details className="group">
                          <summary className="flex justify-between items-center px-4 py-2 cursor-pointer font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                            <span>{name}</span>
                            <ChevronDown size={16} className="group-open:rotate-180 transition-all" />
                          </summary>
                          <div className="pl-4">
                            {children.map(({ name: childName, path: childPath }) => {
                              const isChildExternal = childPath.startsWith("http");
                              return isChildExternal ? (
                                <a
                                  key={childName}
                                  href={childPath}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block py-1 font-medium text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:text-blue-800"
                                >
                                  {childName}
                                </a>
                              ) : (
                                <Link
                                  key={childName}
                                  href={childPath}
                                  className="block py-1 font-medium text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:text-blue-800"
                                >
                                  {childName}
                                </Link>
                              );
                            })}
                          </div>
                        </details>
                      ) : isExternal ? (
                        <a
                          href={path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2 font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:text-blue-800"
                        >
                          {name}
                        </a>
                      ) : (
                        <Link
                          href={path}
                          className="block px-4 py-2 font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:text-blue-800"
                        >
                          {name}
                        </Link>
                      )}
                    </div>
                  );
                })}
              </nav>

              <div className="mt-6 border-t pt-4">
                <LanguageToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </section>
    </header>
  );
};

export { Header };
