import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";
import { type Product, type ProductTier, TIER_CONFIG } from "@/types";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TIER_ORDER: ProductTier[] = ["premium", "average", "basic"];

const TIER_BADGE: Record<ProductTier, string> = {
  premium: "tier-badge-premium",
  average: "tier-badge-average",
  basic: "tier-badge-basic",
};

export function AdminInventory() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [stockEdits, setStockEdits] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const stats = TIER_ORDER.map((tier) => {
    const tierProducts = products.filter((p) => p.tier === tier);
    const totalStock = tierProducts.reduce((s, p) => s + p.stockCount, 0);
    const lowStock = tierProducts.filter((p) => p.stockCount < 10).length;
    return { tier, count: tierProducts.length, totalStock, lowStock };
  });

  function handleStockEdit(productId: string, value: string) {
    setStockEdits((prev) => ({ ...prev, [productId]: value }));
  }

  async function handleStockSave(product: Product) {
    const raw = stockEdits[product.id];
    if (raw === undefined || raw === "") return;
    const newCount = Number.parseInt(raw, 10);
    if (Number.isNaN(newCount) || newCount < 0) {
      toast.error("Stock must be a non-negative number.");
      return;
    }
    setSavingId(product.id);
    await new Promise((r) => setTimeout(r, 400));
    setProducts((prev) =>
      prev.map((p) =>
        p.id === product.id
          ? {
              ...p,
              stockCount: newCount,
              inStock: newCount > 0,
              updatedAt: Date.now(),
            }
          : p,
      ),
    );
    setStockEdits((prev) => {
      const next = { ...prev };
      delete next[product.id];
      return next;
    });
    setSavingId(null);
    toast.success(`Stock updated for "${product.name}".`);
  }

  return (
    <div data-ocid="admin.inventory.section">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-foreground">
          Inventory
        </h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Quick stock update — edit the quantity and save per product.
        </p>
      </div>

      {/* Tier summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map(({ tier, count, totalStock, lowStock }) => (
          <div
            key={tier}
            className="bg-card border border-border rounded-xl p-4 shadow-subtle"
            data-ocid={`admin.inventory.${tier}.card`}
          >
            <div className="flex items-start justify-between mb-1">
              <span className={TIER_BADGE[tier]}>
                {TIER_CONFIG[tier].label}
              </span>
              {lowStock > 0 && (
                <span className="text-xs text-destructive font-medium">
                  {lowStock} low
                </span>
              )}
            </div>
            <div className="flex items-end gap-1 mt-2">
              <span className="text-2xl font-display font-bold text-foreground">
                {totalStock}
              </span>
              <span className="text-muted-foreground text-sm mb-0.5">
                units
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              {count} product{count !== 1 ? "s" : ""}
            </p>
          </div>
        ))}
      </div>

      {/* Inventory table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-subtle">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead>Product</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Current Stock</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="w-48 text-right">Update Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, idx) => {
              const editValue = stockEdits[product.id];
              const hasEdit =
                editValue !== undefined &&
                editValue !== String(product.stockCount);
              return (
                <TableRow
                  key={product.id}
                  data-ocid={`admin.inventory.item.${idx + 1}`}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-8 h-8 rounded-lg object-cover border border-border flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <p className="font-medium text-foreground text-sm truncate max-w-[180px]">
                        {product.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={TIER_BADGE[product.tier]}>
                      {TIER_CONFIG[product.tier].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-foreground">
                    {product.stockCount}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.stockCount === 0 ? (
                      <span className="text-xs font-medium text-destructive">
                        Out of Stock
                      </span>
                    ) : product.stockCount < 10 ? (
                      <span className="text-xs font-medium text-accent">
                        Low Stock
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-muted-foreground">
                        In Stock
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Input
                        type="number"
                        min="0"
                        className="h-8 w-24 text-right text-sm"
                        placeholder={String(product.stockCount)}
                        value={editValue ?? ""}
                        onChange={(e) =>
                          handleStockEdit(product.id, e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") void handleStockSave(product);
                        }}
                        data-ocid={`admin.inventory.stock.input.${idx + 1}`}
                      />
                      <Button
                        size="icon"
                        variant={hasEdit ? "default" : "outline"}
                        className="h-8 w-8 flex-shrink-0"
                        disabled={!hasEdit || savingId === product.id}
                        onClick={() => void handleStockSave(product)}
                        aria-label={`Save stock for ${product.name}`}
                        data-ocid={`admin.inventory.save_button.${idx + 1}`}
                      >
                        <Save className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
