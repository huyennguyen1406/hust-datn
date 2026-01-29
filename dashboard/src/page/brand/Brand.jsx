import { useMemo, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { managementApi } from "../../api/managementApi";
import FilterRow from "../../components/filterrow/FilterRow";
import Pagination from "../../components/pagination/Pagination";
import { useI18n } from "../../i18n/useI18n";
import { extractDate } from "../../utility/format";
import { buildBrandQueryParams } from "./helper";

/* ------------------ constants ------------------ */

const BRAND_COLUMNS = ["brandName", "modifiedDate"];

const createFilter = () => ({
  id: crypto.randomUUID(),
  field: "brandName",
  operator: "equals",
  value: "",
});

const combination = "OR";

/* ------------------ component ------------------ */

export default function Brand() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [queryState, setQueryState] = useState({
    page: 1,
    pageSize: 10,
    filters: [createFilter()],
  });

  const [draftFilters, setDraftFilters] = useState([createFilter()]);

  /* -------- build query params inside component -------- */

  const queryParams = useMemo(
    () =>
      buildBrandQueryParams({
        page: queryState.page,
        pageSize: queryState.pageSize,
        combination,
        filters: queryState.filters,
      }),
    [queryState]
  );

  /* ------------------ query ------------------ */

  const { data, isLoading } = useQuery({
    queryKey: ["brands", queryParams],
    queryFn: () => managementApi.getBrands(queryParams),
    keepPreviousData: true,
  });

  const brands = data?.data ?? [];
  const pagination = data?.pagination;

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

  const handleNewBrandClick = (e) => {
    e.preventDefault();
    navigate({ to: "/brands/create" });
  };

  const handleEditClick = (id) => {
    navigate({
      to: "/brands/$id/edit",
      params: { id },
    });
  };

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id) => managementApi.deleteBrand(id),
    onSuccess: () => {
      // refresh brand list after delete
      queryClient.invalidateQueries({ queryKey: ["brands"] });
    },
    onError: (error) => {
      console.error("Delete failed:", error);
      alert("Failed to delete brand");
    },
  });

  const handleDeleteClick = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this brand?");
    if (!confirmed) return;

    deleteMutation.mutate(id);
  };

  /* ------------------ render ------------------ */

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      {/* ---------- header ---------- */}
      <header className="flex items-center justify-between p-8 pb-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand</h1>
          <p className="mt-1 text-gray-600">Brand Management</p>
        </div>

        <button
          onClick={(e) => handleNewBrandClick(e)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 shadow-sm hover:bg-indigo-700">
          <AddCircleIcon className="text-white" />
          <span className="font-semibold text-white">New Brand</span>
        </button>
      </header>

      {/* ---------- content ---------- */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* ---------- filters ---------- */}
          <div className="border-b border-gray-200 p-4">
            <label className="mb-1 block text-sm font-medium text-gray-700">Filter by Field (OR)</label>

            <div className="space-y-3">
              {draftFilters.map((filter) => (
                <FilterRow
                  key={filter.id}
                  filter={filter}
                  onChange={updateFilter}
                  onRemove={removeFilter}
                  columnList={[{ value: "brandName", label: "Brand Name" }]}
                />
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={addFilter}
                className="cursor-pointer text-sm font-medium text-indigo-600 hover:underline">
                + Add Filter
              </button>

              <button
                onClick={(e) => onApply(e)}
                className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                Apply
              </button>
            </div>
          </div>

          {/* ---------- table ---------- */}
          <TableContainer component={Box}>
            <Table className="min-w-full text-sm text-gray-600">
              <TableHead>
                <TableRow className="bg-gray-50 text-xs text-gray-700 uppercase">
                  {BRAND_COLUMNS.map((col) => (
                    <TableCell key={col} className="px-6 py-3">
                      {t(col)}
                    </TableCell>
                  ))}
                  <TableCell className="px-6 py-3 text-right">{t("actions")}</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {/* ---------- empty state ---------- */}
                {!isLoading && brands.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={BRAND_COLUMNS.length + 1} className="px-6 py-6 text-center text-gray-500">
                      No record found
                    </TableCell>
                  </TableRow>
                )}

                {/* ---------- data rows ---------- */}
                {brands.map((row, idx) => (
                  <TableRow key={row.id} hover className={idx !== brands.length - 1 ? "border-b" : ""}>
                    <TableCell className="px-6 py-4">{row.brandName}</TableCell>
                    <TableCell className="px-6 py-4">{extractDate(row.modifiedAt)}</TableCell>

                    <TableCell className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEditClick(row.id)}
                        className="cursor-pointer text-indigo-600 hover:underline">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(row.id)}
                        className="ml-4 cursor-pointer text-red-600 hover:underline">
                        Delete
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ---------- pagination ---------- */}
          <Pagination
            page={pagination?.page ?? queryState.page}
            setPage={(newPage) =>
              setQueryState((prev) => ({
                ...prev,
                page: newPage,
              }))
            }
            pageSize={pagination?.pageSize ?? queryState.pageSize}
            setPageSize={(newPageSize) =>
              setQueryState((prev) => ({
                ...prev,
                page: 1, // reset page when pageSize changes
                pageSize: newPageSize,
              }))
            }
            totalItems={pagination?.totalItems ?? 0}
            totalPage={pagination?.totalPages ?? 0}
            pageSizeOptions={[5, 10, 20]}
            className="p-4"
          />
        </div>
      </div>
    </main>
  );
}
