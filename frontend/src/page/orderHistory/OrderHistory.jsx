import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import Pagination from "../../component/pagination/Pagination";
import OrderInfo from "./component/OrderInfo";

const mockData = [
  {
    orderNumber: "#SH123456789",
    orderDate: "2025-10-26T00:00:00+07:00",
    totalAmount: 480000,
    status: "Delivered",
    items: [
      {
        productId: "P1",
        name: "AeroRun Pro",
        brand: "Aura",
        size: 42,
        quantity: 1,
        subTotal: 120000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
      },
      {
        productId: "P2",
        name: "Urban Stride",
        brand: "Legacy",
        size: 39,
        quantity: 1,
        subTotal: 75000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
      },
      {
        productId: "P3",
        name: "Summit Hiker",
        brand: "TrekReady",
        size: 42,
        quantity: 2,
        subTotal: 300000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
      },
    ],
  },
  {
    orderNumber: "#SH123456777",
    orderDate: "2025-11-26T00:00:00+07:00",
    totalAmount: 375000,
    status: "Processing",
    items: [
      {
        productId: "P2",
        name: "Urban Stride",
        brand: "Legacy",
        size: 39,
        quantity: 1,
        subTotal: 75000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
      },
      {
        productId: "P3",
        name: "Summit Hiker",
        brand: "TrekReady",
        size: 40,
        quantity: 2,
        subTotal: 300000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
      },
    ],
  },
  {
    orderNumber: "#SH123456888",
    orderDate: "2025-10-26T00:00:00+07:00",
    totalAmount: 240000,
    status: "Cancelled",
    items: [
      {
        productId: "P1",
        name: "AeroRun Pro",
        brand: "Aura",
        size: 42,
        quantity: 2,
        subTotal: 240000,
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
      },
    ],
  },
];

const ORDER_STATUS_OPTIONS = [
  { label: "All Orders", value: "ALL" },
  { label: "Delivered", value: "DELIVERED" },
  { label: "Processing", value: "PROCESSING" },
  { label: "Cancelled", value: "CANCELLED" },
];

const OrderHistory = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [status, setStatus] = useState("ALL");

  const handleStatusChange = (e) => {
    const value = e.target.value;
    setStatus(value);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-base text-gray-500">
        <Link href="/account" className="hover:text-primary transition-colors">
          My Account
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900">Order History</span>
      </div>

      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black tracking-[-0.033em]">Order History</h1>

        <select
          value={status}
          onChange={handleStatusChange}
          className="border-border bg-background focus:ring-primary h-10 min-w-[200px] rounded-lg border px-4 text-base focus:ring-2 focus:outline-none">
          {ORDER_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {mockData.map((order) => (
          <OrderInfo key={order.orderNumber} orderInfo={order} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={5}
        className="mt-12"
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={100}
        pageSizeOptions={[8, 12]}
      />
    </div>
  );
};

export default OrderHistory;
