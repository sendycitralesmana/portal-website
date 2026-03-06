import { Head } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../layout/main";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

const DetailPublikasi: PageWithLayout = () => {
  return (
    <>
      <Head title="Siaran Pers - OJK" />

      <div className="min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Publikasi / Siaran Pers /{" "}
            <span className="font-semibold">
              OJK Beri Sanksi Pegiat Media Sosial dan Pelaku Manipulasi Harga di Pasar Modal
            </span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
              Siaran Pers: OJK Beri Sanksi Pegiat Media Sosial dan Pelaku Manipulasi Harga di Pasar Modal
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8">

          {/* Date */}
          <p className="text-sm text-gray-600 mb-6">
            20 Februari 2026
          </p>

          {/* Image */}
          <div className="mb-6">
            <img
              src="/images/background.webp"
              alt="Siaran Pers OJK"
              className="w-full max-h-[420px] object-cover rounded-lg"
            />
          </div>

          {/* Attachment */}
          <div className="mb-8">
            <a
              href="#"
              className="text-red-700 text-sm font-medium hover:underline"
            >
              📄 SP 38 OJK Beri Sanksi Pegiat Media Sosial dan Pelaku Manipulasi Harga di Pasar Modal.pdf
            </a>
          </div>

          {/* Article Content */}
          <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">

            <p className="text-right font-medium">
              SP 38/GKPB/OJK/II/2026
            </p>

            <p className="text-center font-bold mt-6">
              SIARAN PERS
            </p>

            <p className="text-center font-semibold mb-6">
              OJK BERI SANKSI PEGIAT MEDIA SOSIAL DAN PELAKU MANIPULASI HARGA DI PASAR MODAL
            </p>

            <p>
              Jakarta, 20 Februari 2026. Otoritas Jasa Keuangan (OJK) pada Jumat ini menetapkan
              sanksi administratif kepada seorang pegiat media sosial pasar modal dan kepada
              tiga pihak yang terbukti melakukan manipulasi harga perdagangan saham.
            </p>

            <p>
              Penetapan sanksi ini merupakan bentuk komitmen pengawasan dan langkah tegas OJK
              dalam menegakkan ketentuan peraturan perundang-undangan di bidang Pasar Modal.
            </p>

            <p>
              OJK menetapkan sanksi berupa denda sebesar Rp5,35 miliar kepada pegiat media sosial
              atas pelanggaran manipulasi harga dengan modus penyebaran informasi di media sosial.
            </p>

            <p className="mt-6 font-semibold">
              Manipulasi Harga
            </p>

            <p>
              OJK juga menetapkan sanksi administratif berupa denda kepada tiga pihak
              pada perdagangan saham PT Impack Pratama Industri Tbk (IMPC).
            </p>

            <p>
              Pengenaan sanksi ini merupakan bagian dari komitmen berkelanjutan OJK dalam
              memperkuat integritas, transparansi, dan kepercayaan publik terhadap industri
              Pasar Modal Indonesia.
            </p>

            <p className="mt-8 text-center">***</p>

            <p className="mt-6">
              Informasi lebih lanjut: <br />
              Kepala Departemen Literasi, Inklusi Keuangan dan Komunikasi – M. Ismail Riyadi. <br />
              Telp. (021) 29600000 <br />
              Email: humas@ojk.go.id
            </p>

          </div>

          {/* Artikel Lain */}
          <div className="mt-12">
            <h3 className="text-base md:text-lg font-semibold mb-4">
              Artikel Lain
            </h3>

            <div className="w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mb-4"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map((item) => (
                <div
                  key={item}
                  className="border rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition"
                >
                  <div
                    className="h-32 md:h-40 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/background.webp')" }}
                  />

                  <div className="p-3 text-xs md:text-sm font-medium leading-snug">
                    Siaran Pers: Contoh Judul Artikel Lain
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

DetailPublikasi.layout = (page: ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

export default DetailPublikasi;