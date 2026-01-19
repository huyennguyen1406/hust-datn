import React from "react";

const Pagination = ({
  page = 1,
  setPage,
  totalPage = 1,
  pageSize = 5,
  setPageSize,
  totalItems = 0,
  pageSizeOptions = [5, 10, 20, 50],
  className = "",
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
    <div className={`w-full ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Left: Page size */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <select
            aria-label="Items per page"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
            className="h-9 min-w-20 rounded-lg border border-gray-300 bg-white px-2 pr-8 text-sm text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">per page</span>
        </div>

        {/* Center: Result info */}
        <div className="hidden text-sm text-gray-500 md:block">
          Showing <span className="font-medium">{from}</span> to <span className="font-medium">{to}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </div>

        {/* Right: Pagination */}
        <nav className="flex items-center gap-2">
          {/* Prev */}
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40">
            ‹
          </button>

          {pages.map((p, idx) => {
            if (typeof p === "string") {
              return (
                <span key={`${p}-${idx}`} className="flex h-10 w-10 items-center justify-center">
                  …
                </span>
              );
            }

            const active = p === page;

            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`h-10 w-10 rounded-lg font-medium transition ${active ? "bg-indigo-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}`}>
                {p}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={page === totalPage}
            onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
            className="h-10 w-10 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-40">
            ›
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
