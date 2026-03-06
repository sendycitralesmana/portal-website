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

const EmergencyProtectionPage = () => {
  return (
    <div className="space-y-10">
      <Head title="Service">
          <meta name="description" content="Halaman Layanan" />
          <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <Hero title="Emergency Service Provision Standards" />
      <AppContainer className=" relative">
        <img
          src={"/images/layanan/pemberian-perlindungan-darurat.webp"}
          alt=""
          height={1000}
          width={1000}
          className=" w-full h-auto"
        />
      </AppContainer>
      <AppContainer>
          <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <Card>
              <CardHeader className="flex justify-center place-items-center">
                <FileIcon size={50} />
              </CardHeader>
              <CardContent className="text-center">
                <p>
                15-17 LPSK Regulation No. 1 of 2024 concerning Service Standards in the LPSK Environment.pdf15-17 LPSK Regulation No. 1 of 2024 concerning Service Standards in the LPSK Environment
                </p>
              </CardContent>
              <CardFooter className="flex justify-center place-items-center">
                <Button asChild className="bg-blue-900 hover:bg-blue-800">
                  <a
                    target="_blank"
                    href="/en/service/emergency-protection-preview"
                    className="flex gap-2"
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

EmergencyProtectionPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default EmergencyProtectionPage;
