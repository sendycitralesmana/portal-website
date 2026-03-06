import React from 'react';
import { AppContainer } from '@/components/ui/app-container';
import { Clock10Icon, MailIcon, PhoneIcon, PinIcon } from 'lucide-react';
import MainLayout from '../layout/main';
import { Head } from '@inertiajs/react';

const ContactPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <Head title="Perwakilan">
        <meta name="description" content="Halaman Perwakilan" />
        <link rel="icon" href="/images/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="h-[400px] w-full bg-background">
        <div className="flex w-full h-full justify-center items-center relative">
          <div className="h-full w-full absolute bg-slate-800">
            <img
              src="/storage/images/fondasi.png"
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center">
            <h1 className="text-3xl font-bold absolute text-slate-100">
              Kontak Kami
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full relative md:h-[450px] bg-background">
        <AppContainer>
          <div className="grid grid-cols-6 md:grid-cols-12 h-full gap-5 py-5">
            <div className="col-span-4 xl:px-5 group">
              <div className="h-[300px] md:h-full w-full relative overflow-hidden">
                <img
                  src="/storage/images/background.webp"
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
                />
              </div>
            </div>
            <div className="col-span-8 px-3 xl:px-5">
              <div className="h-full flex flex-col justify-center space-y-2">
                <h1>Kantor Pusat</h1>
                <h2 className="flex gap-2">
                  <Clock10Icon />
                  Jam Operasional
                </h2>
                <p className="text-base pl-5">Senin - Kamis : 08.00 - 16.30 </p>
                <p className="text-base pl-5">Jumat : 08.00 - 17.00 </p>

                <h2 className="flex gap-2">
                  <PinIcon />
                  Alamat Kantor LPSK
                </h2>
                <div className="space-y-2">
                  <p className="text-base pl-5">
                    <strong>Kantor Pusat LPSK</strong> Jalan Raya Bogor KM 24 No. 47-49,
                    Jakarta Timur. Telp. 021-29681560
                  </p>
                  <p className="text-base pl-5">
                    <strong>Kantor LPSK Perwakilan Yogyakarta</strong> Gedung Keuangan
                    Negara DI Yogyakarta Sayap Barat Lantai II, Jalan Kusumanegara No.11,
                    Kota Yogyakarta. Telp. 0274-5019084
                  </p>
                  <p className="text-base pl-5">
                    <strong>Kantor LPSK Perwakilan Medan</strong> Gedung Keuangan Negara
                    Medan GKN II Lantai 6, Jalan Diponegoro No. 30a, Kota Medan.
                    Telp. 061-42007818
                  </p>
                </div>

                <h2 className="flex gap-2">
                  <PhoneIcon />
                  Hubungi Kami
                </h2>
                <p className="text-base pl-5">Fax. (021) 29681551</p>

                <h2 className="flex gap-2">
                  <MailIcon />
                  Email
                </h2>
                <p className="text-base pl-5">lpsk_ri@lpsk.go.id</p>
              </div>
            </div>
          </div>
        </AppContainer>
      </div>
    </div>
  );
}

ContactPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

export default ContactPage;

// import React from "react";
// import MainLayout from "../layout/main";

// const ContactPage = () => {
//   return (
//     <section className="px-6 py-8 container">
      
//       <div className="h-[400px] w-full bg-background">
//         <div className="flex w-full h-full justify-center items-center relative">
//           <div className="h-full w-full absolute bg-slate-800">
//             <img
//               src="/storage/images/fondasi.png"
//               alt=""
//               className="w-full h-full object-cover opacity-50"
//             />
//           </div>
//           <div className="absolute left-0 top-0 right-0 bottom-0 flex justify-center items-center">
//             <h1 className="text-3xl font-bold absolute text-slate-100">
//               Kontak Kami
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div className="text-sm mb-4">
//         <span className="text-gray-500">Home</span> &gt;{" "}
//         <span className="text-blue-800 font-semibold">Perwakilan</span>
//       </div>

//       <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 border-b pb-6">
//         {/* Informasi */}
//         <div className="md:w-1/2 space-y-2">
//           <h3 className="font-bold text-lg text-blue-800">
//             1. Kantor Perwakilan LPSK Medan
//           </h3>

//           <div>
//             <p className="font-semibold">Alamat</p>
//             <p className="text-sm text-gray-700">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//           </div>

//           <div>
//             <p className="font-semibold">Kontak</p>
//             <p className="text-sm">
//               <span className="font-semibold">Telepon:</span> (021) 2968-1560
//             </p>
//             <p className="text-sm">
//               <span className="font-semibold">Hotline:</span> 1500-148
//             </p>
//             <p className="text-sm">
//               <span className="font-semibold">Email:</span>{" "}
//               kanpermedan@lpsk.go.id
//             </p>
//           </div>

//           <div>
//             <p className="font-semibold">Media Sosial</p>
//             <p className="text-sm">
//               <span className="font-semibold">Instagram:</span>{" "}
//               @lpskperwakilanmedan
//             </p>
//           </div>
//         </div>

//         {/* Foto dan Peta */}
//         <div className="md:w-1/2 flex flex-col sm:flex-row gap-4">
//           <div className="flex-1 text-center">
//             <p className="font-semibold mb-2">Foto</p>
//             <img
//               src="/storage/images/background.webp"
//               alt="Foto Kantor"
//               className="rounded border"
//             />
//           </div>
//           <div className="flex-1 text-center">
//             <p className="font-semibold mb-2">Klik Peta</p>
//             <img
//               src="https://via.placeholder.com/200x120?text=Map"
//               alt="Peta"
//               className="rounded border"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// ContactPage.layout = (page: React.ReactNode) => <MainLayout children={page} />;

// export default ContactPage;