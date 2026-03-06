import React from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  application: ApplicationItem[];
};

const ApplicationSection: React.FC<Props> = ({ application }) => {
  return (
    <section className="w-full py-8">
      <div className="flex flex-col items-center gap-6 px-4">
        {/* <h2 className="font-bold max-w-2xl text-center text-base sm:text-xl md:text-2xl text-[color:var(--primary-navy)] dark:text-white">
          APLIKASI INTERNAL LPSK
        </h2> */}

        <div
          className={`w-full grid gap-4 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-${Math.min(application.length, 12)} 
            `}
          style={{
            // Pastikan grid menyesuaikan jumlah kolom sesuai jumlah data (tanpa scroll)
            gridTemplateColumns:
              application.length <= 2
                ? undefined
                : `repeat(${application.length}, minmax(0, 1fr))`,
          }}
        >
          {application.map(({ title, url, cover_url }) => (
            <Card
              key={url}
              className="aspect-[4/3] relative overflow-hidden bg-transparent group rounded shadow"
            >
              <img
                src={cover_url}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-primary/40 z-10 transition-colors duration-300" />
              <CardContent className="relative z-20 p-3 h-full flex items-end">
                <a
                  target="_blank"
                  href={url}
                  className="text-white font-extrabold drop-shadow-md text-base sm:text-lg md:text-xl lg:text-2xl hover:underline uppercase bg-black/40 px-2 py-1 rounded"
                >
                  {title}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApplicationSection;
