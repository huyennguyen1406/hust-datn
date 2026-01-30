import { useMemo, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";
import FilterRow from "../../components/filterRow/FilterRow";
import Pagination from "../../components/pagination/Pagination";
import { useI18n } from "../../i18n/useI18n";
import { extractDate, formatPrice } from "../../utility/format";
import { buildBrandQueryParams } from "./helper";

/* ------------------ constants ------------------ */

const PRODUCT_COLUMNS = ["productNameEn", "productNameVi", "brandName", "price", "modifiedDate"];

const CATEGORY_FILTER = [{ value: "nameEn" }, { value: "nameVi" }, { value: "brandName" }];

const createFilter = () => ({
  id: crypto.randomUUID(),
  field: "nameEn",
  operator: "equals",
  value: "",
});

const COMBINATION_TYPE = [
  { label: "AND", value: "AND" },
  { label: "OR", value: "OR" },
];

/* ------------------ component ------------------ */

export default function Brand() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [queryState, setQueryState] = useState({
    page: 1,
    pageSize: 10,
    filters: [createFilter()],
    combination: "OR",
  });

  const [draftFilters, setDraftFilters] = useState([createFilter()]);

  /* -------- build query params inside component -------- */

  const queryParams = useMemo(
    () =>
      buildBrandQueryParams({
        page: queryState.page,
        pageSize: queryState.pageSize,
        combination: queryState.combination,
        filters: queryState.filters,
      }),
    [queryState]
  );

  /* ------------------ query ------------------ */

  const { data, isLoading } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => managementApi.getProducts(queryParams),
    keepPreviousData: true,
  });

  const products = data?.data ?? [];

  /* ------------------ filter handlers ------------------ */

  const updateFilter = (updated) => {
    setDraftFilters((prev) => prev.map((f) => (f.id === updated.id ? updated : f)));
  };

  const removeFilter = (id) => {
    setDraftFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const addFilter = () => {
    setDraftFilters((prev) => [...prev, createFilter()]);
  };

  const onApply = (e) => {
    e.preventDefault();
    setQueryState((prev) => ({
      ...prev,
      page: 1,
      filters: draftFilters,
    }));
  };

  const handleCombinationSelect = (e) =>
    setQueryState((prev) => ({
      ...prev,
      combination: e.target.value,
    }));

  const handleNewProductClick = (e) => {
    e.preventDefault();
    navigate({ to: "/products/create" });
  };

  const handleEditClick = (id) => {
    navigate({
      to: "/products/$id/edit",
      params: { id },
    });
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => managementApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      alert("Failed to delete products");
    },
  });

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  /* ------------------ render ------------------ */

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      {/* ---------- header ---------- */}
      <header className="flex items-center justify-between p-8 pb-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product</h1>
          <p className="mt-1 text-gray-600">Product Management</p>
        </div>

        <button
          onClick={(e) => handleNewProductClick(e)}
          className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 shadow-sm hover:bg-indigo-700">
          <AddCircleIcon className="text-white" />
          <span className="font-semibold text-white">{t("newProduct")}</span>
        </button>
      </header>

      {/* ---------- content ---------- */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* ---------- filters ---------- */}
          {/* -------- Operation Type -------- */}
          <div className="grid grid-cols-1 items-start gap-4 py-2 md:grid-cols-3">
            <div className="pl-3">
              <label className="mb-1 block text-sm font-medium text-gray-700">Operation Type</label>

              <div className="mb-2 space-y-3">
                <select
                  value={queryParams.combination}
                  onChange={handleCombinationSelect}
                  className="h-10 min-w-[140px] rounded-lg border border-gray-300 bg-white px-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
                  {COMBINATION_TYPE.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={onApply}
                className="mt-2 cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
                <span>Apply</span>
              </button>
            </div>

            {/* -------- Filter by Field -------- */}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Filter by Field</label>

              <div className="mb-2 space-y-3">
                {draftFilters.map((filter) => (
                  <FilterRow
                    key={filter.id}
                    filter={filter}
                    onChange={updateFilter}
                    onRemove={removeFilter}
                    columnList={CATEGORY_FILTER}
                  />
                ))}
              </div>

              <button
                onClick={addFilter}
                className="mt-3 flex cursor-pointer items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700">
                <AddCircleOutlineIcon fontSize="small" className="text-indigo-600" />
                <span>Add Filter</span>
              </button>
            </div>
          </div>

          {/* ---------- table ---------- */}
          <TableContainer component={Box}>
            <Table className="min-w-full text-sm text-gray-600">
              <TableHead>
                <TableRow className="bg-gray-50 text-xs text-gray-700 uppercase">
                  {PRODUCT_COLUMNS.map((col) => (
                    <TableCell key={col} className="px-6 py-3">
                      {t(col)}
                    </TableCell>
                  ))}
                  <TableCell className="px-6 py-3 text-right">{t("actions")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* ---------- empty state ---------- */}
                {!isLoading && products.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={PRODUCT_COLUMNS.length + 1} className="px-6 py-6 text-center text-gray-500">
                      No record found
                    </TableCell>
                  </TableRow>
                )}

                {/* ---------- data rows ---------- */}
                {products.map((row, idx) => (
                  <TableRow key={row.id} hover className={idx !== products.length - 1 ? "border-b" : ""}>
                    <TableCell className="px-6 py-4">{row.productNameEn}</TableCell>
                    <TableCell className="px-6 py-4">{row.productNameVi}</TableCell>
                    <TableCell className="px-6 py-4">{row.brandName}</TableCell>
                    <TableCell className="px-6 py-4">{formatPrice(row.price)}</TableCell>
                    <TableCell className="px-6 py-4">{extractDate(row.modifiedAt)}</TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditClick(row.id)}
                        className="cursor-pointer text-indigo-600 hover:underline">
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(row.id)}
                        className="ml-4 cursor-pointer text-red-600 hover:underline">
                        {t("delete")}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ---------- pagination ---------- */}
          <Pagination
            page={data?.page ?? queryState.page}
            setPage={(newPage) =>
              setQueryState((prev) => ({
                ...prev,
                page: newPage,
              }))
            }
            pageSize={data?.pageSize ?? queryState.pageSize}
            setPageSize={(newPageSize) =>
              setQueryState((prev) => ({
                ...prev,
                page: 1, // reset page when pageSize changes
                pageSize: newPageSize,
              }))
            }
            totalItems={data?.totalItems ?? 0}
            totalPage={data?.totalPages ?? 0}
            pageSizeOptions={[5, 10, 20]}
            className="p-4"
          />
        </div>
      </div>
    </main>
  );
}
