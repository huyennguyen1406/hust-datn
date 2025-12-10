import { Outlet } from "@tanstack/react-router";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "./Layout";
import Landing from "./page/landing/Landing";
import NotFound from "./page/notFound/NotFound";
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
  // attach the loader guard here so all children are protected
  loader: requireAuthLoader,
});

export const landingRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: () => <Landing />,
});

const routeTree = rootRoute.addChildren([publicLayoutRoute.addChildren([landingRoute])]);

export const router = createRouter({ routeTree });
