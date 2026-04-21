import { TierSection } from "@/components/TierSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";
import { type Product, type ProductTier, TIER_CONFIG } from "@/types";
import { useSearch } from "@tanstack/react-router";
import { PackageSearch, Search, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";

type TierFilter = "all" | ProductTier;
const TIER_TABS: { label: string; value: TierFilter }[] = [
  { label: "All", value: "all" },
  { label: "Premium", value: "premium" },
  { label: "Average", value: "average" },
  { label: "Basic", value: "basic" },
];

export function Shop() {
  const searchParams = useSearch({ from: "/shop" });
  const initialTier = (searchParams as { tier?: string }).tier as
    | ProductTier
    | undefined;
  const [activeTier, setActiveTier] = useState<TierFilter>(
    initialTier && ["premium", "average", "basic"].includes(initialTier)
      ? initialTier
      : "all",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery);

  const filteredProducts = useMemo<Product[]>(() => {
    let products = SAMPLE_PRODUCTS;
    if (activeTier !== "all") {
      products = products.filter((p) => p.tier === activeTier);
    }
    if (deferredQuery.trim()) {
      const q = deferredQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    return products;
  }, [activeTier, deferredQuery]);

  const premiumProducts = filteredProducts.filter((p) => p.tier === "premium");
  const averageProducts = filteredProducts.filter((p) => p.tier === "average");
  const basicProducts = filteredProducts.filter((p) => p.tier === "basic");

  const hasResults = filteredProducts.length > 0;

  return (
    <div data-ocid="shop.page">
      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <div className="bg-card border-b border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-accent font-medium mb-1">
            AD Fashions
          </p>
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Shop All
          </h1>
          <p className="text-muted-foreground">
            Browse our full collection across all three tiers.
          </p>
        </div>
      </div>

      {/* ── FILTER BAR ──────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-card/95 backdrop-blur border-b border-border py-3 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Tier tabs */}
          <div
            className="flex items-center gap-1 flex-wrap"
            role="tablist"
            aria-label="Filter by tier"
          >
            {TIER_TABS.map((tab) => (
              <button
                key={tab.value}
                type="button"
                role="tab"
                aria-selected={activeTier === tab.value}
                className={[
                  "px-4 py-1.5 text-sm font-medium rounded-full border transition-smooth",
                  activeTier === tab.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground border-border hover:text-foreground hover:border-foreground/30",
                ].join(" ")}
                onClick={() => setActiveTier(tab.value)}
                data-ocid={`shop.tier_filter.${tab.value}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:ml-auto w-full sm:w-60">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search kurtis, pants…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-8 h-9 text-sm"
              data-ocid="shop.search_input"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSearchQuery("")}
                data-ocid="shop.clear_search_button"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Results count */}
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            {filteredProducts.length} item
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── GLOBAL EMPTY STATE ─────────────────────────────── */}
      {!hasResults && (
        <div
          className="flex flex-col items-center justify-center py-24 text-center px-4"
          data-ocid="shop.empty_state"
        >
          <PackageSearch className="h-16 w-16 text-muted-foreground/30 mb-5" />
          <h2 className="font-display text-2xl font-semibold text-foreground mb-2">
            No products found
          </h2>
          <p className="text-muted-foreground max-w-xs mb-6">
            Try adjusting your filters or search term.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setActiveTier("all");
              setSearchQuery("");
            }}
            data-ocid="shop.clear_filters_button"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* ── TIER SECTIONS ──────────────────────────────────── */}
      {hasResults && (activeTier === "all" || activeTier === "premium") && (
        <TierSection
          tier="premium"
          products={premiumProducts}
          tierIndex={1}
          variant="grid"
        />
      )}
      {hasResults && (activeTier === "all" || activeTier === "average") && (
        <TierSection
          tier="average"
          products={averageProducts}
          tierIndex={2}
          variant="grid"
        />
      )}
      {hasResults && (activeTier === "all" || activeTier === "basic") && (
        <TierSection
          tier="basic"
          products={basicProducts}
          tierIndex={3}
          variant="grid"
        />
      )}
    </div>
  );
}
