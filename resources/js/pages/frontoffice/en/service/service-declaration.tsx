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

const ServiceDeclarationPage = () => {
  return (
    <div className="space-y-10">
      <Head title="Service">
        <meta name="description" content="Halaman Layanan" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <Hero title="Service Declaration" />
      <AppContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          <Card>
            <CardHeader className="flex justify-center items-center">
              <FileIcon size={50} />
            </CardHeader>
            <CardContent className="text-center">
              <p>Service Declaration</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button asChild className="bg-blue-900 hover:bg-blue-800">
                <a
                  // download
                  href="/en/service/service-declaration-preview"
                  className="flex gap-2"
                  target="_blank"
                >
                  <DownloadCloudIcon /> Download
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </AppContainer>
    </div>
  );
};

ServiceDeclarationPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default ServiceDeclarationPage;
