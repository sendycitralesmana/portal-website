import React from "react";
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
  { name: "Home", path: "/en/" },
  {
    name: "Profile",
    path: "/en/profile",
    children: [
      { name: "Institution Profile", path: "/en/profile/institution" },
      { name: "Official", path: "/en/profile/official" },
      { name: "Organizational Structure", path: "/en/profile/structure" },
      { name: "Work Unit", path: "/en/profile/work-unit" },
      { name: "Roadmap and Strategic Plan", path: "/en/profile/roadmap" },
    ],
  },
  { name: "Representative", path: "/en/representative" },
  {
    name: "Service",
    path: "/en/service",
    children: [
      { name: "Service Declaration", path: "/en/service/service-declaration" },
      { name: "Public Service Standard at LPSK", path: "/en/service/public-service" },
      { name: "Application Acceptance Service Standard", path: "/en/service/acceptance-of-application" },
      { name: "Emergency Service Provision Standards", path: "/en/service/emergency-protection" },
      { name: "Proactive Action Standard", path: "/en/service/proactive-action" },
      { name: "Protection Provision Standard", path: "/en/service/protection-provision" },
      { name: "Public Information Request Standard", path: "/en/service/public-information-request" },
      { name: "Public Satisfaction Survey Report", path: "/en/service/survey-report" },
      { name: "Public Service Complaints", path: "https://docs.google.com/forms/d/e/1FAIpQLScZtI-6ViU-TwZ4dfqhtE2kqj3HzKsFru_-Smx7RroqhOmSWg/viewform?pli=1" },
      { name: "LAPOR!!", path: "https://www.lapor.go.id/" },
      { name: "E-PPID", path: "https://eppid.lpsk.go.id/" },
    ],
  },
  { name: "PPID", path: "https://e-ppid.bpk.go.id/" },
  {
    name: "News",
    path: "/en/news",
    children: [
      { name: "Article", path: "/en/news/artikel" },
      { name: "Information", path: "/en/news/informasi" },
      { name: "Legal Bulletin", path: "/en/news/buletin" },
      { name: "Press Release", path: "/en/news/siaran-pers" },
    ],
  },
  {
    name: "Publication",
    path: "/en/publication",
    children: [
      { name: "Photos", path: "/en/publication/foto" },
      { name: "Bulletins", path: "/en/publication/bulletin" },
      { name: "Activities", path: "/en/publication/kegiatan" },
      { name: "Books", path: "/en/publication/buku" },
      { name: "Policy Papers", path: "/en/publication/policy-paper" },
      { name: "Journals", path: "/en/publication/jurnal" },
      { name: "Reports", path: "/en/publication/laporan" },
    ],
  },
];

const EnHeader: React.FC = () => {
  return (
    <header className="w-full shadow bg-background top-0 sticky z-50">
      <section className="container flex items-center justify-between py-2">
        <div className="relative h-[90px] w-[230px] shrink-0 flex items-center justify-center">
          <img
            src="/images/logo-lpsk.png"
            alt="LPSK Logo"
            className="object-contain h-[70px] w-full"
          />
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex flex-1 items-center justify-between">
          <nav className="flex gap-5 justify-center items-center w-full">
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

        {/* Mobile menu */}
        <div className="flex gap-2 items-center lg:hidden ml-auto">
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
              <nav className="mt-5 flex flex-col text-sm">
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

              {/* Language toggle moved into mobile sidebar */}
              <div className="mt-6 border-t pt-4 ">
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
