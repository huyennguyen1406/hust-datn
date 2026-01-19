import React from "react";
import { useMemo } from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Chart from "react-apexcharts";
import { useI18n } from "../../../i18n/useI18n";
import { formatPrice } from "../../../utility/format";
import BrandRanking from "./BrandRanking";
import ProductRanking from "./ProductRanking";
import StatCard from "./StatCard";
import { dailyRevenue, monthlyKPI, topBrands, topProducts } from "./monthlyRevenue.mock";

function getLast12Months() {
  const result = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    result.push(`${month}/${d.getFullYear()}`);
  }

  return result;
}

const last12Month = getLast12Months();

const MonthlyRevenue = () => {
  const { t } = useI18n();

  const barChartOptions = useMemo(() => {
    return {
      chart: {
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: "60%",
        },
      },
      colors: ["#2563eb"],

      xaxis: {
        categories: dailyRevenue.dates,
        labels: {
          formatter: (value) => {
            const [, month, day] = value.split("-");
            return `${day}/${month}`;
          },
          style: {
            colors: "#64748b",
            fontSize: "12px",
          },
        },
      },

      yaxis: {
        labels: {
          formatter: (val) => formatPrice(val),
          style: {
            colors: "#64748b",
            fontSize: "12px",
          },
        },
      },

      tooltip: {
        x: {
          formatter: (value) => {
            const [year, month, day] = value.split("-");
            return `${day}/${month}/${year}`;
          },
        },
        y: {
          formatter: (val) => formatPrice(val),
        },
        style: {
          color: "#0f172a", // text-gray-900
        },
      },

      dataLabels: {
        enabled: false,
      },

      grid: {
        strokeDashArray: 4,
        borderColor: "#e5e7eb",
      },
    };
  }, [t]);

  const barChartSeries = useMemo(() => [{ name: t("revenue"), data: dailyRevenue.values }], [t]);

  const monthOptions = last12Month;

  return (
    <div className="space-y-8">
      {/* Header controls */}
      <div className="flex items-center justify-between">
        <select className="rounded-lg border py-2 pr-8 pl-3 text-sm text-gray-900">
          {monthOptions.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>

        <button className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-900 hover:bg-gray-50">
          <FileDownloadOutlinedIcon fontSize="small" />
          {t("export")}
        </button>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <StatCard title={t("sale_total_revenue")} value={formatPrice(monthlyKPI.revenue)} />
        <StatCard title={t("sale_total_orders")} value={formatPrice(monthlyKPI.orders)} />
        <StatCard title={t("sale_product_sold")} value={formatPrice(monthlyKPI.products)} />
      </div>

      {/* Chart */}
      <div className="rounded-xl border bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-600">{t("sale_revenue_by_day")}</h3>
        <Chart options={barChartOptions} series={barChartSeries} type="bar" height={280} />
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-600">{t("sale_top_products")}</h3>
          <ProductRanking data={topProducts} />
        </div>

        {/* Brands */}
        <div className="rounded-xl border bg-white p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-600">{t("sale_top_brands")}</h3>
          <BrandRanking data={topBrands} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenue;
