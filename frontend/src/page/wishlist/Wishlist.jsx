// Wishlist.jsx
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "@tanstack/react-router";
import WishlistItem from "./component/WishlishItem";

const wishList = [
  {
    productId: "P1",
    name: "AeroRun Pro",
    brand: "Aura",
    size: 42,
    onSale: false,
    percentage: null,
    normalPrice: 120000,
    salePrice: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
  },
  {
    productId: "P2",
    name: "Urban Stride",
    brand: "Legacy",
    size: 42,
    onSale: true,
    percentage: 25,
    normalPrice: 100000,
    salePrice: 75000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
  },
  {
    productId: "P3",
    name: "Summit Hiker",
    brand: "TrekReady",
    size: 42,
    onSale: false,
    normalPrice: 150000,
    salePrice: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
  },
];

const Wishlist = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-base text-gray-500">
          <Link href="/account" className="hover:text-primary transition-colors">
            My Account
          </Link>
          <span>/</span>
          <span className="font-medium text-gray-900">Wishlist</span>
        </div>

        {/* Header */}
        <div className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <div>
            <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] sm:text-5xl">Your Wishlist</h1>
            <p className="mt-2 text-base text-gray-500 sm:text-lg">Manage and organize your favorite pairs.</p>
          </div>
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <ul className="divide-y divide-gray-200">
            {wishList.map((item) => (
              <WishlistItem key={item.id} item={item} />
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-center">
          <Link to="/search" className="text-primary inline-flex items-center gap-2 font-bold hover:underline">
            <ArrowBackIcon fontSize="medium" />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
