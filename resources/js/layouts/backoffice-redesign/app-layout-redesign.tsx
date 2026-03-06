import { Toaster, toast } from 'sonner';
import AppLayoutTemplateRedesign from '@/layouts/app/backoffice-redesign/app-sidebar-layout-redesign';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect } from 'react';
import { Head, usePage } from '@inertiajs/react';

interface AppLayoutRedesignProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayoutRedesign({
    children,
    breadcrumbs,
    ...props
}: AppLayoutRedesignProps) {
    const { flash } = usePage().props as any;

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success, {
                id: 'flash-success',
            });
        }

        if (flash?.error) {
            toast.error(flash.error, {
                id: 'flash-error',
            });
        }
    }, [flash]);

    return (
        <AppLayoutTemplateRedesign
            breadcrumbs={breadcrumbs}
            {...props}
        >
            <div className="p-6">
                <Head>
                    <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
                </Head>
                {children}
            </div>

            {/* Toaster wajib ada */}
            <Toaster position="top-right" richColors />
        </AppLayoutTemplateRedesign>
    );
}