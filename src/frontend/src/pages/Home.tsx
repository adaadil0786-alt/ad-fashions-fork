import { TierSection } from "@/components/TierSection";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SAMPLE_PRODUCTS } from "@/lib/sampleData";
import { TIER_CONFIG } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ShoppingBag, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const TIER_ORDER = ["premium", "average", "basic"] as const;
const FEATURES = [
  { icon: "✦", label: "Free Shipping", sub: "On orders above ₹1,500" },
  { icon: "↩", label: "Easy Returns", sub: "15-day hassle-free returns" },
  {
    icon: "◈",
    label: "Authentic Fabrics",
    sub: "Curated from trusted weavers",
  },
  { icon: "★", label: "Exclusive Designs", sub: "New arrivals every week" },
];

export function Home() {
  const premiumProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.tier === "premium",
  ).slice(0, 6);
  const averageProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.tier === "average",
  ).slice(0, 6);
  const basicProducts = SAMPLE_PRODUCTS.filter((p) => p.tier === "basic").slice(
    0,
    6,
  );

  return (
    <div data-ocid="home.page">
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center overflow-hidden bg-muted/20"
        data-ocid="home.hero_section"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/generated/hero-fashion.dim_1400x900.jpg"
            alt="AD Fashions hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.3em] uppercase text-accent mb-4"
            >
              ✦ New Collection 2026
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-display text-6xl sm:text-7xl font-bold text-foreground leading-[1.05] mb-4"
            >
              AD <span className="italic font-light text-accent">Fashions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="font-display text-xl sm:text-2xl font-light text-muted-foreground mb-2 italic"
            >
              Elegance Redefined
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="text-base text-muted-foreground leading-relaxed mb-8 max-w-sm"
            >
              Discover our curated collection of contemporary Indian wear —
              kurtis, palazzo sets, and more, crafted for the modern woman.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link to="/shop" data-ocid="home.hero_shop_button">
                <Button
                  size="lg"
                  className="gap-2 px-8 font-medium tracking-wide shadow-md"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Shop Now
                </Button>
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() =>
                  document
                    .getElementById("tiers-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                data-ocid="home.explore_tiers_button"
              >
                Explore Tiers
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground/60 animate-bounce">
          <div className="w-px h-8 bg-border" />
          <ArrowDown className="h-3 w-3" />
        </div>
      </section>

      {/* ── FEATURES BAR ─────────────────────────────────────── */}
      <section
        className="bg-card border-y border-border py-6"
        data-ocid="home.features_bar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="text-accent text-lg leading-none mt-0.5">
                  {f.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {f.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIERS INTRO ──────────────────────────────────────── */}
      <section
        id="tiers-section"
        className="bg-background py-16"
        data-ocid="home.tiers_intro_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-accent font-medium mb-3"
          >
            <Sparkles className="inline h-3 w-3 mr-1" />
            Our Curated Tiers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4"
          >
            Something for Every Style
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            From exquisite designer pieces to everyday essentials — each tier is
            curated with care so you always find exactly what you need.
          </motion.p>

          {/* Tier summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 mb-2">
            {TIER_ORDER.map((tier, i) => {
              const cfg = TIER_CONFIG[tier];
              return (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to="/shop" search={{ tier }}>
                    <div
                      className={`group rounded-xl border border-border bg-card p-5 text-left hover:shadow-md transition-smooth ${cfg.accentClass}`}
                      data-ocid={`home.tier_card.${tier}`}
                    >
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        Tier {i + 1}
                      </p>
                      <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {cfg.label}{" "}
                        <span className="italic font-light text-muted-foreground">
                          {cfg.subtitle}
                        </span>
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {cfg.description}
                      </p>
                      <p className="text-xs text-accent font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all">
                        Browse Collection →
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TIER SECTIONS ────────────────────────────────────── */}
      <TierSection
        tier="premium"
        products={premiumProducts}
        tierIndex={1}
        variant="strip"
      />
      <TierSection
        tier="average"
        products={averageProducts}
        tierIndex={2}
        variant="strip"
      />
      <TierSection
        tier="basic"
        products={basicProducts}
        tierIndex={3}
        variant="strip"
      />

      {/* ── BRAND STORY ──────────────────────────────────────── */}
      <section
        className="bg-card border-t border-border py-16"
        data-ocid="home.brand_section"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                Our Story
              </p>
              <h2 className="font-display text-4xl font-bold text-foreground mb-4 leading-tight">
                Crafted for the Modern Indian Woman
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AD Fashions began with a simple belief — every woman deserves
                beautiful, well-made clothing at a price she loves. From our
                curated premium silk kurtis to our everyday cotton essentials,
                each piece reflects our commitment to quality and design.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We work directly with artisans and weavers across India to bring
                you authentic fabrics and handcrafted details you won't find
                anywhere else.
              </p>
              <Link to="/shop" data-ocid="home.brand_shop_button">
                <Button variant="outline" size="lg" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Explore Full Collection
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/assets/generated/hero-fashion.dim_1400x900.jpg"
                alt="AD Fashions craftsmanship"
                className="w-full rounded-2xl object-cover aspect-[4/3] shadow-md"
              />
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl px-5 py-3 shadow-md">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Since
                </p>
                <p className="font-display text-2xl font-bold text-primary">
                  2020
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SHOP CTA ─────────────────────────────────────────── */}
      <section
        className="bg-primary py-16 text-center"
        data-ocid="home.cta_section"
      >
        <div className="max-w-2xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground mb-4"
          >
            Ready to Elevate Your Wardrobe?
          </motion.h2>
          <p className="text-primary-foreground/70 mb-8 text-lg">
            Shop over 100 handpicked styles — kurtis, palazzo sets, tops, and
            more.
          </p>
          <Link to="/shop" data-ocid="home.bottom_cta_button">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 font-medium tracking-wide shadow-lg"
            >
              Shop the Collection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
