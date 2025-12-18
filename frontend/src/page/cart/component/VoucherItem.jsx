import React from "react";
import { formatPrice } from "../../../utility/format";

const VoucherItem = ({ voucherCode, discountAmount }) => {
  return (
    <li className="flex justify-between text-base text-green-600">
      <span>Voucher ({voucherCode})</span>
      <span>-{formatPrice(discountAmount)}</span>
    </li>
  );
};

export default VoucherItem;
