# AD Fashions — Premium Editorial Fashion E-commerce

## Tone & Differentiation
Premium editorial luxury — sophisticated tier-based product showcase with refined spacing, warm palette, and serif-driven hierarchy. Not minimalist, but intentional breathing room.

## Color Palette
| Token | OKLCH | Usage |
|-------|-------|-------|
| Primary (Navy) | 0.35 0.08 260 | Primary actions, tier headers, navigation |
| Secondary (Taupe) | 0.65 0.05 70 | Average tier, subtle accents |
| Accent (Gold) | 0.68 0.18 70 | Premium tier badge, hero CTA |
| Background (Cream) | 0.97 0.02 60 | Page background, breathing room |
| Foreground (Charcoal) | 0.25 0.03 260 | Body text, primary copy |
| Muted (Light Gray) | 0.88 0.03 70 | Basic tier, disabled states, dividers |
| Border (Soft) | 0.92 0.02 70 | Card boundaries, section dividers |

## Typography
| Layer | Font | Scale | Weight |
|-------|------|-------|--------|
| Display (Hero, Tier Headers) | Fraunces | 2.4rem / 1.875rem | 600–700 |
| Body (Product copy, CTAs) | General Sans | 1rem / 0.875rem | 400–600 |
| Mono (Order numbers, SKUs) | Geist Mono | 0.75rem | 400 |

## Structural Zones
| Zone | Background | Border | Purpose |
|------|-----------|--------|---------|
| Header / Nav | `bg-card` | `border-b border-border` | Logo, cart, tier filter |
| Hero | `bg-background` with gradient overlay | None | Brand message, primary CTA |
| Product Section (per tier) | `bg-background` | `tier-premium/average/basic` (bottom border) | Tier header + product grid |
| Product Card | `bg-card` | `border border-border` | Product image, name, price, "Add to Cart" |
| Footer | `bg-muted/20` | `border-t border-border` | Newsletter, social, about |

## Component Patterns
- Product card: `.card-elevated` (shadow + hover lift + scale)
- Tier badge: color-coded (gold for Premium, silver for Average, muted for Basic)
- CTA buttons: Primary navy with cream text; hover darkens navy
- Tier section headers: Serif display font, 2.4rem, with bottom border (matching tier color)
- Product grid: 3 columns (lg), 2 columns (md), 1 column (sm)

## Motion & Interaction
- `.transition-smooth` (0.3s cubic-bezier) on all interactive elements
- Card hover: `scale-105` + shadow lift (`shadow-md` → `shadow-lg`)
- Button hover: text shadow fade-in, subtle scale (1.02x)
- Page transitions: fade-in 200ms on mount

## Spacing & Rhythm
- Gap between tier sections: `3rem` (py-12)
- Product grid gap: `1.5rem` (gap-6)
- Card padding: `1.5rem` (p-6)
- Section padding: `2rem` (px-8 py-12)

## Signature Detail
Tier-specific bottom borders on section headers (gold / silver / neutral gradient effect) create instant visual hierarchy and distinguish product categories at a glance. Combined with serif typography, this establishes premium positioning.

## Constraints
- Max width: 1400px (container)
- No full-page gradients; subtle gradient overlays on hero only
- Shadows: soft, elevation-based (no glows or neon)
- Animation: under 300ms; no bounce or elastic easing
- Accessibility: WCAG AA+ contrast on all text

## Dark Mode
- Navy primary inverts to warm gold (0.75 0.12 70)
- Cream background → deep navy (0.12 0.02 260)
- Taupe secondary → soft gray (0.35 0.05 70)
- All interactive elements maintain 4.5:1+ contrast
