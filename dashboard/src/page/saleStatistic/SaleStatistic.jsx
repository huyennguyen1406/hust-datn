// page/statistic/Statistic.jsx
import Chart from "react-apexcharts";
import RevenueSwitcher from "./component/RevenueSwitcher";

export default function Statistic() {
  return (
    <main className="flex-1 p-8">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Thống kê doanh thu</h2>
      <RevenueSwitcher />
    </main>
  );
}
