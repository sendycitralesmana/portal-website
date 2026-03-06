import { router } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Button } from '@/components/ui/button';

export default function LanguageToggle({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const pathname = window.location.pathname;
  const isEnglish = pathname.startsWith('/en');

  // Bidirectional route map
  const routeMap: Record<string, string> = {
    // dashboard
    '/beranda': '/en/home',
    '/en/home': '/beranda',

    // profil - en/profile
    '/profil/lembaga': '/en/profile/institution',
    '/en/profile/institution': '/profil/lembaga',
    '/profil/pejabat': '/en/profile/official',
    '/en/profile/official': '/profil/pejabat',
    '/profil/struktur': '/en/profile/structure',
    '/en/profile/structure': '/profil/struktur',
    '/profil/unit-kerja': '/en/profile/work-unit',
    '/en/profile/work-unit': '/profil/unit-kerja',
    '/profil/roadmap': '/en/profile/roadmap',
    '/en/profile/roadmap': '/profil/roadmap',

    // perwakilan - en/representative
    '/perwakilan' : '/en/representative',
    '/en/representative' : '/perwakilan',

    // informasi-publik - public-information
    '/informasi-publik/pengumuman': '/en/public-information/announcement',
    '/en/public-information/announcement': '/informasi-publik/pengumuman',

    '/subjek-perlindungan': '/en/protection-subject',
    '/en/protection-subject': '/subjek-perlindungan',
    '/tindak-pidana-tertentu': '/en/specific-criminal-offense',
    '/en/specific-criminal-offense': '/tindak-pidana-tertentu',
    '/program-perlindungan': '/en/protection-program',
    '/en/protection-program': '/program-perlindungan',

    // layanan perlindungan
    '/layanan-perlindungan/proaktif-darurat': '/en/protection-service/proactive-emergency',
    '/en/protection-service/proactive-emergency': '/layanan-perlindungan/proaktif-darurat',

    // layanan - service
    '/layanan/maklumat-pelayanan': '/en/service/service-declaration',
    '/en/service/service-declaration': '/layanan/maklumat-pelayanan',
    '/layanan/pelayanan-publik': '/en/service/public-service',
    '/en/service/public-service': '/layanan/pelayanan-publik',
    '/layanan/penerimaan-permohonan': '/en/service/acceptance-of-application',
    '/en/service/acceptance-of-application': '/layanan/penerimaan-permohonan',
    '/layanan/pemberian-perlindungan-darurat': '/en/service/emergency-protection',
    '/en/service/emergency-protection': '/layanan/pemberian-perlindungan-darurat',
    '/layanan/tindakan-proaktif': '/en/service/proactive-action',
    '/en/service/proactive-action': '/layanan/tindakan-proaktif',
    '/layanan/pemberian-perlindungan': '/en/service/protection-provision',
    '/en/service/protection-provision': '/layanan/pemberian-perlindungan',
    '/layanan/permintaan-informasi-publik': '/en/service/public-information-request',
    '/en/service/public-information-request': '/layanan/permintaan-informasi-publik',
    '/layanan/laporan-survey': '/en/service/survey-report',
    '/en/service/survey-report': '/layanan/laporan-survey',

    // berita - news
    '/berita/:slug': '/en/news/:slug',
    '/en/news/:slug': '/berita/:slug',
    '/berita/:slugCategory/:id': '/en/news/:slugCategory/',
    '/en/news/:slugCategory/:id': '/berita/:slugCategory/',

    // publikasi - publication
    '/publikasi/:slug': '/en/publication/:slug',
    '/en/publication/:slug': '/publikasi/:slug',
    '/publikasi/:slugCategory/:id': '/en/publication/:slugCategory/',
    '/en/publication/:slugCategory/:id': '/publikasi/:slugCategory/',
  };

  // Match dynamic routes and interpolate parameters
  const matchDynamicRoute = (path: string): string | null => {
    for (const [pattern, target] of Object.entries(routeMap)) {
      const paramNames = [...pattern.matchAll(/:(\w+)/g)].map(([, name]) => name);
      const regexPattern = '^' + pattern.replace(/:\w+/g, '([^/]+)') + '$';
      const regex = new RegExp(regexPattern);
      const match = path.match(regex);

      if (match) {
        const paramValues = match.slice(1);
        let translated = target;

        paramNames.forEach((name, index) => {
          translated = translated.replace(`:${name}`, paramValues[index]);
        });

        return translated;
      }
    }

    return null;
  };

  const switchLanguage = (lang: 'id' | 'en') => {
    const directMatch = routeMap[pathname];
    const dynamicMatch = matchDynamicRoute(pathname);

    if (directMatch) {
      router.visit(directMatch);
    } else if (dynamicMatch) {
      router.visit(dynamicMatch);
    } else {
      // fallback mode
      let newPath = pathname;
      if (lang === 'id') {
        newPath = pathname.replace(/^\/en/, '/');
      } else {
        if (!pathname.startsWith('/en')) {
          newPath = '/en' + pathname;
        }
      }
      router.visit(newPath);
    }
  };

  // const switchLanguage = (lang: 'id' | 'en') => {
  //   const directMatch = routeMap[pathname];
  //   const dynamicMatch = matchDynamicRoute(pathname);

  //   if (directMatch) {
  //     router.visit(directMatch);
  //   } else if (dynamicMatch) {
  //     router.visit(dynamicMatch);
  //   } else {
  //     // fallback mode
  //     let newPath = pathname;
  //     if (lang === 'id') {
  //       newPath = pathname.replace(/^\/backoffice\/en/, '/backoffice');
  //     } else {
  //       if (!pathname.startsWith('/backoffice/en')) {
  //         newPath = pathname.replace(/^\/backoffice/, '/backoffice/en');
  //       }
  //     }
  //     router.visit(newPath);
  //   }
  // };

  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto gap-1 border-muted text-[color:var(--primary-navy)] dark:text-white hover:bg-muted/30 dark:border-muted"
        >
          <Globe className="h-4 w-4" />
          {isEnglish ? 'EN' : 'ID'}
        </Button>
      </DropdownMenuTrigger> */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto gap-1 border-muted text-[color:var(--primary-navy)] dark:text-white hover:bg-muted/30 dark:border-muted"
        >
          <img
            src={isEnglish ? '/flag-icon/us.svg' : '/flag-icon/id.svg'}
            alt={isEnglish ? 'EN' : 'ID'}
            width={20}
            height={14}
            className="rounded-sm"
          />
          {isEnglish ? 'English' : 'Indonesia'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-28 text-[color:var(--primary-navy)] dark:text-white">
        <DropdownMenuItem onClick={() => switchLanguage('id')}>
          <img src="/flag-icon/id.svg" alt="ID" width={20} height={14} className="mr-2 rounded-sm" />
          Indonesia
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage('en')}>
          <img src="/flag-icon/us.svg" alt="EN" width={20} height={14} className="mr-2 rounded-sm" />
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
