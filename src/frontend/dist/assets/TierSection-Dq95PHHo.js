import { j as jsxRuntimeExports, a as cn, b as useCart, r as reactExports, L as Link, d as Badge, B as Button, S as ShoppingBag, e as Skeleton } from "./index-CpDKwjiy.js";
import { T as TIER_CONFIG } from "./index-5fmYl3kY.js";
import { A as ArrowRight } from "./arrow-right-CMVeM6GI.js";
import { P as PackageSearch } from "./package-search-tEqNyg_U.js";
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const [added, setAdded] = reactExports.useState(false);
  const tierConfig = TIER_CONFIG[product.tier];
  function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    const defaultSize = product.sizes[0] ?? "Free Size";
    const defaultColor = product.colors[0] ?? "Default";
    addItem(product, defaultSize, defaultColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }
  const dataIndex = index + 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: "group relative flex flex-col overflow-hidden border border-border bg-card hover:shadow-lg transition-smooth cursor-pointer",
      "data-ocid": `product_card.item.${dataIndex}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/product/$productId",
            params: { productId: product.id },
            className: "flex flex-col flex-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-muted", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.imageUrl,
                    alt: product.name,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${tierConfig.badgeClass}`,
                    "data-ocid": `product_card.tier_badge.${dataIndex}`,
                    children: tierConfig.label
                  }
                ),
                !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 bg-background/60 flex items-center justify-center",
                    "data-ocid": `product_card.out_of_stock.${dataIndex}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-xs font-semibold tracking-wide",
                        children: "Out of Stock"
                      }
                    )
                  }
                ),
                product.originalPrice && product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded", children: "SALE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 p-3 gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider capitalize", children: product.category }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "h3",
                  {
                    className: "font-display font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors",
                    "data-ocid": `product_card.name.${dataIndex}`,
                    children: product.name
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-auto pt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-semibold text-base text-foreground",
                      "data-ocid": `product_card.price.${dataIndex}`,
                      children: [
                        "₹",
                        product.price.toLocaleString("en-IN")
                      ]
                    }
                  ),
                  product.originalPrice && product.originalPrice > product.price && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground line-through", children: [
                    "₹",
                    product.originalPrice.toLocaleString("en-IN")
                  ] })
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: added ? "secondary" : "default",
            className: "w-full gap-1.5 text-xs transition-smooth",
            disabled: !product.inStock,
            onClick: handleAddToCart,
            "data-ocid": `product_card.add_to_cart_button.${dataIndex}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-3.5 w-3.5" }),
              !product.inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"
            ]
          }
        ) })
      ]
    }
  );
}
function TierSection({
  tier,
  products,
  isLoading = false,
  variant = "strip",
  tierIndex = 1
}) {
  const config = TIER_CONFIG[tier];
  const sectionBg = tier === "premium" ? "bg-background" : tier === "average" ? "bg-muted/30" : "bg-muted/10";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: `py-12 ${sectionBg}`,
      "data-ocid": `tier_section.${tier}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `mb-8 pb-4 ${config.accentClass}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1 font-medium", children: [
            "Tier ",
            tierIndex
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl font-bold text-foreground leading-none", children: [
                config.label,
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-light italic text-muted-foreground", children: config.subtitle })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-md", children: config.description })
            ] }),
            variant === "strip" && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", search: { tier }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "gap-1.5 shrink-0 text-muted-foreground hover:text-foreground",
                "data-ocid": `tier_section.view_all_button.${tier}`,
                children: [
                  "View all",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5" })
                ]
              }
            ) })
          ] })
        ] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: variant === "strip" ? "flex gap-4 overflow-x-auto pb-2" : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
            children: ["sk1", "sk2", "sk3", "sk4"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Skeleton,
              {
                className: `${variant === "strip" ? "shrink-0 w-52" : "w-full"} aspect-[3/4] rounded-lg`
              },
              k
            ))
          }
        ),
        !isLoading && products.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-16 text-center",
            "data-ocid": `tier_section.empty_state.${tier}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-12 w-12 text-muted-foreground/40 mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground font-medium", children: [
                "No ",
                config.label,
                " products available yet."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/70 mt-1", children: "Check back soon — new arrivals coming!" })
            ]
          }
        ),
        !isLoading && products.length > 0 && variant === "strip" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin",
            style: { scrollbarWidth: "none" },
            "data-ocid": `tier_section.product_strip.${tier}`,
            children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 w-52 snap-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }) }, product.id))
          }
        ),
        !isLoading && products.length > 0 && variant === "grid" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
            "data-ocid": `tier_section.product_grid.${tier}`,
            children: products.map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id))
          }
        )
      ] })
    }
  );
}
export {
  TierSection as T
};
