import React from "react";
import { formatPrice } from "../../utility/format";
import CartItem from "./component/CartItem";
import VoucherItem from "./component/VoucherItem";

const cartStateMock = [
  { productId: "P1", quantity: 1 },
  { productId: "P2", quantity: 1 },
  { productId: "P3", quantity: 2 },
];

const itemList = [
  {
    productId: "P1",
    name: "AeroRun Pro",
    brand: "Aura",
    onSale: false,
    percentage: null,
    normalPrice: 120000,
    salePrice: null,
    quantity: 1,
    subTotal: 120000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAOoyablSBU9Iy19eAXKHxxvNCLXYDJxYCSPh2nQO_5aR8bM9k0b7rD8kQ7rYv5QSEc3SWvVeGaC6HFV-i_j-gUBZ4ixUozz1OSXpvyqPoOCiBDE27CuVLGnnNRKaykWuH639nFa0mAnXhsH8aHF_Ahj1cO4AQ6z0Q7pazI6QKtxko-j-sxY3lIdmpxg0ZGjcfqe0joRCi4Bd9zV2r1XGCeeXVoyBPkVkivjIkW8TK0vY36512FIs6LlCcn9KCm6Li5W7FjJJucf7q8",
  },
  {
    productId: "P2",
    name: "Urban Stride",
    brand: "Legacy",
    onSale: true,
    percentage: 25,
    normalPrice: 100000,
    salePrice: 75000,
    quantity: 1,
    subTotal: 75000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKufOUK_Q-7yrNwZZJAfhGiBn5u6rz1jAD4iDMPbGhVL0KHu9ayUwLOnatEkT8wqWwEF6UXel6T0m4cKLs7RF3otbe4eMSVHsT9xiCOCv4T_YGgCeoGhovuUyIaGef12WaSuNU2OOSX_AtszfmWwEubp0raPBbRv7iaKiGv1nvLbGdYbmuc0HPgaivqPpGrSSJCiZvnFYSGVndzvAGX026cAi7jKbGdw4ctd5YggN3vmBy1MlKt9_2nuoNE4QP4EumqE_Et7WqT3-G",
  },
  {
    productId: "P3",
    name: "Summit Hiker",
    brand: "TrekReady",
    onSale: false,
    normalPrice: 150000,
    salePrice: null,
    quantity: 2,
    subTotal: 300000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn66SGCBqM0hlzPsnxZAXS66QVzsEZANMvNDHxAQBo2s96RBQ6pN82GhWDQOi8HDoYB6JHUm84c-N-VfquQUenwSDWo7XN-MeLEfs9EAku3GwUNNut0BhfX2TkeGoqyFmbezfG-3dRio1yZpo4p9xvCPQm_E385979IGKUc6piKdn3PtzU7b8BYYb4Ivqt7O1tzyzygpvDcj4IaPQzNZHw7P46cSkqWudzfWizAsTstErXZ03lF4Ka39q5TGzjrBh5McYjO7HPG4KW",
  },
];

const voucherList = [
  { voucherId: "V1", voucherCode: "SUMMER20", discountAmount: 20000 },
  { voucherId: "V2", voucherCode: "SALE20", discountAmount: 20000 },
];

const backendMock = {
  itemList: itemList,
  voucherList: voucherList,
  totalPrice: 495000,
  finalPrice: 455000,
};

const Cart = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl leading-tight font-black tracking-[-0.033em] sm:text-5xl md:text-6xl">
            Shopping Cart
          </h1>
        </div>

        {/* Cart Items */}
        <div className="bg-card border-border rounded-xl border p-6 sm:p-8">
          <div className="flow-root">
            <ul className="divide-border -my-6 divide-y">
              {backendMock.itemList.map((item) => (
                <CartItem
                  key={item.productId}
                  productId={item.productId}
                  name={item.name}
                  brand={item.brand}
                  onSale={item.onSale}
                  percentage={item.percentage}
                  salePrice={item.salePrice}
                  normalPrice={item.normalPrice}
                  quantity={item.quantity}
                  subTotal={item.subTotal}
                  image={item.image}
                  onQuantityChange={() => console.log("Change Quantity")}
                  onRemove={() => console.log("Remove")}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-card border-border mt-8 rounded-xl border p-6 sm:p-8">
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-medium">
              <p>Total Price</p>
              <p>{formatPrice(backendMock.totalPrice)}</p>
            </div>

            <div className="border-border border-t pt-4">
              <label htmlFor="voucher-code" className="mb-2 block text-sm font-medium">
                Voucher Code
              </label>
              <div className="flex gap-4">
                <input
                  id="voucher-code"
                  type="text"
                  placeholder="Enter your code"
                  className="border-border bg-background focus:ring-primary/50 block h-11 w-full rounded-lg border px-4 focus:ring-2 focus:outline-none"
                />
                <button className="bg-primary/20 text-primary hover:bg-primary/30 h-11 min-w-[120px] rounded-lg px-6 font-bold transition-colors">
                  Apply
                </button>
              </div>
            </div>

            <ul className="space-y-2">
              {backendMock.voucherList.map((voucher) => (
                <VoucherItem
                  key={voucher.voucherId}
                  voucherCode={voucher.voucherCode}
                  discountAmount={voucher.discountAmount}
                />
              ))}
            </ul>

            <div className="border-border flex justify-between border-t pt-4 text-xl font-bold">
              <p>Final Price</p>
              <p>{formatPrice(backendMock.finalPrice)}</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-primary hover:bg-primary/90 h-12 w-full rounded-lg text-lg font-bold text-white transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
