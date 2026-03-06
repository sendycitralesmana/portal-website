// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Link } from "@inertiajs/react";

// type InfoItem = {
//   name: string;
//   path: string;
//   image: string;
// };

// const staticData: InfoItem[] = [
//   {
//     name: "Tindak Pidana Tertentu",
//     path: "/tindak-pidana-tertentu",
//     image: "/images/informasi/tindak-pidana-tertentu.webp",
//   },
//   {
//     name: "Mekanisme Permohonan Perlindungan",
//     path: "/mekanisme-permohonan-perlindungan",
//     image: "/images/informasi/mekanisme-permohonan-perlindungan.webp",
//   },
//   {
//     name: "Program Perlindungan",
//     path: "/program-perlindungan",
//     image: "/images/informasi/program-perlindungan.webp",
//   },
//   {
//     name: "Subjek Perlindungan",
//     path: "/subjek-perlindungan",
//     image: "/images/informasi/subjek-perlindungan.webp",
//   },
// ];

// const InformationSection: React.FC = () => {
//   return (
//     <section className="w-full py-8">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {staticData.map(({ name, path, image }) => (
//           <Card
//             key={path}
//             className="relative overflow-hidden aspect-video md:aspect-[4/3] rounded-lg shadow group"
//           >
//             <img
//               src={image}
//               alt={name}
//               className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-black/30 group-hover:bg-primary/40 z-10 transition-colors duration-300" />
//             <CardContent className="relative z-20 p-5 h-full flex items-end">
//               <Link href={path} className="text-white font-bold text-xl hover:underline">
//                 {name}
//               </Link>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default InformationSection;


// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Link } from "@inertiajs/react";
// import { ShieldCheck, Scale, Users, ClipboardList } from "lucide-react";

// type InfoItem = {
//   name: string;
//   description: string;
//   path: string;
//   icon: JSX.Element;
//   highlight?: boolean;
// };

// const staticData: InfoItem[] = [
//   {
//     name: "APLIKASI SIMPUSAKA (Sistem Informasi Perlindungan Saksi dan Korban)",
//     description: "Layanan Pengajuan Permohonan Perlindungan",
//     path: "/simpusaka",
//     icon: <ClipboardList className="w-5 h-5 text-white" />,
//     highlight: true,
//   },
//   {
//     name: "SUBJEK PERLINDUNGAN",
//     description: "Informasi mengenai Subjek yang Dapat Menerima Perlindungan dari LPSK",
//     path: "/subjek-perlindungan",
//     icon: <Users className="w-5 h-5 text-[#0B2A74]" />,
//   },
//   {
//     name: "TINDAK PIDANA TERTENTU",
//     description: "Informasi mengenai Jenis Tindak Pidana yang Diprioritaskan LPSK dalam Memberikan Perlindungan kepada Saksi dan Korban",
//     path: "/tindak-pidana-tertentu",
//     icon: <Scale className="w-5 h-5 text-[#0B2A74]" />,
//   },
//   {
//     name: "PROGRAM PERLINDUNGAN",
//     description: "Informasi mengenai Jenis Program Layanan Perlindungan yang Diberikan pada Terlindung",
//     path: "/program-perlindungan",
//     icon: <ShieldCheck className="w-5 h-5 text-[#0B2A74]" />,
//   },
// ];

// const InformationSection: React.FC = () => {
//   return (
//     <section className="w-full py-8">
//       <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {staticData.map(({ name, description, path, icon, highlight }) => (
//           <Link key={path} href={path}>
//             <Card
//               className={`h-full rounded-lg shadow-md border-none transition-all ${
//                 highlight
//                   // ? "bg-[#0B2A74] text-white hover:bg-[#12378e]"
//                   : "bg-[#E8F0FA] text-[#0B2A74] hover:bg-[#D6E6FA]"
//               }`}
//             >
//               <CardContent className="flex gap-4 p-4">
//                 {/* Left: Icon + Border */}
//                 <div
//                   className={`pr-4 border-r ${
//                     highlight ? "border-white" : "border-[#B0C4E5]"
//                   }`}
//                 >
//                   <div
//                     className={`p-2 rounded-full ${
//                       highlight ? "bg-white" : "bg-[#D6E6FA]"
//                     }`}
//                   >
//                     {icon}
//                   </div>
//                 </div>

//                 {/* Right: Text */}
//                 <div className="flex flex-col justify-center">
//                   <h3 className={`text-sm font-bold mb-1 leading-snug ${highlight ? "text-white" : "text-[#0B2A74]"}`}>
//                     {name}
//                   </h3>
//                   <p className={`text-xs ${highlight ? "text-white/90" : "text-[#0B2A74]/90"}`}>
//                     {description}
//                   </p>
//                 </div>
//               </CardContent>
//             </Card>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default InformationSection;
