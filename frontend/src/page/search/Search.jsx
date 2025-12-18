import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "@tanstack/react-router";
import { useNavigate, useSearch } from "@tanstack/react-router";
import Pagination from "../../component/pagination/Pagination";
import { searchRoute } from "../../router";
import Banner from "./component/Banner";
import ProductCard from "./component/ProductCard";

const mockData = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
    brand: "Aura",
    productName: "AeroRun Pro",
    description: "Men's Running Shoe",
    isSale: true,
    salePrice: 90000,
    normalPrice: 120000,
    productId: "P1",
    rating: 3.6,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
    brand: "Legacy",
    productName: "Urban Stride",
    description: "Women's Casual Sneaker",
    isSale: true,
    salePrice: 65,
    normalPrice: 85,
    productId: "P2",
    rating: 4.6,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
    brand: "TrekReady",
    productName: "Summit Hiker",
    description: "Unisex Hiking Boot",
    isSale: false,
    salePrice: null,
    normalPrice: 150,
    productId: "P3",
    rating: 4.6,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOmXRtn0WlPAT3PaEwpAVOHgcCWUPIPlvdeWPQ_7_ROKwJGQ412lDg5G4baQKlt9jsZ8g-CHxUN8_tvNv_z0-ADFH0_nquJq_BaN7g3DaX0HQNRRrHGjRUaFU5C99uHpkOY3fpCZJX0RM9q167C0hMWAA9JwCeTNBpKA_UTr246fBN4A4KCS_f2SPZGt1OJweCzxUsZraFcEVKugzlidkpxyWnpPVng_mT_pswH0xw3-VQjj_x7geimVUogJ62LZEejbp5LcMw6G_1",
    brand: "Momentum",
    productName: "Flex Trainer",
    description: "Men's Gym Shoe",
    isSale: true,
    salePrice: 75,
    normalPrice: 95,
    productId: "P4",
    rating: 2.6,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBLxYLvi42XqX2EKwq5mSJBlgOpeTuerWyUPbQsTbYJ1GkYjvbT5dxdT1au9lDZmS7-JC3r-K2WYFGUqfzTVy-7JZ9sVK9QhX451utfdLsrKkYHAyhNghslE1YJUigTM2KnJ3_8Y8Q5yjwL27Bou_gi11Qkm-JnK1shYD9XLdEJ43vdUsiHRjguaUZrhlYCG4JmWBatJkyD7Vu5LnNoQiha3iLscx9G-W9o7Ytg_TrZd7cYw0hZvzjeEk2ku5mENbYLURSwf1FdYxQ3",
    brand: "Streetwise",
    productName: "Metro Sneaker",
    description: "Unisex Lifestyle Shoe",
    isSale: false,
    salePrice: null,
    normalPrice: 110,
    productId: "P5",
    rating: 3.6,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAf96FvnLRFtdvRz-X_HZyQEGNHblilcxUthRrpyYmKL3EnoQLns3x5TZMg-OkEBJDWChoA6366JaI3hFad6103u7V7AKgrg0keZUN2ofLNMXXPprTVhhE5CDjryxtrCFRYZnZ0XZQwWb4B9N-hCGNeQY2UfZTisYjSMLhRDoGboX1PCkR_ub4WsRSPaLxSyXj_YBjSKomRnDQjx5noSjszMtlx-e6_tRlxgygBJ8bsew31sfhfRoOMf-mF6GQZ5413vs7Is5VLmmuv",
    brand: "KiddieKicks",
    productName: "Kids Sparkle",
    description: "Kids' Light-up Sneaker",
    isSale: true,
    salePrice: 50,
    normalPrice: 65,
    productId: "P6",
    rating: 4.2,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAz7SsmV5edyfPKxlKyXw-mu_SllDRl6A47Ok6fNxYZEWw_p2Q8dyh2O0R7v-wfuI8VpkbTfixjAQiBZDa7gipKuzdipxUTgM5eWNTyeT05bon5awMXUJCdG0XociuvQcZ8mIDHwcE6MVKTxBvkvwApI5uQztwPg0dR_eey6Rcu6APa0yxdN37SWxdw2QTs0wK4m_RTVxOw9QBQv3hB65WNGYL7JCRBWv4ejn9i7TrNlAGhwNXCEIKSG1ek6pqTPoopY-hJT5k_T730",
    brand: "Elegance",
    productName: "City Chic Heel",
    description: "Women's Heeled Sandal",
    isSale: false,
    salePrice: null,
    normalPrice: 90,
    productId: "P7",
    rating: 3.6,
    reviewCount: 120,
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMI1iBkP5DaB8SQLiPTgHC20Z-HxqnVKrX584hWyJYJ79AaF0tVux87hVd7JVYT67T6ibukhZLEh-sq2nRHK3XfYoJ_J6eWSxfPl9IyA8fr1O4q893_P1TR9955_1B7ZtGecBiNqHthsdZws8VXcLzB77bsxvQZs9D6MHuqJhk86wPnnGr8vFEfoa6etZeKsxu6Vp2juU2mY7T5I_HCBhChl6rMY73y7sVWcgeyEdPe6VQWxV11w8TpCBN1Z2CnVLpKan76XGe0DEe",
    brand: "Grit",
    productName: "Rugged Boot",
    description: "Men's Leather Boot",
    isSale: false,
    salePrice: null,
    normalPrice: 180,
    productId: "P8",
    rating: 0.6,
    reviewCount: 120,
  },
];

const bannerMock = {
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBLxYLvi42XqX2EKwq5mSJBlgOpeTuerWyUPbQsTbYJ1GkYjvbT5dxdT1au9lDZmS7-JC3r-K2WYFGUqfzTVy-7JZ9sVK9QhX451utfdLsrKkYHAyhNghslE1YJUigTM2KnJ3_8Y8Q5yjwL27Bou_gi11Qkm-JnK1shYD9XLdEJ43vdUsiHRjguaUZrhlYCG4JmWBatJkyD7Vu5LnNoQiha3iLscx9G-W9o7Ytg_TrZd7cYw0hZvzjeEk2ku5mENbYLURSwf1FdYxQ3",
  title: "Christmas Sale",
  description: "Unwrap incredible deals on your favorite styles. Up to 50% off on selected items. Don't miss out!",
};

const brandMock = [
  { value: "aura", name: "Aura" },
  { value: "nike", name: "Nike" },
  { value: "new_balance", name: "New Balance" },
  { value: "puma", name: "Puma" },
  { value: "reebok", name: "Reebok" },
];

const categoryMock = [
  { value: "men", name: "Mens's Footwear" },
  { value: "women", name: "Women's Footwear" },
  { value: "kids", name: "Kids' Collection" },
  { value: "sales", name: "Sales" },
  { value: "new_arrival", name: "New Arrivals" },
];

const sizeMock = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44];

const COLORS = [
  { name: "White", value: "white", hex: "#ffffff" },
  { name: "Beige", value: "beige", hex: "#e8d3a8" },
  { name: "Navy", value: "navy", hex: "#0b2d5c" },
  { name: "Light Gray", value: "light-gray", hex: "#f3f3f3" },
  { name: "Green", value: "green", hex: "#6b8f3e" },
  { name: "Black", value: "black", hex: "#333333" },
];

const Search = () => {
  const navigate = useNavigate();
  const search = useSearch({ from: searchRoute.id });
  const category = search.category ?? "";

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [colorValue, setColorValue] = useState(null);

  const onCategoryChange = (e) => {
    navigate({
      search: (prev) => ({
        ...prev,
        category: e.target.value || undefined,
      }),
    });
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-6 rounded-xl border p-6 sm:p-8">
          <form className="flex flex-col gap-8">
            {/* Keyword search */}
            <div className="relative">
              <SearchIcon fontSize="medium" className="absolute top-1/2 left-4 -translate-y-1/2" />
              <input
                id="keyword"
                type="text"
                placeholder="Search for shoes, brands, and more..."
                className="focus:ring-primary/50 h-14 w-full rounded-lg border pr-5 pl-12 text-lg transition-colors focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
              {/* Category */}
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-base font-medium">
                  Search by category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => onCategoryChange(e)}
                  className="focus:ring-primary/50 h-11 w-full rounded-lg border px-3 transition-colors focus:ring-2 focus:outline-none">
                  <option value={""}>All Categories</option>
                  {categoryMock.map((item) => (
                    <option value={item.value} key={`category-${item.value}`}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size */}
              <div className="flex flex-col gap-2">
                <label htmlFor="size" className="text-base font-medium">
                  Search by size
                </label>
                <select
                  id="size"
                  className="focus:ring-primary/50 h-11 w-full rounded-lg border px-3 transition-colors focus:ring-2 focus:outline-none">
                  <option value={null}>Any Size</option>
                  {sizeMock.map((item) => (
                    <option value={item} key={`size-${item}`}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="flex flex-col gap-2">
                <label htmlFor="brand" className="text-base font-medium">
                  Search by brand
                </label>
                <select
                  id="brand"
                  className="focus:ring-primary/50 h-11 w-full rounded-lg border px-3 transition-colors focus:ring-2 focus:outline-none">
                  <option value={null}>All Brands</option>
                  {brandMock.map((item) => (
                    <option value={item.value} key={`brand-${item.value}`}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div className="flex flex-col gap-2">
                <label className="mb-1 block text-base font-medium">Search by color</label>
                <div className="grid grid-cols-8 gap-3 pt-1 lg:grid-cols-12">
                  {COLORS.map((color) => {
                    const isActive = colorValue === color.value;
                    return (
                      <button
                        key={color.value}
                        type="button"
                        aria-label={color.name}
                        onClick={() => setColorValue(color.value)}
                        className={`h-7 w-7 cursor-pointer rounded-sm border transition-all ${isActive ? "ring-primary ring-2 ring-offset-2" : ""} `}
                        style={{ backgroundColor: color.hex }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 flex h-11 max-w-[480px] min-w-[120px] cursor-pointer items-center justify-center rounded-lg px-6 text-base font-bold tracking-[0.015em] text-white transition-colors">
                Search
              </button>
            </div>
          </form>
        </div>

        {category && <Banner image={bannerMock.image} title={bannerMock.title} description={bannerMock.description} />}

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mockData.map((item) => (
            <Link to={`/product?id=${item.productId}`} key={`product-${item.productId}`}>
              <ProductCard
                image={item.image}
                brand={item.brand}
                isSale={item.isSale}
                productName={item.productName}
                description={item.description}
                salePrice={item.salePrice}
                normalPrice={item.normalPrice}
                key={item.productId}
                rating={item.rating}
                reviewCount={item.reviewCount}
              />
            </Link>
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={5}
          className="mt-16"
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalItems={100}
          pageSizeOptions={[8, 12]}
        />
      </div>
    </main>
  );
};

export default Search;
