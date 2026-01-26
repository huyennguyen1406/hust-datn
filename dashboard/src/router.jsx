// router.jsx
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { PublicLayout } from "./PublicLayout.jsx";
import RequireAuth from "./RequireAuth.jsx";
import { AppLayout } from "./layout/AppLayout.jsx";
import Login from "./page/login/Login.jsx";
import Management from "./page/management/Management.jsx";
import NotFound from "./page/notfound/NotFound.jsx";
import SaleStatistic from "./page/saleStatistic/SaleStatistic.jsx";
import Statistic from "./page/statistic/Statistic.jsx";
import { MOCK_DATA_PAYMENT_METHOD, MOCK_DATA_PROVINCE } from "./router_mock_data.js";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <NotFound />,
});

export const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => <PublicLayout />,
});

export const appLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: () => (
    <RequireAuth>
      <AppLayout />
    </RequireAuth>
  ),
});

export const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: () => <Login />,
});

// Master data management routes

export const districtsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/districts",
  component: () => <Management title={"Districts"} description={"Manage all districts"} />,
});

export const provincesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/provinces",
  component: () => (
    <Management
      title={"Provinces"}
      description={"Manage all provinces"}
      columns={MOCK_DATA_PROVINCE.columns}
      data={MOCK_DATA_PROVINCE.data}
    />
  ),
});

// export const deliveryMethodsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/delivery-methods",
//   component: () => <Management title={"Delivery Methods"} description={"Manage all delivery methods"} />,
// });

// export const paymentMethodsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/payment-methods",
//   component: () => (
//     <Management
//       title={"Payment Methods"}
//       description={"Manage all payment methods"}
//       columns={MOCK_DATA_PAYMENT_METHOD.columns}
//       data={MOCK_DATA_PAYMENT_METHOD.data}
//     />
//   ),
// });

// export const faqsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/faqs",
//   component: () => <Management title={"Faqs"} description={"Manage all faqs"} />,
// });

// export const aboutUsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/about-us",
//   component: () => <Management title={"About Us"} description={"Manage about us"} />,
// });

// export const shopContactsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/shop-contacts",
//   component: () => <Management title={"Shop Contacts"} description={"Manage all shop contacts"} />,
// });

// Management data routes

export const brandsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/brands",
  component: () => <Management title={"Brands"} description={"Manage all brands"} />,
});

export const categoriesRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/categories",
  component: () => <Management title={"Categories"} description={"Manage all categories"} />,
});

export const productsRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/products",
  component: () => <Management title={"Products"} description={"Manage all products"} />,
});

// export const bannersRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/banners",
//   component: () => <Management title={"Banners"} description={"Manage all banners"} />,
// });

// export const saleOffersRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/sale-offers",
//   component: () => <Management title={"Sale Offers"} description={"Manage all sale offers"} />,
// });

export const vouchersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/vouchers",
  component: () => <Management title={"Vouchers"} description={"Manage all vouchers"} />,
});

// User data routes

export const usersRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/users",
  component: () => <Management title={"Users"} description={"Manage all users"} />,
});

// export const ordersRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/orders",
//   component: () => <Management title={"Orders"} description={"Manage all orders"} />,
// });

// export const reviewsRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/reviews",
//   component: () => <Management title={"Reviews"} description={"Manage all reviews"} />,
// });

// Statistic routes
// export const userStatisticRoute = createRoute({
//   getParentRoute: () => appLayoutRoute,
//   path: "/user-statistic",
//   component: () => <Statistic />,
// });

export const salesStatisticRoute = createRoute({
  getParentRoute: () => appLayoutRoute,
  path: "/sales-statistic",
  component: () => <SaleStatistic />,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([loginRoute]),
  appLayoutRoute.addChildren([
    districtsRoute,
    provincesRoute,
    // deliveryMethodsRoute,
    // paymentMethodsRoute,
    // faqsRoute,
    // aboutUsRoute,
    // shopContactsRoute,
    brandsRoute,
    categoriesRoute,
    productsRoute,
    // bannersRoute,
    // saleOffersRoute,
    vouchersRoute,
    usersRoute,
    // ordersRoute,
    // reviewsRoute,
    // userStatisticRoute,
    salesStatisticRoute,
  ]),
]);

export const router = createRouter({ routeTree });
