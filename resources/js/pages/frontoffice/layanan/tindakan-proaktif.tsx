import React from "react";
import { DownloadCloudIcon, FileIcon } from "lucide-react";
import { Hero } from "./_components/hero";
import { AppContainer } from "@/components/ui/app-container";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
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
      <Hero title="Standar Pelayanan Tindakan Proaktif" />
      <AppContainer className="relative">
        <img
          src="/images/layanan/tindakan-proaktif.webp"
          alt="Standar Pelayanan"
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
                12-14 Peraturan LPSK No. 1 Tahun 2024 tentang Standar Pelayanan di Lingkungan LPSK
              </p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button asChild className="bg-blue-900 hover:bg-blue-800">
                <a
                  target="_blank"
                  href="/layanan/tindakan-proaktif-preview"
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