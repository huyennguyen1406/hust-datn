import React from "react";

const OrderItem = ({ name, brand, size, quantity, subTotal, image }) => {
  const formatPrice = (value) => new Intl.NumberFormat("en-US").format(value) + " ₫";

  return (
    <div className="flex items-center gap-6">
      <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-100 p-2">
        <img src={image} alt={name} className="h-full w-full object-contain" />
      </div>

      <div className="grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{brand}</p>
        <p className="text-sm text-gray-500">
          Size: {size} · Qty: {quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold">{formatPrice(subTotal)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
