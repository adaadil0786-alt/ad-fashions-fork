import { c as createLucideIcon, u as useSearch, r as reactExports, j as jsxRuntimeExports, X, B as Button } from "./index-CpDKwjiy.js";
import { T as TierSection } from "./TierSection-Dq95PHHo.js";
import { I as Input } from "./input-WuU6Qqzc.js";
import { S as SAMPLE_PRODUCTS } from "./sampleData-Gyf11EY7.js";
import { P as PackageSearch } from "./package-search-tEqNyg_U.js";
import "./index-5fmYl3kY.js";
import "./arrow-right-CMVeM6GI.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const TIER_TABS = [
  { label: "All", value: "all" },
  { label: "Premium", value: "premium" },
  { label: "Average", value: "average" },
  { label: "Basic", value: "basic" }
];
function Shop() {
  const searchParams = useSearch({ from: "/shop" });
  const initialTier = searchParams.tier;
  const [activeTier, setActiveTier] = reactExports.useState(
    initialTier && ["premium", "average", "basic"].includes(initialTier) ? initialTier : "all"
  );
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const deferredQuery = reactExports.useDeferredValue(searchQuery);
  const filteredProducts = reactExports.useMemo(() => {
    let products = SAMPLE_PRODUCTS;
    if (activeTier !== "all") {
      products = products.filter((p) => p.tier === activeTier);
    }
    if (deferredQuery.trim()) {
      const q = deferredQuery.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return products;
  }, [activeTier, deferredQuery]);
  const premiumProducts = filteredProducts.filter((p) => p.tier === "premium");
  const averageProducts = filteredProducts.filter((p) => p.tier === "average");
  const basicProducts = filteredProducts.filter((p) => p.tier === "basic");
  const hasResults = filteredProducts.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "shop.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-accent font-medium mb-1", children: "AD Fashions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-bold text-foreground mb-2", children: "Shop All" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Browse our full collection across all three tiers." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky top-16 z-30 bg-card/95 backdrop-blur border-b border-border py-3 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center gap-1 flex-wrap",
          role: "tablist",
          "aria-label": "Filter by tier",
          children: TIER_TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": activeTier === tab.value,
              className: [
                "px-4 py-1.5 text-sm font-medium rounded-full border transition-smooth",
                activeTier === tab.value ? "bg-primary text-primary-foreground border-primary" : "text-muted-foreground border-border hover:text-foreground hover:border-foreground/30"
              ].join(" "),
              onClick: () => setActiveTier(tab.value),
              "data-ocid": `shop.tier_filter.${tab.value}`,
              children: tab.label
            },
            tab.value
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:ml-auto w-full sm:w-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "search",
            placeholder: "Search kurtis, pants…",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "pl-9 pr-8 h-9 text-sm",
            "data-ocid": "shop.search_input"
          }
        ),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "aria-label": "Clear search",
            className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            onClick: () => setSearchQuery(""),
            "data-ocid": "shop.clear_search_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground whitespace-nowrap", children: [
        filteredProducts.length,
        " item",
        filteredProducts.length !== 1 ? "s" : ""
      ] })
    ] }) }),
    !hasResults && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center px-4",
        "data-ocid": "shop.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-16 w-16 text-muted-foreground/30 mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "No products found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xs mb-6", children: "Try adjusting your filters or search term." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: () => {
                setActiveTier("all");
                setSearchQuery("");
              },
              "data-ocid": "shop.clear_filters_button",
              children: "Clear Filters"
            }
          )
        ]
      }
    ),
    hasResults && (activeTier === "all" || activeTier === "premium") && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierSection,
      {
        tier: "premium",
        products: premiumProducts,
        tierIndex: 1,
        variant: "grid"
      }
    ),
    hasResults && (activeTier === "all" || activeTier === "average") && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierSection,
      {
        tier: "average",
        products: averageProducts,
        tierIndex: 2,
        variant: "grid"
      }
    ),
    hasResults && (activeTier === "all" || activeTier === "basic") && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierSection,
      {
        tier: "basic",
        products: basicProducts,
        tierIndex: 3,
        variant: "grid"
      }
    )
  ] });
}
export {
  Shop
};
