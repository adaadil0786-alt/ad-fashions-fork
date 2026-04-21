import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { TIER_CONFIG } from "@/types";
import type { Order, OrderStatus } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Lock,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-muted text-muted-foreground border-muted-foreground/30",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "bg-secondary/30 text-foreground border-secondary",
  },
  processing: {
    label: "Processing",
    icon: Package,
    className: "bg-accent/10 text-accent border-accent/30",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-primary/10 text-primary border-primary/30",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: "bg-secondary/20 text-foreground border-secondary/40",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/30",
  },
  refunded: {
    label: "Refunded",
    icon: XCircle,
    className: "bg-muted text-muted-foreground border-border",
  },
};

function StatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {config.label}
    </span>
  );
}

function OrderCard({ order, index }: { order: Order; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(Number(order.createdAt) / 1_000_000).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      data-ocid={`my_orders.item.${index + 1}`}
      className="bg-card rounded-xl border border-border overflow-hidden"
    >
      {/* Order Header */}
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-muted-foreground">
              #{order.id.slice(0, 12)}…
            </span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">{date}</p>
          <p className="text-xs text-muted-foreground">
            {order.items.length} {order.items.length === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="text-right">
            <p className="font-display text-lg font-bold text-foreground">
              ₹
              {order.totalAmount.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
              })}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
          <button
            type="button"
            data-ocid={`my_orders.toggle.${index + 1}`}
            onClick={() => setExpanded((p) => !p)}
            aria-label={expanded ? "Collapse order" : "Expand order"}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Expandable Items */}
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-border"
        >
          <div className="px-5 py-4 space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={`${item.productId}-${idx}`}
                data-ocid={`my_orders.order_item.${index + 1}.${idx + 1}`}
                className="flex gap-3 items-center"
              >
                <div className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/assets/images/placeholder.svg";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.productName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Size: {item.selectedSize} · Color: {item.selectedColor} ·
                    Qty: {item.quantity}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${TIER_CONFIG[item.tier].badgeClass}`}
                  >
                    {TIER_CONFIG[item.tier].label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground flex-shrink-0">
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}

            <Separator />

            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-medium">
                Order Total
              </span>
              <span className="font-display font-bold text-foreground">
                ₹
                {order.totalAmount.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            {order.shippingAddress && (
              <div className="bg-muted/40 rounded-lg p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">
                  Delivering to
                </p>
                <p>{order.shippingAddress.fullName}</p>
                <p>
                  {order.shippingAddress.addressLine1}
                  {order.shippingAddress.addressLine2
                    ? `, ${order.shippingAddress.addressLine2}`
                    : ""}
                </p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} –{" "}
                  {order.shippingAddress.pinCode}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function MyOrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((k) => (
        <div key={k} className="bg-card rounded-xl border border-border p-5">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function MyOrders() {
  const { isAuthenticated, isLoading: authLoading, login } = useAuth();
  const { actor, isFetching: actorLoading } = useActor(createActor);

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["myOrders"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await (
          actor as unknown as { getMyOrders: () => Promise<Order[]> }
        ).getMyOrders();
      } catch {
        return [];
      }
    },
    enabled: !!actor && !actorLoading && isAuthenticated,
    refetchInterval: 30_000,
  });

  // Login gate
  if (!isAuthenticated && !authLoading) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
        data-ocid="my_orders.login_prompt"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Lock className="w-9 h-9 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Sign in to view orders
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Sign in with Internet Identity to view your order history and track
          deliveries.
        </p>
        <Button
          data-ocid="my_orders.login_button"
          size="lg"
          onClick={login}
          className="gap-2"
        >
          <Lock className="w-4 h-4" />
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="my_orders.page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            My Orders
          </h1>
          <p className="text-muted-foreground mt-1">
            {orders.length > 0
              ? `${orders.length} order${orders.length !== 1 ? "s" : ""} placed`
              : "Track your purchase history"}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Legend */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(
            [
              "pending",
              "confirmed",
              "processing",
              "shipped",
              "delivered",
            ] as OrderStatus[]
          ).map((status) => (
            <span
              key={status}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_CONFIG[status].className}`}
            >
              {STATUS_CONFIG[status].label}
            </span>
          ))}
        </div>

        {/* Content */}
        {isLoading || authLoading ? (
          <MyOrdersSkeleton />
        ) : orders.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="my_orders.empty_state"
          >
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
              <ShoppingBag className="w-9 h-9 text-muted-foreground" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mb-2">
              No orders yet
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xs">
              You haven't placed any orders yet. Start exploring our curated
              collections.
            </p>
            <Button asChild data-ocid="my_orders.shop_link" className="gap-2">
              <Link to="/shop">
                <ShoppingBag className="w-4 h-4" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4" data-ocid="my_orders.list">
            {orders.map((order, idx) => (
              <OrderCard key={order.id} order={order} index={idx} />
            ))}
          </div>
        )}

        {/* Badges info */}
        {orders.length > 0 && (
          <div className="mt-6 flex items-center gap-2 flex-wrap">
            <Badge variant="outline" className="text-xs">
              <Package className="w-3 h-3 mr-1" />
              Click on an order to expand details
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
