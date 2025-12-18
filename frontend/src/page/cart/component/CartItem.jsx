import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatPrice } from "../../../utility/format";

const CartItem = ({
  productId,
  name,
  brand,
  size,
  onSale,
  percentage,
  salePrice,
  normalPrice,
  quantity,
  subTotal,
  image,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <li className="flex py-6">
      {/* Image */}
      <div className="border-border h-28 w-28 shrink-0 overflow-hidden rounded-lg border">
        <img src={image} alt={name} className="h-full w-full object-cover" loading="lazy" />
      </div>

      {/* Content */}
      <div className="ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3>{name}</h3>

            {onSale ? (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:flex-nowrap sm:text-base">
                <span className="text-text/60 whitespace-nowrap line-through">{formatPrice(normalPrice)}</span>

                <span className="text-primary font-bold whitespace-nowrap">{formatPrice(salePrice)}</span>

                <span className="bg-primary/10 text-primary inline-block rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap">
                  {percentage.toFixed(0)}% Off
                </span>
              </div>
            ) : (
              <p className="font-bold">{formatPrice(normalPrice)}</p>
            )}
          </div>
          <p className="text-text/60 mt-1 text-sm">{brand}</p>
          <p className="text-text mt-1 mb-2 text-sm">Size: {size}</p>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center">
              <label htmlFor={`qty-${productId}`} className="text-text/80 mr-2">
                Qty
              </label>
              <input
                id={`qty-${productId}`}
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => onQuantityChange(productId, +e.target.value)}
                className="border-border bg-background focus:border-primary focus:ring-primary w-16 rounded-md border text-center"
              />
            </div>

            {/* Remove */}
            <button type="button" onClick={() => onRemove(productId)} className="cursor-pointer text-red-500">
              <DeleteIcon fontSize="small" />
            </button>
          </div>

          {/* Total */}
          <p className="text-base font-medium">
            Total: <span className="font-bold">{formatPrice(subTotal)}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
