import React from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { orderDetailRoute } from "../../router";
import { extractDate, formatPrice } from "../../utility/format";
import OrderItem from "./component/OrderItem";

const mappingColorStatus = {
  Delivered: "bg-green-100 text-green-700",
  Processing: "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-700",
};

const mockData = {
  orderNumber: "SH123456789",
  orderInfo: {
    orderNumber: "SS123456789",
    orderDate: "2025-10-28T00:00:00+07:00",
    totalPrice: 495000,
    voucherDiscount: 40000,
    shipping: 25000,
    finalPrice: 480000,
  },
  status: "Delivered",
  deliverDate: "2025-11-02T00:00:00+07:00",
  items: [
    {
      productId: "P1",
      name: "AeroRun Pro",
      brand: "Aura",
      size: 42,
      quantity: 1,
      unitPrice: 120000,
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
      unitPrice: 75000,
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
      unitPrice: 150000,
      subTotal: 300000,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
    },
  ],
  deliveryInformation: {
    fullName: "Nguyen Van An",
    address: {
      unit: "Can ho 201",
      street: "So 6, Duong Pham Hung",
      district: "Tu Liem",
      province: "Ha Noi",
      postalCode: "100000",
      country: "Viet Nam",
    },
    phone: "0901 234 567",
  },
  deliveryMethod: {
    name: "Standard Shipping",
    estimatedDelivery: "2025-11-02T00:00:00+07:00",
    price: 25000,
  },
  paymentMethod: {
    name: "Direct payment on delivery",
  },
};

const OrderDetail = () => {
  const { orderId } = useParams({
    from: orderDetailRoute.id,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-base text-gray-500">
        <Link to="/account" className="hover:text-primary transition-colors">
          My Account
        </Link>
        <span>/</span>
        <Link to="/account/order-history" className="hover:text-primary transition-colors">
          Order History
        </Link>
        <span>/</span>
        <span className="font-medium text-gray-900">Order Details</span>
      </div>

      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-4xl font-black tracking-[-0.033em]">Order Details</h1>

        <button className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-gray-200 px-5 text-sm font-bold transition-colors hover:bg-gray-300">
          <ReceiptIcon fontSize="medium" />
          Download Invoice
        </button>
      </div>

      {/* Order Info */}
      <div className="mb-12 flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:justify-between">
        <div>
          <p className="text-sm text-gray-500">Order Number</p>
          <p className="font-bold">#{mockData.orderNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Order Date</p>
          <p className="font-medium">{extractDate(mockData?.orderInfo?.orderDate)}</p>
        </div>

        {mockData.status === "Delivered" && (
          <div>
            <p className="text-sm text-gray-500">Deliver Date</p>
            <p className="font-medium">{extractDate(mockData?.deliverDate)}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${mappingColorStatus[mockData.status]}`}>
            {mockData.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-6 text-xl font-bold">Items Ordered</h2>

            <div className="divide-y divide-gray-200">
              {mockData.items.map((item) => (
                <OrderItem key={item.productId} item={item} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-2">
            <div>
              <h3 className="text-lg font-bold">Delivery Information</h3>
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p className="font-medium text-gray-800">{mockData?.deliveryInformation?.fullName}</p>
                <p>
                  {mockData?.deliveryInformation?.address?.unit}, {mockData?.deliveryInformation?.address?.street}
                </p>
                <p>
                  {mockData?.deliveryInformation?.address?.district}, {mockData?.deliveryInformation?.address?.province}
                </p>
                <p>Phone: {mockData?.deliveryInformation?.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold">Delivery Method</h3>
              <div className="mt-4 space-y-1 text-sm text-gray-600">
                <p className="font-medium text-gray-800">{mockData?.deliveryMethod?.name}</p>
                {mockData.status === "Delivered" ? (
                  <p>Delivered on {extractDate(mockData?.deliverDate)}</p>
                ) : (
                  <p>Estimated Delivery: {extractDate(mockData?.deliveryMethod?.estimatedDelivery)}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">{formatPrice(mockData?.orderInfo?.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping Fee</span>
                <span className="font-medium text-gray-800">{formatPrice(mockData?.orderInfo?.shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="font-medium text-red-600">-{formatPrice(mockData?.orderInfo?.voucherDiscount)}</span>
              </div>

              <div className="my-4 border-t" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(mockData?.orderInfo?.finalPrice)}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold">Payment Method</h3>

            <div className="mt-4 flex items-center gap-4">
              <p className="text-sm text-gray-600">{mockData?.paymentMethod?.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
