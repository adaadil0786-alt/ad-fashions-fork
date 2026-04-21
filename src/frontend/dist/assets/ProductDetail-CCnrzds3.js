import { c as createLucideIcon, f as useParams, b as useCart, r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, d as Badge, S as ShoppingBag } from "./index-CpDKwjiy.js";
import { S as Separator } from "./separator-D-CKA40-.js";
import { S as SAMPLE_PRODUCTS } from "./sampleData-Gyf11EY7.js";
import { T as TIER_CONFIG } from "./index-5fmYl3kY.js";
import { P as PackageSearch } from "./package-search-tEqNyg_U.js";
import { m as motion } from "./proxy-DA3n4y3c.js";
import { M as Minus } from "./minus-C_8Diuen.js";
import { P as Plus } from "./plus-Dw-qp99z.js";
import { C as Check } from "./check-BXMIpJ1K.js";
import { T as Truck } from "./truck-BJA5MFfP.js";
import "./index-Clol72Bn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
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
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function ProductDetail() {
  const { productId } = useParams({ from: "/product/$productId" });
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId) ?? null;
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = reactExports.useState(0);
  const [selectedSize, setSelectedSize] = reactExports.useState(null);
  const [selectedColor, setSelectedColor] = reactExports.useState(null);
  const [quantity, setQuantity] = reactExports.useState(1);
  const [addedToCart, setAddedToCart] = reactExports.useState(false);
  const [sizeError, setSizeError] = reactExports.useState(false);
  const [colorError, setColorError] = reactExports.useState(false);
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-32 text-center px-4",
        "data-ocid": "product_detail.not_found",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-16 w-16 text-muted-foreground/30 mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold text-foreground mb-2", children: "Product not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: "This product may no longer be available." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              "data-ocid": "product_detail.back_to_shop_button",
              children: "Back to Shop"
            }
          ) })
        ]
      }
    );
  }
  const tierConfig = TIER_CONFIG[product.tier];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;
  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (!selectedColor) {
      setColorError(true);
      return;
    }
    addItem(product, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 border-b border-border py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", className: "hover:text-foreground transition-colors", children: "Shop" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "/" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: product.name })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "product_detail.gallery", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.25 },
              className: "relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: product.images[selectedImage] ?? product.imageUrl,
                    alt: product.name,
                    className: "w-full h-full object-cover"
                  }
                ),
                !product.inStock && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute inset-0 bg-background/60 flex items-center justify-center",
                    "data-ocid": "product_detail.out_of_stock_overlay",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: "secondary",
                        className: "text-sm font-semibold px-4 py-2",
                        children: "Out of Stock"
                      }
                    )
                  }
                ),
                hasDiscount && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-2.5 py-1 rounded-lg", children: [
                  "-",
                  discountPct,
                  "%"
                ] })
              ]
            },
            selectedImage
          ),
          product.images.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 overflow-x-auto", children: product.images.map((img, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              className: [
                "shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-smooth",
                i === selectedImage ? "border-primary" : "border-border hover:border-muted-foreground"
              ].join(" "),
              onClick: () => setSelectedImage(i),
              "aria-label": `View image ${i + 1}`,
              "data-ocid": `product_detail.thumbnail.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: img,
                  alt: `${product.name} view ${i + 1}`,
                  className: "w-full h-full object-cover"
                }
              )
            },
            img
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `tier-badge-${product.tier}`,
                "data-ocid": "product_detail.tier_badge",
                children: tierConfig.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground uppercase tracking-widest capitalize", children: product.category })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h1",
            {
              className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight",
              "data-ocid": "product_detail.product_name",
              children: product.name
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: `h-4 w-4 ${s <= 4 ? "fill-accent text-accent" : "fill-muted text-muted"}`
              },
              s
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground ml-1", children: "4.0 (24 reviews)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-baseline gap-3",
              "data-ocid": "product_detail.price",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-3xl font-bold text-foreground", children: [
                  "₹",
                  product.price.toLocaleString("en-IN")
                ] }),
                hasDiscount && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg text-muted-foreground line-through", children: [
                    "₹",
                    product.originalPrice.toLocaleString("en-IN")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-xs", children: [
                    "Save ₹",
                    (product.originalPrice - product.price).toLocaleString(
                      "en-IN"
                    )
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-muted-foreground leading-relaxed",
              "data-ocid": "product_detail.description",
              children: product.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.size_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: "Size" }),
              sizeError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_detail.size_field_error",
                  children: "Please select a size"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: [
                  "min-w-[44px] px-3 py-2 text-sm font-medium rounded-lg border transition-smooth",
                  selectedSize === size ? "bg-primary text-primary-foreground border-primary" : "text-foreground border-border hover:border-primary/60"
                ].join(" "),
                onClick: () => {
                  setSelectedSize(size);
                  setSizeError(false);
                },
                "data-ocid": `product_detail.size_button.${size.toLowerCase()}`,
                children: size
              },
              size
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "product_detail.color_section", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground uppercase tracking-wider", children: [
                "Color",
                selectedColor && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "normal-case font-normal text-muted-foreground ml-2", children: [
                  "— ",
                  selectedColor
                ] })
              ] }),
              colorError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "product_detail.color_field_error",
                  children: "Please select a color"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: product.colors.map((color) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: [
                  "px-3 py-1.5 text-sm rounded-full border transition-smooth",
                  selectedColor === color ? "bg-primary text-primary-foreground border-primary" : "text-foreground border-border hover:border-primary/60"
                ].join(" "),
                onClick: () => {
                  setSelectedColor(color);
                  setColorError(false);
                },
                "data-ocid": `product_detail.color_button.${color.toLowerCase().replace(/\s+/g, "_")}`,
                children: color
              },
              color
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground uppercase tracking-wider mb-2", children: "Quantity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2",
                "data-ocid": "product_detail.quantity_selector",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Decrease quantity",
                      className: "w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40",
                      onClick: () => setQuantity((q) => Math.max(1, q - 1)),
                      disabled: quantity <= 1,
                      "data-ocid": "product_detail.quantity_decrease_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "h-3.5 w-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "w-10 text-center font-semibold text-foreground",
                      "data-ocid": "product_detail.quantity_value",
                      children: quantity
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Increase quantity",
                      className: "w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40",
                      onClick: () => setQuantity((q) => Math.min(10, q + 1)),
                      disabled: quantity >= 10,
                      "data-ocid": "product_detail.quantity_increase_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3.5 w-3.5" })
                    }
                  )
                ]
              }
            )
          ] }),
          !product.inStock ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col gap-2",
              "data-ocid": "product_detail.out_of_stock_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", disabled: true, className: "w-full gap-2 text-base", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
                  "Out of Stock"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "This item is currently unavailable. Check back soon!" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "lg",
              className: `w-full gap-2 text-base transition-smooth ${addedToCart ? "bg-green-600 hover:bg-green-600" : ""}`,
              onClick: handleAddToCart,
              "data-ocid": "product_detail.add_to_cart_button",
              children: addedToCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }),
                "Added to Cart!"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-5 w-5" }),
                "Add to Cart — ₹",
                (product.price * quantity).toLocaleString("en-IN")
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-accent mt-0.5 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Free shipping on orders above ₹1,500" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Estimated delivery: 4–7 business days" })
            ] })
          ] }),
          product.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 pt-1", children: product.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: "outline",
              className: "text-xs capitalize",
              children: tag
            },
            tag
          )) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/shop", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          className: "gap-2 text-muted-foreground hover:text-foreground",
          "data-ocid": "product_detail.back_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            "Back to Shop"
          ]
        }
      ) }) })
    ] })
  ] });
}
export {
  ProductDetail
};
