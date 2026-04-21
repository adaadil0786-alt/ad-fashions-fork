import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { type Product, type ProductTier, TIER_CONFIG } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PackageSearch } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface TierSectionProps {
  tier: ProductTier;
  products: Product[];
  isLoading?: boolean;
  /** Show only a horizontal scroll strip (home page) vs full grid (shop page) */
  variant?: "strip" | "grid";
  tierIndex?: number;
}

export function TierSection({
  tier,
  products,
  isLoading = false,
  variant = "strip",
  tierIndex = 1,
}: TierSectionProps) {
  const config = TIER_CONFIG[tier];
  const sectionBg =
    tier === "premium"
      ? "bg-background"
      : tier === "average"
        ? "bg-muted/30"
        : "bg-muted/10";

  return (
    <section
      className={`py-12 ${sectionBg}`}
      data-ocid={`tier_section.${tier}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`mb-8 pb-4 ${config.accentClass}`}>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1 font-medium">
            Tier {tierIndex}
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground leading-none">
                {config.label}{" "}
                <span className="font-light italic text-muted-foreground">
                  {config.subtitle}
                </span>
              </h2>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-md">
                {config.description}
              </p>
            </div>
            {variant === "strip" && (
              <Link to="/shop" search={{ tier }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 shrink-0 text-muted-foreground hover:text-foreground"
                  data-ocid={`tier_section.view_all_button.${tier}`}
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Loading skeletons */}
        {isLoading && (
          <div
            className={
              variant === "strip"
                ? "flex gap-4 overflow-x-auto pb-2"
                : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            }
          >
            {(["sk1", "sk2", "sk3", "sk4"] as const).map((k) => (
              <Skeleton
                key={k}
                className={`${variant === "strip" ? "shrink-0 w-52" : "w-full"} aspect-[3/4] rounded-lg`}
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid={`tier_section.empty_state.${tier}`}
          >
            <PackageSearch className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground font-medium">
              No {config.label} products available yet.
            </p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Check back soon — new arrivals coming!
            </p>
          </div>
        )}

        {/* Strip layout (horizontal scroll) */}
        {!isLoading && products.length > 0 && variant === "strip" && (
          <div
            className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin"
            style={{ scrollbarWidth: "none" }}
            data-ocid={`tier_section.product_strip.${tier}`}
          >
            {products.map((product, i) => (
              <div key={product.id} className="shrink-0 w-52 snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        )}

        {/* Grid layout (shop page) */}
        {!isLoading && products.length > 0 && variant === "grid" && (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid={`tier_section.product_grid.${tier}`}
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
