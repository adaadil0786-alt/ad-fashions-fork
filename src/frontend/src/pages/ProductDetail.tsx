import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/useCart";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";
import { TIER_CONFIG } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  Minus,
  PackageSearch,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function ProductDetail() {
  const { productId } = useParams({ from: "/product/$productId" });
  const product = SAMPLE_PRODUCTS.find((p) => p.id === productId) ?? null;
  const { addItem } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);

  if (!product) {
    return (
      <div
        className="flex flex-col items-center justify-center py-32 text-center px-4"
        data-ocid="product_detail.not_found"
      >
        <PackageSearch className="h-16 w-16 text-muted-foreground/30 mb-5" />
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Product not found
        </h2>
        <p className="text-muted-foreground mb-6">
          This product may no longer be available.
        </p>
        <Link to="/shop">
          <Button
            variant="outline"
            data-ocid="product_detail.back_to_shop_button"
          >
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const tierConfig = TIER_CONFIG[product.tier];
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  function handleAddToCart() {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (!selectedColor) {
      setColorError(true);
      return;
    }
    addItem(product!, selectedSize, selectedColor, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div data-ocid="product_detail.page">
      {/* Breadcrumb */}
      <div className="bg-muted/30 border-b border-border py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[200px]">
            {product.name}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
          {/* ── IMAGE GALLERY ────────────────────────────────── */}
          <div className="space-y-3" data-ocid="product_detail.gallery">
            {/* Main image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
            >
              <img
                src={product.images[selectedImage] ?? product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Out of stock overlay */}
              {!product.inStock && (
                <div
                  className="absolute inset-0 bg-background/60 flex items-center justify-center"
                  data-ocid="product_detail.out_of_stock_overlay"
                >
                  <Badge
                    variant="secondary"
                    className="text-sm font-semibold px-4 py-2"
                  >
                    Out of Stock
                  </Badge>
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground text-sm font-bold px-2.5 py-1 rounded-lg">
                  -{discountPct}%
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    className={[
                      "shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition-smooth",
                      i === selectedImage
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground",
                    ].join(" ")}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    data-ocid={`product_detail.thumbnail.${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── PRODUCT INFO ─────────────────────────────────── */}
          <div className="space-y-5">
            {/* Tier badge + category */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`tier-badge-${product.tier}`}
                data-ocid="product_detail.tier_badge"
              >
                {tierConfig.label}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest capitalize">
                {product.category}
              </span>
            </div>

            {/* Name */}
            <h1
              className="font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight"
              data-ocid="product_detail.product_name"
            >
              {product.name}
            </h1>

            {/* Mock rating */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`h-4 w-4 ${s <= 4 ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">
                4.0 (24 reviews)
              </span>
            </div>

            {/* Price */}
            <div
              className="flex items-baseline gap-3"
              data-ocid="product_detail.price"
            >
              <span className="font-display text-3xl font-bold text-foreground">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    ₹{product.originalPrice!.toLocaleString("en-IN")}
                  </span>
                  <Badge variant="destructive" className="text-xs">
                    Save ₹
                    {(product.originalPrice! - product.price).toLocaleString(
                      "en-IN",
                    )}
                  </Badge>
                </>
              )}
            </div>

            <Separator />

            {/* Description */}
            <p
              className="text-muted-foreground leading-relaxed"
              data-ocid="product_detail.description"
            >
              {product.description}
            </p>

            {/* Size selector */}
            <div data-ocid="product_detail.size_section">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Size
                </p>
                {sizeError && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="product_detail.size_field_error"
                  >
                    Please select a size
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={[
                      "min-w-[44px] px-3 py-2 text-sm font-medium rounded-lg border transition-smooth",
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-foreground border-border hover:border-primary/60",
                    ].join(" ")}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    data-ocid={`product_detail.size_button.${size.toLowerCase()}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selector */}
            <div data-ocid="product_detail.color_section">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                  Color
                  {selectedColor && (
                    <span className="normal-case font-normal text-muted-foreground ml-2">
                      — {selectedColor}
                    </span>
                  )}
                </p>
                {colorError && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="product_detail.color_field_error"
                  >
                    Please select a color
                  </p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={[
                      "px-3 py-1.5 text-sm rounded-full border transition-smooth",
                      selectedColor === color
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-foreground border-border hover:border-primary/60",
                    ].join(" ")}
                    onClick={() => {
                      setSelectedColor(color);
                      setColorError(false);
                    }}
                    data-ocid={`product_detail.color_button.${color.toLowerCase().replace(/\s+/g, "_")}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                Quantity
              </p>
              <div
                className="flex items-center gap-2"
                data-ocid="product_detail.quantity_selector"
              >
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  data-ocid="product_detail.quantity_decrease_button"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span
                  className="w-10 text-center font-semibold text-foreground"
                  data-ocid="product_detail.quantity_value"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground hover:bg-muted transition-smooth disabled:opacity-40"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  disabled={quantity >= 10}
                  data-ocid="product_detail.quantity_increase_button"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            {!product.inStock ? (
              <div
                className="flex flex-col gap-2"
                data-ocid="product_detail.out_of_stock_state"
              >
                <Button size="lg" disabled className="w-full gap-2 text-base">
                  <ShoppingBag className="h-5 w-5" />
                  Out of Stock
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  This item is currently unavailable. Check back soon!
                </p>
              </div>
            ) : (
              <Button
                size="lg"
                className={`w-full gap-2 text-base transition-smooth ${addedToCart ? "bg-green-600 hover:bg-green-600" : ""}`}
                onClick={handleAddToCart}
                data-ocid="product_detail.add_to_cart_button"
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart — ₹
                    {(product.price * quantity).toLocaleString("en-IN")}
                  </>
                )}
              </Button>
            )}

            {/* Shipping info */}
            <div className="flex items-start gap-3 bg-muted/40 rounded-xl p-3">
              <Truck className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Free shipping on orders above ₹1,500
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Estimated delivery: 4–7 business days
                </p>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {product.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="text-xs capitalize"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Back button */}
        <div className="mt-12">
          <Link to="/shop">
            <Button
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
              data-ocid="product_detail.back_button"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
