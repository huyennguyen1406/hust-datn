import React from "react";
import { Link } from "@tanstack/react-router";

const Order = () => {
  return (
    <div className="bg-card rounded-xl p-8 text-center shadow-lg">
      <h2 className="mb-4 text-2xl font-bold">My Orders</h2>
      <p className="text-text/70 mb-6">Check the status of your recent orders and view your purchase history.</p>

      <Link
        to="/account/order-history"
        className="bg-primary hover:bg-primary/90 inline-flex h-12 w-full items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors sm:w-auto">
        View Order History
      </Link>
    </div>
  );
};

export default Order;
