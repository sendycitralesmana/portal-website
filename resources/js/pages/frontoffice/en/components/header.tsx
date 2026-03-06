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
import LanguageToggle from "../../components/language-toggle";

interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

const menu: MenuItem[] = [
  { name: "HOME", path: "/en/home" },
  {
    name: "Organization",
    path: "/en/profile",
    children: [
      { name: "Leader", path: "/en/profile/official" },
      { name: "Organizational Structure", path: "/en/profile/structure" },
      { name: "Institution Profile", path: "/en/profile/institution" },
      { name: "Work Unit", path: "/en/profile/work-unit" },
    ],
  },
  { name: "REPRESENTATIVE", path: "/en/representative" },
  {
    name: "Protection Services",
    path: "/en/protection-services",
    children: [
      { name: "Application for Protection (SIMPUSAKA)", path: "https://simpusaka.lpsk.go.id/layanan_simpusaka/" },
      { name: "Proactive Actions and Emergency Protection", path: "/en/protection-service/proactive-emergency" },
    ],
  },
  {
    name: "Public Information",
    path: "/en/information",
    children: [
      { name: "PPID", path: "https://eppid.lpsk.go.id/" },
      { name: "JDIH", path: "https://jdih.lpsk.go.id/" },
      { name: "OPERA", path: "https://hukum.lpsk.go.id/" },
      { name: "One Data", path: "https://satudata.lpsk.go.id/" },
      // { name: "Team Work", path: "https://www.lpsk.go.id/kerjasama" },
      { name: "Announcement", path: "/en/public-information/announcement" },
      { name: "Report", path: "https://www.lapor.go.id/" },
    ],
  },
  // {
  //   name: "Service Standards",
  //   path: "/en/service",
  //   children: [
  //     { name: "Service Declaration", path: "/en/service/service-declaration" },
  //     { name: "Public Service Standard at LPSK", path: "/en/service/public-service" },
  //     { name: "Application Acceptance Service Standard", path: "/en/service/acceptance-of-application" },
  //     { name: "Emergency Service Provision Standards", path: "/en/service/emergency-protection" },
  //     { name: "Proactive Action Standard", path: "/en/service/proactive-action" },
  //     { name: "Protection Provision Standard", path: "/en/service/protection-provision" },
  //     { name: "Public Information Request Standard", path: "/en/service/public-information-request" },
  //     { name: "Public Satisfaction Survey Report", path: "/en/service/survey-report" },
  //   ],
  // },
  {
    name: "News & Publication",
    path: "",
    children: [
      { name: "News Article", path: "/en/news/berita" },
      { name: "Press Release", path: "/en/news/siaran-pers" },
      { name: "Infografis", path: "/en/publication/foto" },
      { name: "Report", path: "/en/publication/laporan" },
      { name: "Book", path: "/en/publication/buku" },
      { name: "Study", path: "/en/publication/policy-paper" },
      { name: "Bulletin", path: "/en/publication/buletin" },
    ],
  },
];

const EnHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      className={`w-full top-0 sticky z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 dark:bg-gray-900/80 backdrop-blur-sm shadow-md"
          : "bg-background dark:bg-gray-900"
      }`}
    >
      <section className="md:px-10 mx-auto flex items-center justify-between py-2 shadow">
        <div className="relative h-[90px] w-[230px] shrink-0 flex items-center justify-center">
          <img src="/images/logo-lpsk.png" alt="LPSK Logo" className="object-contain h-[70px] w-full" />
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-between">
          <nav className="flex gap-3 justify-center items-center flex-wrap w-full ">
            {menu.map(({ name, path, children }) => {
              const isExternal = path.startsWith("http");
              const isOpen = openDropdown === name;

              if (children?.length) {
                return (
                  <div key={name} className="relative">
                    <button
                      onClick={() => toggleDropdown(name)}
                      className="uppercase px-3 py-3 h-[45px] flex gap-1 items-center cursor-pointer select-none font-bold text-sm xl:text-[15px] text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 whitespace-nowrap"
                    >
                      <span>{name}</span>
                      <ChevronDown
                        size={14}
                        className={`text-slate-600 transition-all ${isOpen ? "rotate-180 text-blue-600" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-0 z-20 bg-white shadow rounded w-[300px]">
                        <Card className="border-none shadow-none rounded p-1">
                          {children.map(({ name: childName, path: childPath }) => {
                            const isExternalChild = childPath.startsWith("http");
                            return isExternalChild ? (
                              <a
                                key={childName}
                                href={childPath}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpenDropdown(null)} // <-- Tutup dropdown saat klik
                                className="block py-1 px-3 text-[13px] font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:bg-primary/15 rounded transition"
                              >
                                {childName}
                              </a>
                            ) : (
                              <Link
                                key={childName}
                                href={childPath}
                                onClick={() => setOpenDropdown(null)} // <-- Tutup dropdown saat klik
                                className="block py-1 px-3 text-[13px] font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 hover:bg-primary/15 rounded transition"
                              >
                                {childName}
                              </Link>
                            );
                          })}
                        </Card>
                      </div>
                    )}
                  </div>
                );
              }

              return isExternal ? (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-3 h-[45px] flex items-center font-bold text-sm xl:text-[15px] text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 whitespace-nowrap"
                >
                  {name}
                </a>
              ) : (
                <Link
                  key={name}
                  href={path}
                  className="px-3 py-3 h-[45px] flex items-center font-bold text-sm xl:text-[15px] text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600 whitespace-nowrap"
                >
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
                <SheetTitle className="text-left font-bold text-[color:var(--primary-navy)] dark:text-white text-sm">LPSK</SheetTitle>
                <SheetDescription className="text-left text-[color:var(--primary-navy)] dark:text-white font-medium text-sm">
                  Lembaga Perlindungan Saksi dan Korban
                </SheetDescription>
              </SheetHeader>
              <nav className="mt-5 flex flex-col text-[13px] uppercase">
                {menu.map(({ name, path, children }) => {
                  const isExternal = path.startsWith("http");
                  return (
                    <div key={name} className="mb-2">
                      {children ? (
                        <details className="group">
                          <summary className="flex justify-between items-center px-3 py-2 cursor-pointer font-bold text-sm text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600">
                            <span>{name}</span>
                            <ChevronDown size={14} className="group-open:rotate-180 transition-all" />
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
                                  className="block py-[2px] text-[13px] font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600"
                                >
                                  {childName}
                                </a>
                              ) : (
                                <Link
                                  key={childName}
                                  href={childPath}
                                  className="block py-[2px] text-[13px] font-bold text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600"
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
                          className="block px-3 py-2 font-bold text-sm text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600"
                        >
                          {name}
                        </a>
                      ) : (
                        <Link
                          href={path}
                          className="block px-3 py-2 font-bold text-sm text-[color:var(--primary-navy)] dark:text-white dark:hover:text-blue-600"
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

export { EnHeader };
