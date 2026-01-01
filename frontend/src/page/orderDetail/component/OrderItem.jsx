import React from "react";
import { formatPrice } from "../../../utility/format";

const OrderItem = ({ item }) => {
  return (
    <div className="flex flex-col gap-4 py-6 md:flex-row">
      <img className="aspect-square size-24 rounded-lg bg-cover bg-center" src={item.image} alt={item.name} />

      <div className="flex flex-1 justify-between gap-4">
        <div>
          <p className="pb-1 text-lg font-semibold">{item.name}</p>
          <p className="text-sm text-gray-600">Brand: {item.brand}</p>
          <p className="text-sm text-gray-600">Size: {item.size}</p>
          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Unit price: {formatPrice(item.unitPrice)}</p>
          <p className="pt-1 text-lg font-bold">Subtotal: {formatPrice(item.subTotal)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
