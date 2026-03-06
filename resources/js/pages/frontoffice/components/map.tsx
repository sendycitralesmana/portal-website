import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { geoPath } from "d3-geo";
import colors from "tailwindcss/colors";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type ColorType = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
};

const colorList: (keyof ColorType)[] = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900,
];

const selectColor = (value: number) => {
  const select = Math.floor(value / 10);
  return Math.min(Math.max(select, 0), 9);
};

const IDMap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [hover, setHover] = useState<{ x: number; y: number; message: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any | null>(null);
  const [dimensions, setDimensions] = useState({ height: 400, width: 800 });
  const [{ data, generator }, setData] = useState<{
    data: any[];
    generator: d3.GeoPath<any, d3.GeoPermissibleObjects> | null;
  }>({ data: [], generator: null });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        const height = Math.round(clientWidth / 2); // Maintain 2:1 ratio
        setDimensions({ width: clientWidth, height });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    d3.json("/geo/indonesia.json").then((geoJson: any) => {
      const features = geoJson.features as any[];
      const projection = d3
        .geoMercator()
        .fitSize(
          [containerRef.current!.offsetWidth, containerRef.current!.offsetWidth / 2],
          geoJson
        );
      const generate = geoPath().projection(projection);

      setData({
        data: features.map(({ properties, ...item }) => ({
          ...item,
          properties: { ...properties },
        })),
        generator: generate,
      });
    });

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-background rounded container mx-auto">
      <div className="flex flex-col justify-center items-center gap-2 text-center mb-4">
        <h1 className="text-lg md:text-lg font-bold text-center">
          SEBARAN PERLINDUNGAN SAKSI DAN KORBAN TINDAK PIDANA
        </h1>
        <div className="w-56 h-3 bg-gradient-to-r from-orange-50 via-orange-500 to-orange-900 rounded" />
      </div>

      <div ref={containerRef} className="relative w-full  rounded shadow-md overflow-hidden">
        {generator && data.length > 0 ? (
          <svg
            ref={svgRef}
            width={dimensions.width}
            height={dimensions.height}
            className="block w-full h-auto"
          >
            {data.map((item) => (
              <path
                key={item.properties.id}
                d={generator(item) ?? ""}
                onClick={() => {
                  setSelected(item.properties);
                  setOpen(true);
                }}
                onMouseMove={(e) => {
                  const rect = svgRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setHover({
                    x: e.clientX - rect.left + 10,
                    y: e.clientY - rect.top - 20,
                    message: `${item.properties.provinsi}: ${item.properties.total ?? 0}`,
                  });
                }}
                onMouseLeave={() => setHover(null)}
                className="stroke-slate-900/25 dark:stroke-slate-50/50 hover:opacity-75 transition-opacity"
                style={{
                  fill: colors.orange[colorList[selectColor(item.properties.total ?? 0)]],
                }}
              />
            ))}
          </svg>
        ) : (
          <div className="text-center text-sm text-muted-foreground py-10">Loading peta...</div>
        )}

        {hover && (
          <div
            className="absolute bg-black text-white text-xs px-2 py-1 rounded pointer-events-none z-10"
            style={{ left: hover.x, top: hover.y }}
          >
            {hover.message}
          </div>
        )}
      </div>

      {open && selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-background p-5 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              onClick={() => setOpen(false)}
              variant="ghost"
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </Button>

            <h1 className="text-lg font-bold mb-2">
              {selected.provinsi} ({selected.id})
            </h1>
            <p className="mb-4">
              Jumlah Laporan: <strong>{selected.total}</strong>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                ["Tindak Pidana HAM Berat", selected.ham],
                ["Tindak Pidana Narkotika", selected.narkotika],
                ["Tindak Pidana Penganiayaan Berat", selected.penganiayaan],
                ["Tindak Pidana Penyiksaan", selected.penyiksaan],
                ["Tindak Pidana Perdagangan Orang", selected.perdagangan],
                ["Tindak Pidana Seksual", selected.seksual],
                ["Tindak Pidana Terorisme", selected.terorisme],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between items-center border px-4 py-2 rounded shadow-sm"
                >
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-sm font-bold">{value ?? 0}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDMap;