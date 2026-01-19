import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { formatPrice } from "../../../utility/format";

const WishlistItem = ({ item }) => {
  return (
    <li className="group flex items-center p-6">
      {/* Image */}
      <div className="h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-gray-200">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center" />
      </div>

      {/* Content */}
      <div className="ml-6 flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold">{item.name}</h3>

            {item.onSale && (
              <span className="bg-primary/10 text-primary inline-block rounded px-2 py-0.5 text-[10px] font-black uppercase">
                Sale
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500">
            Brand: {item.brand} - Size: {item.size}
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="text-primary font-bold">
              {formatPrice(item.onSale ? item.salePrice : item.normalPrice)}
            </span>

            {item.onSale && (
              <>
                <span className="text-xs text-gray-400 line-through">{formatPrice(item.normalPrice)}</span>
                <span className="text-xs font-bold text-red-500">-{item.percentage}%</span>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="bg-primary hover:bg-primary/90 flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-6 text-sm font-bold whitespace-nowrap text-white transition-all">
            <AddShoppingCartIcon fontSize="medium" />
            Add to Cart
          </button>

          <button className="flex size-11 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600">
            <DeleteForeverIcon fontSize="medium" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default WishlistItem;
