import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { Link, useRouterState } from "@tanstack/react-router";
import { Loader2, LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "My Orders", to: "/my-orders" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isLoading, shortPrincipal, login, logout } =
    useAuth();
  const { itemCount } = useCart();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (to: string) =>
    to === "/" ? currentPath === "/" : currentPath.startsWith(to);

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border shadow-sm"
      data-ocid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            data-ocid="navbar.logo_link"
          >
            <span className="font-display font-bold text-xl tracking-wide text-primary leading-none">
              AD <span className="text-accent italic font-light">Fashions</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={[
                  "px-4 py-2 text-sm font-medium rounded-md transition-smooth",
                  isActive(link.to)
                    ? "text-primary bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                ].join(" ")}
                data-ocid={`navbar.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              aria-label="Shopping cart"
              data-ocid="navbar.cart_link"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-accent text-accent-foreground rounded-full"
                  data-ocid="navbar.cart_badge"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </Badge>
              )}
            </Link>

            {/* Auth */}
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            ) : isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md">
                  {shortPrincipal}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="gap-1.5"
                  data-ocid="navbar.logout_button"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={login}
                className="hidden md:flex gap-1.5"
                data-ocid="navbar.login_button"
              >
                <User className="h-3.5 w-3.5" />
                Sign in
              </Button>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-smooth"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              data-ocid="navbar.mobile_menu_toggle"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2 space-y-1"
          data-ocid="navbar.mobile_menu"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={[
                "block px-3 py-2 rounded-md text-sm font-medium transition-smooth",
                isActive(link.to)
                  ? "text-primary bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
              ].join(" ")}
              data-ocid={`navbar.mobile_${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-border mt-2">
            {isAuthenticated ? (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground font-mono px-3">
                  {shortPrincipal}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="w-full justify-start gap-2"
                  data-ocid="navbar.mobile_logout_button"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  login();
                  setMobileOpen(false);
                }}
                className="w-full gap-2"
                data-ocid="navbar.mobile_login_button"
              >
                <User className="h-4 w-4" />
                Sign in with Internet Identity
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
