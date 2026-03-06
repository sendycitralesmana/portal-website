// import { Breadcrumbs } from '@/components/breadcrumbs';
// import { SidebarTrigger } from '@/components/ui/sidebar';
// import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

// export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
//     return (
//         <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
//             <div className="flex items-center gap-2">
//                 <SidebarTrigger className="-ml-1" />
//                 <Breadcrumbs breadcrumbs={breadcrumbs} />
//             </div>
//         </header>
//     );
// }


import { router } from '@inertiajs/react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Button } from '@/components/ui/button';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
  const pathname = window.location.pathname;
  const isEnglish = pathname.startsWith('/backoffice/en');

  // Route mapping bidirectional (ID <-> EN)
  const routeMap: Record<string, string> = {
    // dashboard
    '/backoffice/dashboard': '/backoffice/en/dashboard',
    '/backoffice/en/dashboard': '/backoffice/dashboard',

    // pengguna - user
    '/backoffice/pengguna': '/backoffice/en/user',
    '/backoffice/en/user': '/backoffice/pengguna',
    '/backoffice/pengguna/add': '/backoffice/en/user/add',
    '/backoffice/en/user/add': '/backoffice/pengguna/add',
    '/backoffice/pengguna/:id/edit': '/backoffice/en/user',
    '/backoffice/en/user/:id/edit': '/backoffice/pengguna',

    // aplikasi - application
    '/backoffice/aplikasi': '/backoffice/en/application',
    '/backoffice/en/application': '/backoffice/aplikasi',
    '/backoffice/aplikasi/tambah': '/backoffice/en/application/add',
    '/backoffice/en/application/add': '/backoffice/aplikasi/tambah',
    '/backoffice/aplikasi/:id/edit': '/backoffice/en/application',
    '/backoffice/en/application/:id/edit': '/backoffice/aplikasi',

    // profil - profile
    '/backoffice/profil': '/backoffice/en/profile',
    '/backoffice/en/profile': '/backoffice/profil',
    '/backoffice/profil/add': '/backoffice/en/profile/add',
    '/backoffice/en/profile/add': '/backoffice/profil/add',
    '/backoffice/profil/:id/edit': '/backoffice/en/profile',
    '/backoffice/en/profile/:id/edit': '/backoffice/profil',
    '/backoffice/profil/:id/detail': '/backoffice/en/profile',
    '/backoffice/en/profile/:id/detail': '/backoffice/profil',

    // sorot - highlight
    '/backoffice/sorot': '/backoffice/en/highlight',
    '/backoffice/en/highlight': '/backoffice/sorot',
    '/backoffice/sorot/add': '/backoffice/en/highlight/add',
    '/backoffice/en/highlight/add': '/backoffice/sorot/add',
    '/backoffice/sorot/:id/edit': '/backoffice/en/highlight',
    '/backoffice/en/highlight/:id/edit': '/backoffice/sorot',

    // publikasi - publication
    '/backoffice/publikasi': '/backoffice/en/publication',
    '/backoffice/en/publication': '/backoffice/publikasi',
    '/backoffice/publikasi/add': '/backoffice/en/publication/add',
    '/backoffice/en/publication/add': '/backoffice/publikasi/add',
    '/backoffice/publikasi/:id/edit': '/backoffice/en/publication',
    '/backoffice/en/publication/:id/edit': '/backoffice/publikasi',
    '/backoffice/publikasi/:id/detail': '/backoffice/en/publication',
    '/backoffice/en/publication/:id/detail': '/backoffice/publikasi',

    // berita - news
    '/backoffice/berita': '/backoffice/en/news',
    '/backoffice/en/news': '/backoffice/berita',
    '/backoffice/berita/add': '/backoffice/en/news/add',
    '/backoffice/en/news/add': '/backoffice/berita/add',
    '/backoffice/berita/:id/edit': '/backoffice/en/news',
    '/backoffice/en/news/:id/edit': '/backoffice/berita',
    '/backoffice/berita/:id/detail': '/backoffice/en/news',
    '/backoffice/en/news/:id/detail': '/backoffice/berita',
    
    // perwakilan - representative
    '/backoffice/perwakilan': '/backoffice/en/representative',
    '/backoffice/en/representative': '/backoffice/perwakilan',
    '/backoffice/perwakilan/add': '/backoffice/en/representative/add',
    '/backoffice/en/representative/add': '/backoffice/perwakilan/add',
    '/backoffice/perwakilan/:id/edit': '/backoffice/en/representative',
    '/backoffice/en/representative/:id/edit': '/backoffice/perwakilan',
    '/backoffice/perwakilan/:id/detail': '/backoffice/en/representative',
    '/backoffice/en/representative/:id/detail': '/backoffice/perwakilan',
    
    // layanan-perwakilan - protection-service
    '/backoffice/layanan-perwakilan': '/backoffice/en/protection-service',
    '/backoffice/en/protection-service': '/backoffice/layanan-perwakilan',
    '/backoffice/layanan-perwakilan/add': '/backoffice/en/protection-service/add',
    '/backoffice/en/protection-service/add': '/backoffice/layanan-perwakilan/add',
    '/backoffice/layanan-perwakilan/:id/edit': '/backoffice/en/protection-service',
    '/backoffice/en/protection-service/:id/edit': '/backoffice/layanan-perwakilan',
    '/backoffice/layanan-perwakilan/:id/detail': '/backoffice/en/protection-service',
    '/backoffice/en/protection-service/:id/detail': '/backoffice/layanan-perwakilan',

    // struktur - structure
    '/backoffice/struktur': '/backoffice/en/structure',
    '/backoffice/en/structure': '/backoffice/struktur',
    '/backoffice/struktur/add': '/backoffice/en/structure/add',
    '/backoffice/en/structure/add': '/backoffice/struktur/add',
    '/backoffice/struktur/:id/edit': '/backoffice/en/structure',
    '/backoffice/en/structure/:id/edit': '/backoffice/struktur',
    '/backoffice/struktur/:id/detail': '/backoffice/en/structure',
    '/backoffice/en/structure/:id/detail': '/backoffice/struktur',

    // lembaga - institution
    '/backoffice/lembaga': '/backoffice/en/institution',
    '/backoffice/en/institution': '/backoffice/lembaga',
    '/backoffice/lembaga/add': '/backoffice/en/institution/add',
    '/backoffice/en/institution/add': '/backoffice/lembaga/add',
    '/backoffice/lembaga/:id/edit': '/backoffice/en/institution',
    '/backoffice/en/institution/:id/edit': '/backoffice/lembaga',
    '/backoffice/lembaga/:id/detail': '/backoffice/en/institution',
    '/backoffice/en/institution/:id/detail': '/backoffice/lembaga',

    // afiliasi - afiliasi
    '/backoffice/afiliasi': '/backoffice/afiliasi',
    // '/backoffice/afiliasi': '/backoffice/afiliasi',
    '/backoffice/afiliasi/add': '/backoffice/afiliasi/add',
    // '/backoffice/afiliasi/add': '/backoffice/afiliasi/add',
    '/backoffice/afiliasi/:id/edit': '/backoffice/afiliasi',
    // '/backoffice/afiliasi/:id/edit': '/backoffice/afiliasi',
    '/backoffice/afiliasi/:id/detail': '/backoffice/afiliasi',
    // '/backoffice/afiliasi/:id/detail': '/backoffice/afiliasi',

    // unit-kerja - work-unit
    '/backoffice/unit-kerja': '/backoffice/en/work-unit',
    '/backoffice/en/work-unit': '/backoffice/unit-kerja',
    '/backoffice/unit-kerja/add': '/backoffice/en/work-unit/add',
    '/backoffice/en/work-unit/add': '/backoffice/unit-kerja/add',
    '/backoffice/unit-kerja/:id/edit': '/backoffice/en/work-unit',
    '/backoffice/en/work-unit/:id/edit': '/backoffice/unit-kerja',
    '/backoffice/unit-kerja/:id/detail': '/backoffice/en/work-unit',
    '/backoffice/en/work-unit/:id/detail': '/backoffice/unit-kerja',

    // tentang-kami - about-us
    '/backoffice/tentang-kami': '/backoffice/en/about-us',
    '/backoffice/en/about-us': '/backoffice/tentang-kami',
    '/backoffice/tentang-kami/add': '/backoffice/en/about-us/add',
    '/backoffice/en/about-us/add': '/backoffice/tentang-kami/add',
    '/backoffice/tentang-kami/:id/edit': '/backoffice/en/about-us',
    '/backoffice/en/about-us/:id/edit': '/backoffice/tentang-kami',
  };

  // Util: match dynamic route like /pengguna/12/edit → /user
  const matchDynamicRoute = (path: string) => {
    for (const [pattern, target] of Object.entries(routeMap)) {
      const regex = new RegExp('^' + pattern.replace(/:\w+/g, '[^/]+') + '$');
      if (regex.test(path)) return target;
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
        newPath = pathname.replace(/^\/backoffice\/en/, '/backoffice');
      } else {
        if (!pathname.startsWith('/backoffice/en')) {
          newPath = pathname.replace(/^\/backoffice/, '/backoffice/en');
        }
      }
      router.visit(newPath);
    }
  };

  return (
    <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear md:px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto gap-1 border-muted text-muted-foreground hover:bg-muted/30 dark:border-muted dark:text-muted-foreground"
          >
            <Globe className="h-4 w-4" />
            {isEnglish ? 'EN' : 'ID'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-28">
          <DropdownMenuItem onClick={() => switchLanguage('id')}>
            <img src="/flag-icon/id.svg" alt="ID" width={20} height={14} className="mr-2 rounded-sm" />
            Bahasa
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchLanguage('en')}>
            <img src="/flag-icon/us.svg" alt="EN" width={20} height={14} className="mr-2 rounded-sm" />
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

