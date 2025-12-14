import React, { useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Carousel = ({ images = [], alt = "carousel image", showThumbnails = true }) => {
  const [index, setIndex] = useState(0);
  const total = images.length;

  if (!total) return null;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  return (
    <div className={`flex flex-col gap-4 px-2 md:px-0`}>
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
        <img
          src={images[index]}
          alt={`${alt} ${index + 1}`}
          loading="eager"
          className="h-full w-full object-cover transition-opacity duration-300"
        />

        {total > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={prev}
              aria-label="Previous image"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/80 backdrop-blur transition hover:bg-white">
              <ChevronLeftIcon fontSize="small" />
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/80 backdrop-blur transition hover:bg-white">
              <ChevronRightIcon fontSize="small" />
            </button>
          </div>
        )}
      </div>

      {showThumbnails && total > 1 && (
        <div className="grid grid-cols-5 gap-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Select image ${i + 1}`}
              className={`aspect-square cursor-pointer overflow-hidden rounded-lg transition-all ${
                i === index ? "ring-primary ring-2" : "hover:ring-primary hover:ring-2"
              } `}>
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
