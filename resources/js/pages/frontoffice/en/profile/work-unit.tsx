import React from 'react';
import { AppContainer } from '@/components/ui/app-container';
import MainLayout from '../layout/main';
import { Head, usePage } from '@inertiajs/react';

type WorkUnitItem = {
  title: string;
  content: string;
};

type PageProps = {
  workUnits: WorkUnitItem[];
};

const RoadmapPage = () => {

  const { workUnits } = usePage<PageProps>().props;
  console.log(workUnits);

  return (
    <div className="flex flex-col">
      <Head title="Unit Kerja">
        <meta name="description" content="Halaman Unit Kerja" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Title */}
      <div className="w-full mt-10 mb-10 text-center">
        <AppContainer>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-[color:var(--primary-navy)] dark:text-white mx-auto leading-snug">
            WORK UNIT IN THE WITNESS AND VICTIM PROTECTION AGENCY
          </h1>
        </AppContainer>
      </div>

      {/* Content */}
      <section className="container w-full space-y-12 mt-6 text-justify text-gray-800">
        {workUnits.map((workUnit, index) => (
          <div key={index}>
            <p className="font-bold text-xl text-[color:var(--primary-navy)] dark:text-white mb-2">
              {index + 1}. {workUnit.title}
            </p>
            <div className='leading-relaxed'>
              <div dangerouslySetInnerHTML={{ __html: workUnit.content }} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

RoadmapPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>;

export default RoadmapPage;
