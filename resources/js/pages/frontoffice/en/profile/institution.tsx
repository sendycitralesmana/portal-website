import React from "react"
import { AppContainer } from "@/components/ui/app-container"
import { Download } from "lucide-react"
import MainLayout from "../layout/main"
import { Head, usePage } from "@inertiajs/react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

type InstitutionItem = {
  id: number
  history: string
  legal_basis: string
  document_url: string
  document_full_url: string
  vision_cover: string
  vision_cover_url: string
  vision: string
  mission_cover: string
  mission_cover_url: string
  mission: string
  authority: string
}

type PageProps = {
  institution: InstitutionItem
}

const InstitutionPage = () => {
  const { institution } = usePage<PageProps>().props
  console.log(institution)

  return (
    <div className="flex flex-col">
      <Head title="Profil Lembaga">
        <meta name="description" content="Halaman Profil Lembaga" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>

      {/* Breadcrumb */}
      {/* <div className="mt-6 md:mt-10 mb-6 md:mb-12">
        <AppContainer>
          <Breadcrumb>
            <BreadcrumbList className="text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white">
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="font-semibold">
                  Beranda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-semibold text-[color:var(--primary-navy)] dark:text-white">Profil</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bold text-[color:var(--primary-navy)] dark:text-white">
                  Profil Lembaga
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </AppContainer>
      </div> */}

      {/* Page Title (left aligned) */}
      <div className="mb-10 mt-10">
        <AppContainer>
          <h1 className="text-xl text-center md:text-2xl lg:text-3xl font-extrabold text-[color:var(--primary-navy)] dark:text-white leading-snug">
            INSTITUTION PROFILE
          </h1>
        </AppContainer>
      </div>

      {/* Content */}
      <div className="mb-20">
        <AppContainer>
          {institution && (
            <div className=" space-y-20 text-justify text-gray-800 text-sm md:text-base">
              {/* Sejarah */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-blue-900 uppercase dark:text-white">History of the Birth of LPSK</h2>
                <div
                  className="prose max-w-none prose-sm md:prose-base text-semibold dark:text-white"
                  dangerouslySetInnerHTML={{ __html: institution.history }}
                />
              </section>

              {/* Dasar Hukum */}
              <section className="space-y-3">
                <h2 className="text-lg font-bold text-blue-900 uppercase dark:text-white">Legal basis</h2>
                <div
                  className="prose max-w-none prose-sm md:prose-base dark:text-white"
                  dangerouslySetInnerHTML={{ __html: institution.legal_basis }}
                />
                {/* {institution.document_url && (
                  <div className="pt-3 pl-6">
                    <a
                      href="/profil/lembaga-preview"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm font-medium transition"
                    >
                      <Download size={16} /> Unduh Dokumen Dasar Hukum
                    </a>
                  </div>
                )} */}
              </section>

              {/* Tugas dan Fungsi */}
              <section className="">
                <h2 className="text-lg font-bold text-blue-900 uppercase dark:text-white">
                  Duties and Functions
                </h2>
                <div
                  className="prose text-justify prose-sm md:prose-base dark:text-white"
                  dangerouslySetInnerHTML={{ __html: institution.authority }}
                />
              </section>

              {/* Visi */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="md:order-2">
                  <img
                    src={institution.vision_cover_url}
                    alt="Visi"
                    className="w-full max-h-72 object-cover rounded shadow"
                  />
                </div>
                <div className="md:col-span-2 md:order-1 space-y-3 xl:pl-32">
                  <h2 className="text-lg font-bold text-blue-900 uppercase dark:text-white">Visi</h2>
                  <div
                    className="prose max-w-none prose-sm md:prose-base dark:text-white"
                    dangerouslySetInnerHTML={{ __html: institution.vision }}
                  />
                </div>
              </section>

              {/* Misi */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div>
                  <img
                    src={institution.mission_cover_url}
                    alt="Misi"
                    className="w-full max-h-72 object-cover rounded shadow"
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <h2 className="text-lg font-bold text-blue-900 uppercase dark:text-white">Misi</h2>
                  <div
                    className="prose max-w-none prose-sm md:prose-base dark:text-white"
                    dangerouslySetInnerHTML={{ __html: institution.mission }}
                  />
                </div>
              </section>
            </div>
          )}
        </AppContainer>
      </div>
    </div>
  )
}

InstitutionPage.layout = (page: React.ReactNode) => <MainLayout>{page}</MainLayout>

export default InstitutionPage
