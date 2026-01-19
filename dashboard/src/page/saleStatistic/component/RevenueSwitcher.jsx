import { useState } from "react";
import MonthlyRevenue from "./MonthlyRevenue";
import QuarterlyRevenue from "./QuarterlyRevenue";
import YearlyRevenue from "./YearlyRevenue";

const TABS = [
  { key: "month", label: "Tháng" },
  { key: "quarter", label: "Quý" },
  { key: "year", label: "Năm" },
];

const RevenueSwitcher = () => {
  const [type, setType] = useState("month");

  const renderContent = () => {
    switch (type) {
      case "month":
        return <MonthlyRevenue />;
      case "quarter":
        return <QuarterlyRevenue />;
      case "year":
        return <YearlyRevenue />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* CENTER ONLY THIS */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-lg border bg-white p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setType(tab.key)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                type === tab.key ? "bg-indigo-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT BELOW – KHÔNG CENTER */}
      {renderContent()}
    </>
  );
};

export default RevenueSwitcher;
