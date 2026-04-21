import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { type CartItem, TIER_CONFIG } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion } from "motion/react";

const GST_RATE = 0.18;

function CartItemRow({
  item,
  index,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  index: number;
  onUpdateQuantity: (qty: number) => void;
  onRemove: () => void;
}) {
  const { product, quantity, selectedSize, selectedColor } = item;
  const tier = TIER_CONFIG[product.tier];
  const subtotal = product.price * quantity;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.06 }}
      data-ocid={`cart.item.${index + 1}`}
      className="flex gap-4 py-5 border-b border-border last:border-b-0"
    >
      {/* Product Image */}
      <div className="relative flex-shrink-0 w-24 h-32 rounded-lg overflow-hidden bg-muted">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <span
          className={`absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${tier.badgeClass}`}
        >
          {tier.label}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-tight truncate">
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-2 mt-1.5">
              <Badge
                variant="outline"
                className="text-xs font-normal capitalize"
              >
                Size: {selectedSize}
              </Badge>
              <Badge
                variant="outline"
                className="text-xs font-normal capitalize"
              >
                Color: {selectedColor}
              </Badge>
            </div>
          </div>
          <button
            type="button"
            data-ocid={`cart.delete_button.${index + 1}`}
            onClick={onRemove}
            aria-label={`Remove ${product.name}`}
            className="flex-shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              data-ocid={`cart.qty_minus.${index + 1}`}
              onClick={() => onUpdateQuantity(quantity - 1)}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              className="p-2 hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-foreground">
              {quantity}
            </span>
            <button
              type="button"
              data-ocid={`cart.qty_plus.${index + 1}`}
              onClick={() => onUpdateQuantity(quantity + 1)}
              aria-label="Increase quantity"
              className="p-2 hover:bg-muted transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            {product.originalPrice && (
              <p className="text-sm text-muted-foreground line-through">
                ₹{(product.originalPrice * quantity).toLocaleString("en-IN")}
              </p>
            )}
            <p className="font-display font-bold text-lg text-foreground">
              ₹{subtotal.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground">₹{product.price}/pc</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Cart() {
  const {
    items,
    itemCount,
    totalAmount,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const gstAmount = totalAmount * GST_RATE;
  const grandTotal = totalAmount + gstAmount;

  if (items.length === 0) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16 text-center"
        data-ocid="cart.empty_state"
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything yet. Explore our curated
          collections and find something you'll love.
        </p>
        <Button asChild data-ocid="cart.shop_link" size="lg" className="gap-2">
          <Link to="/shop">
            Browse Collections <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="cart.page">
      {/* Page Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Shopping Cart
          </h1>
          <p className="text-muted-foreground mt-1">
            {itemCount} {itemCount === 1 ? "item" : "items"} in your bag
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl border border-border px-6">
              <div className="flex items-center justify-between py-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Your Items</h2>
                <button
                  type="button"
                  data-ocid="cart.clear_button"
                  onClick={clearCart}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>

              <div>
                {items.map((item, idx) => (
                  <CartItemRow
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    item={item}
                    index={idx}
                    onUpdateQuantity={(qty) =>
                      updateQuantity(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor,
                        qty,
                      )
                    }
                    onRemove={() =>
                      removeItem(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor,
                      )
                    }
                  />
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Link
                to="/shop"
                data-ocid="cart.continue_shopping_link"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-xl border border-border p-6 sticky top-24"
              data-ocid="cart.summary"
            >
              <h2 className="font-display text-xl font-bold text-foreground mb-5">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-foreground">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span className="font-medium text-foreground">
                    ₹
                    {gstAmount.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                    Free
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center mb-6">
                <span className="font-display text-base font-bold text-foreground">
                  Total
                </span>
                <div className="text-right">
                  <p className="font-display text-2xl font-bold text-foreground">
                    ₹
                    {grandTotal.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    incl. all taxes
                  </p>
                </div>
              </div>

              <Button
                asChild
                data-ocid="cart.checkout_button"
                size="lg"
                className="w-full gap-2 font-semibold"
              >
                <Link to="/checkout">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <p className="text-center text-xs text-muted-foreground mt-4">
                🔒 Secure checkout powered by Stripe
              </p>

              {/* Tier breakdown */}
              <div className="mt-5 pt-4 border-t border-border space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Items by Tier
                </p>
                {(["premium", "average", "basic"] as const).map((tier) => {
                  const tierItems = items.filter(
                    (i) => i.product.tier === tier,
                  );
                  if (tierItems.length === 0) return null;
                  const tierTotal = tierItems.reduce(
                    (s, i) => s + i.product.price * i.quantity,
                    0,
                  );
                  return (
                    <div
                      key={tier}
                      className="flex justify-between text-xs items-center"
                    >
                      <span
                        className={`capitalize ${TIER_CONFIG[tier].badgeClass} px-1.5 py-0.5 rounded`}
                      >
                        {TIER_CONFIG[tier].label}
                      </span>
                      <span className="text-muted-foreground">
                        ₹{tierTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
