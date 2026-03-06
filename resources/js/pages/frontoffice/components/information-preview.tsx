import React, { ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { ShieldCheck, Scale, Users, ClipboardList } from "lucide-react";

type InfoItem = {
  name: string;
  small: string | null;
  description: string;
  path: string;
  icon: React.ReactElement;
  highlight?: boolean;
};

const staticData: InfoItem[] = [
  {
    name: "APLIKASI SIMPUSAKA",
    small: "(Sistem Informasi Perlindungan Saksi dan Korban)",
    description: "Layanan Pengajuan Permohonan Perlindungan",
    path: "https://simpusaka.lpsk.go.id/layanan_simpusaka/",
    icon: <ClipboardList className="w-6 h-6 text-[#0B2A74]" />,
    highlight: true,
  },
  {
    name: "SUBJEK PERLINDUNGAN",
    small: null,
    // description: "Informasi mengenai Subjek yang Dapat Menerima Perlindungan dari LPSK",
    description: "Informasi mengenai subjek hukum yang dapat dilindungi oleh LPSK",
    path: "/subjek-perlindungan",
    icon: <Users className="w-6 h-6 text-[#0B2A74]" />,
  },
  {
    name: "TINDAK PIDANA TERTENTU",
    small: null,
    // description: "Informasi mengenai Jenis Tindak Pidana yang Diprioritaskan LPSK dalam Memberikan Perlindungan kepada Saksi dan Korban",
    description: "Informasi mengenai Tindak Pidana tertentu yang menjadi kewenangan LPSK",
    path: "/tindak-pidana-tertentu",
    icon: <Scale className="w-6 h-6 text-[#0B2A74]" />,
  },
  {
    name: "PROGRAM PERLINDUNGAN",
    small: null,
    // description: "Informasi mengenai Jenis Program Layanan Perlindungan yang Diberikan pada Terlindung",
    description: "Informasi mengenai jenis program layanan perlindungan yang diberikan LPSK",
    path: "/program-perlindungan",
    icon: <ShieldCheck className="w-6 h-6 text-[#0B2A74]" />,
  },
];

const InformationSection: React.FC = () => {
  return (
    <section className="w-full py-10 -mt-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {staticData.map(({ name, small, description, path, icon, highlight }) => {
          const isExternal = path.startsWith("http");
          const cardContent = (
            <Card
              className={`h-full rounded-lg shadow-lg transition-colors
                ${highlight
                  ? "bg-[#101f7f] text-white hover:bg-[#1a2ca8]"
                  : "bg-[#d3eaf8] text-[#0B2A74] hover:bg-[#D6E6FA]"}`}
            >
              <CardContent className="flex items-center gap-4 h-auto min-h-[110px]">
                {/* Left: Icon */}
                <div className="pr-4 border-r-2 border-[#B0C4E5] flex items-center h-full">
                  <div className={`p-2 rounded-full ${highlight ? "bg-white/20" : "bg-[#D6E6FA]"}`}>
                    {React.isValidElement(icon) &&
                      React.cloneElement(icon, {
                        className: `w-6 h-6 ${highlight ? "text-white" : "text-[#0B2A74]"}`,
                      })}
                  </div>
                </div>

                {/* Right: Text content */}
                <div className="flex flex-col justify-between h-full w-full">
                  {/* <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-bold leading-snug break-words">
                    {name} {small && <span className="text-[12px] sm:text-[13px] md:text-[14px] font-base">{small}</span>}
                  </p> */}
                  <p className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] leading-snug break-words">
                    <span className="font-bold">{name}</span>{" "}
                    {small && (
                      <span className="text-[12px] sm:text-[13px] md:text-[14px] font-normal">
                        {small}
                      </span>
                    )}
                  </p>

                  <p className="text-[13px] sm:text-[14px] md:text-[15px] text-opacity-90 leading-tight break-words mt-1">
                    {description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );

          return isExternal ? (
            <a key={path} href={path} target="_blank" rel="noopener noreferrer">
              {cardContent}
            </a>
          ) : (
            <Link key={path} href={path}>
              {cardContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default InformationSection;
