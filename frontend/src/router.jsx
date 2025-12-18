import { Outlet } from "@tanstack/react-router";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "./Layout";
import Account from "./page/account/Account";
import Cart from "./page/cart/Cart";
import Checkout from "./page/checkout/Checkout";
import Confirm from "./page/confirm/Confirm";
import Landing from "./page/landing/Landing";
import Login from "./page/login/Login";
import NotFound from "./page/notFound/NotFound";
import Product from "./page/product/Product";
import Search from "./page/search/Search";
import { requireAuthLoader } from "./requireAuth";

export const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => (
    <Layout>
      <NotFound />
    </Layout>
  ),
});

export const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => <Layout />,
});

export const userLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "user",
  component: () => <Layout />,
  loader: requireAuthLoader,
});

export const landingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: () => <Landing />,
});

export const loginRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/login",
  component: () => <Login />,
});

export const searchRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/search",
  component: () => <Search />,
});

export const productRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/product",
  component: () => <Product />,
});

export const cartRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/cart",
  component: () => <Cart />,
});

export const checkoutRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/checkout",
  component: () => <Checkout />,
});

export const confirmRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/confirm",
  component: () => <Confirm />,
});

export const accountRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/account",
  component: () => <Account />,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    landingRoute,
    loginRoute,
    searchRoute,
    productRoute,
    cartRoute,
    checkoutRoute,
    confirmRoute,
  ]),
  userLayoutRoute.addChildren([accountRoute]),
]);

export const router = createRouter({ routeTree });
