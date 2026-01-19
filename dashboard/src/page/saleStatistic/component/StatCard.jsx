import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <p className="font-medium text-gray-600">{title}</p>
      <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;
