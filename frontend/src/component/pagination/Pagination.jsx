import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Pagination = ({
  page = 1,
  setPage,
  totalPage = 1,
  pageSize = 5,
  setPageSize,
  totalItems = 5,
  className = "",
  pageSizeOptions = [5, 10, 20, 50],
}) => {
  if (totalPage <= 1 && !pageSize) return null;

  const pages = [];

  const startPage = Math.max(2, page - 1);
  const endPage = Math.min(totalPage - 1, page + 1);

  // First page
  pages.push(1);

  // Left ellipsis
  if (startPage > 2) {
    pages.push("left-ellipsis");
  }

  // Middle pages
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Right ellipsis
  if (endPage < totalPage - 1) {
    pages.push("right-ellipsis");
  }

  // Last page
  if (totalPage > 1) {
    pages.push(totalPage);
  }

  const from = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalItems);

  return (
    <div className={`w-full justify-center ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Page size */}
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="sr-only">
            Items per page
          </label>
          <span className="text-sm text-black/60">Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); // reset page when size changes
            }}
            className="focus:ring-primary/50 h-9 min-w-12 rounded-lg border px-2 pr-8 text-sm leading-none focus:ring-2 focus:outline-none">
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-black/60">per page</span>
        </div>

        {/* Center: Result info */}
        <div className="hidden text-center text-sm text-black/60 md:block">
          Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>

        {/* Right: Pagination */}
        <nav className="flex items-center justify-center gap-2">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-black/5 disabled:opacity-40">
            <ChevronLeftIcon fontSize="medium" />
          </button>

          {pages.map((p, idx) => {
            if (typeof p === "string") {
              return (
                <span key={`${p}-${idx}`} className="flex h-10 w-10 items-center justify-center">
                  …
                </span>
              );
            }

            const isActive = p === page;

            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold transition-colors ${
                  isActive ? "bg-primary text-white" : "hover:bg-black/5"
                }`}>
                {p}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={page === totalPage}
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-black/5 disabled:opacity-40">
            <ChevronRightIcon fontSize="medium" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
