# VALENCE

**Engineered for the Obsessed.** A direct-to-consumer gym apparel storefront built as a solo term project, Spring 2026.

Live: https://valence-genesis.vercel.app

## What it is

Valence is a brand concept and working storefront for high-information gym apparel. Every product graphic is the molecular structure of a compound with a real physiological effect — caffeine, L-citrulline, testosterone — and every product page reads like a supplement fact panel. The project covers brand positioning, visual identity, a six-month digital marketing plan, the storefront itself, and a pitch delivered with a live demo.

This is coursework. Valence is not an operating business and the store is not transactional.

## Stack

- React + TanStack Start (SSR)
- TypeScript
- Tailwind CSS
- Supabase
- Stripe (test mode)
- Google Analytics 4
- Deployed on Vercel

## Why not Shopify

Shopify was attempted first and rejected for three reasons:

1. **Design constraints.** The theme system limits layout control. The brand depends on precise typography, custom animation, and full component control — not achievable in the standard theme editor without expensive custom development.
2. **Workflow mismatch.** Shopify's drag-and-drop interface targets non-technical users. This build used a code-first workflow with terminal editing and commit-by-commit version control.
3. **Learning objective.** Part of the point was to learn Git, deployment pipelines, and AI-assisted development, which a no-code platform wouldn't teach.

Wix was rejected for insufficient design precision. Big Cartel was rejected for having no custom code support.

## Routes

`/` · `/shop` · `/about` · `/contact` · `/cart` · `/product/[slug]`

All six tested at 375px width. Unique page titles and meta descriptions on every route, descriptive alt text on all product images, clean semantic URLs.

## What works and what doesn't

| Feature | Status |
| --- | --- |
| Product catalog (4 items, $35–$90) | Working |
| Cart | Working — live item count, shipping calculated ($5.99 under $80, free over) |
| Checkout | Functional mock — Stripe integrated in test mode, not live keys |
| Email capture | Validates input and confirms; not connected to an email platform |
| GA4 | Installed across all routes |
| Product imagery | AI-generated concepts (Adobe Firefly), not photography |
| Mobile nav | Hamburger menu, closes on tap; cart icon always visible |
| Product share | Copy-link button on every product page |

## Design decisions

**Palette:** `#000000` background, `#F5F5F5` text for a high-contrast clinical feel. Accents `#9B5FFF` and `#0047FF` used sparingly on CTAs and hover states.

**Type:** Space Grotesk for display, Inter for body. Both via Google Fonts.

**Homepage:** full-viewport molecular hex field fading via gradient into product content. Numbered sections (001 Catalog / 002 Thesis / 003 Access).

## Technical challenges

**Vercel SSR deployment.** Standard Vite configuration failed because of TanStack Start's `dist/client` / `dist/server` build split. Resolved with a custom `vercel.json` specifying build output and server function settings.

**Version control from scratch.** Git was new at the start of this project. Several broken deployments were recovered by identifying the correct commit hash and reverting.

**Product imagery with no product.** A chained prompt workflow in Adobe Firefly specifying molecular structure, garment, print placement, and lighting, iterated per product for visual consistency.

## Provenance

This project was scaffolded from a TanStack Start template and built with AI assistance. The commit history reflects that directly and is not tidied.

- **Lovable** — initial frontend scaffolding and base component architecture.
- **Claude Code** — checkout flow, founder section, Vercel SSR configuration, social share buttons, Git and deployment debugging.
- **Claude** — strategic planning, documentation, and image prompt generation.
- **Adobe Firefly** — all product images and the hero background texture.

All prompts were written by me and all output was reviewed, tested, and modified before commit. What I claim here is the product and design decisions, the platform evaluation, the integration work, and the debugging — not authorship of the generated scaffold.

## If this went live

Activate Stripe in live mode and complete real checkout · commission print-ready vector artwork and real product photography · connect email capture to Klaviyo · launch social accounts · seed micro-influencers with samples.

---

Leo Doerler · Spring 2026
