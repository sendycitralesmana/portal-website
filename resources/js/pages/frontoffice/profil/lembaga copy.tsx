import React, { ReactNode } from "react";
import { Head } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import { AppContainer } from "@/components/ui/app-container";
import MainLayout from "../layout/main";

// ✅ Extend React.FC to support 'layout' property
type InertiaPage = React.FC & {
  layout?: (page: ReactNode) => ReactNode;
};

const ProfilLembagaPage: InertiaPage = () => {
  return (
    <>
      <Head title="Profil LPSK" />
      <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      <div className="flex flex-col gap-10">
        {/* Header Banner */}
        <div className="h-[400px] w-full bg-background relative">
          <div className="absolute inset-0 bg-slate-800">
            <img
              src="/images/fondasi.png"
              alt="Fondasi"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-3xl font-bold text-slate-100">Sekilas LPSK</h1>
          </div>
        </div>

        {/* VISI */}
        <div className="w-full bg-background">
          <AppContainer>
            <div className="grid grid-cols-6 md:grid-cols-12 h-full gap-5 py-5">
              <div className="col-span-6 px-3 xl:px-5 flex flex-col justify-center space-y-2">
                <h1 className="font-bold max-w-2xl text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">VISI</h1>
                <p className="font-bold">
                  ”Terwujudnya perlindungan saksi dan korban dalam sistem peradilan pidana”
                </p>
                <p>
                  Visi ini mengandung maksud bahwa LPSK yang diberikan mandat oleh
                  undang-undang selaku focal point dalam pemberian perlindungan saksi dan
                  korban harus mampu mewujudkan suatu kondisi dimana saksi dan korban benar-benar
                  merasa terlindungi dan dapat mengungkap kasus dalam peradilan pidana.
                </p>
              </div>
              <div className="col-span-6 xl:px-5 group">
                <div className="h-[300px] md:h-full w-full overflow-hidden rounded relative">
                  <img
                    src="/images/banner/lpsk-1.jpg"
                    alt="Visi LPSK"
                    className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </AppContainer>
        </div>

        {/* MISI */}
        <div className="w-full bg-background">
          <AppContainer>
            <div className="grid grid-cols-6 md:grid-cols-12 h-full gap-5 py-5">
              <div className="col-span-6 xl:px-5 group">
                <div className="h-[300px] md:h-full w-full overflow-hidden rounded relative">
                  <img
                    src="/images/banner/lpsk-2.jpeg"
                    alt="Misi LPSK"
                    className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="col-span-6 px-3 xl:px-5 flex flex-col justify-center space-y-2">
                <h1 className="font-bold max-w-2xl text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">MISI</h1>
                <p>
                  Dalam rangka mewujudkan visi di atas, Lembaga Saksi dan Korban memiliki misi sebagai berikut:
                </p>
                <ul className="list-disc pl-5">
                  <li>Mewujudkan perlindungan dan pemenuhan hak-hak bagi saksi dan korban dalam peradilan pidana.</li>
                  <li>Mewujudkan kelembagaan yang profesional dalam memberikan perlindungan dan pemenuhan hak-hak bagi saksi dan korban.</li>
                  <li>Memperkuat landasan hukum dan kemampuan dalam pemenuhan hak-hak saksi dan korban.</li>
                  <li>Mewujudkan dan mengembangkan jejaring dengan para pemangku kepentingan dalam rangka pemenuhan hak saksi dan korban.</li>
                  <li>Mewujudkan kondisi yang kondusif serta partisipasi masyarakat dalam perlindungan saksi dan korban.</li>
                </ul>
              </div>
            </div>
          </AppContainer>
        </div>

        {/* WEWENANG */}
        <section className="w-full">
          <AppContainer className="space-y-5">
            <h1 className="text-center font-bold sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">WEWENANG</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-3">
              {[
                "Meminta keterangan secara lisan dan / atau tertulis dari pemohon dan pihak lain yang terkait dengan permohonan",
                "Menelaah keterangan, surat, dan/atau dokumen yang terkait untuk mendapatkan kebenaran atas permohonan",
                "Meminta salinan atau fotokopi surat dan/atau dokumen terkait dari instansi manapun",
                "Meminta informasi perkembangan kasus dari penegak hukum",
                "Mengubah identitas terlindung sesuai dengan ketentuan peraturan perundang-undangan",
                "Mengelola rumah aman",
                "Memindahkan atau merelokasi terlindung ke tempat yang lebih aman",
                "Melakukan pengamanan dan pengawalan",
                "Melakukan pendampingan Saksi dan/atau Korban dalam proses peradilan",
                "Melakukan penilaian ganti rugi dalam pemberian Restitusi dan Kompensasi",
              ].map((item, idx) => (
                <Card key={idx} className="pt-5">
                  <CardContent className="text-center">
                    <p>{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AppContainer>
        </section>
      </div>
    </>
  );
};

// ✅ Properly assign layout function
ProfilLembagaPage.layout = (page: ReactNode) => <MainLayout>{page}</MainLayout>;

export default ProfilLembagaPage;
