import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { extractDate, formatPrice } from "../../../utility/format";
import OrderItem from "./OrderItem";

const mappingColorStatus = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderInfo = ({ orderInfo }) => {
  const [open, setOpen] = useState(false);
  const handleSummaryClick = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  return (
    <details open={open} className="border-border bg-card rounded-xl border">
      <summary
        className="flex cursor-pointer items-center justify-between rounded-t-xl p-6 transition-colors hover:bg-gray-50"
        onClick={(e) => handleSummaryClick(e)}>
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-bold">{orderInfo.orderNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Date Placed</p>
            <p>{extractDate(orderInfo.datePlaced)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p>{formatPrice(orderInfo.totalAmount)}</p>
          </div>
        </div>

        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${mappingColorStatus[orderInfo.status]}`}>
          {orderInfo.status}
        </span>
        <KeyboardArrowDownIcon className={`${open ? "rotate-180" : "rotate-0"}`} />
      </summary>

      <div className="border-border space-y-4 border-t p-6">
        <div className="flex flex-col gap-4">
          {orderInfo.items.map((item) => (
            <OrderItem key={item.productId} item={item} />
          ))}

          <div className="flex justify-end pt-2">
            <button className="bg-primary hover:bg-primary/90 inline-flex h-9 cursor-pointer items-center justify-center rounded-md px-4 text-sm font-semibold text-white transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </details>
  );
};

export default OrderInfo;
