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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const MaklumatPelayananPage = () => {
  return (
    <div className="space-y-10">
      <Head title="Layanan">
        <meta name="description" content="Halaman Layanan" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <Hero title="Maklumat Pelayanan" />
      <AppContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {/* <Card>
            <CardHeader className="flex justify-center items-center">
              <FileIcon size={50} />
            </CardHeader>
            <CardContent className="text-center">
              <p>Maklumat</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button asChild className="bg-blue-900 hover:bg-blue-800">
                <a
                  // download
                  href="/layanan/maklumat-pelayanan-preview"
                  className="flex gap-2"
                  target="_blank"
                >
                  <DownloadCloudIcon /> Unduh
                </a>
              </Button>
            </CardFooter>
          </Card> */}
          <Card>
            <CardHeader className="flex justify-center items-center">
              <FileIcon size={50} />
            </CardHeader>
            <CardContent className="text-center">
              <p>Maklumat</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button asChild className="bg-blue-900 hover:bg-blue-800">
                <a
                  href="/images/layanan/maklumat-pelayanan.jpg"
                  download
                  className="flex gap-2"
                >
                  <DownloadCloudIcon /> Unduh
                </a>
              </Button>
            </CardFooter>
          </Card>
          {/* <Card>
            <CardHeader className="flex justify-center items-center">
              <FileIcon size={50} />
            </CardHeader>
            <CardContent className="text-center">
              <p>Maklumat</p>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-900 hover:bg-blue-800 flex gap-2">
                  <DownloadCloudIcon /> Lihat Gambar
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[1000px] h-[562px] p-0">
                <img
                  src="/images/layanan/maklumat-pelayanan.jpg"
                  alt="Maklumat Pelayanan"
                  className="w-full h-full object-cover rounded"
                />
              </DialogContent>
            </Dialog>
            </CardFooter>
          </Card> */}
        </div>
      </AppContainer>
    </div>
  );
};

MaklumatPelayananPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default MaklumatPelayananPage;
