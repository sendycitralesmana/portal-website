import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AppContainer } from '@/components/ui/app-container';
import { DownloadCloudIcon, FileIcon } from 'lucide-react';
import MainLayout from '../layout/main';
import { Head } from '@inertiajs/react';

const RoadmapPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Head title="Profile">
        <meta name="description" content="Halaman Roadmap" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="h-[400px] w-full bg-background">
        <div className="flex w-full h-full justify-center items-center relative">
          <div className="h-full w-full absolute bg-slate-800">
            <img
              src="/images/fondasi.png"
              alt="Roadmap Background"
              className="object-cover w-full h-full opacity-50"
            />
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-3xl font-bold text-slate-100">Road Map & Strategy Plan</h1>
          </div>
        </div>
      </div>

      <div className="w-full">
        <AppContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[1, 2, 3].map((_, idx) => (
              <Card key={idx}>
                <CardHeader className="flex justify-center items-center">
                  <FileIcon size={50} />
                </CardHeader>
                <CardContent className="text-center">
                  <p>Roadmap 2018</p>
                </CardContent>
                <CardFooter className="flex justify-center items-center">
                  <Button className="flex gap-2 bg-blue-900 hover:bg-blue-700 dark:text-white">
                    <DownloadCloudIcon /> Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </AppContainer>
      </div>
    </div>
  );
};

RoadmapPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default RoadmapPage;
