import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import type { OrderStatus } from "@/types/index";
import type { Order } from "@/types/index";
import { Eye, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SAMPLE_ORDERS: Order[] = [
  {
    id: "ORD-20240001",
    userId: "user-abc-1234",
    items: [
      {
        productId: "p1",
        productName: "Anya Embroidered Kurti",
        productImage: "/assets/generated/hero-fashion.jpg",
        quantity: 1,
        price: 285,
        selectedSize: "M",
        selectedColor: "Navy",
        tier: "premium",
      },
    ],
    totalAmount: 285,
    status: "pending",
    shippingAddress: {
      fullName: "Priya Sharma",
      addressLine1: "12 Rose Garden Lane",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400001",
      phone: "9876543210",
    },
    paymentStatus: "paid",
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: "ORD-20240002",
    userId: "user-def-5678",
    items: [
      {
        productId: "p2",
        productName: "Diya Cotton Kurti",
        productImage: "/assets/generated/hero-fashion.jpg",
        quantity: 2,
        price: 145,
        selectedSize: "L",
        selectedColor: "Teal",
        tier: "average",
      },
      {
        productId: "p3",
        productName: "Sia Basic Kurti",
        productImage: "/assets/generated/hero-fashion.jpg",
        quantity: 1,
        price: 89,
        selectedSize: "M",
        selectedColor: "Black",
        tier: "basic",
      },
    ],
    totalAmount: 379,
    status: "processing",
    shippingAddress: {
      fullName: "Anjali Patel",
      addressLine1: "45 Lotus Colony",
      city: "Ahmedabad",
      state: "Gujarat",
      pinCode: "380015",
      phone: "9988776655",
    },
    paymentStatus: "paid",
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: "ORD-20240003",
    userId: "user-ghi-9012",
    items: [
      {
        productId: "p1",
        productName: "Anya Embroidered Kurti",
        productImage: "/assets/generated/hero-fashion.jpg",
        quantity: 1,
        price: 285,
        selectedSize: "S",
        selectedColor: "Ivory",
        tier: "premium",
      },
    ],
    totalAmount: 285,
    status: "shipped",
    shippingAddress: {
      fullName: "Meena Reddy",
      addressLine1: "8 Jacaranda Street",
      city: "Hyderabad",
      state: "Telangana",
      pinCode: "500001",
      phone: "9123456789",
    },
    paymentStatus: "paid",
    trackingNumber: "TRK-78291034",
    createdAt: Date.now() - 86400000 * 8,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: "ORD-20240004",
    userId: "user-jkl-3456",
    items: [
      {
        productId: "p2",
        productName: "Diya Cotton Kurti",
        productImage: "/assets/generated/hero-fashion.jpg",
        quantity: 1,
        price: 145,
        selectedSize: "XL",
        selectedColor: "Coral",
        tier: "average",
      },
    ],
    totalAmount: 145,
    status: "delivered",
    shippingAddress: {
      fullName: "Sunita Joshi",
      addressLine1: "33 Neem Lane",
      city: "Jaipur",
      state: "Rajasthan",
      pinCode: "302001",
      phone: "9654321098",
    },
    paymentStatus: "paid",
    createdAt: Date.now() - 86400000 * 14,
    updatedAt: Date.now() - 86400000 * 4,
  },
  {
    id: "ORD-20240005",
    userId: "user-mno-7890",
    items: [
      {
        productId: "p3",
        productName: "Sia Basic Kurti",
        productImage: "/assets/generated/hero-fashion.jpg",
        quantity: 3,
        price: 89,
        selectedSize: "M",
        selectedColor: "Blue",
        tier: "basic",
      },
    ],
    totalAmount: 267,
    status: "cancelled",
    shippingAddress: {
      fullName: "Kavya Nair",
      addressLine1: "21 Palm Court",
      city: "Kochi",
      state: "Kerala",
      pinCode: "682001",
      phone: "9876012345",
    },
    paymentStatus: "refunded",
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 9,
  },
];

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> =
  {
    pending: {
      label: "Pending",
      className: "bg-muted text-muted-foreground border-muted-foreground/30",
    },
    confirmed: {
      label: "Confirmed",
      className: "bg-secondary/30 text-foreground border-secondary",
    },
    processing: {
      label: "Processing",
      className: "bg-accent/10 text-accent border-accent/30",
    },
    shipped: {
      label: "Shipped",
      className: "bg-primary/10 text-primary border-primary/30",
    },
    delivered: {
      label: "Delivered",
      className: "bg-secondary/20 text-foreground border-secondary/40",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-destructive/10 text-destructive border-destructive/30",
    },
    refunded: {
      label: "Refunded",
      className: "bg-muted text-muted-foreground border-muted-foreground/30",
    },
  };

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
  "refunded",
];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function AdminOrderTable() {
  const [orders, setOrders] = useState<Order[]>(SAMPLE_ORDERS);
  const [isLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [detailOrder, setDetailOrder] = useState<Order | null>(null);

  const filtered =
    statusFilter === "all"
      ? orders
      : orders.filter((o) => o.status === statusFilter);

  function handleStatusChange(orderId: string, newStatus: OrderStatus) {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: newStatus, updatedAt: Date.now() }
          : o,
      ),
    );
    toast.success(
      `Order ${orderId} updated to ${STATUS_CONFIG[newStatus].label}`,
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-3" data-ocid="admin.orders.loading_state">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-14 rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div data-ocid="admin.orders.section">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Orders
          </h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            {filtered.length} order{filtered.length !== 1 ? "s" : ""}
            {statusFilter !== "all"
              ? ` · ${STATUS_CONFIG[statusFilter].label}`
              : ""}
          </p>
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as OrderStatus | "all")}
        >
          <SelectTrigger
            className="w-44"
            data-ocid="admin.orders.status_filter.select"
          >
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {STATUS_CONFIG[s].label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 gap-4 bg-card rounded-2xl border border-border"
          data-ocid="admin.orders.empty_state"
        >
          <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          <p className="text-muted-foreground text-sm">
            No orders match the selected filter.
          </p>
          <Button
            variant="outline"
            onClick={() => setStatusFilter("all")}
            data-ocid="admin.orders.clear_filter_button"
          >
            Clear Filter
          </Button>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-subtle">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Order #</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="text-right w-44">Update Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order, idx) => (
                <TableRow
                  key={order.id}
                  data-ocid={`admin.orders.item.${idx + 1}`}
                >
                  <TableCell>
                    <span className="font-mono text-xs text-foreground font-medium">
                      {order.id}
                    </span>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-foreground truncate max-w-[120px]">
                      {order.shippingAddress.fullName}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono truncate max-w-[120px]">
                      {order.userId.slice(0, 12)}&hellip;
                    </p>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(order.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs font-semibold ${STATUS_CONFIG[order.status].className}`}
                    >
                      {STATUS_CONFIG[order.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold text-foreground">
                    ₹{order.totalAmount.toLocaleString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      value={order.status}
                      onValueChange={(v) =>
                        handleStatusChange(order.id, v as OrderStatus)
                      }
                    >
                      <SelectTrigger
                        className="h-8 text-xs w-36"
                        data-ocid={`admin.orders.status.select.${idx + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_STATUSES.map((s) => (
                          <SelectItem key={s} value={s} className="text-xs">
                            {STATUS_CONFIG[s].label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      onClick={() => setDetailOrder(order)}
                      aria-label={`View order ${order.id}`}
                      data-ocid={`admin.orders.view_button.${idx + 1}`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={detailOrder !== null}
        onOpenChange={(open) => !open && setDetailOrder(null)}
      >
        <DialogContent
          className="sm:max-w-md max-h-[90vh] overflow-y-auto"
          data-ocid="admin.orders.detail.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display text-lg">
              Order Details
            </DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-4 py-1 text-sm">
              <div className="grid grid-cols-2 gap-2 bg-muted/40 rounded-xl p-3">
                <div>
                  <p className="text-muted-foreground text-xs">Order #</p>
                  <p className="font-mono font-semibold text-foreground text-xs">
                    {detailOrder.id}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Date</p>
                  <p className="text-foreground text-xs">
                    {formatDate(detailOrder.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Status</p>
                  <Badge
                    variant="outline"
                    className={`text-xs mt-0.5 ${STATUS_CONFIG[detailOrder.status].className}`}
                  >
                    {STATUS_CONFIG[detailOrder.status].label}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs">Payment</p>
                  <p className="text-foreground text-xs capitalize">
                    {detailOrder.paymentStatus}
                  </p>
                </div>
                {detailOrder.trackingNumber && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground text-xs">Tracking</p>
                    <p className="font-mono text-xs text-foreground">
                      {detailOrder.trackingNumber}
                    </p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Shipping Address
                </p>
                <div className="bg-card border border-border rounded-xl p-3 text-xs text-foreground space-y-0.5">
                  <p className="font-semibold">
                    {detailOrder.shippingAddress.fullName}
                  </p>
                  <p>{detailOrder.shippingAddress.addressLine1}</p>
                  {detailOrder.shippingAddress.addressLine2 && (
                    <p>{detailOrder.shippingAddress.addressLine2}</p>
                  )}
                  <p>
                    {detailOrder.shippingAddress.city},{" "}
                    {detailOrder.shippingAddress.state} &mdash;{" "}
                    {detailOrder.shippingAddress.pinCode}
                  </p>
                  <p className="text-muted-foreground">
                    {detailOrder.shippingAddress.phone}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Items ({detailOrder.items.length})
                </p>
                <div className="space-y-2">
                  {detailOrder.items.map((item) => (
                    <div
                      key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                      className="flex items-center gap-3 bg-muted/30 rounded-lg p-2"
                    >
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-10 h-10 rounded-lg object-cover border border-border flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-xs truncate">
                          {item.productName}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {item.selectedSize} &middot; {item.selectedColor}{" "}
                          &middot; Qty {item.quantity}
                        </p>
                      </div>
                      <p className="font-mono text-xs font-semibold text-foreground flex-shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between font-semibold border-t border-border pt-3">
                <span>Total</span>
                <span className="font-mono text-primary text-base">
                  ₹{detailOrder.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDetailOrder(null)}
              data-ocid="admin.orders.detail.close_button"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
