import CancelIcon from "@mui/icons-material/Cancel";
import ColorPicker from "./ColorPicker";

const ProductInfo = ({ rows, colors, onChange, onRemove }) => {
  if (!rows.length) {
    return (
      <div className="rounded-md border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
        No product detail added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {rows.map((row, index) => (
        <div
          key={row.productDetailId ?? index}
          className="grid grid-cols-8 gap-3 rounded-md border border-gray-200 bg-gray-50 px-4 py-2">
          {/* Color */}
          <div className="col-span-3">
            <label className="mb-1 block text-xs font-medium text-gray-700">Color</label>
            <div className="flex items-center gap-2">
              {/* color preview */}
              <span
                className="h-5 w-5 rounded border"
                style={{
                  backgroundColor: colors.find((c) => c.colorId === row.colorId)?.hexCode,
                }}
              />
              <ColorPicker
                value={row.colorId}
                colors={colors}
                onChange={(value) => onChange(index, "colorId", value)}
              />
            </div>
          </div>

          {/* Size */}
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-700">Size</label>
            <input
              type="number"
              value={row.size ?? ""}
              onChange={(e) => onChange(index, "size", Number(e.target.value))}
              className="w-full rounded-md border-gray-300 text-sm text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g. 42"
            />
          </div>

          {/* Quantity */}
          <div className="col-span-2">
            <label className="mb-1 block text-xs font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              min={0}
              value={row.quantity ?? 0}
              onChange={(e) => onChange(index, "quantity", Number(e.target.value))}
              className="w-full rounded-md border-gray-300 text-sm text-gray-500 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          {/* Remove */}
          <div className="col-span-1 flex items-end">
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="cursor-pointer text-red-600 hover:text-red-700">
              <CancelIcon fontSize="medium" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductInfo;
