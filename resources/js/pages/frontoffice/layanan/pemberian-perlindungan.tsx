import React from "react";
import { Hero } from "./_components/hero";
import { AppContainer } from "@/components/ui/app-container";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DownloadCloudIcon, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "../layout/main";
import { Head } from "@inertiajs/react";

const AppPage = () => {
  return (
    <div className="space-y-10">
      <Head title="Layanan">
          <meta name="description" content="Halaman Layanan" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <Hero title="Standar Pelayanan Pemberian Perlindungan" />

      <AppContainer className="relative">
        <img
          src="/images/layanan/pemberian-perlindungan.webp"
          alt="Standar Pelayanan Pemberian Perlindungan"
          className="w-full h-auto"
        />
      </AppContainer>

      <AppContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <Card>
            <CardHeader className="flex justify-center items-center">
              <FileIcon size={50} />
            </CardHeader>
            <CardContent className="text-center">
              <p>
                18-20 Peraturan LPSK No. 1 Tahun 2024 tentang Standar Pelayanan di Lingkungan LPSK
              </p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button asChild className="bg-blue-900 hover:bg-blue-800">
                <a
                  target="_blank"
                  href="/layanan/pemberian-perlindungan-preview"
                  className="flex gap-2"
                >
                  <DownloadCloudIcon /> Unduh
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppContainer>
    </div>
  );
};

AppPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default AppPage;
