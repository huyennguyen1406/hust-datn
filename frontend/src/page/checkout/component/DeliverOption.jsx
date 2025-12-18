import React from "react";
import { formatPrice } from "../../../utility/format";

const DeliverOption = ({ id, name, price, checked, onChange }) => {
  return (
    <div className="flex items-center justify-between p-4 sm:p-6">
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input
          type="radio"
          name="delivery-method"
          checked={checked}
          onChange={() => onChange(id)}
          className="h-4 w-4 text-blue-600"
        />
        {name}
      </label>

      <span className="text-sm font-medium">{formatPrice(price)}</span>
    </div>
  );
};

export default DeliverOption;
