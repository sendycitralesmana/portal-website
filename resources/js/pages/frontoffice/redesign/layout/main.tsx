// import React, { ReactNode } from 'react';
// import { ThemeProvider } from '@/components/theme-provider';
// import Header from './header';
// import Footer from './footer';
// import FloatingWidget from '../../components/floating-widget';

// interface MainLayoutProps {
//   children: ReactNode;
// }

// const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  
//   return (
//     <>
//       <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
//         <Header/>
//         <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
//         <main className="w-full overflow-x-hidden">{children}</main>
//         <FloatingWidget />
//         <Footer />
//       </ThemeProvider>
//     </>
//   );
// };

// export default MainLayout;


import React, { ReactNode, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from './header';
import Footer from './footer';
import FloatingWidget from '../../components/floating-widget';

interface MainLayoutProps {
    children: ReactNode;
}

interface Settings {
    zoom?: string | number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const { props } = usePage();

    const settings = (props as { settings?: Settings }).settings;

    useEffect(() => {
        document.body.style.zoom = `${settings?.zoom ?? 100}%`;
    }, [settings?.zoom]);

    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <Header />
            <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
            <main className="w-full overflow-x-hidden">
                {children}
            </main>
            <FloatingWidget />
            <Footer />
        </ThemeProvider>
    );
};

export default MainLayout;


// import { ThemeProvider } from '@/components/theme-provider';
// import axios from 'axios';
// import React, { ReactNode, useEffect, useRef } from 'react';
// import FloatingWidget from '../../components/floating-widget';
// import Footer from './footer';
// import Header from './header';

// interface MainLayoutProps {
//     children: ReactNode;
// }

// const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
//     const zoomRef = useRef('100');

//     useEffect(() => {
//         const loadZoom = async () => {
//             try {
//                 const { data } = await axios.get('/redesign/api/tentang-kami');

//                 zoomRef.current = data.zoom ?? '100';

//                 document.body.style.setProperty('zoom', `${zoomRef.current}%`, 'important');
//             } catch (error) {
//                 console.error('Failed to load zoom:', error);
//             }
//         };

//         loadZoom();

//         return () => {
//             document.body.style.setProperty('zoom', `${zoomRef.current}%`, 'important');
//         };
//     }, []);

//     return (
//         <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
//             <Header />
//             <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
//             <main className="w-full overflow-x-hidden">{children}</main>
//             <FloatingWidget />
//             <Footer />
//         </ThemeProvider>
//     );
// };

// export default MainLayout;
