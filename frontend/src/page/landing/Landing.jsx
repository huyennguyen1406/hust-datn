import React from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "../../i18n/useI18n";

const categoryList = [
  {
    label: "landing_cat_men",
    link: "/",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMI1iBkP5DaB8SQLiPTgHC20Z-HxqnVKrX584hWyJYJ79AaF0tVux87hVd7JVYT67T6ibukhZLEh-sq2nRHK3XfYoJ_J6eWSxfPl9IyA8fr1O4q893_P1TR9955_1B7ZtGecBiNqHthsdZws8VXcLzB77bsxvQZs9D6MHuqJhk86wPnnGr8vFEfoa6etZeKsxu6Vp2juU2mY7T5I_HCBhChl6rMY73y7sVWcgeyEdPe6VQWxV11w8TpCBN1Z2CnVLpKan76XGe0DEe",
  },
  {
    label: "landing_cat_women",
    link: "/",

    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAz7SsmV5edyfPKxlKyXw-mu_SllDRl6A47Ok6fNxYZEWw_p2Q8dyh2O0R7v-wfuI8VpkbTfixjAQiBZDa7gipKuzdipxUTgM5eWNTyeT05bon5awMXUJCdG0XociuvQcZ8mIDHwcE6MVKTxBvkvwApI5uQztwPg0dR_eey6Rcu6APa0yxdN37SWxdw2QTs0wK4m_RTVxOw9QBQv3hB65WNGYL7JCRBWv4ejn9i7TrNlAGhwNXCEIKSG1ek6pqTPoopY-hJT5k_T730",
  },
  {
    label: "landing_cat_kids",
    link: "/",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf96FvnLRFtdvRz-X_HZyQEGNHblilcxUthRrpyYmKL3EnoQLns3x5TZMg-OkEBJDWChoA6366JaI3hFad6103u7V7AKgrg0keZUN2ofLNMXXPprTVhhE5CDjryxtrCFRYZnZ0XZQwWb4B9N-hCGNeQY2UfZTisYjSMLhRDoGboX1PCkR_ub4WsRSPaLxSyXj_YBjSKomRnDQjx5noSjszMtlx-e6_tRlxgygBJ8bsew31sfhfRoOMf-mF6GQZ5413vs7Is5VLmmuv",
  },
  {
    label: "landing_cat_sales",
    link: "/",
    img: "https://img.freepik.com/free-vector/flash-sale-shopping-poster-banner-with-flash-icon_87202-1259.jpg?t=st=1765609875~exp=1765613475~hmac=967969f0edc7044d01bcb270d8fcd3c322df2144bc6e69c70a7a2ea22d6f85ed&w=1480",
  },
];

const Landing = () => {
  const { t } = useI18n();
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 md:py-8 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="bg-[linear-gradient(rgba(245, 247, 250, 0.35),rgba(245, 247, 250, 0.35))] relative flex flex-col items-center gap-6 text-center lg:items-start lg:bg-none lg:text-left">
            <div className='absolute inset-0 z-0 h-full w-full bg-[url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLxYLvi42XqX2EKwq5mSJBlgOpeTuerWyUPbQsTbYJ1GkYjvbT5dxdT1au9lDZmS7-JC3r-K2WYFGUqfzTVy-7JZ9sVK9QhX451utfdLsrKkYHAyhNghslE1YJUigTM2KnJ3_8Y8Q5yjwL27Bou_gi11Qkm-JnK1shYD9XLdEJ43vdUsiHRjguaUZrhlYCG4JmWBatJkyD7Vu5LnNoQiha3iLscx9G-W9o7Ytg_TrZd7cYw0hZvzjeEk2ku5mENbYLURSwf1FdYxQ3")] bg-cover bg-center bg-no-repeat blur-[1.5px] lg:hidden' />
            <h1 className="z-1 pt-3 text-4xl leading-tight font-black tracking-[-0.033em] sm:text-3xl md:pt-5 md:text-4xl lg:pt-0 lg:text-6xl">
              {t("landing_intro_title")}
            </h1>
            <h2 className="z-1 max-w-md text-base leading-normal font-medium sm:text-lg">{t("landing_intro_desc")}</h2>
            <button className="bg-primary hover:bg-primary/90 z-1 mb-4 flex h-12 max-w-[480px] min-w-[84px] items-center justify-center rounded-lg px-5 text-base font-bold text-white transition-colors md:mb-6">
              {t("landing_intro_shop")}
            </button>
          </div>

          <div className="hidden aspect-square h-4/5 overflow-hidden rounded-xl md:w-full lg:block">
            <div
              className="h-full w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLxYLvi42XqX2EKwq5mSJBlgOpeTuerWyUPbQsTbYJ1GkYjvbT5dxdT1au9lDZmS7-JC3r-K2WYFGUqfzTVy-7JZ9sVK9QhX451utfdLsrKkYHAyhNghslE1YJUigTM2KnJ3_8Y8Q5yjwL27Bou_gi11Qkm-JnK1shYD9XLdEJ43vdUsiHRjguaUZrhlYCG4JmWBatJkyD7Vu5LnNoQiha3iLscx9G-W9o7Ytg_TrZd7cYw0hZvzjeEk2ku5mENbYLURSwf1FdYxQ3")',
              }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="pb-6 text-center text-2xl font-bold uppercase md:text-3xl lg:text-4xl">
          {t("landing_cat_title")}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryList.map((item) => (
            <div key={item.label} className="group flex flex-col gap-3">
              <Link to={item.link}>
                <div className="aspect-3/4 w-full overflow-hidden rounded-xl">
                  <div
                    className="h-full w-full bg-cover bg-center transition-transform duration-300 hover:scale-110"
                    style={{ backgroundImage: `url("${item.img}")` }}
                  />
                </div>
                <p className="mt-2 text-center text-sm font-medium sm:text-base md:text-lg lg:text-xl">
                  {t(item.label)}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="relative flex flex-col items-center justify-center rounded-xl bg-cover bg-center p-8 text-center text-white md:p-16"
          style={{
            backgroundImage:
              "linear-gradient(rgba(13,18,27,0.6), rgba(13,18,27,0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBLxYLvi42XqX2EKwq5mSJBlgOpeTuerWyUPbQsTbYJ1GkYjvbT5dxdT1au9lDZmS7-JC3r-K2WYFGUqfzTVy-7JZ9sVK9QhX451utfdLsrKkYHAyhNghslE1YJUigTM2KnJ3_8Y8Q5yjwL27Bou_gi11Qkm-JnK1shYD9XLdEJ43vdUsiHRjguaUZrhlYCG4JmWBatJkyD7Vu5LnNoQiha3iLscx9G-W9o7Ytg_TrZd7cYw0hZvzjeEk2ku5mENbYLURSwf1FdYxQ3')",
          }}>
          <h2 className="text-3xl font-bold md:text-4xl">{t("landing_new_arrival_title")}</h2>
          <p className="mt-4 max-w-2xl text-white/90 md:text-lg">{t("landing_new_arrival_desc")}</p>
          <button className="text-text-light bg-primary hover:bg-primary-hover mt-8 h-12 rounded-lg px-5 font-bold transition">
            {t("landing_new_arrival_shop")}
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
