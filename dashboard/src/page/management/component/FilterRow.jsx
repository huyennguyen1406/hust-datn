import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useI18n } from "../../../i18n/useI18n";

const FilterRow = ({
  filter,
  onChange,
  onRemove,
  columnList = [
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
    { value: "id", label: "ID" },
  ],
}) => {
  const update = (key, value) => {
    onChange({ ...filter, [key]: value });
  };

  const { t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      {/* Field */}
      <select
        id={`filter-field-${filter.id}`}
        value={filter.field}
        onChange={(e) => update("field", e.target.value)}
        className="h-10 min-w-[140px] rounded-lg border border-gray-300 bg-white px-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
        {columnList.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {t(opt.value)}
          </option>
        ))}
      </select>

      {/* Operator */}
      <select
        value={filter.operator}
        onChange={(e) => update("operator", e.target.value)}
        className="h-10 min-w-[120px] rounded-lg border border-gray-300 bg-white px-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
        <option value="equals">equals</option>
        <option value="contains">contains</option>
      </select>

      {/* Value */}
      <input
        value={filter.value}
        onChange={(e) => update("value", e.target.value)}
        placeholder="Enter value..."
        className="h-10 flex-1 rounded-lg border border-gray-300 bg-white px-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
      />

      {/* Remove */}
      <button
        type="button"
        onClick={() => onRemove(filter.id)}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100">
        <DeleteIcon className="text-red-600" fontSize="small" />
      </button>
    </div>
  );
};

export default FilterRow;
