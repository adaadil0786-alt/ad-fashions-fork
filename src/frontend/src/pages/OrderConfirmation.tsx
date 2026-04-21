import { createActor } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { TIER_CONFIG } from "@/types";
import type { Order } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { motion } from "motion/react";

function OrderConfirmationSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <Skeleton className="h-16 w-16 rounded-full mx-auto" />
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-4 w-48 mx-auto" />
      <div className="space-y-3 mt-8">
        {[1, 2, 3].map((k) => (
          <Skeleton key={k} className="h-20 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}

function StepIndicator({
  icon: Icon,
  label,
  active,
}: { icon: React.ElementType; label: string; active?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-1.5 ${active ? "text-primary" : "text-muted-foreground"}`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${active ? "border-primary bg-primary/10" : "border-muted-foreground/30 bg-muted"}`}
      >
        <Icon className="w-4 h-4" />
      </div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
}

export function OrderConfirmation() {
  const { orderId } = useParams({ from: "/order-confirmation/$orderId" });
  const { isAuthenticated } = useAuth();
  const { actor, isFetching: actorLoading } = useActor(createActor);

  const { data: order, isLoading } = useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!actor || !orderId) return null;
      try {
        return await (
          actor as unknown as {
            getOrder: (id: string) => Promise<Order | null>;
          }
        ).getOrder(orderId);
      } catch {
        return null;
      }
    },
    enabled: !!actor && !actorLoading && isAuthenticated && !!orderId,
  });

  const estimatedDays = 5;
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + estimatedDays);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  if (isLoading || actorLoading) {
    return <OrderConfirmationSkeleton />;
  }

  // Render confirmation even without backend data — use orderId from URL
  const displayOrderId = orderId ?? "—";
  const items = order?.items ?? [];
  const total = order?.totalAmount ?? 0;
  const shipping = order?.shippingAddress;

  return (
    <div
      className="bg-background min-h-screen"
      data-ocid="order_confirmation.page"
    >
      {/* Success Header */}
      <div className="bg-card border-b border-border">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 border-4 border-accent/30 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10 text-accent" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground text-base max-w-sm mx-auto">
            Thank you for shopping with AD Fashions. Your order has been placed
            and is being prepared with care.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 bg-muted/60 rounded-full px-5 py-2">
            <span className="text-sm text-muted-foreground">Order ID:</span>
            <span className="font-mono text-sm font-bold text-foreground">
              {displayOrderId}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Delivery Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-xl border border-border p-6"
          data-ocid="order_confirmation.delivery_section"
        >
          <h2 className="font-display text-lg font-bold text-foreground mb-5 text-center">
            Estimated Delivery
          </h2>

          <div className="flex items-center justify-between mb-4">
            <StepIndicator icon={CheckCircle2} label="Order Placed" active />
            <div className="flex-1 h-0.5 bg-primary/30 mx-2" />
            <StepIndicator icon={Package} label="Processing" />
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            <StepIndicator icon={Truck} label="Shipped" />
            <div className="flex-1 h-0.5 bg-muted mx-2" />
            <StepIndicator icon={MapPin} label="Delivered" />
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Expected by{" "}
            <span className="font-semibold text-foreground">
              {formattedDelivery}
            </span>{" "}
            (within {estimatedDays} business days)
          </p>
        </motion.div>

        {/* Ordered Items */}
        {items.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-card rounded-xl border border-border p-6"
            data-ocid="order_confirmation.items_section"
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-4">
              Items Ordered
            </h2>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={`${item.productId}-${idx}`}
                  data-ocid={`order_confirmation.item.${idx + 1}`}
                  className="flex gap-3 items-center"
                >
                  <div className="w-14 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
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
                    <p className="font-medium text-foreground text-sm truncate">
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
                  <p className="font-display font-bold text-foreground text-sm flex-shrink-0">
                    ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            {total > 0 && (
              <>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                  <span className="font-display font-bold text-foreground">
                    Total Paid
                  </span>
                  <p className="font-display text-xl font-bold text-foreground">
                    ₹
                    {total.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Shipping Address */}
        {shipping && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-xl border border-border p-6"
            data-ocid="order_confirmation.address_section"
          >
            <h2 className="font-display text-lg font-bold text-foreground mb-3">
              Delivering To
            </h2>
            <div className="text-sm text-muted-foreground space-y-0.5">
              <p className="text-foreground font-medium">{shipping.fullName}</p>
              <p>{shipping.addressLine1}</p>
              {shipping.addressLine2 && <p>{shipping.addressLine2}</p>}
              <p>
                {shipping.city}, {shipping.state} – {shipping.pinCode}
              </p>
              <p>{shipping.phone}</p>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
          data-ocid="order_confirmation.actions"
        >
          <Button
            asChild
            variant="outline"
            data-ocid="order_confirmation.my_orders_link"
            className="gap-2"
          >
            <Link to="/my-orders">
              <Package className="w-4 h-4" />
              View My Orders
            </Link>
          </Button>
          <Button
            asChild
            data-ocid="order_confirmation.continue_shopping_link"
            className="gap-2"
          >
            <Link to="/shop">
              <ShoppingBag className="w-4 h-4" />
              Continue Shopping
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
