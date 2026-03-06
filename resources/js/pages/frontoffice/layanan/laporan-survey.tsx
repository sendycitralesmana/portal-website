import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AppContainer } from "@/components/ui/app-container";
import { DownloadCloudIcon, FileIcon } from "lucide-react";
import { Hero } from "./_components/hero";
import MainLayout from "../layout/main";
import { Head } from "@inertiajs/react";

const AppPage = () => {
  return (
    <div className="space-y-10">
      <Head title="Layanan">
          <meta name="description" content="Halaman Layanan" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <Hero title="Laporan Survey Kepuasan Masyarakat" />

      <AppContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {["2020", "2021", "2022", "2023"].map((year) => (
            <Card key={year}>
              <CardHeader className="flex justify-center items-center">
                <FileIcon size={50} />
              </CardHeader>
              <CardContent className="text-center">
                <p>Laporan SKM {year}</p>
              </CardContent>
              <CardFooter className="flex justify-center items-center">
                <Button asChild>
                  {/* <a
                    target="_blank"
                    href={`/layanan/laporan-survey-${year}.pdf`}
                    className="flex gap-2"
                  >
                    <DownloadCloudIcon /> Unduh
                  </a> */}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </AppContainer>
    </div>
  );
};

AppPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default AppPage;
