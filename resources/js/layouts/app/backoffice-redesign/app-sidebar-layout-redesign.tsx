import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebarRedesign } from '@/components/app-sidebar-redesign';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayoutRedesign({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <div className="min-h-screen w-full overflow-x-hidden">
            <AppShell variant="sidebar">
                <AppSidebarRedesign />

                <AppContent
                    variant="sidebar"
                    className="min-w-0 flex-1"
                >
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </AppShell>
        </div>
    );
}