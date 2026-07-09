import React from "react";

type HeroProps = {
  title: string;
  description?: string;
};

const Hero: React.FC<HeroProps> = ({ title, description }) => {
  return (
    <div className="h-[400px] w-full bg-background">
      <div className="flex w-full h-full justify-center items-center relative">
        <div className="absolute left-0 top-0 right-0 bottom-0 flex flex-col gap-5 justify-center items-center bg-primary">
          <div className="relative">
            <img
              src="/images/logo-baru.png"
              alt="LPSK Logo"
              height={150}
              width={150}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-white dark:text-black">{title}</h1>
          {description && <p className="text-slate-200">{description}</p>}
        </div>
      </div>
    </div>
  );
};

export { Hero };
