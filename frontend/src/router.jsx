import { Outlet } from "@tanstack/react-router";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "./Layout";
import Account from "./page/account/Account";
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

export const accountRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/account",
  component: () => <Account />,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([landingRoute, loginRoute, searchRoute, productRoute]),
  userLayoutRoute.addChildren([accountRoute]),
]);

export const router = createRouter({ routeTree });
