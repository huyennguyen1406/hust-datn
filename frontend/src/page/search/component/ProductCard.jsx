import React from "react";
import StarRating from "../../../component/rating/StarRating";
import { formatPrice } from "../../../utility/format";

const ProductCard = ({
  image,
  brand,
  productName,
  description,
  isSale,
  salePrice,
  normalPrice,
  rating = 0,
  reviewCount = 0,
}) => {
  return (
    <div className="group flex flex-col gap-4 rounded-xl bg-white p-4">
      <div className="relative w-full overflow-hidden rounded-lg">
        {isSale && (
          <div className="absolute top-3 left-3 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
            SALE
          </div>
        )}

        <div
          className="aspect-square bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundImage: `url("${image}")`,
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-sm text-black/60">{brand}</p>
        <h3 className="font-bold">{productName}</h3>
        {rating > 0 && <StarRating rating={rating} reviewCount={reviewCount} />}

        <p className="text-sm text-black/70">{description}</p>
        <div className="mt-2 flex items-baseline gap-2">
          {isSale ? (
            <>
              <p className="text-lg font-bold text-red-600">{formatPrice(salePrice)}</p>
              <p className="text-sm text-black/50 line-through">{formatPrice(normalPrice)}</p>
            </>
          ) : (
            <p className="text-base leading-normal font-semibold">{formatPrice(normalPrice)}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
