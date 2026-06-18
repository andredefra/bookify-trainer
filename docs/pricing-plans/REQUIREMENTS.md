# Pricing & Plans — Requirements

## Overview

The pricing page communicates the commercial model: clients always use the app for free;
**trainers** pay a tiered subscription; **gyms/studios** get dedicated facility plans; and
**AI** is an add-on for both clients and trainers. The strategy is "land cheap, expand":
a near-free Basic tier to remove friction, an aggressively-priced Essential tier to convert,
and a Pro tier for trainers running a real business.

## Plans

### Trainer tiers

| Plan | Price | Positioning |
|------|-------|-------------|
| **Basic** | €0 (free 6 months, then €1.99/mo) | Acquisition hook — get the trainer inside the product |
| **Essential** | €9/mo (€5/mo annual) | Conversion engine — unlocks programs, sessions, analytics, cash payments & installments |
| **Pro** | €29/mo (€24/mo annual) | Business tier — packages, services, digital payments, e-invoicing, advanced analytics, priority support; 1.5% transaction fee |

Each higher tier **includes everything** in the tier below ("Everything in Basic/Essential").

### Facility tiers (coming soon)

| Plan | Price | Positioning |
|------|-------|-------------|
| **Studio** | €89/mo | Boutique "super-PT": creates and assigns programs directly, dynamic PT assignment, unlimited trainers & clients |
| **Gym** | €119/mo | Intermediary facility: member subscriptions, commission on PT services, requests services from trainers |

See [`../gym/REQUIREMENTS.md`](../gym/REQUIREMENTS.md) and
[`../studio/TECHNICAL.md`](../studio/TECHNICAL.md) for the Studio↔Gym distinction.

### AI add-ons

- **Client AI** — AI workout coach, exercise demos, advanced insights.
- **Trainer AI** — business insights, chat assistant, client analytics, smart recommendations.

## Page behaviour

- A **monthly/annual toggle** switches displayed prices (annual is cheaper for Essential/Pro).
- Each plan card shows a short feature list, a primary CTA (e.g. "Start for Free", "Upgrade to
  Pro"), and a "Discover details" link opening a modal with the full, inheritance-aware
  feature breakdown.
- A persistent callout states the app is **always free for clients**.
- Studio/Gym cards are shown as **Coming Soon**.

## Localization

All copy is in `pricing.*` translation keys (EN/IT). Prices are values in those dictionaries,
so a price change is a translation change in both `en.ts` and `it.ts`.

## Source-of-truth note

The codebase is the authoritative source for prices/features. Older planning documents
(Drive: PRD, Strategic Analysis) list different names/prices (e.g. "Standard €5", a single
"Gym €59") and should be treated as historical — the live model is Basic €0→€1.99 /
Essential €9(€5) / Pro €29(€24) / Studio €89 / Gym €119.
