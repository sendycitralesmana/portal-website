import React, { ReactNode } from 'react';
import { EnHeader } from '../components/header';
import { EnFooter } from '../components/footer';
import { ThemeProvider } from '@/components/theme-provider';
import FloatingWidget from '../components/floating-widget';

interface MainLayoutProps {
  children: ReactNode;
}

const EnMainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <EnHeader />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
        <main className="w-full overflow-x-hidden">{children}</main>
        <FloatingWidget />
        <EnFooter />
      </ThemeProvider>
    </>
  );
};

export default EnMainLayout;