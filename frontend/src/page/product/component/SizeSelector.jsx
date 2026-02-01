import React from "react";

const SizeSelector = ({ sizes, value, onChange }) => {
  return (
    <div className="px-2 md:px-0">
      <h2 className="mb-4 text-lg font-semibold">Select Size</h2>

      <div className="grid grid-cols-6 gap-3 md:grid-cols-8 lg:grid-cols-10">
        {sizes.map(({ size, onStock }) => {
          const isActive = value === size;
          const isDisabled = !onStock;

          return (
            <button
              key={size}
              type="button"
              disabled={isDisabled}
              onClick={() => onChange(size)}
              className={`relative h-12 w-12 rounded-lg border font-semibold transition-colors ${
                isActive ? "bg-primary border-primary text-white" : "hover:border-primary"
              } ${isDisabled ? "cursor-not-allowed text-gray-400 hover:border-gray-300" : "cursor-pointer"} `}>
              {size}

              {isDisabled && (
                <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="h-px w-full -rotate-45 bg-gray-400" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
