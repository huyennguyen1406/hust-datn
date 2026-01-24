import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "@tanstack/react-router";
import Pagination from "../../component/pagination/Pagination";
import StarRating from "../../component/rating/StarRating";
import { formatPrice } from "../../utility/format";
import Carousel from "./component/Carousel";
import ReviewCard from "./component/ReviewCard";
import SizeSelector from "./component/SizeSelector";

const mockImageList = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAOmXRtn0WlPAT3PaEwpAVOHgcCWUPIPlvdeWPQ_7_ROKwJGQ412lDg5G4baQKlt9jsZ8g-CHxUN8_tvNv_z0-ADFH0_nquJq_BaN7g3DaX0HQNRRrHGjRUaFU5C99uHpkOY3fpCZJX0RM9q167C0hMWAA9JwCeTNBpKA_UTr246fBN4A4KCS_f2SPZGt1OJweCzxUsZraFcEVKugzlidkpxyWnpPVng_mT_pswH0xw3-VQjj_x7geimVUogJ62LZEejbp5LcMw6G_1",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAOmXRtn0WlPAT3PaEwpAVOHgcCWUPIPlvdeWPQ_7_ROKwJGQ412lDg5G4baQKlt9jsZ8g-CHxUN8_tvNv_z0-ADFH0_nquJq_BaN7g3DaX0HQNRRrHGjRUaFU5C99uHpkOY3fpCZJX0RM9q167C0hMWAA9JwCeTNBpKA_UTr246fBN4A4KCS_f2SPZGt1OJweCzxUsZraFcEVKugzlidkpxyWnpPVng_mT_pswH0xw3-VQjj_x7geimVUogJ62LZEejbp5LcMw6G_1",
];

const mockSizeList = [
  { size: 35, onStock: true },
  { size: 36, onStock: true },
  { size: 37, onStock: false },
  { size: 38, onStock: true },
  { size: 39, onStock: false },
  { size: 40, onStock: true },
  { size: 41, onStock: false },
  { size: 42, onStock: false },
  { size: 43, onStock: false },
  { size: 44, onStock: false },
  { size: 45, onStock: false },
];

const summarizedReview = [
  "Incredibly comfortable and stylish. Perfect for running.",
  "Great fit and support. I've received many compliments.",
  "The quality is top-notch, definitely worth the price.",
];

const mockUserReviews = [
  {
    name: "Alex Johnson",
    time: "2 days ago",
    stars: 5,
    content: "Absolutely love these shoes! They are the most comfortable pair I've ever owned.",
    avatar: "https://www.loremfaces.net/256/id/2.jpg",
  },
  {
    name: "Maria Garcia",
    time: "1 week ago",
    stars: 4,
    content: "Really good shoes for the price. Fit is true to size and provides excellent support.",
    avatar: "https://www.loremfaces.net/256/id/1.jpg",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAf96FvnLRFtdvRz-X_HZyQEGNHblilcxUthRrpyYmKL3EnoQLns3x5TZMg-OkEBJDWChoA6366JaI3hFad6103u7V7AKgrg0keZUN2ofLNMXXPprTVhhE5CDjryxtrCFRYZnZ0XZQwWb4B9N-hCGNeQY2UfZTisYjSMLhRDoGboX1PCkR_ub4WsRSPaLxSyXj_YBjSKomRnDQjx5noSjszMtlx-e6_tRlxgygBJ8bsew31sfhfRoOMf-mF6GQZ5413vs7Is5VLmmuv",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAMI1iBkP5DaB8SQLiPTgHC20Z-HxqnVKrX584hWyJYJ79AaF0tVux87hVd7JVYT67T6ibukhZLEh-sq2nRHK3XfYoJ_J6eWSxfPl9IyA8fr1O4q893_P1TR9955_1B7ZtGecBiNqHthsdZws8VXcLzB77bsxvQZs9D6MHuqJhk86wPnnGr8vFEfoa6etZeKsxu6Vp2juU2mY7T5I_HCBhChl6rMY73y7sVWcgeyEdPe6VQWxV11w8TpCBN1Z2CnVLpKan76XGe0DEe",
    ],
  },
  {
    name: "Chris Lee",
    time: "3 weeks ago",
    stars: 5,
    content: "Top quality product. Lightweight, breathable, and stylish.",
    avatar: "https://www.loremfaces.net/256/id/5.jpg",
  },
];

const mockData = {
  images: mockImageList,
  brand: {
    id: "aura",
    name: "AeroRun",
  },
  productName: "AeroRun Pro",
  description: "Men's Running Shoe",
  isSale: true,
  salePrice: 90000,
  normalPrice: 120000,
  productId: "P1",
  rating: 4.6,
  reviewCount: 128,
  sizeList: mockSizeList,
  summarizedReviews: summarizedReview,
};

const Product = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [commentPage, setCommentPage] = useState(1);
  const [commentPageSize, setCommentPageSize] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="mx-auto max-w-7xl py-4 sm:px-6 md:py-8">
      <div className="flex flex-wrap gap-2 p-4">
        <Link
          to={"/search"}
          className="hover:text-primary text-base leading-normal font-medium text-gray-600 transition-colors">
          Search
        </Link>
        <span className="text-base leading-normal font-medium text-gray-500">/</span>
        <span className="text-base leading-normal font-medium text-gray-900">{mockData.productName}</span>
      </div>

      {/* Product */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <Carousel images={mockImageList} alt="Image List" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8">
          <div>
            <Link className="text-primary text-lg font-medium" to={`/search?brand=${mockData.brand.id}`}>
              {mockData.brand.name}
            </Link>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-4xl font-black sm:text-5xl">{mockData.productName}</h1>

              <button
                onClick={() => setIsWishlisted((prev) => !prev)}
                className="group flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                aria-label="Toggle wishlist">
                {isWishlisted ? (
                  <FavoriteIcon className="text-red-500 transition-transform group-hover:scale-110" />
                ) : (
                  <FavoriteBorderIcon className="text-gray-500 transition-transform group-hover:scale-110 group-hover:text-red-500" />
                )}
              </button>
            </div>
            <div className="mt-4 flex items-baseline gap-4">
              {mockData.isSale ? (
                <>
                  <p className="text-3xl font-bold text-red-600">{formatPrice(mockData.salePrice)}</p>
                  <p className="text-2xl font-medium text-gray-400 line-through">{formatPrice(mockData.normalPrice)}</p>
                </>
              ) : (
                <p className="text-3xl font-bold text-blue-600">{formatPrice(mockData.normalPrice)}</p>
              )}
            </div>
          </div>

          <SizeSelector sizes={mockSizeList} value={selectedSize} onChange={setSelectedSize} />

          <button className="bg-primary hover:bg-primary/90 h-14 w-full cursor-pointer rounded-lg text-lg font-bold text-white transition-colors">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-8 border-t border-gray-200 pt-12 md:mt-16">
        <h2 className="mb-8 px-2 text-3xl font-bold tracking-tight md:px-0">Customer Reviews</h2>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Review Summary */}
          <div className="flex flex-col gap-6 self-start rounded-xl border border-gray-200 bg-white p-6 lg:col-span-1">
            <h3 className="text-xl font-bold">Review Summary</h3>

            <StarRating rating={4.6} reviewCount={128} />

            <div className="space-y-2 text-sm">
              {mockData.summarizedReviews.map((item, index) => (
                <p key={`summary-${index}`}>{item}</p>
              ))}
            </div>

            {/* Leave Comment */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="mb-3 text-lg font-semibold">Leave a comment</h3>

              <textarea
                className="focus:ring-primary/50 h-24 w-full rounded-lg border border-gray-300 p-3 text-base focus:ring-2 focus:outline-none"
                placeholder="Share your thoughts..."
              />

              <div className="mt-3 flex items-center justify-between">
                <button className="hover:text-primary flex cursor-pointer items-center gap-2 text-sm font-medium text-gray-500 transition-colors">
                  <AddPhotoAlternateIcon fontSize="small" />
                  Attach Image
                </button>

                <button className="bg-primary hover:bg-primary/90 flex h-11 cursor-pointer items-center justify-center rounded-lg px-6 text-base font-bold text-white transition-colors">
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Other user's review */}
          <div className="space-y-8 lg:col-span-2">
            {mockUserReviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
            <Pagination
              page={commentPage}
              setPage={setCommentPage}
              totalPage={3}
              pageSize={commentPageSize}
              setPageSize={setCommentPageSize}
              totalItems={15}
              pageSizeOptions={[5]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
