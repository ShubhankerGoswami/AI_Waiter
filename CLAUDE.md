# AIWaiter — CLAUDE.md

## Project Overview

**AIWaiter** is a premium AI-powered restaurant SaaS platform landing page.
Domain: `aiwaiter.beingcogni.com`
Tagline: *"Turn Every Restaurant Table Into an AI-Powered Revenue Engine"*

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 (Vite) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Build Tool | Vite |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Sticky glass navbar with mobile menu
│   ├── Hero.jsx            # Hero section with animated dashboard mockup
│   ├── Trust.jsx           # Metrics + restaurant logo trust bar
│   ├── Problem.jsx         # 3-card pain point section
│   ├── Features.jsx        # 6 feature cards with mini UI previews
│   ├── Dashboard.jsx       # AI analytics dashboard showcase
│   ├── HowItWorks.jsx      # 3-step animated process
│   ├── WhatsApp.jsx        # WhatsApp campaign mockups
│   ├── Testimonials.jsx    # 3 restaurant owner testimonials
│   ├── Pricing.jsx         # 3-tier pricing cards
│   ├── CTA.jsx             # Final call-to-action section
│   └── Footer.jsx          # Full footer with links
├── App.jsx                 # Root component, section assembly
├── main.jsx                # Entry point
└── index.css               # Tailwind + global styles
```

---

## Design System

### Color Palette
- **Background**: `#030712` (near black)
- **Surface**: `rgba(255,255,255,0.05)` glass cards
- **Primary Accent**: Orange `#f97316` / `#fb923c`
- **Secondary Accent**: Purple `#a855f7`
- **Text Primary**: `#f9fafb`
- **Text Muted**: `#9ca3af`
- **Border**: `rgba(255,255,255,0.1)`

### Key Utilities
- `.glass` — frosted glass card effect
- `.glass-dark` — darker glass for navbar
- `.text-gradient` — orange gradient text
- `.text-gradient-cool` — blue-purple gradient text
- `.border-glow` — orange glowing border
- `.card-hover` — lift + shadow on hover

### Typography
- Font: Inter (system stack fallback)
- Headings: bold, tight letter-spacing
- Gradient text for key headline words

---

## Animation Strategy

All animations use **Framer Motion**:
- `viewport={{ once: true }}` — animate once on scroll entry
- `initial={{ opacity: 0, y: 30 }}` → `animate={{ opacity: 1, y: 0 }}`
- Staggered children with `staggerChildren: 0.1`
- Floating cards use `animate={{ y: [0, -10, 0] }}` infinite loops
- Navbar blur activates on scroll via `useEffect` + `window.scrollY`

---

## Commands

```bash
npm run dev       # Start dev server (localhost:5173)
npm run build     # Production build → dist/
npm run preview   # Preview production build
```

---

## Sections & Components

### 1. Navbar
- Sticky, blur/glass on scroll
- Mobile hamburger menu with slide animation
- CTA: "Login" (ghost) + "Book Demo" (orange button)

### 2. Hero
- Headline with gradient text
- Two CTAs: "Start Free Pilot" + "Watch Demo"
- Animated floating cards: orders, insights, analytics
- Glowing gradient orbs in background

### 3. Trust
- 4 metrics: 50K+ Orders, 120+ Restaurants, 32% Faster, 18% Repeat
- Grayscale logo row (placeholder restaurant brands)

### 4. Problem
- 3 cards: Slow Ordering, No Customer Return, No Insights
- Icon + description + subtle illustration

### 5. Features
- 6 feature cards with icons and mini UI snippets
- QR Ordering, AI Analytics, WhatsApp Engine, AI Menu, Voice AI, Growth Insights

### 6. Dashboard Showcase
- Full-width dark dashboard card
- Charts, metrics, AI insight pills
- Stats: revenue, orders, repeat rate

### 7. How It Works
- 3-step vertical/horizontal timeline
- Animated connector lines

### 8. WhatsApp Automation
- Phone mockup with realistic WA chat bubbles
- Campaign types: discounts, loyalty, winback

### 9. Testimonials
- 3 cards with avatar, name, restaurant, quote, metric badge

### 10. Pricing
- Starter / Growth (featured) / Enterprise
- Feature lists with checkmarks

### 11. Final CTA
- Gradient glowing background
- Two buttons: Book Demo, Start Free Pilot

### 12. Footer
- Logo + tagline
- 4 column link groups
- Social icons, legal links

---

## Development Notes

- **Tailwind v4** uses `@import "tailwindcss"` instead of the old `@tailwind` directives
- **Vite plugin** (`@tailwindcss/vite`) replaces the PostCSS approach
- All components use named exports and are imported in `App.jsx`
- Mobile-first responsive design with `md:` and `lg:` breakpoints
- Framer Motion `LazyMotion` not used — full bundle for animation richness

---

## Brand Voice

- Confident, modern, startup-grade
- Problem-first → solution-forward
- Data-driven language ("18% increase", "412 orders")
- Target: Restaurant owners, investors, enterprise buyers
