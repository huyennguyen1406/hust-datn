import { Outlet } from "@tanstack/react-router";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";
import Layout from "./Layout";
import About from "./page/about/About";
import Account from "./page/account/Account";
import Cart from "./page/cart/Cart";
import Checkout from "./page/checkout/Checkout";
import Confirm from "./page/confirm/Confirm";
import Contact from "./page/contact/Contact";
import Faq from "./page/faq/Faq";
import Landing from "./page/landing/Landing";
import Login from "./page/login/Login";
import NotFound from "./page/notFound/NotFound";
import OrderDetail from "./page/orderDetail/OrderDetail";
import OrderHistory from "./page/orderHistory/OrderHistory";
import Product from "./page/product/Product";
import Qr from "./page/qr/Qr";
import Search from "./page/search/Search";
import Wishlist from "./page/wishlist/Wishlist";
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

export const qrRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/qr-payment",
  component: () => <Qr />,
});

export const aboutRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: () => <About />,
});

export const contactRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: () => <Contact />,
});

export const faqRoute = createRootRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/faq",
  component: () => <Faq />,
});

export const accountRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/account",
  component: () => <Account />,
});

export const orderHistoryRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/account/order-history",
  component: () => <OrderHistory />,
});

export const orderDetailRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/account/order-history/$orderId",
  component: () => <OrderDetail />,
});

export const wishlistRoute = createRoute({
  getParentRoute: () => userLayoutRoute,
  path: "/wishlist",
  component: () => <Wishlist />,
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
    qrRoute,
    aboutRoute,
    contactRoute,
    faqRoute,
  ]),
  userLayoutRoute.addChildren([accountRoute, orderHistoryRoute, orderDetailRoute, wishlistRoute]),
]);

export const router = createRouter({ routeTree });
