import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { type Product, TIER_CONFIG } from "@/types";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const tierConfig = TIER_CONFIG[product.tier];

  function handleAddToCart(e: React.MouseEvent) {
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

  return (
    <Card
      className="group relative flex flex-col overflow-hidden border border-border bg-card hover:shadow-lg transition-smooth cursor-pointer"
      data-ocid={`product_card.item.${dataIndex}`}
    >
      <Link
        to="/product/$productId"
        params={{ productId: product.id }}
        className="flex flex-col flex-1"
      >
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            loading="lazy"
          />
          {/* Tier badge overlay */}
          <span
            className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase ${tierConfig.badgeClass}`}
            data-ocid={`product_card.tier_badge.${dataIndex}`}
          >
            {tierConfig.label}
          </span>
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div
              className="absolute inset-0 bg-background/60 flex items-center justify-center"
              data-ocid={`product_card.out_of_stock.${dataIndex}`}
            >
              <Badge
                variant="secondary"
                className="text-xs font-semibold tracking-wide"
              >
                Out of Stock
              </Badge>
            </div>
          )}
          {/* Original price discount badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
              SALE
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 gap-1.5">
          <p className="text-xs text-muted-foreground uppercase tracking-wider capitalize">
            {product.category}
          </p>
          <h3
            className="font-display font-semibold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors"
            data-ocid={`product_card.name.${dataIndex}`}
          >
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mt-auto pt-1">
            <span
              className="font-semibold text-base text-foreground"
              data-ocid={`product_card.price.${dataIndex}`}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="px-3 pb-3">
        <Button
          size="sm"
          variant={added ? "secondary" : "default"}
          className="w-full gap-1.5 text-xs transition-smooth"
          disabled={!product.inStock}
          onClick={handleAddToCart}
          data-ocid={`product_card.add_to_cart_button.${dataIndex}`}
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {!product.inStock ? "Out of Stock" : added ? "Added!" : "Add to Cart"}
        </Button>
      </div>
    </Card>
  );
}
