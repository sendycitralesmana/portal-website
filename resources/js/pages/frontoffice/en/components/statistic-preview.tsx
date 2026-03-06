import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

interface ApiResponse {
  jenis_tindak_pidana_pemohon: {
    id_pidana: number;
    jenis_tindak_pidana: string;
    jumlah_tindak_pidana: number;
  }[];
}

interface ChartItem {
  name: string;
  total: number;
}

const fetchData = async (
  start: string,
  end: string
): Promise<ChartItem[]> => {
  try {
    const res = await fetch(
      `https://simpusaka.lpsk.go.id/layanan/permohonan/dashboard/chart?startdate=${start}&enddate=${end}`
    );
    const data: ApiResponse = await res.json();
    return data.jenis_tindak_pidana_pemohon.map((item) => ({
      name: item.jenis_tindak_pidana,
      total: item.jumlah_tindak_pidana,
    }));
  } catch (error) {
    console.error("Failed to load data:", error);
    return [];
  }
};

const EnStatisticsPreview: React.FC = () => {
  const [chartData, setChartData] = useState<Record<string, ChartItem[]>>({});
  const [months, setMonths] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const today = dayjs();

    const startThisMonth = today.startOf("month").format("YYYY-MM-DD");
    const endThisMonth = today.endOf("month").format("YYYY-MM-DD");
    const start1MonthAgo = today.subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    const end1MonthAgo = today.subtract(1, "month").endOf("month").format("YYYY-MM-DD");
    const start2MonthAgo = today.subtract(2, "month").startOf("month").format("YYYY-MM-DD");
    const end2MonthAgo = today.subtract(2, "month").endOf("month").format("YYYY-MM-DD");

    const labelThisMonth = today.format("MMMM");
    const label1MonthAgo = today.subtract(1, "month").format("MMMM");
    const label2MonthAgo = today.subtract(2, "month").format("MMMM");

    const monthLabels = [label2MonthAgo, label1MonthAgo, labelThisMonth];
    const ranges = [
      { label: label2MonthAgo, start: start2MonthAgo, end: end2MonthAgo },
      { label: label1MonthAgo, start: start1MonthAgo, end: end1MonthAgo },
      { label: labelThisMonth, start: startThisMonth, end: endThisMonth },
    ];
    setMonths(monthLabels);

    const loadData = async () => {
      setIsLoading(true);
      const results = await Promise.all(
        ranges.map((r) => fetchData(r.start, r.end))
      );

      const newChartData: Record<string, ChartItem[]> = {};
      ranges.forEach((range, idx) => {
        newChartData[range.label] = results[idx];
      });

      setChartData(newChartData);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const chartColors = ["#1e3a8a", "#dc2626", "#7e22ce"];

  if (isLoading) {
    return (
      <div className="text-center text-lg py-10 text-gray-600 dark:text-gray-300">
        Loading statistics...
      </div>
    );
  }

  return (
    <section className="w-full py-10">
      <div className="container flex flex-col place-items-center gap-8 px-5">
        <p className="font-bold max-w-3xl text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[color:var(--primary-navy)] dark:text-white">
          STATISTICS OF WITNESS AND VICTIM PROTECTION
        </p>

        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {months.map((month, index) => (
            <div key={month}>
              <p className="font-bold text-start mb-3 text-base md:text-xl text-[color:var(--primary-navy)] dark:text-white">
                Protection Requests
                <br className="block" /> by Type of Crime, {month} 2025
              </p>
              <div className="h-[500px] w-full bg-white rounded-md shadow p-3 dark:bg-gray-900 dark:text-black">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData[month]}>
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
                    <Bar dataKey="total" fill={chartColors[index]} />
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
          <a href="http://satudata.lpsk.go.id/" target="_blank">
            Read More
          </a>
        </Button>
      </div>
    </section>
  );
};

export { EnStatisticsPreview };
