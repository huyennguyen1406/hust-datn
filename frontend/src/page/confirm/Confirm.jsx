import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "@tanstack/react-router";
import { extractDate, formatPrice } from "../../utility/format";
import OrderItem from "./component/OrderItem";

const itemList = [
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
    size: 42,
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
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
  },
];

const orderInfo = {
  orderNumber: "SS123456789",
  deliverDate: "2025-10-28T00:00:00+07:00",
  totalPrice: 495000,
  voucherDiscount: 40000,
  shipping: 25000,
  finalPrice: 480000,
  itemList,
};

const Confirm = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <DoneIcon fontSize="large" className="text-white" />
          </div>
        </div>

        <h1 className="mb-2 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">Thank You for Your Order!</h1>

        <p className="mb-4 text-gray-600">Your order has been placed successfully.</p>

        <p className="text-lg">
          Order Number: <span className="font-bold text-blue-600">#{orderInfo.orderNumber}</span>
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Estimated Delivery Date: <span className="font-medium">{extractDate(orderInfo.deliverDate)}</span>
        </p>
      </div>

      {/* Order Summary */}
      <div className="mt-12 rounded-xl border border-gray-200 bg-white shadow-lg">
        <div className="p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>

          <div className="space-y-6">
            {itemList.map((item) => (
              <OrderItem
                key={item.productId}
                name={item.name}
                brand={item.brand}
                size={item.size}
                quantity={item.quantity}
                subTotal={item.subTotal}
                image={item.image}
              />
            ))}
          </div>

          <div className="mt-8 space-y-3 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">{formatPrice(orderInfo.totalPrice)}</span>
            </div>

            <div className="flex items-center justify-between text-green-600">
              <span>Discount</span>
              <span className="font-medium">-{formatPrice(orderInfo.voucherDiscount)}</span>
            </div>

            <div className="flex items-center justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium">{formatPrice(orderInfo.shipping)}</span>
            </div>

            <div className="flex items-center justify-between text-xl font-bold">
              <span>Total Paid</span>
              <span>{formatPrice(orderInfo.finalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-blue-600 px-8 font-medium text-white transition-colors hover:bg-blue-700">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Confirm;
