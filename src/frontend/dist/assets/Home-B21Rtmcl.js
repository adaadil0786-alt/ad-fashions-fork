import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, B as Button, S as ShoppingBag } from "./index-CpDKwjiy.js";
import { T as TierSection } from "./TierSection-Dq95PHHo.js";
import { S as SAMPLE_PRODUCTS } from "./sampleData-Gyf11EY7.js";
import { T as TIER_CONFIG } from "./index-5fmYl3kY.js";
import { m as motion } from "./proxy-DA3n4y3c.js";
import "./arrow-right-CMVeM6GI.js";
import "./package-search-tEqNyg_U.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$1);
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
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const TIER_ORDER = ["premium", "average", "basic"];
const FEATURES = [
  { icon: "✦", label: "Free Shipping", sub: "On orders above ₹1,500" },
  { icon: "↩", label: "Easy Returns", sub: "15-day hassle-free returns" },
  {
    icon: "◈",
    label: "Authentic Fabrics",
    sub: "Curated from trusted weavers"
  },
  { icon: "★", label: "Exclusive Designs", sub: "New arrivals every week" }
];
function Home() {
  const premiumProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.tier === "premium"
  ).slice(0, 6);
  const averageProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.tier === "average"
  ).slice(0, 6);
  const basicProducts = SAMPLE_PRODUCTS.filter((p) => p.tier === "basic").slice(
    0,
    6
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative min-h-[90vh] flex items-center overflow-hidden bg-muted/20",
        "data-ocid": "home.hero_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/hero-fashion.dim_1400x900.jpg",
                alt: "AD Fashions hero",
                className: "w-full h-full object-cover object-center"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5 },
                className: "text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4",
                children: "✦ New Collection 2026"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.h1,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.1 },
                className: "font-display text-6xl sm:text-7xl font-bold text-foreground leading-[1.05] mb-4",
                children: [
                  "AD ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-light text-accent", children: "Fashions" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.2 },
                className: "font-display text-xl sm:text-2xl font-light text-muted-foreground mb-2 italic",
                children: "Elegance Redefined"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.p,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.55, delay: 0.3 },
                className: "text-base text-muted-foreground leading-relaxed mb-8 max-w-sm",
                children: "Discover our curated collection of contemporary Indian wear — kurtis, palazzo sets, and more, crafted for the modern woman."
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.4 },
                className: "flex flex-wrap items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", "data-ocid": "home.hero_shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "lg",
                      className: "gap-2 px-8 font-medium tracking-wide shadow-md",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
                        "Shop Now"
                      ]
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                      onClick: () => {
                        var _a;
                        return (_a = document.getElementById("tiers-section")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                      },
                      "data-ocid": "home.explore_tiers_button",
                      children: [
                        "Explore Tiers",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3.5 w-3.5" })
                      ]
                    }
                  )
                ]
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60 animate-bounce", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-8 bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "h-3 w-3" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-y border-border py-6",
        "data-ocid": "home.features_bar",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6", children: FEATURES.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent text-lg leading-none mt-0.5", children: f.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: f.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: f.sub })
          ] })
        ] }, f.label)) }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        id: "tiers-section",
        className: "bg-background py-16",
        "data-ocid": "home.tiers_intro_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.p,
            {
              initial: { opacity: 0 },
              whileInView: { opacity: 1 },
              viewport: { once: true },
              className: "text-xs uppercase tracking-widest text-accent font-medium mb-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "inline h-3 w-3 mr-1" }),
                "Our Curated Tiers"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.05 },
              className: "font-display text-4xl sm:text-5xl font-bold text-foreground mb-4",
              children: "Something for Every Style"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: 0.1 },
              className: "text-muted-foreground max-w-xl mx-auto",
              children: "From exquisite designer pieces to everyday essentials — each tier is curated with care so you always find exactly what you need."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 mb-2", children: TIER_ORDER.map((tier, i) => {
            const cfg = TIER_CONFIG[tier];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", search: { tier }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `group rounded-xl border border-border bg-card p-5 text-left hover:shadow-md transition-smooth ${cfg.accentClass}`,
                    "data-ocid": `home.tier_card.${tier}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: [
                        "Tier ",
                        i + 1
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors", children: [
                        cfg.label,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic font-light text-muted-foreground", children: cfg.subtitle })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 line-clamp-2", children: cfg.description }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all", children: "Browse Collection →" })
                    ]
                  }
                ) })
              },
              tier
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierSection,
      {
        tier: "premium",
        products: premiumProducts,
        tierIndex: 1,
        variant: "strip"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierSection,
      {
        tier: "average",
        products: averageProducts,
        tierIndex: 2,
        variant: "strip"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TierSection,
      {
        tier: "basic",
        products: basicProducts,
        tierIndex: 3,
        variant: "strip"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-card border-t border-border py-16",
        "data-ocid": "home.brand_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -16 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-accent font-medium mb-3", children: "Our Story" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl font-bold text-foreground mb-4 leading-tight", children: "Crafted for the Modern Indian Woman" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-4", children: "AD Fashions began with a simple belief — every woman deserves beautiful, well-made clothing at a price she loves. From our curated premium silk kurtis to our everyday cotton essentials, each piece reflects our commitment to quality and design." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-6", children: "We work directly with artisans and weavers across India to bring you authentic fabrics and handcrafted details you won't find anywhere else." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", "data-ocid": "home.brand_shop_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", className: "gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }),
                  "Explore Full Collection"
                ] }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: 16 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              className: "relative",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/hero-fashion.dim_1400x900.jpg",
                    alt: "AD Fashions craftsmanship",
                    className: "w-full rounded-2xl object-cover aspect-[4/3] shadow-md"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-5 py-3 shadow-md", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-widest", children: "Since" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-primary", children: "2020" })
                ] })
              ]
            }
          )
        ] }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "bg-primary py-16 text-center",
        "data-ocid": "home.cta_section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.h2,
            {
              initial: { opacity: 0, y: 10 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              className: "font-display text-4xl sm:text-5xl font-bold text-primary-foreground mb-4",
              children: "Ready to Elevate Your Wardrobe?"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary-foreground/70 mb-8 text-lg", children: "Shop over 100 handpicked styles — kurtis, palazzo sets, tops, and more." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", "data-ocid": "home.bottom_cta_button", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: "bg-accent text-accent-foreground hover:bg-accent/90 px-10 font-medium tracking-wide shadow-lg",
              children: "Shop the Collection"
            }
          ) })
        ] })
      }
    )
  ] });
}
export {
  Home
};
