const LogoText = () => {
  return (
    <div className="flex items-center gap-2 h-[60px] w-[220px]">
      <div className="relative h-[60px] w-[60px]">
        <img
          src={"/images/logo-baru.png"}
          alt={"Logo LPSK"}
          className="object-center object-cover h-full w-full"
        />
      </div>
      <div className="flex flex-col flex-1 leading-none">
        <p className="text-lg font-bold">LPSK</p>
        <p className="text-xs font-bold">
          Lembaga Perlindungan Saksi dan Korban
        </p>
      </div>
    </div>
  );
};

export { LogoText };
