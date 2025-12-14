import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { logout } from "../../auth";
import Deliver from "./component/Deliver";
import Order from "./component/Order";
import Personal from "./component/Personal";

const Account = () => {
  const navigate = useNavigate();

  const onLogoutButtonClick = (e) => {
    e.preventDefault();
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="pt-4 pb-4 md:pt-8 lg:pt-12">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-center text-3xl font-bold">My Account</h1>

        <div className="mx-auto max-w-3xl space-y-8">
          <Personal />
          <Deliver />
          <Order />
          <div className="flex justify-center">
            <button
              aria-label="Logout"
              title="Logout"
              onClick={(e) => onLogoutButtonClick(e)}
              className="bg-primary hover:bg-primary/90 flex h-12 min-w-[84px] cursor-pointer items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
