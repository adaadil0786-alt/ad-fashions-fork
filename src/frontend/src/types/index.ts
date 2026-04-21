export type ProductTier = "premium" | "average" | "basic";

export type ProductCategory =
  | "kurti"
  | "pants"
  | "dress"
  | "set"
  | "top"
  | "dupatta"
  | "other";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  tier: ProductTier;
  category: ProductCategory;
  imageUrl: string;
  images: string[];
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount: number;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  selectedSize: string;
  selectedColor: string;
  tier: ProductTier;
}

export interface ShippingAddress {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentIntentId?: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  createdAt: number;
  updatedAt: number;
  estimatedDelivery?: number;
  trackingNumber?: string;
}

export interface TierConfig {
  id: ProductTier;
  label: string;
  subtitle: string;
  accentClass: string;
  badgeClass: string;
  description: string;
}

export const TIER_CONFIG: Record<ProductTier, TierConfig> = {
  premium: {
    id: "premium",
    label: "Premium",
    subtitle: "Collection",
    accentClass: "tier-premium",
    badgeClass: "bg-accent text-accent-foreground",
    description:
      "Exquisite craftsmanship with premium fabrics — silk, georgette, and fine cotton.",
  },
  average: {
    id: "average",
    label: "Average",
    subtitle: "Collection",
    accentClass: "tier-average",
    badgeClass: "bg-secondary text-secondary-foreground",
    description:
      "Elegant everyday wear balancing quality and comfort for modern women.",
  },
  basic: {
    id: "basic",
    label: "Basic",
    subtitle: "Essentials",
    accentClass: "tier-basic",
    badgeClass: "bg-muted text-muted-foreground",
    description:
      "Affordable wardrobe essentials crafted for daily comfort and style.",
  },
};
