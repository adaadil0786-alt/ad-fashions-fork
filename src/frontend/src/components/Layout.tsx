import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./Navbar";

export function Layout() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(
    typeof window !== "undefined" ? window.location.hostname : "",
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer
        className="bg-card border-t border-border mt-auto"
        data-ocid="footer"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <p className="font-display font-bold text-xl text-primary mb-2">
                AD{" "}
                <span className="text-accent italic font-light">Fashions</span>
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Curated ladies' fashion — from everyday essentials to premium
                occasion wear. Crafted for the modern Indian woman.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                Shop
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/shop?tier=premium"
                    className="hover:text-foreground transition-colors"
                  >
                    Premium Collection
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?tier=average"
                    className="hover:text-foreground transition-colors"
                  >
                    Average Collection
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?tier=basic"
                    className="hover:text-foreground transition-colors"
                  >
                    Basic Essentials
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="hover:text-foreground transition-colors"
                  >
                    All Products
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                Categories
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="/shop?category=kurti"
                    className="hover:text-foreground transition-colors"
                  >
                    Kurtis
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?category=pants"
                    className="hover:text-foreground transition-colors"
                  >
                    Pants & Palazzos
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?category=dress"
                    className="hover:text-foreground transition-colors"
                  >
                    Dresses
                  </a>
                </li>
                <li>
                  <a
                    href="/shop?category=set"
                    className="hover:text-foreground transition-colors"
                  >
                    Kurti Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                About
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <span className="text-muted-foreground">Our Story</span>
                </li>
                <li>
                  <span className="text-muted-foreground">Size Guide</span>
                </li>
                <li>
                  <span className="text-muted-foreground">
                    Shipping & Returns
                  </span>
                </li>
                <li>
                  <a
                    href="/my-orders"
                    className="hover:text-foreground transition-colors"
                  >
                    Track Orders
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground">
              © {year} AD Fashions. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
