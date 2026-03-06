import React, { ReactNode } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import FloatingWidget from '../components/floating-widget';
import { EnHeader } from '../en/components/header';
import { EnFooter } from '../en/components/footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        {/* <main>{children}</main> */}
        {/* Perbaikan: Tambahkan w-full dan overflow-x-hidden */}
        <main className="w-full overflow-x-hidden">{children}</main>
        <FloatingWidget />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default MainLayout;