import React from "react";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Box,
  Button,
  InputBase,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "../../components/pagination/Pagination";
import { useI18n } from "../../i18n/useI18n";
import FilterRow from "./component/FilterRow";
import StatusBadge from "./component/StatusBadge";

/** Sample data */
const rows = [
  { id: "#1024", name: "Project Alpha", category: "Web Development", status: "Active", date: "2023-10-26" },
  { id: "#1025", name: "Marketing Campaign Q4", category: "Marketing", status: "Pending", date: "2023-10-25" },
  { id: "#1026", name: "Mobile App Redesign", category: "Design", status: "Active", date: "2023-10-22" },
  { id: "#1027", name: "API Integration", category: "Backend", status: "Archived", date: "2023-09-15" },
  { id: "#1028", name: "Server Migration", category: "Infrastructure", status: "Active", date: "2023-10-28" },
];

const createFilter = () => ({
  id: crypto.randomUUID(),
  field: "name",
  operator: "equals",
  value: "",
});

const OPERATION_TYPES = [
  { label: "AND", value: "AND" },
  { label: "OR", value: "OR" },
];

/** Custom renderer per column */
const columnRenderers = {
  status: (value) => <StatusBadge status={value} />,
};

/** Default cell renderer */
const renderCell = (row, column) => {
  const value = row[column];

  if (columnRenderers[column]) {
    return columnRenderers[column](value, row);
  }

  return <span className="text-gray-800">{value}</span>;
};

export default function Management({
  title,
  description,
  columns = ["id", "name", "category", "status", "date"],
  data = rows,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filters, setFilters] = useState([createFilter()]);
  const [operationType, setOperationType] = useState("AND");

  const { t } = useI18n();

  const updateFilter = (updated) => {
    setFilters((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const removeFilter = (id) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const addFilter = () => {
    setFilters((prev) => [...prev, createFilter()]);
  };

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <header className="flex items-center justify-between p-8 pb-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-1 text-gray-600">{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 shadow-sm transition-colors hover:bg-indigo-700">
            <AddCircleIcon className="text-white" fontSize="medium" />
            <span className="font-semibold text-white">New Entity</span>
          </button>
          <button className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 shadow-sm transition-colors hover:bg-indigo-700">
            <AddCircleIcon className="text-white" fontSize="medium" />
            <span className="font-semibold text-white">Import from csv</span>
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          <div className="border-b border-gray-200 bg-white p-4">
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Operation Type</label>
                <div className="mb-2 space-y-3">
                  <select
                    value={operationType}
                    onChange={(e) => setOperationType(e.target.value)}
                    className="h-10 min-w-[140px] rounded-lg border border-gray-300 bg-white px-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
                    {OPERATION_TYPES.map((op) => (
                      <option key={op.value} value={op.value}>
                        {op.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="mt-2 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                  <span>Apply</span>
                </button>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Filter by Field</label>
                <div className="mb-2 space-y-3">
                  {filters.map((filter) => (
                    <FilterRow
                      key={filter.id}
                      filter={filter}
                      onChange={updateFilter}
                      onRemove={removeFilter}
                      columnList={columns.map((col) => {
                        return {
                          label: col.charAt(0).toUpperCase() + col.slice(1).toLowerCase(),
                          value: col,
                        };
                      })}
                    />
                  ))}
                </div>

                <button
                  className="mt-3 flex cursor-pointer items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  onClick={() => addFilter()}>
                  <AddCircleOutlineIcon fontSize="small" className="text-indigo-600" />
                  <span>Add Filter</span>
                </button>
              </div>
            </div>
          </div>

          <TableContainer component={Box}>
            <Table className="min-w-full text-left text-sm text-gray-600" aria-label="entities table">
              <TableHead>
                <TableRow className="bg-gray-50 text-xs text-gray-700 uppercase">
                  {columns.map((col) => {
                    return (
                      <TableCell className="px-6 py-3">
                        <div className="flex items-center">
                          {t(col)}
                          <button className="ml-1 text-gray-400 hover:text-gray-600"></button>
                        </div>
                      </TableCell>
                    );
                  })}

                  <TableCell className="px-6 py-3 text-right">{t("actions")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, idx) => {
                  const last = idx === rows.length - 1;
                  return (
                    <TableRow key={row.id} hover className={`${last ? "" : "border-b"} bg-white hover:bg-gray-50`}>
                      {columns.map((col, colIndex) => (
                        <TableCell
                          key={col}
                          component={colIndex === 0 ? "th" : "td"}
                          scope={colIndex === 0 ? "row" : undefined}
                          className={`px-6 py-4 ${colIndex === 0 ? "font-medium text-gray-900" : ""}`}>
                          {renderCell(row, col)}
                        </TableCell>
                      ))}

                      <TableCell className="px-6 py-4 text-right">
                        <button className="cursor-pointer text-indigo-600 hover:underline">Edit</button>
                        <button className="ml-4 cursor-pointer text-red-600 hover:underline">Delete</button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            page={page}
            setPage={setPage}
            totalPage={5}
            className="p-4"
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalItems={32}
            pageSizeOptions={[5, 10, 20]}
          />
        </div>
      </div>
    </main>
  );
}
