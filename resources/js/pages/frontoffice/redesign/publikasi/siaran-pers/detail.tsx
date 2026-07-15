import { Head, Link } from "@inertiajs/react";
import { ReactElement, ReactNode } from "react";
import MainLayout from "../../layout/main";

type PageWithLayout<P = {}> = {
  (props: P): ReactElement;
  layout?: (page: ReactElement) => ReactNode;
};

interface SiaranPers {
  id: number;
  title: string;
  date: string;
  image: string;
  content: string[];
}

interface ArtikelLain {
  id: number;
  title: string;
  image: string;
}

/**
 * =========================
 * CLASS DATA DETAIL
 * =========================
 */
class PublikasiDetailData {
  static siaranPers: SiaranPers = {
    id: 1,
    title:
      "Siaran Pers: LPSK Tegaskan Komitmen Negara Hadir Melindungi Saksi dan Korban",
    date: "20 Februari 2026",
    image: "/images/background.webp",
    content: [
      "Jakarta, 20 Februari 2026. Lembaga Perlindungan Saksi dan Korban (LPSK) menegaskan komitmennya dalam memastikan negara hadir memberikan perlindungan maksimal bagi saksi dan korban tindak pidana.",
      "Perlindungan tersebut meliputi perlindungan fisik, bantuan medis, rehabilitasi psikologis, hingga fasilitasi pengajuan restitusi dan kompensasi bagi korban.",
      "LPSK terus memperkuat koordinasi dengan aparat penegak hukum guna menjamin keamanan saksi selama proses peradilan berlangsung.",
      "Langkah ini merupakan bagian dari upaya memperkuat sistem peradilan yang berkeadilan dan berperspektif korban.",
      "LPSK juga mengimbau masyarakat untuk tidak ragu mengajukan permohonan perlindungan apabila menghadapi ancaman akibat proses hukum yang dijalani.",
    ],
  };
}

/**
 * =========================
 * CLASS DATA ARTIKEL LAIN
 * =========================
 */
class PublikasiRelatedData {
  static artikelLain: ArtikelLain[] = [
    {
      id: 2,
      title:
        "Siaran Pers: LPSK Perkuat Sinergi Nasional dalam Perlindungan Korban",
      image: "/images/background.webp",
    },
    {
      id: 3,
      title:
        "Siaran Pers: LPSK Fasilitasi Pengajuan Restitusi bagi Korban Kekerasan",
      image: "/images/background.webp",
    },
    {
      id: 4,
      title:
        "Siaran Pers: LPSK Tingkatkan Layanan Darurat Perlindungan Saksi",
      image: "/images/background.webp",
    },
    {
      id: 5,
      title:
        "Siaran Pers: LPSK Dorong Kolaborasi Pemerintah Daerah Lindungi Korban",
      image: "/images/background.webp",
    },
  ];
}

const DetailPublikasi: PageWithLayout = () => {
  const data = PublikasiDetailData.siaranPers;
  const artikelLain = PublikasiRelatedData.artikelLain;

  return (
    <>
      <Head title={data.title}>
        <meta name="description" content="Halaman Detail Siaran Pers" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-l from-red-700 to-red-900 py-3 text-xs md:text-sm text-white border-b-amber-400 border-b-2">
          <div className="container mx-auto px-4">
            Publikasi / Siaran Pers /{" "}
            <span className="font-semibold">{data.title}</span>
          </div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-900 py-6 md:py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl md:text-2xl font-semibold text-white leading-snug">
              {data.title}
            </h2>
          </div>
        </div>

        {/* Content */}
        {/* <div className="container mx-auto px-4 py-8"> */}
        <div className="max-w-5xl mx-auto px-4 py-8">

          {/* Date */}
          <p className="text-sm mb-6">{data.date}</p>

          {/* Image Aspect Video */}
          <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-sm max-w-none leading-relaxed">
            <p className="text-center font-bold mt-6">SIARAN PERS</p>

            <div className="mx-auto w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-4"></div>

            <p className="text-center font-semibold mb-6">
              {data.title.toUpperCase()}
            </p>

            {data.content.map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}

            <p className="mt-8 text-center">***</p>

            <p className="mt-6">
              Informasi lebih lanjut: <br />
              Humas LPSK <br />
              Telp. (021) 12345678 <br />
              Email: humas@lpsk.go.id
            </p>
          </div>

          {/* Artikel Lain */}
          <div className="mt-12">
            <h3 className="text-base md:text-lg font-semibold mb-2">
              Artikel Lain
            </h3>

            <div className=" w-20 h-1 bg-gradient-to-r from-amber-700 to-amber-400 rounded-full mt-2 mb-4"></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {artikelLain.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <div
                    className="aspect-video bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />

                  <div className="p-3 text-xs md:text-sm font-medium leading-snug">
                    <Link
                      href={`/publikasi/siaran-pers/${item.id}/detail`}
                      className="hover:text-red-900 transition-colors duration-200"
                    >
                      {item.title}
                    </Link>
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