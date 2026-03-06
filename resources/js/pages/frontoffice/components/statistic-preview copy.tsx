// import React from "react";
// import { Link } from "@inertiajs/react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// const StatisticsPreview: React.FC = () => {
//   return (
//     <section className="w-full">
//       <div className="container flex flex-col place-items-center gap-4 px-5">
//         <h2 className="font-bold max-w-2xl text-center text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">
//           STATISTIK & SEBARAN PERLINDUNGAN SAKSI DAN KORBAN TINDAK PIDANA
//         </h2>

//         <Card className="bg-red-600 text-white dark:bg-red-600 dark:text-white">
//           <CardContent className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
//             <div className="flex flex-col place-items-center justify-center gap-2">
//               <h2 className="font-bold text-2xl">7.777</h2>
//               <small className="max-w-xs text-center">Permohonan Perlindungan 2023</small>
//             </div>
//             <div className="flex flex-col place-items-center justify-center gap-2">
//               <h2 className="font-bold text-2xl">5.523</h2>
//               <small className="max-w-xs text-center">Terlindung 2023</small>
//             </div>
//             <div className="flex flex-col place-items-center justify-center gap-2">
//               <h2 className="font-bold text-2xl">5.702</h2>
//               <small className="max-w-xs text-center">Layanan Perlindungan 2023</small>
//             </div>
//             <div className="flex flex-col place-items-center justify-center gap-2">
//               <h2 className="font-bold text-2xl">4.091</h2>
//               <small className="max-w-xs text-center">Layanan Perlindungan Aktif</small>
//             </div>
//           </CardContent>
//         </Card>
//         <Button asChild className="w-fit bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white">
//           <Link href="/">Lihat Selengkapnya</Link>
//         </Button>
//       </div>
//     </section>
//   );
// };

// export { StatisticsPreview };


// components/StatisticsPreview.tsx
import React from "react";
import { Link } from "@inertiajs/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const chartData = [
  {
    name: "Pencucian Uang",
    Mei: 134,
    Juni: 134,
    Juli: 134,
  },
  {
    name: "Seksual terhadap anak",
    Mei: 90,
    Juni: 90,
    Juli: 90,
  },
  {
    name: "Tindak pidana lainnya",
    Mei: 66,
    Juni: 66,
    Juli: 66,
  },
  {
    name: "Kekerasan Seksual",
    Mei: 30,
    Juni: 30,
    Juli: 30,
  },
  {
    name: "Perdagangan orang",
    Mei: 18,
    Juni: 18,
    Juli: 18,
  },
  {
    name: "Terorisme",
    Mei: 5,
    Juni: 5,
    Juli: 5,
  },
  {
    name: "Pelanggaran HAM yang berat",
    Mei: 3,
    Juni: 3,
    Juli: 3,
  },
  {
    name: "Penghilangan berat",
    Mei: 3,
    Juni: 3,
    Juli: 3,
  },
  {
    name: "Korupsi",
    Mei: 2,
    Juni: 2,
    Juli: 2,
  },
  {
    name: "Narkotika dan Psikotropika",
    Mei: 2,
    Juni: 2,
    Juli: 2,
  },
];

const StatisticsPreview: React.FC = () => {
  return (
    <section className="w-full py-10">
      <div className="container flex flex-col place-items-center gap-8 px-5">
        <p className="font-bold max-w-3xl text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[color:var(--primary-navy)] dark:text-white">
          STATISTIK PERLINDUNGAN SAKSI DAN KORBAN
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Mei", "Juni", "Juli"].map((bulan, index) => (
            <div key={bulan}>
              <p className="font-bold text-start mb-3 text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white">
                Permohonan Perlindungan 
                <br className="block" /> berdasarkan Tindak Pidana, {bulan} 2025
              </p>
              <div className="h-[500px] w-full bg-white rounded-md shadow p-3 dark:bg-gray-900 dark:text-white">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-30}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey={bulan}
                      fill={
                        index === 0
                          ? "#1e3a8a"
                          : index === 1
                          ? "#dc2626"
                          : "#7e22ce"
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        <Button
          asChild
          className="w-fit font-bold xl:text-lg px-16 bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
        >
          <Link href="/" className="">Lihat Selengkapnya</Link>
        </Button>
      </div>
    </section>
  );
};

export { StatisticsPreview };
