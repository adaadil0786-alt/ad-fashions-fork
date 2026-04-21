import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { type OrderItem, type ShippingAddress, TIER_CONFIG } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CreditCard, Lock, ShoppingBag, User } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const GST_RATE = 0.18;

type FormField = keyof Omit<ShippingAddress, "addressLine2">;

const FIELD_CONFIG: {
  name: FormField | "addressLine2";
  label: string;
  placeholder: string;
  type?: string;
}[] = [
  { name: "fullName", label: "Full Name", placeholder: "Priya Sharma" },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "+91 98765 43210",
    type: "tel",
  },
  {
    name: "addressLine1",
    label: "Address Line 1",
    placeholder: "House/Flat No., Street Name",
  },
  {
    name: "addressLine2",
    label: "Address Line 2 (optional)",
    placeholder: "Area, Landmark",
  },
  { name: "city", label: "City", placeholder: "Mumbai" },
  { name: "state", label: "State", placeholder: "Maharashtra" },
  { name: "pinCode", label: "PIN Code", placeholder: "400001", type: "text" },
];

const emptyAddress = (): ShippingAddress & { addressLine2: string } => ({
  fullName: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pinCode: "",
});

function OrderSummaryPanel() {
  const { items, itemCount, totalAmount } = useCart();
  const gst = totalAmount * GST_RATE;
  const grand = totalAmount + gst;

  return (
    <div
      className="bg-card rounded-xl border border-border p-6"
      data-ocid="checkout.order_summary"
    >
      <h2 className="font-display text-lg font-bold text-foreground mb-4">
        Order Summary
      </h2>

      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto pr-1">
        {items.map((item, idx) => (
          <div
            key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
            data-ocid={`checkout.item.${idx + 1}`}
            className="flex gap-3 items-center"
          >
            <div className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/assets/images/placeholder.svg";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {item.product.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.selectedSize} · {item.selectedColor} · Qty {item.quantity}
              </p>
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase tracking-wider ${TIER_CONFIG[item.product.tier].badgeClass}`}
              >
                {TIER_CONFIG[item.product.tier].label}
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground flex-shrink-0">
              ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <Separator className="mb-4" />

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} items)
          </span>
          <span className="font-medium">
            ₹{totalAmount.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">GST (18%)</span>
          <span className="font-medium">
            ₹{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            Free
          </span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between items-center">
        <span className="font-display font-bold text-foreground">Total</span>
        <div className="text-right">
          <p className="font-display text-xl font-bold text-foreground">
            ₹{grand.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-muted-foreground">incl. all taxes</p>
        </div>
      </div>
    </div>
  );
}

export function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();

  const { actor } = useActor(createActor);

  const [shipping, setShipping] = useState(emptyAddress());
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const gst = totalAmount * GST_RATE;
  const grandTotal = totalAmount + gst;

  const placeOrderMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");

      const shippingAddress: ShippingAddress = {
        fullName: shipping.fullName,
        addressLine1: shipping.addressLine1,
        addressLine2: shipping.addressLine2 || undefined,
        city: shipping.city,
        state: shipping.state,
        pinCode: shipping.pinCode,
        phone: shipping.phone,
      };

      const orderItems: OrderItem[] = items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        productImage: i.product.imageUrl,
        quantity: i.quantity,
        price: i.product.price,
        selectedSize: i.selectedSize,
        selectedColor: i.selectedColor,
        tier: i.product.tier,
      }));

      // Create order in backend
      const orderId = await (
        actor as unknown as {
          createOrder: (
            items: OrderItem[],
            address: ShippingAddress,
            total: number,
          ) => Promise<string>;
        }
      ).createOrder(orderItems, shippingAddress, grandTotal);

      // Create Stripe checkout session
      const stripeItems = items.map((i) => ({
        currency: "inr",
        productName: i.product.name,
        productDescription: `${TIER_CONFIG[i.product.tier].label} · Size: ${i.selectedSize} · Color: ${i.selectedColor}`,
        priceInCents: Math.round(i.product.price * 100),
        quantity: BigInt(i.quantity),
      }));

      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      const successUrl = `${baseUrl}/order-confirmation/${orderId}`;
      const cancelUrl = `${baseUrl}/checkout`;

      const result = await (
        actor as unknown as {
          createCheckoutSession: (
            items: typeof stripeItems,
            successUrl: string,
            cancelUrl: string,
          ) => Promise<string>;
        }
      ).createCheckoutSession(stripeItems, successUrl, cancelUrl);

      const session = JSON.parse(result) as { id?: string; url?: string };
      if (!session?.url) throw new Error("Stripe session missing url");

      clearCart();
      return session.url;
    },
    onSuccess: (url: string) => {
      window.location.href = url;
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to place order. Please try again.");
    },
  });

  function validate() {
    const newErrors: Partial<Record<string, string>> = {};
    if (!shipping.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!shipping.phone.trim()) newErrors.phone = "Phone number is required";
    if (!shipping.addressLine1.trim())
      newErrors.addressLine1 = "Address is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.state.trim()) newErrors.state = "State is required";
    if (!shipping.pinCode.trim()) newErrors.pinCode = "PIN code is required";
    else if (!/^\d{6}$/.test(shipping.pinCode))
      newErrors.pinCode = "Enter a valid 6-digit PIN code";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    placeOrderMutation.mutate();
  }

  // Empty cart guard
  if (items.length === 0) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
        data-ocid="checkout.empty_state"
      >
        <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-muted-foreground mb-6">
          Add items to your cart before checking out.
        </p>
        <Button asChild data-ocid="checkout.shop_link">
          <Link to="/shop">Browse Collections</Link>
        </Button>
      </div>
    );
  }

  // Login gate
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center"
        data-ocid="checkout.login_prompt"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <User className="w-9 h-9 text-primary" />
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          Sign in to continue
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Please sign in with Internet Identity to complete your purchase and
          track your orders.
        </p>
        <Button
          data-ocid="checkout.login_button"
          size="lg"
          onClick={login}
          disabled={authLoading}
          className="gap-2"
        >
          <Lock className="w-4 h-4" />
          Sign In with Internet Identity
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen" data-ocid="checkout.page">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Checkout
          </h1>
          <p className="text-muted-foreground mt-1">
            Complete your order securely
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="lg:grid lg:grid-cols-3 lg:gap-10">
            {/* Left: Shipping + Payment */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl border border-border p-6"
                data-ocid="checkout.shipping_section"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FIELD_CONFIG.map(({ name, label, placeholder, type }) => (
                    <div
                      key={name}
                      className={
                        name === "addressLine1" || name === "addressLine2"
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <Label
                        htmlFor={`shipping-${name}`}
                        className="text-sm font-medium text-foreground mb-1.5 block"
                      >
                        {label}
                      </Label>
                      <Input
                        id={`shipping-${name}`}
                        data-ocid={`checkout.${name}_input`}
                        type={type ?? "text"}
                        placeholder={placeholder}
                        value={shipping[name as keyof typeof shipping]}
                        onChange={(e) => {
                          setShipping((p) => ({
                            ...p,
                            [name]: e.target.value,
                          }));
                          if (errors[name])
                            setErrors((p) => ({ ...p, [name]: undefined }));
                        }}
                        onBlur={() => validate()}
                        className={errors[name] ? "border-destructive" : ""}
                      />
                      {errors[name] && (
                        <p
                          className="text-xs text-destructive mt-1"
                          data-ocid={`checkout.${name}_field_error`}
                        >
                          {errors[name]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2.5">
                  <Checkbox
                    id="billing-same"
                    data-ocid="checkout.billing_same_checkbox"
                    checked={billingSameAsShipping}
                    onCheckedChange={(v) => setBillingSameAsShipping(!!v)}
                  />
                  <Label
                    htmlFor="billing-same"
                    className="text-sm text-foreground cursor-pointer"
                  >
                    Billing address same as shipping address
                  </Label>
                </div>
              </motion.div>

              {/* Payment Info */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-xl border border-border p-6"
                data-ocid="checkout.payment_section"
              >
                <h2 className="font-display text-xl font-bold text-foreground mb-3">
                  Payment
                </h2>
                <div className="flex items-start gap-4 bg-muted/40 rounded-lg p-4 border border-border">
                  <CreditCard className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Secure payment via Stripe
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You'll be redirected to Stripe's secure payment page to
                      complete your purchase. We accept all major cards — Visa,
                      Mastercard, and more.
                    </p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {["VISA", "MC", "AMEX", "RUPAY"].map((card) => (
                        <span
                          key={card}
                          className="px-2 py-1 bg-card border border-border rounded text-xs font-semibold text-muted-foreground tracking-wider"
                        >
                          {card}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Place Order */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <Link
                  to="/cart"
                  data-ocid="checkout.back_to_cart_link"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to Cart
                </Link>
                <Button
                  type="submit"
                  data-ocid="checkout.place_order_button"
                  size="lg"
                  disabled={placeOrderMutation.isPending}
                  className="gap-2 font-semibold sm:min-w-[240px]"
                >
                  {placeOrderMutation.isPending ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Processing…
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Place Order & Pay
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>

              {placeOrderMutation.isError && (
                <p
                  className="text-sm text-destructive"
                  data-ocid="checkout.error_state"
                >
                  {(placeOrderMutation.error as Error).message}
                </p>
              )}
            </div>

            {/* Right: Order Summary */}
            <div className="mt-8 lg:mt-0">
              <div className="sticky top-24">
                <OrderSummaryPanel />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
