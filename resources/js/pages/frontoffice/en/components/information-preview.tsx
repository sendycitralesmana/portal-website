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
    name: "SIMPUSAKA APP LPSK",
    small: "(Protection Information System for Witnesses and Victims)",
    // small: "(Sistem Informasi Perlindungan Saksi dan Korban)",
    description: "Protection Application Submission Services",
    path: "https://simpusaka.lpsk.go.id/layanan_simpusaka/",
    icon: <ClipboardList className="w-6 h-6 text-[#0B2A74]" />,
    highlight: true,
  },
  {
    name: "PROTECTION SUBJECT",
    small: null,
    // description: "Information regarding Subjects Who Can Receive Protection from LPSK",
    description: "Information regarding legal subjects that can be protected by LPSK",
    path: "/en/protection-subject",
    icon: <Users className="w-6 h-6 text-[#0B2A74]" />,
  },
  {
    name: "SPECIFIC CRIMINAL OFFENSE",
    small: null,
    // description: "Information on the Types of Crimes Prioritized by LPSK in Providing Protection to Witnesses and Victims",
    description: "Information regarding legal subjects that can be protected by LPSK",
    path: "/en/specific-criminal-offense",
    icon: <Scale className="w-6 h-6 text-[#0B2A74]" />,
  },
  {
    name: "PROTECTION PROGRAM",
    small: null,
    // description: "Information on the Types of Protection Service Programs Provided to Protected Persons",
    description: "Information regarding legal subjects that can be protected by LPSK",
    path: "/en/protection-program",
    icon: <ShieldCheck className="w-6 h-6 text-[#0B2A74]" />,
  },
];

const EnInformationSection: React.FC = () => {
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
                    {name}
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

export default EnInformationSection;
