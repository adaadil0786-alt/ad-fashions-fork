import { c as createLucideIcon, p as useAuth, j as jsxRuntimeExports, B as Button, S as ShoppingBag, L as Link, d as Badge, e as Skeleton, r as reactExports } from "./index-CpDKwjiy.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-C5Wz6csY.js";
import { S as Separator } from "./separator-D-CKA40-.js";
import { T as TIER_CONFIG } from "./index-5fmYl3kY.js";
import { L as Lock } from "./lock-Brs2Mt0i.js";
import { C as CircleCheck } from "./circle-check-BsxJW9kD.js";
import { T as Truck } from "./truck-BJA5MFfP.js";
import { P as Package } from "./package-DdH6ts-G.js";
import { m as motion } from "./proxy-DA3n4y3c.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-C6g0SAbB.js";
import "./index-Clol72Bn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-muted text-muted-foreground border-muted-foreground/30"
  },
  confirmed: {
    label: "Confirmed",
    icon: CircleCheck,
    className: "bg-secondary/30 text-foreground border-secondary"
  },
  processing: {
    label: "Processing",
    icon: Package,
    className: "bg-accent/10 text-accent border-accent/30"
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-primary/10 text-primary border-primary/30"
  },
  delivered: {
    label: "Delivered",
    icon: CircleCheck,
    className: "bg-secondary/20 text-foreground border-secondary/40"
  },
  cancelled: {
    label: "Cancelled",
    icon: CircleX,
    className: "bg-destructive/10 text-destructive border-destructive/30"
  },
  refunded: {
    label: "Refunded",
    icon: CircleX,
    className: "bg-muted text-muted-foreground border-border"
  }
};
function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const Icon = config.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
        config.label
      ]
    }
  );
}
function OrderCard({ order, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const date = new Date(Number(order.createdAt) / 1e6).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric"
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07 },
      "data-ocid": `my_orders.item.${index + 1}`,
      className: "bg-card rounded-xl border border-border overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground", children: [
                "#",
                order.id.slice(0, 12),
                "…"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: order.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: date }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              order.items.length,
              " ",
              order.items.length === 1 ? "item" : "items"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg font-bold text-foreground", children: [
                "₹",
                order.totalAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0
                })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `my_orders.toggle.${index + 1}`,
                onClick: () => setExpanded((p) => !p),
                "aria-label": expanded ? "Collapse order" : "Expand order",
                className: "p-2 rounded-lg hover:bg-muted transition-colors",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              }
            )
          ] })
        ] }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "border-t border-border",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-4", children: [
              order.items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  "data-ocid": `my_orders.order_item.${index + 1}.${idx + 1}`,
                  className: "flex gap-3 items-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.productImage,
                        alt: item.productName,
                        className: "w-full h-full object-cover",
                        onError: (e) => {
                          e.target.src = "/assets/images/placeholder.svg";
                        }
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.productName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                        "Size: ",
                        item.selectedSize,
                        " · Color: ",
                        item.selectedColor,
                        " · Qty: ",
                        item.quantity
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${TIER_CONFIG[item.tier].badgeClass}`,
                          children: TIER_CONFIG[item.tier].label
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex-shrink-0", children: [
                      "₹",
                      (item.price * item.quantity).toLocaleString("en-IN")
                    ] })
                  ]
                },
                `${item.productId}-${idx}`
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium", children: "Order Total" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-bold text-foreground", children: [
                  "₹",
                  order.totalAmount.toLocaleString("en-IN", {
                    maximumFractionDigits: 0
                  })
                ] })
              ] }),
              order.shippingAddress && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "Delivering to" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: order.shippingAddress.fullName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  order.shippingAddress.addressLine1,
                  order.shippingAddress.addressLine2 ? `, ${order.shippingAddress.addressLine2}` : ""
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                  order.shippingAddress.city,
                  ", ",
                  order.shippingAddress.state,
                  " –",
                  " ",
                  order.shippingAddress.pinCode
                ] })
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function MyOrdersSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20" })
  ] }) }, k)) });
}
function MyOrders() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getMyOrders();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    refetchInterval: 3e4
  });
  if (!isAuthenticated && !authLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center px-4 text-center",
        "data-ocid": "my_orders.login_prompt",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-9 h-9 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: "Sign in to view orders" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm", children: "Sign in with Internet Identity to view your order history and track deliveries." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              "data-ocid": "my_orders.login_button",
              size: "lg",
              onClick: login,
              className: "gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                "Sign In with Internet Identity"
              ]
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "my_orders.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "My Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: orders.length > 0 ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed` : "Track your purchase history" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 mb-6", children: [
        "pending",
        "confirmed",
        "processing",
        "shipped",
        "delivered"
      ].map((status) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_CONFIG[status].className}`,
          children: STATUS_CONFIG[status].label
        },
        status
      )) }),
      isLoading || authLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(MyOrdersSkeleton, {}) : orders.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 text-center",
          "data-ocid": "my_orders.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-9 h-9 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-2", children: "No orders yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 max-w-xs", children: "You haven't placed any orders yet. Start exploring our curated collections." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "my_orders.shop_link", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
              "Start Shopping"
            ] }) })
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "my_orders.list", children: orders.map((order, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { order, index: idx }, order.id)) }),
      orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center gap-2 flex-wrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3 mr-1" }),
        "Click on an order to expand details"
      ] }) })
    ] })
  ] });
}
export {
  MyOrders
};
