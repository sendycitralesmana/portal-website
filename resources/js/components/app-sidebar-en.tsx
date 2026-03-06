// app-sidebar.tsx
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

export function AppSidebarEn() {
  const { url } = usePage();

  const isDashboard = url.startsWith('/backoffice/en/dashboard');
  const isUser = url.startsWith('/backoffice/en/user');
  const isApplication = url.startsWith('/backoffice/en/application');
  const isProfile = url.startsWith('/backoffice/en/profile');
  const isHighlight = url.startsWith('/backoffice/en/highlight');
  const isPublication = url.startsWith('/backoffice/en/publication');
  const isNews = url.startsWith('/backoffice/en/news');
  const isRepresentative = url.startsWith('/backoffice/en/representative');
  const isAboutUs = url.startsWith('/backoffice/en/about-us');
  const isContent = url.startsWith('/backoffice/en/content');
  const isStructure = url.startsWith('/backoffice/en/structure');
  const isService = url.startsWith('/backoffice/en/service');
  const isInstitution = url.startsWith('/backoffice/en/institution');
  const isProtectionService = url.startsWith('/backoffice/en/protection-service');
  const isWorkUnit = url.startsWith('/backoffice/en/work-unit');
  const isVisi = url.startsWith('/backoffice/en/content/visi');
  const isMisi = url.startsWith('/backoffice/en/content/misi');

  const [openContentDropdown, setOpenContentDropdown] = useState(false);

  useEffect(() => {
    if (isContent) {
      setOpenContentDropdown(true);
    }
  }, [isContent]);

  const activeClass = 'bg-blue-900 hover:bg-blue-800 text-white dark:bg-blue-900 dark:text-white';
  const hoverClass = 'hover:bg-muted';

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/backoffice/en/dashboard" prefetch>
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
            href="/backoffice/en/dashboard"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isDashboard ? activeClass : hoverClass}`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/backoffice/en/user"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isUser ? activeClass : hoverClass}`}
          >
            <Users className="h-4 w-4" />
            <span>User</span>
          </Link>

          <Link
            href="/backoffice/en/application"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isApplication ? activeClass : hoverClass}`}
          >
            <AppWindow className="h-4 w-4" />
            <span>Application</span>
          </Link>

          {/* <Link
            href="/backoffice/en/profile"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isProfile ? activeClass : hoverClass}`}
          >
            <UserPen className="h-4 w-4" />
            <span>Profile</span>
          </Link> */}

          <Link
            href="/backoffice/en/highlight"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isHighlight ? activeClass : hoverClass}`}
          >
            <GalleryHorizontal className="h-4 w-4" />
            <span>Highlight</span>
          </Link>

          <Link
            href="/backoffice/en/publication"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isPublication ? activeClass : hoverClass}`}
          >
            <BookCheck className="h-4 w-4" />
            <span>Publication</span>
          </Link>

          <Link
            href="/backoffice/en/news"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isNews ? activeClass : hoverClass}`}
          >
            <Newspaper className="h-4 w-4" />
            <span>News</span>
          </Link>

          <Link
            href="/backoffice/en/representative"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isRepresentative ? activeClass : hoverClass}`}
          >
            <Landmark className="h-4 w-4" />
            <span>Representative</span>
          </Link>

          <Link
            href="/backoffice/en/protection-service"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isProtectionService ? activeClass : hoverClass}`}
          >
            <Newspaper className="h-4 w-4" />
            <span>Protection Service</span>
          </Link>

          <Link
            href="/backoffice/en/about-us"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isAboutUs ? activeClass : hoverClass}`}
          >
            <Info className="h-4 w-4" />
            <span>About Us</span>
          </Link>

          <div className="px-3 pt-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Organization
          </div>

          <Link
            href="/backoffice/en/profile"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isProfile ? activeClass : hoverClass}`}
          >
            <UserPen className="h-4 w-4" />
            <span>Leader</span>
          </Link>

          <Link
            href="/backoffice/en/structure"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isStructure ? activeClass : hoverClass}`}
          >
            <UserPen className="h-4 w-4" />
            <span>Structure</span>
          </Link>

          <Link
            href="/backoffice/en/institution"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isInstitution ? activeClass : hoverClass}`}
          >
            <Building className="h-4 w-4" />
            <span>Institution</span>
          </Link>

          <Link
            href="/backoffice/en/work-unit"
            className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isWorkUnit ? activeClass : hoverClass}`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Work Unit</span>
          </Link>

          {/* Content Dropdown */}
          {/* <div>
            <button
              type="button"
              onClick={() => setOpenContentDropdown((prev) => !prev)}
              className={`w-full flex items-center justify-between gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${isContent ? activeClass : hoverClass}`}
            >
              <div className="flex items-center gap-3">
                <BookCheck className="h-4 w-4" />
                <span>Content</span>
              </div>
              {openContentDropdown ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {openContentDropdown && (
              <div className="ml-6 mt-1 space-y-1">
                <Link
                  href="/backoffice/en/content/visi"
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
                  href="/backoffice/en/content/misi"
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
            <span>Repository</span>
          </Link>
          <Link
            href="https://laravel.com/docs/starter-kits#react"
            className="flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentation</span>
          </Link>
        </div> */}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
