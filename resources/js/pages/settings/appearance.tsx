import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import AppLayoutRedesign from '@/layouts/backoffice-redesign/app-layout-redesign';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: '/settings/appearance',
    },
];

export default function Appearance() {
    return (
        <AppLayoutRedesign breadcrumbs={breadcrumbs}>
            <Head title="Profile Settings">
                <meta name="description" content="Halaman Profile Settings" />
                <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            </Head>

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Appearance settings" description="Update your account's appearance settings" />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayoutRedesign>
    );
}
