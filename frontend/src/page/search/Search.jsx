import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import Pagination from "../../component/pagination/Pagination";
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
  { value: "", name: "Select A Brand" },
  { value: "aura", name: "Aura" },
  { value: "nike", name: "Nike" },
  { value: "new_balance", name: "New Balance" },
];

const COLORS = [
  { name: "White", value: "white", hex: "#ffffff" },
  { name: "Beige", value: "beige", hex: "#e8d3a8" },
  { name: "Navy", value: "navy", hex: "#0b2d5c" },
  { name: "Light Gray", value: "light-gray", hex: "#f3f3f3" },
  { name: "Green", value: "green", hex: "#6b8f3e" },
  { name: "Black", value: "black", hex: "#333333" },
];

const Search = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filterType, setFilterType] = useState("brand"); // "brand" | "color"
  const [filterValue, setFilterValue] = useState(null);

  const onFilterOptionChange = (e) => {
    const nextType = e.target.value;
    setFilterType(nextType);
    setFilterValue(null); // reset value when switching type
  };

  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-12 lg:px-8">
        <Banner image={bannerMock.image} title={bannerMock.title} description={bannerMock.description} />

        {/* Header */}
        <div className="mb-6 grid grid-cols-[auto_auto] gap-4 sm:items-center lg:grid-cols-[1fr_auto_auto_auto]">
          <h2 className="col-span-full text-2xl font-bold md:text-xl lg:col-span-1 lg:text-xl">Sale Items (12)</h2>

          <div className="col-span-2 grid grid-cols-[auto_1fr] items-center gap-2 md:col-span-1">
            <label htmlFor="filter-type" className="text-sm font-medium sm:block">
              Filter:
            </label>

            <div className="grid grid-cols-[120px_1fr] gap-2">
              <select
                id="filter-type"
                className="focus:ring-primary/50 h-10 rounded-lg border px-2 text-sm focus:ring-2 focus:outline-none"
                onChange={(e) => onFilterOptionChange(e)}>
                <option value="brand">Brand</option>
                <option value="color">Color</option>
              </select>
              {filterType === "brand" && (
                <select
                  value={filterValue ?? ""}
                  onChange={(e) => setFilterValue(e.target.value || null)}
                  className="focus:ring-primary/50 h-10 min-w-40 rounded-lg border px-3 text-sm focus:ring-2 focus:outline-none">
                  {brandMock.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              )}
              {filterType === "color" && (
                <div className="grid grid-cols-6 gap-2">
                  {COLORS.map((color) => {
                    const isActive = filterValue === color.value;

                    return (
                      <button
                        key={color.value}
                        type="button"
                        aria-label={color.name}
                        onClick={() => setFilterValue(isActive ? null : color.value)}
                        className={`h-7 w-7 rounded-sm border transition-all ${isActive ? "ring-primary ring-2 ring-offset-2" : ""} `}
                        style={{ backgroundColor: color.hex }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-[auto_1fr] items-center gap-2 md:col-span-1">
            <label htmlFor="sort" className="text-sm font-medium sm:block">
              Sort by:
            </label>
            <select
              id="sort"
              className="focus:ring-primary/50 h-10 rounded-lg border px-3 text-sm focus:ring-2 focus:outline-none lg:pr-10">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Rating: Low to High</option>
            </select>
          </div>

          <div className="col-span-2 grid grid-cols-[auto_1fr] items-center gap-2 lg:col-span-1">
            <label htmlFor="ai-search" className="text-sm font-medium sm:block">
              Ask AI:
            </label>

            <input
              id="ai-search"
              type="text"
              placeholder='e.g. "running shoes under 2 million"'
              className="focus:ring-primary/50 h-10 min-w-[280px] rounded-lg border px-3 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            className="bg-primary hover:bg-primary/90 focus:ring-primary/50 h-10 cursor-pointer rounded-lg px-6 text-sm font-medium whitespace-nowrap text-white focus:ring-2 focus:outline-none">
            Search
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockData.map((item) => (
            <Link to={`/product?id=${item.productId}`}>
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
          pageSizeOptions={[10, 20]}
        />
      </div>
    </main>
  );
};

export default Search;
