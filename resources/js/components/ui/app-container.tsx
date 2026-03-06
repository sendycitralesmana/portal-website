import React from "react";
import { cn } from "@/lib/utils"; // Pastikan path ini sesuai dengan struktur Laravel-mu

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const AppContainer: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "px-[16px] md:px-[32px] xl:px-[60px] 2xl:px-[160px] w-full h-full",
        className
      )}
    >
      {children}
    </div>
  );
};
