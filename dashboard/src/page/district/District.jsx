import { useMemo, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DownloadIcon from "@mui/icons-material/Download";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { downloadDistrictTemplateApi, getDistrictsApi, importDistrictsApi } from "../../api/masterDataApi";
import FilterRow from "../../components/filterRow/FilterRow";
import Pagination from "../../components/pagination/Pagination";
import { useI18n } from "../../i18n/useI18n";
import buildQueryParams from "../../utility/buildQuery";
import downloadBlob from "../../utility/downloadBlob";
import { extractDate } from "../../utility/format";

/* ------------------ constants ------------------ */

const COLUMNS = ["nameEn", "nameVi", "provinceNameEn", "provinceNameVi", "modifiedAt"];

const FILTERS = [{ value: "nameEn" }, { value: "nameVi" }, { value: "provinceNameEn" }, { value: "provinceNameVi" }];

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

export default function District() {
  const { t } = useI18n();

  const [queryState, setQueryState] = useState({
    page: 1,
    pageSize: 10,
    filters: [createFilter()],
    combination: "OR",
  });

  const queryClient = useQueryClient();

  const [draftFilters, setDraftFilters] = useState([createFilter()]);

  /* -------- build query params inside component -------- */

  const queryParams = useMemo(
    () =>
      buildQueryParams({
        page: queryState.page,
        pageSize: queryState.pageSize,
        combination: queryState.combination,
        filters: queryState.filters,
      }),
    [queryState]
  );

  /* ------------------ query ------------------ */

  const { data, isLoading } = useQuery({
    queryKey: ["districts", queryParams],
    queryFn: () => getDistrictsApi(queryParams),
    keepPreviousData: true,
  });

  const provinces = data?.data ?? [];

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

  const downloadTemplateMutation = useMutation({
    mutationFn: downloadDistrictTemplateApi,
    onSuccess: (response) => {
      downloadBlob(response.data, "district-template.csv");
    },
    onError: (error) => {
      const message = error?.response?.data?.detail || "Download template failed";
      alert(message);
    },
  });

  const handleDownloadTemplate = (e) => {
    e.preventDefault();
    downloadTemplateMutation.mutate();
  };

  const uploadProvinceMutation = useMutation({
    mutationFn: importDistrictsApi,
    onSuccess: (data) => {
      alert(data?.message || "Upload successful");
      queryClient.invalidateQueries({
        queryKey: ["districts"],
        exact: false,
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.detail || "Upload failed";
      alert(message);
    },
  });

  const handleUploadFile = (e) => {
    e.preventDefault();

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv";

    input.onchange = (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      uploadProvinceMutation.mutate(file);
    };

    input.click();
  };

  /* ------------------ render ------------------ */

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      {/* ---------- header ---------- */}
      <header className="flex items-center justify-between p-8 pb-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Districts</h1>
          <p className="mt-1 text-gray-600">District Management</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={(e) => handleDownloadTemplate(e)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 shadow-sm hover:bg-indigo-700">
            <DownloadIcon className="text-white" />
            <span className="font-semibold text-white">{t("downloadTemplate")}</span>
          </button>

          <button
            onClick={(e) => handleUploadFile(e)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 shadow-sm hover:bg-indigo-700">
            <CloudUploadIcon className="text-white" />
            <span className="font-semibold text-white">{t("uploadFile")}</span>
          </button>
        </div>
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
                  value={queryState.combination}
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
                    columnList={FILTERS}
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
                  {COLUMNS.map((col) => (
                    <TableCell key={col} className="px-6 py-3">
                      {t(col)}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {/* ---------- empty state ---------- */}
                {!isLoading && provinces.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={COLUMNS.length + 1} className="px-6 py-6 text-center text-gray-500">
                      No record found
                    </TableCell>
                  </TableRow>
                )}

                {/* ---------- data rows ---------- */}
                {provinces.map((row, idx) => (
                  <TableRow key={row.id} hover className={idx !== provinces.length - 1 ? "border-b" : ""}>
                    <TableCell className="px-6 py-4">{row.nameEn}</TableCell>
                    <TableCell className="px-6 py-4">{row.nameVi}</TableCell>
                    <TableCell className="px-6 py-4">{row.provinceNameEn}</TableCell>
                    <TableCell className="px-6 py-4">{row.provinceNameVi}</TableCell>
                    <TableCell className="px-6 py-4">{extractDate(row.modifiedAt)}</TableCell>
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
