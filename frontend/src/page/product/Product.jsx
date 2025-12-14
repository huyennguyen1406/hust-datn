import React from "react";

const Product = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 p-4">
        <a href="#" className="hover:text-primary text-base leading-normal font-medium text-gray-600 transition-colors">
          Search
        </a>
        <span className="text-base leading-normal font-medium text-gray-500">/</span>
        <span className="text-base leading-normal font-medium text-gray-900">Product Name</span>
      </div>

      {/* Product */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
            <div
              className="h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8')",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-between px-4">
              <button className="flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-colors hover:bg-white">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="flex size-10 items-center justify-center rounded-full bg-white/80 backdrop-blur transition-colors hover:bg-white">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-4">
            {[
              "AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
              "AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
              "AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
              "AB6AXuAOmXRtn0WlPAT3PaEwpAVOHgcCWUPIPlvdeWPQ_7_ROKwJGQ412lDg5G4baQKlt9jsZ8g-CHxUN8_tvNv_z0-ADFH0_nquJq_BaN7g3DaX0HQNRRrHGjRUaFU5C99uHpkOY3fpCZJX0RM9q167C0hMWAA9JwCeTNBpKA_UTr246fBN4A4KCS_f2SPZGt1OJweCzxUsZraFcEVKugzlidkpxyWnpPVng_mT_pswH0xw3-VQjj_x7geimVUogJ62LZEejbp5LcMw6G_1",
            ].map((img, i) => (
              <div
                key={i}
                className={`aspect-square cursor-pointer rounded-lg bg-cover bg-center transition-all ${
                  i === 0 ? "ring-primary ring-2" : "hover:ring-primary hover:ring-2"
                }`}
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/${img}')`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-primary text-lg font-medium">AeroRun</p>
            <h1 className="mt-1 text-4xl font-black sm:text-5xl">AeroRun Pro</h1>
            <div className="mt-4 flex items-baseline gap-4">
              <p className="text-3xl font-bold text-red-600">$84.00</p>
              <p className="text-2xl font-medium text-gray-400 line-through">$120.00</p>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h2 className="mb-4 text-lg font-semibold">Select Size (US)</h2>
            <div className="flex flex-wrap gap-3">
              {["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"].map((size) => {
                const disabled = size === "9" || size === "10.5";
                const active = size === "8";

                return (
                  <button
                    key={size}
                    disabled={disabled}
                    className={`relative h-12 w-12 rounded-lg border font-semibold transition-colors ${active && "bg-primary border-primary text-white"} ${!active && !disabled && "hover:border-primary"} ${disabled && "cursor-not-allowed text-gray-400"} `}>
                    {size}
                    {disabled && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="h-px w-full rotate-[-45deg] bg-gray-400" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <button className="bg-primary hover:bg-primary/90 h-14 w-full rounded-lg text-lg font-bold text-white transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
