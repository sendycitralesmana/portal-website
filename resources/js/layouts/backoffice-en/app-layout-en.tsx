import { Toaster } from '@/components/ui/sonner';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import AppLayoutTemplateEn from '@/layouts/app/backoffice-en/app-sidebar-layout-en';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutEnProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutEnProps) => (
    <AppLayoutTemplateEn breadcrumbs={breadcrumbs} {...props}>
        {children}
        <Toaster richColors position='top-right'/>
    </AppLayoutTemplateEn>
);
