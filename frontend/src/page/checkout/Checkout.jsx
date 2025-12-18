import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { formatPrice } from "../../utility/format";
import CheckoutCard from "./component/CheckoutCard";
import CheckoutItem from "./component/CheckoutItem";
import DeliverInfomation from "./component/DeliverInfomation";
import DeliverOption from "./component/DeliverOption";
import PaymentOption from "./component/PaymentOption";

const mockMethodList = [
  { id: "standard", name: "Standard speed (2 - 5 business days)", price: 25000 },
  { id: "fast", name: "Fast speed (within same day)", price: 50000 },
];

const mockPaymentList = [
  { id: "cod", name: "Direct payment on delivery" },
  { id: "qr", name: "Payment by QR Code" },
];

const mockCheckoutList = [
  {
    productId: "P1",
    name: "AeroRun Pro",
    size: 42,
    quantity: 1,
    subTotal: 120000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
  },
  {
    productId: "P2",
    name: "Urban Stride",
    size: 39,
    quantity: 1,
    subTotal: 75000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
  },
  {
    productId: "P3",
    name: "Summit Hiker",
    size: 40,
    quantity: 2,
    subTotal: 300000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
  },
];

const priceInfo = {
  totalPrice: 495000,
  voucherDiscount: 40000,
};

const Checkout = () => {
  const [selectedDelivered, setSelectedDelivered] = useState(mockMethodList[0].id);
  const [selectedPayment, setSelectedPayment] = useState(mockPaymentList[0].id);

  const shippingPrice = mockMethodList.find((m) => m.id === selectedDelivered)?.price ?? 0;
  const total = priceInfo.totalPrice - priceInfo.voucherDiscount + shippingPrice;

  const navigate = useNavigate();
  const onCompleteOrder = () => {
    if (selectedPayment === "cod") {
      navigate({ to: "/confirm-order" });
      return;
    }

    if (selectedPayment === "qr") {
      navigate({ to: "/qr-payment" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black tracking-[-0.033em] sm:text-5xl md:text-6xl">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">
          {/* DELIVERY INFO */}
          <CheckoutCard title={"DELIVERY INFO"} childComponent={<DeliverInfomation />} />

          {/* DELIVERY METHOD */}
          <CheckoutCard
            title={"DELIVERY METHOD"}
            childComponent={
              <div className="divide-y divide-gray-200">
                {mockMethodList.map((method) => (
                  <DeliverOption
                    key={method.id}
                    id={method.id}
                    name={method.name}
                    price={method.price}
                    checked={selectedDelivered === method.id}
                    onChange={setSelectedDelivered}
                  />
                ))}
              </div>
            }
          />

          {/* PAYMENT */}
          <CheckoutCard
            title="PAYMENT METHODS"
            childComponent={
              <div className="divide-y divide-gray-200">
                {mockPaymentList.map((method) => (
                  <PaymentOption
                    key={method.id}
                    id={method.id}
                    name={method.name}
                    checked={selectedPayment === method.id}
                    onChange={setSelectedPayment}
                  />
                ))}
              </div>
            }
          />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
            <h2 className="mb-4 border-b border-gray-200 pb-4 text-lg font-bold">ORDER</h2>

            <ul className="divide-y divide-gray-200">
              {mockCheckoutList.map((item) => (
                <CheckoutItem key={item.productId} item={item} />
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <p>Total Price</p>
                <p>{formatPrice(priceInfo.totalPrice)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p>-{formatPrice(priceInfo.voucherDiscount)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>{formatPrice(shippingPrice)}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-xl font-bold">
              <p>TOTAL</p>
              <p>{formatPrice(total)}</p>
            </div>

            <button
              className="mt-6 h-12 w-full rounded-lg bg-blue-600 text-lg font-bold text-white transition-colors hover:bg-blue-700"
              onClick={() => onCompleteOrder()}>
              COMPLETE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
