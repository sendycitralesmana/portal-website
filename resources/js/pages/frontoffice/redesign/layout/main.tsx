import React, { ReactNode, useEffect, useRef } from 'react';
import { usePage } from '@inertiajs/react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from './header';
import Footer from './footer';
import FloatingWidget from '../../components/floating-widget';

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-42VXE6R9XM';

// Deklarasi Google Analytics untuk TypeScript
declare global {
    interface Window {
        dataLayer: unknown[][];
        gtag: (...args: unknown[]) => void;
    }
}

interface MainLayoutProps {
    children: ReactNode;
}

interface Settings {
    zoom?: string | number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { props, url } = usePage();

    const settings = (props as { settings?: Settings }).settings;

    // Mencegah page_view tercatat dua kali
    const lastTrackedPath = useRef<string | null>(null);

    // 1. Inisialisasi Google Analytics
    useEffect(() => {
        // Siapkan dataLayer dan fungsi gtag
        window.dataLayer = window.dataLayer || [];

        if (!window.gtag) {
            window.gtag = (...args: unknown[]) => {
                window.dataLayer.push(args);
            };
        }

        // Pastikan script tidak dipasang berulang kali
        if (!document.getElementById('google-analytics-script')) {
            const script = document.createElement('script');

            script.id = 'google-analytics-script';
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

            document.head.appendChild(script);
        }

        // Konfigurasi Google Analytics
        window.gtag('js', new Date());

        window.gtag('config', GA_MEASUREMENT_ID, {
            send_page_view: false,
        });

    }, []);

    // 2. Tracking setiap perpindahan halaman Inertia.js
    useEffect(() => {
        if (!window.gtag) return;

        // Hanya gunakan pathname agar query string
        // yang mungkin mengandung informasi sensitif tidak terkirim
        const pagePath = new URL(url, window.location.origin).pathname;

        // Hindari pencatatan ganda
        if (lastTrackedPath.current === pagePath) return;

        lastTrackedPath.current = pagePath;

        window.gtag('event', 'page_view', {
            page_title: document.title,
            page_location: `${window.location.origin}${pagePath}`,
            page_path: pagePath,
        });

    }, [url]);

    // 3. Pengaturan zoom website
    useEffect(() => {
        document.body.style.zoom = `${settings?.zoom ?? 100}%`;
    }, [settings?.zoom]);

    return (
        <ThemeProvider
            defaultTheme="light"
            storageKey="vite-ui-theme"
        >
            <Header />

            <link
                rel="icon"
                href="/images/favicon.ico"
                type="image/x-icon"
            />

            <main className="w-full overflow-x-hidden">
                {children}
            </main>

            <FloatingWidget />

            <Footer />
        </ThemeProvider>
    );
};

export default MainLayout;