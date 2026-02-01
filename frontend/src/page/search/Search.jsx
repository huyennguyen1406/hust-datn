import SearchIcon from "@mui/icons-material/Search";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  getStoreBanners,
  getStoreBrands,
  getStoreCategories,
  getStoreColors,
  searchStoreProducts,
} from "../../api/searchProductApi";
import Pagination from "../../component/pagination/Pagination";
import { searchRoute } from "../../router";
import BannerCarousel from "./component/BannerCarousel";
import ProductCard from "./component/ProductCard";

const sizeMock = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];

const Search = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: searchRoute.id });

  /* ================= URL PARAMS ================= */
  const category = search.category ?? "";
  const brand = search.brand ?? "";
  const size = search.size ?? "";
  const color = search.color ?? "";
  const productName = search.productName ?? "";
  const page = Number(search.page ?? 1);
  const pageSize = Number(search.pageSize ?? 8);

  /* ================= STATIC QUERIES ================= */

  const { data: brands = [] } = useQuery({
    queryKey: ["store-brands"],
    queryFn: getStoreBrands,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["store-categories"],
    queryFn: getStoreCategories,
  });

  const { data: colors = [] } = useQuery({
    queryKey: ["store-colors"],
    queryFn: getStoreColors,
  });

  const { data: banners = [] } = useQuery({
    queryKey: ["store-banners", category],
    queryFn: () => getStoreBanners(category),
    enabled: !!category,
    placeholderData: keepPreviousData,
  });

  /* ================= PRODUCT SEARCH ================= */

  const { data, isLoading } = useQuery({
    queryKey: ["store-products-search", category, brand, size, color, productName, page, pageSize],
    queryFn: () =>
      searchStoreProducts({
        category,
        productName,
        brand,
        size,
        color,
        page: page - 1,
        pageSize,
      }),
    keepPreviousData: true,
  });

  const products = data?.data ?? [];

  /* ================= HANDLERS ================= */

  const updateSearch = (next) => {
    navigate({
      search: (prev) => ({
        ...prev,
        ...next,
        page: 1,
      }),
    });
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-12 lg:px-8">
        {/* ================= FILTERS ================= */}
        <div className="mb-6 rounded-xl border p-6 sm:p-8">
          <div className="flex flex-col gap-8">
            {/* Keyword */}
            <div className="relative">
              <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search for product name..."
                value={productName}
                className="focus:ring-primary/50 h-14 w-full rounded-lg border pr-5 pl-12 text-lg focus:ring-2 focus:outline-none"
                onChange={(e) => updateSearch({ productName: e.target.value || undefined })}
              />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Category */}
              <div>
                <label className="font-medium">Search by category</label>
                <select
                  value={category}
                  onChange={(e) => updateSearch({ category: e.target.value || undefined })}
                  className="h-11 w-full rounded-lg border px-3">
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div>
                <label className="font-medium">Search by size</label>
                <select
                  value={size}
                  onChange={(e) =>
                    updateSearch({
                      size: e.target.value ? Number(e.target.value) : undefined,
                    })
                  }
                  className="h-11 w-full rounded-lg border px-3">
                  <option value="">Any Size</option>
                  {sizeMock.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="font-medium">Search by brand</label>
                <select
                  value={brand}
                  onChange={(e) => updateSearch({ brand: e.target.value || undefined })}
                  className="h-11 w-full rounded-lg border px-3">
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b.value} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="font-medium">Search by color</label>
                <div className="grid grid-cols-8 gap-3 pt-2 lg:grid-cols-12">
                  {colors.map((c) => {
                    const active = color === c.hex;
                    return (
                      <button
                        key={c.value}
                        type="button"
                        onClick={() =>
                          updateSearch({
                            color: active ? undefined : c.hex,
                          })
                        }
                        className={`h-7 w-7 rounded-sm border ${active ? "ring-primary ring-2 ring-offset-2" : ""}`}
                        style={{ backgroundColor: c.hex }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {banners.length > 0 && <BannerCarousel banners={banners} />}

        {/* ================= PRODUCTS ================= */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {isLoading && <div>Loading products...</div>}

          {!isLoading && products.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No products found</div>
          )}

          {products.map((p) => (
            <Link key={p.productId} to={`/product?id=${p.productId}`}>
              <ProductCard {...p} />
            </Link>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        <Pagination
          page={(data?.page ?? page) + 1}
          setPage={(newPage) =>
            navigate({
              search: (prev) => ({
                ...prev,
                page: newPage,
              }),
            })
          }
          pageSize={data?.pageSize ?? pageSize}
          setPageSize={(newPageSize) =>
            navigate({
              search: (prev) => ({
                ...prev,
                page: 1,
                pageSize: newPageSize,
              }),
            })
          }
          totalItems={data?.totalItems ?? 0}
          totalPage={data?.totalPages ?? 0}
          pageSizeOptions={[8, 12]}
          className="mt-16"
        />
      </div>
    </main>
  );
};

export default Search;
