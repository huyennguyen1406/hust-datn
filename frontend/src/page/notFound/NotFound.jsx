import React from "react";

const NotFound = () => {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="text-[10rem] leading-none font-black text-[#135bec]/20 select-none md:text-[14rem]">404</div>
      </div>
      <h1 className="-mt-10 mb-6 text-4xl leading-tight font-black tracking-[-0.033em] sm:text-5xl md:-mt-16 md:text-6xl">
        Sole Lost?
      </h1>
      <p className="text-text-light/80 dark:text-text-dark/80 mx-auto mb-10 max-w-xl text-lg">
        We couldn't find the page you were looking for. It seems like you've wandered off the beaten path. Check the URL
        or head back to our main collection to find your perfect fit.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <a
          className="dark:focus:ring-offset-background-dark inline-flex items-center justify-center rounded-xl bg-[#135bec] px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#135bec]/90 focus:ring-2 focus:ring-[#135bec] focus:ring-offset-2 focus:outline-none"
          href="#">
          Go to Homepage
        </a>
        <a
          className="border-border-dark text-text-light dark:text-text-dark dark:focus:ring-offset-background-dark inline-flex items-center justify-center rounded-xl border bg-transparent px-8 py-4 text-sm font-bold tracking-wide transition-all hover:bg-black/5 focus:ring-2 focus:ring-[#135bec] focus:ring-offset-2 focus:outline-none dark:hover:bg-white/5"
          href="#">
          Shop New Arrivals
        </a>
      </div>
    </div>
  );
};

export default NotFound;
