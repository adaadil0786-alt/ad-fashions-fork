import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  type Product,
  type ProductCategory,
  type ProductTier,
  TIER_CONFIG,
} from "@/types/index";
import { ImageOff, PackagePlus, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Mock data (replace with useQuery when backend is wired) ───────────────────
const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Anya Embroidered Kurti",
    description: "Hand-embroidered silk kurti with intricate floral patterns.",
    price: 285,
    tier: "premium",
    category: "kurti",
    imageUrl: "/assets/generated/hero-fashion.jpg",
    images: [],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy", "Ivory"],
    inStock: true,
    stockCount: 24,
    tags: ["embroidered", "silk"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "p2",
    name: "Diya Cotton Kurti",
    description: "Lightweight daily-wear cotton kurti with block print.",
    price: 145,
    tier: "average",
    category: "kurti",
    imageUrl: "/assets/generated/hero-fashion.jpg",
    images: [],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Teal", "Coral", "White"],
    inStock: true,
    stockCount: 58,
    tags: ["cotton", "block-print"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "p3",
    name: "Sia Basic Kurti",
    description: "Simple comfortable kurti for everyday wear.",
    price: 89,
    tier: "basic",
    category: "kurti",
    imageUrl: "/assets/generated/hero-fashion.jpg",
    images: [],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Blue"],
    inStock: true,
    stockCount: 120,
    tags: ["basic", "casual"],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ProductFormData {
  name: string;
  description: string;
  tier: ProductTier;
  category: ProductCategory;
  price: string;
  sizes: string;
  colors: string;
  stockCount: string;
  imageUrl: string;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  description: "",
  tier: "basic",
  category: "kurti",
  price: "",
  sizes: "",
  colors: "",
  stockCount: "",
  imageUrl: "",
};

const TIER_BADGE: Record<ProductTier, string> = {
  premium: "tier-badge-premium",
  average: "tier-badge-average",
  basic: "tier-badge-basic",
};

// ─── Component ─────────────────────────────────────────────────────────────────
export function AdminProductForm() {
  const [products, setProducts] = useState<Product[]>(SAMPLE_PRODUCTS);
  const [isLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  function openAdd() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      tier: product.tier,
      category: product.category,
      price: String(product.price),
      sizes: product.sizes.join(", "),
      colors: product.colors.join(", "),
      stockCount: String(product.stockCount),
      imageUrl: product.imageUrl,
    });
    setModalOpen(true);
  }

  function handleField(key: keyof ProductFormData, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.name.trim() || !form.price) {
      toast.error("Name and price are required.");
      return;
    }
    setIsSaving(true);
    // Simulate async save
    await new Promise((r) => setTimeout(r, 600));

    const productData: Product = {
      id: editingProduct?.id ?? `p${Date.now()}`,
      name: form.name.trim(),
      description: form.description.trim(),
      tier: form.tier,
      category: form.category,
      price: Number.parseFloat(form.price),
      imageUrl: form.imageUrl || "/assets/generated/hero-fashion.jpg",
      images: [],
      sizes: form.sizes
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      colors: form.colors
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      inStock: Number.parseInt(form.stockCount || "0", 10) > 0,
      stockCount: Number.parseInt(form.stockCount || "0", 10),
      tags: [],
      createdAt: editingProduct?.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? productData : p)),
      );
      toast.success("Product updated successfully.");
    } else {
      setProducts((prev) => [productData, ...prev]);
      toast.success("Product added successfully.");
    }
    setIsSaving(false);
    setModalOpen(false);
  }

  async function handleDelete(product: Product) {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
    setDeleteTarget(null);
    toast.success(`"${product.name}" deleted.`);
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.products.loading_state">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div data-ocid="admin.products.section">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Products
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {products.length} product{products.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="gap-2"
          data-ocid="admin.products.add_button"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Table */}
      {products.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 bg-card rounded-2xl border border-border"
          data-ocid="admin.products.empty_state"
        >
          <PackagePlus className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            No products yet. Add your first product to get started.
          </p>
          <Button
            onClick={openAdd}
            variant="outline"
            data-ocid="admin.products.empty_add_button"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-subtle">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead className="w-14">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right w-28">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, idx) => (
                <TableRow
                  key={product.id}
                  className="group"
                  data-ocid={`admin.products.item.${idx + 1}`}
                >
                  <TableCell>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-border"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                        <ImageOff className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground truncate max-w-[200px]">
                      {product.name}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {product.category}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className={TIER_BADGE[product.tier]}>
                      {TIER_CONFIG[product.tier].label}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-foreground">
                    ₹{product.price.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={`font-mono text-sm ${
                        product.stockCount === 0
                          ? "text-destructive"
                          : product.stockCount < 10
                            ? "text-accent"
                            : "text-foreground"
                      }`}
                    >
                      {product.stockCount}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary"
                        onClick={() => openEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        data-ocid={`admin.products.edit_button.${idx + 1}`}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteTarget(product)}
                        aria-label={`Delete ${product.name}`}
                        data-ocid={`admin.products.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="admin.products.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {/* Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="prod-name">Product Name *</Label>
              <Input
                id="prod-name"
                placeholder="e.g. Anya Embroidered Kurti"
                value={form.name}
                onChange={(e) => handleField("name", e.target.value)}
                data-ocid="admin.products.name.input"
              />
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label htmlFor="prod-desc">Description</Label>
              <Textarea
                id="prod-desc"
                placeholder="Describe the product fabric, style, occasion..."
                rows={3}
                value={form.description}
                onChange={(e) => handleField("description", e.target.value)}
                data-ocid="admin.products.description.textarea"
              />
            </div>

            {/* Tier + Category row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label>Tier *</Label>
                <Select
                  value={form.tier}
                  onValueChange={(v) => handleField("tier", v as ProductTier)}
                >
                  <SelectTrigger data-ocid="admin.products.tier.select">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="average">Average</SelectItem>
                    <SelectItem value="basic">Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label>Category *</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    handleField("category", v as ProductCategory)
                  }
                >
                  <SelectTrigger data-ocid="admin.products.category.select">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kurti">Kurti</SelectItem>
                    <SelectItem value="pants">Pants</SelectItem>
                    <SelectItem value="dress">Dress</SelectItem>
                    <SelectItem value="set">Set</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="dupatta">Dupatta</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price + Stock row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="prod-price">Price (₹) *</Label>
                <Input
                  id="prod-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => handleField("price", e.target.value)}
                  data-ocid="admin.products.price.input"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="prod-stock">Stock Quantity</Label>
                <Input
                  id="prod-stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.stockCount}
                  onChange={(e) => handleField("stockCount", e.target.value)}
                  data-ocid="admin.products.stock.input"
                />
              </div>
            </div>

            {/* Sizes */}
            <div className="grid gap-1.5">
              <Label htmlFor="prod-sizes">
                Sizes{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (comma-separated)
                </span>
              </Label>
              <Input
                id="prod-sizes"
                placeholder="XS, S, M, L, XL, XXL"
                value={form.sizes}
                onChange={(e) => handleField("sizes", e.target.value)}
                data-ocid="admin.products.sizes.input"
              />
            </div>

            {/* Colors */}
            <div className="grid gap-1.5">
              <Label htmlFor="prod-colors">
                Colors{" "}
                <span className="text-muted-foreground text-xs font-normal">
                  (comma-separated)
                </span>
              </Label>
              <Input
                id="prod-colors"
                placeholder="Navy, Ivory, Coral"
                value={form.colors}
                onChange={(e) => handleField("colors", e.target.value)}
                data-ocid="admin.products.colors.input"
              />
            </div>

            {/* Image URL */}
            <div className="grid gap-1.5">
              <Label htmlFor="prod-image">Image URL</Label>
              <Input
                id="prod-image"
                type="url"
                placeholder="https://... or /assets/..."
                value={form.imageUrl}
                onChange={(e) => handleField("imageUrl", e.target.value)}
                data-ocid="admin.products.image_url.input"
              />
              {form.imageUrl && (
                <div className="mt-1 relative w-full h-28 rounded-lg overflow-hidden border border-border bg-muted">
                  <img
                    src={form.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="admin.products.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              data-ocid="admin.products.submit_button"
            >
              {isSaving
                ? "Saving..."
                : editingProduct
                  ? "Save Changes"
                  : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent
          className="sm:max-w-sm"
          data-ocid="admin.products.delete.dialog"
        >
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground text-sm">
            Are you sure you want to delete{" "}
            <strong className="text-foreground">
              &ldquo;{deleteTarget?.name}&rdquo;
            </strong>
            ? This action cannot be undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              data-ocid="admin.products.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              data-ocid="admin.products.delete.confirm_button"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
