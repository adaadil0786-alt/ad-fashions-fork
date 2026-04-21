import { b as useCart, j as jsxRuntimeExports, S as ShoppingBag, B as Button, L as Link, d as Badge } from "./index-CpDKwjiy.js";
import { S as Separator } from "./separator-D-CKA40-.js";
import { T as TIER_CONFIG } from "./index-5fmYl3kY.js";
import { A as ArrowRight } from "./arrow-right-CMVeM6GI.js";
import { m as motion } from "./proxy-DA3n4y3c.js";
import { T as Trash2 } from "./trash-2-BT7KJmvO.js";
import { M as Minus } from "./minus-C_8Diuen.js";
import { P as Plus } from "./plus-Dw-qp99z.js";
import "./index-Clol72Bn.js";
const GST_RATE = 0.18;
function CartItemRow({
  item,
  index,
  onUpdateQuantity,
  onRemove
}) {
  const { product, quantity, selectedSize, selectedColor } = item;
  const tier = TIER_CONFIG[product.tier];
  const subtotal = product.price * quantity;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, x: -20 },
      transition: { delay: index * 0.06 },
      "data-ocid": `cart.item.${index + 1}`,
      className: "flex gap-4 py-5 border-b border-border last:border-b-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden bg-muted", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: product.imageUrl,
              alt: product.name,
              className: "w-full h-full object-cover",
              onError: (e) => {
                e.target.src = "/assets/images/placeholder.svg";
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${tier.badgeClass}`,
              children: tier.label
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-base leading-tight truncate", children: product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs font-normal capitalize",
                    children: [
                      "Size: ",
                      selectedSize
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-xs font-normal capitalize",
                    children: [
                      "Color: ",
                      selectedColor
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `cart.delete_button.${index + 1}`,
                onClick: onRemove,
                "aria-label": `Remove ${product.name}`,
                className: "flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 border border-border rounded-lg overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `cart.qty_minus.${index + 1}`,
                  onClick: () => onUpdateQuantity(quantity - 1),
                  "aria-label": "Decrease quantity",
                  disabled: quantity <= 1,
                  className: "p-2 hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3.5 h-3.5" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 text-center text-sm font-semibold text-foreground", children: quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `cart.qty_plus.${index + 1}`,
                  onClick: () => onUpdateQuantity(quantity + 1),
                  "aria-label": "Increase quantity",
                  className: "p-2 hover:bg-muted transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              product.originalPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground line-through", children: [
                "₹",
                (product.originalPrice * quantity).toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-lg text-foreground", children: [
                "₹",
                subtotal.toLocaleString("en-IN")
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "₹",
                product.price,
                "/pc"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function Cart() {
  const {
    items,
    itemCount,
    totalAmount,
    updateQuantity,
    removeItem,
    clearCart
  } = useCart();
  const gstAmount = totalAmount * GST_RATE;
  const grandTotal = totalAmount + gstAmount;
  if (items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center",
        "data-ocid": "cart.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-10 h-10 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm", children: "Looks like you haven't added anything yet. Explore our curated collections and find something you'll love." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "cart.shop_link", size: "lg", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/shop", children: [
            "Browse Collections ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
          ] }) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background min-h-screen", "data-ocid": "cart.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground", children: "Shopping Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-1", children: [
        itemCount,
        " ",
        itemCount === 1 ? "item" : "items",
        " in your bag"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:grid lg:grid-cols-3 lg:gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-xl border border-border px-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-4 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Your Items" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "cart.clear_button",
                onClick: clearCart,
                className: "text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2",
                children: "Clear all"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartItemRow,
            {
              item,
              index: idx,
              onUpdateQuantity: (qty) => updateQuantity(
                item.product.id,
                item.selectedSize,
                item.selectedColor,
                qty
              ),
              onRemove: () => removeItem(
                item.product.id,
                item.selectedSize,
                item.selectedColor
              )
            },
            `${item.product.id}-${item.selectedSize}-${item.selectedColor}`
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/shop",
            "data-ocid": "cart.continue_shopping_link",
            className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors",
            children: "← Continue Shopping"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 lg:mt-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.15 },
          className: "bg-card rounded-xl border border-border p-6 sticky top-24",
          "data-ocid": "cart.summary",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold text-foreground mb-5", children: "Order Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Subtotal (",
                  itemCount,
                  " ",
                  itemCount === 1 ? "item" : "items",
                  ")"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                  "₹",
                  totalAmount.toLocaleString("en-IN")
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "GST (18%)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                  "₹",
                  gstAmount.toLocaleString("en-IN", {
                    maximumFractionDigits: 0
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold uppercase tracking-wide text-accent", children: "Free" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold text-foreground", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-2xl font-bold text-foreground", children: [
                  "₹",
                  grandTotal.toLocaleString("en-IN", {
                    maximumFractionDigits: 0
                  })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "incl. all taxes" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                "data-ocid": "cart.checkout_button",
                size: "lg",
                className: "w-full gap-2 font-semibold",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/checkout", children: [
                  "Proceed to Checkout ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                ] })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-4", children: "🔒 Secure checkout powered by Stripe" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 pt-4 border-t border-border space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Items by Tier" }),
              ["premium", "average", "basic"].map((tier) => {
                const tierItems = items.filter(
                  (i) => i.product.tier === tier
                );
                if (tierItems.length === 0) return null;
                const tierTotal = tierItems.reduce(
                  (s, i) => s + i.product.price * i.quantity,
                  0
                );
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex justify-between text-xs items-center",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `capitalize ${TIER_CONFIG[tier].badgeClass} px-1.5 py-0.5 rounded`,
                          children: TIER_CONFIG[tier].label
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "₹",
                        tierTotal.toLocaleString("en-IN")
                      ] })
                    ]
                  },
                  tier
                );
              })
            ] })
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  Cart
};
