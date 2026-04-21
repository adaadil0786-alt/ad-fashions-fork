import { Layout } from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-loaded pages
const Home = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.Home })),
);
const Shop = lazy(() =>
  import("@/pages/Shop").then((m) => ({ default: m.Shop })),
);
const ProductDetail = lazy(() =>
  import("@/pages/ProductDetail").then((m) => ({ default: m.ProductDetail })),
);
const Cart = lazy(() =>
  import("@/pages/Cart").then((m) => ({ default: m.Cart })),
);
const Checkout = lazy(() =>
  import("@/pages/Checkout").then((m) => ({ default: m.Checkout })),
);
const OrderConfirmation = lazy(() =>
  import("@/pages/OrderConfirmation").then((m) => ({
    default: m.OrderConfirmation,
  })),
);
const MyOrders = lazy(() =>
  import("@/pages/MyOrders").then((m) => ({ default: m.MyOrders })),
);
const Admin = lazy(() =>
  import("@/pages/Admin").then((m) => ({ default: m.Admin })),
);

function PageLoader() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full max-w-md" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map((k) => (
          <Skeleton key={k} className="aspect-[3/4] rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function withSuspense(Component: React.ComponentType) {
  return function SuspenseWrapper() {
    return (
      <Suspense fallback={<PageLoader />}>
        <Component />
      </Suspense>
    );
  };
}

// Route tree
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: withSuspense(Home),
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shop",
  component: withSuspense(Shop),
});

const productDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/product/$productId",
  component: withSuspense(ProductDetail),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: withSuspense(Cart),
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: withSuspense(Checkout),
});

const orderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation/$orderId",
  component: withSuspense(OrderConfirmation),
});

const myOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-orders",
  component: withSuspense(MyOrders),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: withSuspense(Admin),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productDetailRoute,
  cartRoute,
  checkoutRoute,
  orderConfirmationRoute,
  myOrdersRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
