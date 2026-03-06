// resources/js/Pages/WorkUnitPage.tsx

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import EnMainLayout from '../layout/main';

const WorkUnitPage = () => {
  return (
    <>
      <Head title="Profile">
        <meta name="description" content="Work Units Page" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <main className="space-y-10 w-screen">
        <section className="h-[400px] w-full bg-background">
          <div className="flex w-full h-full justify-center items-center relative">
            <div className="h-full w-full absolute bg-slate-800">
              <img
                src="/images/fondasi.png"
                alt="Foundation"
                className="object-cover w-full h-full opacity-50"
              />
            </div>
            <div className="absolute inset-0 h-full w-full flex flex-col gap-2 justify-center items-center">
              <h1 className="text-3xl font-bold text-slate-100">
                Work Units of the Witness and Victim Protection Agency
              </h1>
            </div>
          </div>
        </section>

        <section className="container w-full space-y-10 mt-10">
          <div className="w-full grid grid-cols-4 gap-5">
            <Card className="col-span-4 p-10 text-center">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                    Secretariat General
                  </AccordionTrigger>
                  <AccordionContent>
                    The Secretariat General of the Witness and Victim Protection Agency (LPSK), hereinafter referred to as the Secretariat General, is led by the Secretary General. The Secretary General reports directly to the LPSK Leadership. <br /><br />
                    The Secretariat General is responsible for providing administrative and substantive support to LPSK. Its functions include: <br />
                    a. Coordinating, synchronizing, and integrating LPSK administrative activities;<br />
                    b. Preparing plans and programs;<br />
                    c. Managing general administration, human resources, finance, logistics, cooperation, public relations, archives, and documentation;<br />
                    d. Drafting regulations, legal advocacy, organizational structuring, and procedures;<br />
                    e. Managing state-owned assets and procurement services;<br />
                    f. Providing legal analysis and opinions;<br />
                    g. Supporting application processing and fulfillment of rights for witnesses and victims;<br />
                    h. Monitoring internal duties of the Secretariat General;<br />
                    i. Performing other tasks assigned by LPSK Leadership.<br /><br />
                    The Secretariat General consists of:<br /><br />
                    <strong>a. Bureau of General Affairs and Human Resources</strong><br />
                    Responsible for planning, treasury, finance, IT systems, correspondence, archives, reporting, HR, membership, asset management, and procurement services. Functions include:<br />
                    1) Preparing program plans and reports;<br />
                    2) Managing treasury, accounting, and financial verification;<br />
                    3) Overseeing logistics, IT, and data systems;<br />
                    4) Managing HR, membership, and staff development;<br />
                    5) Handling general administration, correspondence, archives, and library management;<br />
                    6) Managing state-owned assets and procurement services;<br />
                    7) Conducting monitoring, evaluation, and reporting in LPSK and the Secretariat General.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="col-span-1 p-10 text-center h-fit">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                    Application Review Bureau
                  </AccordionTrigger>
                  <AccordionContent>
                    Responsible for providing legal analysis and application support services for witnesses and victims. Functions include:<br />
                    1) Receiving, reviewing, investigating, and assessing applications;<br />
                    2) Providing legal analysis and opinions;<br />
                    3) Facilitating compensation/restitution calculations and emergency protection;<br />
                    4) Supporting court processes and managing verdict documentation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="col-span-1 p-10 text-center h-fit">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                    Witness and Victim Rights Fulfillment Bureau
                  </AccordionTrigger>
                  <AccordionContent>
                    Responsible for ensuring the fulfillment of rights for witnesses and victims. Functions include:<br />
                    1) Providing protection services and procedural rights support;<br />
                    2) Facilitating access to compensation, restitution, and aid for witnesses and victims.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="col-span-1 p-10 text-center h-fit">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                    Legal Affairs, Cooperation, and Public Relations Bureau
                  </AccordionTrigger>
                  <AccordionContent>
                    Responsible for drafting laws, legal advocacy, organizational development, cooperation, public relations, and protocol. Functions include:<br />
                    1) Coordinating and drafting regulations;<br />
                    2) Coordinating legal advocacy and legal opinions;<br />
                    3) Organizing structural and procedural development;<br />
                    4) Coordinating institutional cooperation;<br />
                    5) Coordinating public relations and official protocol.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="col-span-1 p-10 text-center h-fit">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-center text-xl font-bold text-[color:var(--primary-navy)] dark:text-white">
                    Bureau of General Affairs and Human Resources
                  </AccordionTrigger>
                  <AccordionContent>
                    Responsible for planning and programming, treasury, finance, logistics, IT, general administration, HR, membership, asset management, and procurement services. Functions include:<br />
                    1) Preparing plans and reports;<br />
                    2) Managing treasury, accounting, and verification;<br />
                    3) Overseeing household services, IT, and data systems;<br />
                    4) Managing HR, membership, and staff development;<br />
                    5) Handling administration, correspondence, archiving, and library services;<br />
                    6) Managing assets and procurement services;<br />
                    7) Conducting monitoring, evaluation, and reporting in LPSK and the Secretariat General.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
};

WorkUnitPage.layout = (page: React.ReactNode) => <EnMainLayout children={page} />;

export default WorkUnitPage;
