import { AdminInventory } from "@/components/AdminInventory";
import { AdminOrderTable } from "@/components/AdminOrderTable";
import { AdminProductForm } from "@/components/AdminProductForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  LogIn,
  Package,
  ShieldAlert,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

type AdminTab = "products" | "orders" | "inventory";

export function Admin() {
  const { isAuthenticated, isLoading, shortPrincipal, login } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>("products");

  // While auth initializes
  if (isLoading) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-12 space-y-4"
        data-ocid="admin.loading_state"
      >
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-6 w-80" />
        <div className="grid grid-cols-3 gap-4 mt-8">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4"
        data-ocid="admin.error_state"
      >
        <div className="bg-card border border-border rounded-2xl p-10 max-w-md w-full text-center shadow-subtle">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
            <ShieldAlert className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">
            Admin Access Required
          </h1>
          <p className="text-muted-foreground text-sm mb-6">
            You must be signed in with an admin account to access this
            dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={login}
              className="w-full gap-2"
              data-ocid="admin.login_button"
            >
              <LogIn className="w-4 h-4" />
              Sign In with Internet Identity
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate({ to: "/" })}
              data-ocid="admin.go_home_button"
            >
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    {
      id: "products",
      label: "Products",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "orders",
      label: "Orders",
      icon: <ShoppingBag className="w-4 h-4" />,
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background" data-ocid="admin.page">
      {/* Admin header banner */}
      <div className="bg-primary text-primary-foreground py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-primary-foreground/70 text-sm mt-0.5">
              AD Fashions &mdash; Product &amp; Order Management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 font-mono text-xs"
            >
              {shortPrincipal}
            </Badge>
            <Badge className="bg-accent text-accent-foreground text-xs font-semibold uppercase tracking-wide">
              Admin
            </Badge>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-card border-b border-border shadow-subtle sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 -mb-px" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                data-ocid={`admin.${tab.id}.tab`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "products" && <AdminProductForm />}
        {activeTab === "orders" && <AdminOrderTable />}
        {activeTab === "inventory" && <AdminInventory />}
      </div>
    </div>
  );
}
