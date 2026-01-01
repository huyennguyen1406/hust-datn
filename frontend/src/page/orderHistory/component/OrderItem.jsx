import React from "react";
import { formatPrice } from "../../../utility/format";

const OrderItem = ({ item }) => {
  return (
    <div className="bg-background flex items-center justify-between gap-4 rounded-lg p-4">
      <div className="flex items-center gap-4">
        <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />

        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-500">{`Brand: ${item.brand} · Qty: ${item.quantity} · Size: ${item.size}`}</p>
        </div>
      </div>

      <p className="font-medium">Subtotal: {formatPrice(item.subTotal)}</p>
    </div>
  );
};

export default OrderItem;
