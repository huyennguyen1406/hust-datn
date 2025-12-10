import React from "react";
import { Outlet } from "@tanstack/react-router";
import Footer from "./component/footer/Footer";
import Header from "./component/header/Header";

const HEADER_SM = "h-[4rem]";
const HEADER_MD = "md:h-[5rem]";
const HEADER_LG = "lg:h-[6rem]";

const FOOTER_SM = "h-[8rem]";
const FOOTER_MD = "md:h-[10rem]";
const FOOTER_LG = "lg:h-[12rem]";

const PT_SM = "pt-[4rem]";
const PT_MD = "md:pt-[5rem]";
const PT_LG = "lg:pt-[6rem]";

const PB_SM = "pb-0";
const PB_MD = "md:pb-[10rem]";
const PB_LG = "lg:pb-[12rem]";

const MAXH_SM = "max-h-[calc(100vh-4rem)]";
const MAXH_MD = "md:max-h-[calc(100vh-5rem-10rem)]";
const MAXH_LG = "lg:max-h-[calc(100vh-6rem-12rem)]";

const Layout = ({ children }) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <div className={`fixed top-0 right-0 left-0 z-50 ${HEADER_SM} ${HEADER_MD} ${HEADER_LG}`}>
        <Header />
      </div>

      <div className={`fixed right-0 bottom-0 left-0 z-50 hidden md:block ${FOOTER_SM} ${FOOTER_MD} ${FOOTER_LG}`}>
        <Footer />
      </div>

      <main className={`w-full ${PT_SM} ${PT_MD} ${PT_LG} ${PB_SM} ${PB_MD} ${PB_LG}`}>
        <div className={`mx-auto overflow-auto ${MAXH_SM} ${MAXH_MD} ${MAXH_LG}`}>{children ?? <Outlet />}</div>
      </main>
    </div>
  );
};

export default Layout;
