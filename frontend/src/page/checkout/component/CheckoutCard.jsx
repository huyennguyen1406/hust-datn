import React from "react";

const CheckoutCard = ({ title, childComponent }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="rounded-t-xl border-b border-gray-200 bg-gray-50 p-4 sm:p-6">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      {childComponent}
    </div>
  );
};

export default CheckoutCard;
