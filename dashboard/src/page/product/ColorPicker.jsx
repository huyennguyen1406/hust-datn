const ColorPicker = ({ value, colors, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm text-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none">
        <option value="">Select color</option>

        {colors.map((c) => (
          <option key={c.colorId} value={c.colorId}>
            {c.hexCode}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorPicker;
