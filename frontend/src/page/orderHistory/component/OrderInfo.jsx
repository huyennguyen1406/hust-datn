import { useLayoutEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link } from "@tanstack/react-router";
import { extractDate, formatPrice } from "../../../utility/format";
import OrderItem from "./OrderItem";

const mappingColorStatus = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const OrderInfo = ({ orderInfo }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("0px");

  useLayoutEffect(() => {
    if (contentRef.current) {
      setContentHeight(`${contentRef.current.scrollHeight}px`);
    }
  }, [orderInfo.items.length]);

  return (
    <div className="border-border bg-card rounded-xl border">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-t-xl p-6 text-left transition-colors hover:bg-gray-50">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>
            <p className="font-bold">{orderInfo.orderNumber}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Order Date</p>
            <p>{extractDate(orderInfo.orderDate)}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Final Amount</p>
            <p>{formatPrice(orderInfo.totalAmount)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${mappingColorStatus[orderInfo.status]}`}>
            {orderInfo.status}
          </span>

          <KeyboardArrowDownIcon
            className={`transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}
          />
        </div>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out"
        style={{
          maxHeight: open ? contentHeight : "0px",
          opacity: open ? 1 : 0,
        }}>
        <div className="border-border space-y-4 border-t p-6">
          <div className="flex flex-col gap-4">
            {orderInfo.items.map((item) => (
              <OrderItem key={item.productId} item={item} />
            ))}

            <div className="flex justify-end pt-2">
              <Link to={`/account/order-history/${orderInfo.orderNumber.substring(1)}`}>
                <button className="bg-primary hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-semibold text-white transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
