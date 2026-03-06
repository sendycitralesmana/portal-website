import React, { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import Header from './header';
import Footer from './footer';
import FloatingWidget from '../../components/floating-widget';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Header/>
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <main className="w-full overflow-x-hidden">{children}</main>
        <FloatingWidget />
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default MainLayout;