import { c as createLucideIcon, f as useParams, p as useAuth, j as jsxRuntimeExports, B as Button, L as Link, S as ShoppingBag, e as Skeleton } from "./index-CpDKwjiy.js";
import { u as useActor, a as useQuery, c as createActor } from "./backend-C5Wz6csY.js";
import { S as Separator } from "./separator-D-CKA40-.js";
import { T as TIER_CONFIG } from "./index-5fmYl3kY.js";
import { m as motion } from "./proxy-DA3n4y3c.js";
import { C as CircleCheck } from "./circle-check-BsxJW9kD.js";
import { P as Package } from "./package-DdH6ts-G.js";
import { T as Truck } from "./truck-BJA5MFfP.js";
import "./index-Clol72Bn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode);
function OrderConfirmationSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 py-12 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 w-16 rounded-full mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-64 mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48 mx-auto" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-8", children: [1, 2, 3].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full rounded-lg" }, k)) })
  ] });
}
function StepIndicator({
  icon: Icon,
  label,
  active
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `flex flex-col items-center gap-1.5 ${active ? "text-primary" : "text-muted-foreground"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-full flex items-center justify-center border-2 ${active ? "border-primary bg-primary/10" : "border-muted-foreground/30 bg-muted"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: label })
      ]
    }
  );
}
function OrderConfirmation() {
  const { orderId } = useParams({ from: "/order-confirmation/$orderId" });
  const { isAuthenticated } = useAuth();
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      try {
        return await actor.getOrder(orderId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!orderId
  });
  const estimatedDays = 5;
  const deliveryDate = /* @__PURE__ */ new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
  if (isLoading || actorLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OrderConfirmationSkeleton, {});
  }
  const displayOrderId = orderId ?? "—";
  const items = (order == null ? void 0 : order.items) ?? [];
  const total = (order == null ? void 0 : order.totalAmount) ?? 0;
  const shipping = order == null ? void 0 : order.shippingAddress;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-background min-h-screen",
      "data-ocid": "order_confirmation.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.9 },
            animate: { opacity: 1, scale: 1 },
            className: "max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-accent/10 border-4 border-accent/30 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-2", children: "Order Confirmed!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-sm mx-auto", children: "Thank you for shopping with AD Fashions. Your order has been placed and is being prepared with care." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-2 bg-muted/60 rounded-full px-5 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Order ID:" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm font-bold text-foreground", children: displayOrderId })
              ] })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.1 },
              className: "bg-card rounded-xl border border-border p-6",
              "data-ocid": "order_confirmation.delivery_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-5 text-center", children: "Estimated Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { icon: CircleCheck, label: "Order Placed", active: true }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-primary/30 mx-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { icon: Package, label: "Processing" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-muted mx-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { icon: Truck, label: "Shipped" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-0.5 bg-muted mx-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StepIndicator, { icon: MapPin, label: "Delivered" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground", children: [
                  "Expected by",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: formattedDelivery }),
                  " ",
                  "(within ",
                  estimatedDays,
                  " business days)"
                ] })
              ]
            }
          ),
          items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.15 },
              className: "bg-card rounded-xl border border-border p-6",
              "data-ocid": "order_confirmation.items_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-4", children: "Items Ordered" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    "data-ocid": `order_confirmation.item.${idx + 1}`,
                    className: "flex gap-3 items-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground text-sm truncate", children: item.productName }),
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
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-sm flex-shrink-0", children: [
                        "₹",
                        (item.price * item.quantity).toLocaleString("en-IN")
                      ] })
                    ]
                  },
                  `${item.productId}-${idx}`
                )) }),
                total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground", children: "Total Paid" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-xl font-bold text-foreground", children: [
                      "₹",
                      total.toLocaleString("en-IN", {
                        maximumFractionDigits: 0
                      })
                    ] })
                  ] })
                ] })
              ]
            }
          ),
          shipping && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.2 },
              className: "bg-card rounded-xl border border-border p-6",
              "data-ocid": "order_confirmation.address_section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground mb-3", children: "Delivering To" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground space-y-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: shipping.fullName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: shipping.addressLine1 }),
                  shipping.addressLine2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: shipping.addressLine2 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                    shipping.city,
                    ", ",
                    shipping.state,
                    " – ",
                    shipping.pinCode
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: shipping.phone })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { delay: 0.25 },
              className: "flex flex-col sm:flex-row gap-3 justify-center",
              "data-ocid": "order_confirmation.actions",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "outline",
                    "data-ocid": "order_confirmation.my_orders_link",
                    className: "gap-2",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/my-orders", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4" }),
                      "View My Orders"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    "data-ocid": "order_confirmation.continue_shopping_link",
                    className: "gap-2",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                      "Continue Shopping",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
                    ] })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  OrderConfirmation
};
