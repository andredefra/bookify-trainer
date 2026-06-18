# Pricing & Plans — Technical Reference

## Overview

The pricing surface is the public marketing section that sells the trainer tiers
(**Basic / Essential / Pro**), the **Studio** and **Gym** facility tiers, and two **AI
add-ons** (client + trainer). Prices and feature copy are driven by i18n keys; the structure
is in code. The same plan list also backs the in-dashboard membership/settings area.

> Plan **enforcement** at runtime (which tabs a trainer sees) lives in the trainer dashboard,
> not here — see [`../trainer-dashboard/TECHNICAL.md`](../trainer-dashboard/TECHNICAL.md).
> Subscription **state** (Stripe) lives in [`../billing/TECHNICAL.md`](../billing/TECHNICAL.md).

## Files

| File | Purpose |
|------|---------|
| `src/components/PricingSection.tsx` | Composes the whole pricing area |
| `src/components/pricing/PricingHeader.tsx` | Title/subtitle, "always free for clients" callout, monthly/annual toggle |
| `src/components/pricing/PlanCard.tsx` | A single plan card (price, features, CTA, badges, details dialog) |
| `src/components/pricing/PlanDetailsDialog.tsx` | "Discover details" modal — detailed feature list per tier |
| `src/components/pricing/FeatureItem.tsx` | One feature row (name + description; highlighted if inherited) |
| `src/components/pricing/PlanNote.tsx` | Contextual upgrade note at the bottom of a details dialog |
| `src/components/pricing/AIPricingSection.tsx` | The two AI add-on cards (client / trainer) |
| `src/components/pricing/AIFeatureDialog.tsx` | AI add-on details modal |
| `src/components/pricing/PricingFooter.tsx` | Disclaimer lines |
| `src/components/pricing/types.ts` | `PlanDetailsDialogProps`, `FeatureDetail` |
| `src/components/pricing/utils/planFeatures.ts` | `getFeatureDetails(plan, t)` — the per-tier detailed feature list |
| `src/components/trainer/dashboard/tabs/settings/membership/plansData.ts` | `plans[]` (id, name, price, icon) reused for icons and the in-dashboard membership view |
| `src/components/GymSection.tsx` | Gym/studio marketing block (rendered within the pricing area) |
| `src/translations/{en,it}.ts` | `pricing.*` keys (titles, prices, feature labels, detailed features) |

## Composition (`PricingSection.tsx`)

1. **`PricingHeader`** — with a monthly/annual toggle (`annual` state).
2. **Trainer plans** — 3-column grid of `PlanCard`: Basic, Essential (popular at annual),
   Pro (`isPopular`).
3. **`AIPricingSection`** — client AI add-on (amber) + trainer AI add-on (violet).
4. **`GymSection`** — gym/studio marketing.
5. **Studio & Gym plans** — 2-column grid (`comingSoon`): Studio €89, Gym €119.
6. **`PricingFooter`** — disclaimers.

## Plan data & prices

From `plansData.ts` + `pricing.*` translation values:

| Plan | `planType`/id | Monthly | Annual | Notes |
|------|---------------|---------|--------|-------|
| Basic | `basic` / `standard` | **€0** | — | Free for 6 months, then €1.99/mo; launch offer (`isLaunchOffer`) |
| Essential | `essential` / `freemium` | **€9** | **€5** | Annual ~44% off; the conversion tier |
| Pro | `pro` | **€29** | **€24** | `isPopular`; 1.5% transaction fee |
| Studio | `gym` (id) | **€89** | €89 | `comingSoon`; boutique super-PT |
| Gym | `gymPlan` | **€119** | €119 | `comingSoon`; intermediary facility |

> Naming caveat: the **id** `standard` maps to the **displayed** name "Basic"; id `freemium`
> → "Essential"; id `gym` → "Studio". The `pricing.gym.*` keys describe **Studio**, and
> `pricing.gymPlan.*` describe **Gym**. Mind this when editing translations.

## Feature model

`PlanCard` shows a short feature list (from `pricing.features.*`); `PlanDetailsDialog` shows
the full list from `getFeatureDetails(plan, t)` (`utils/planFeatures.ts`), which encodes the
**inheritance chain**:

- **Basic** (8): Sales/CRM, Personal Trainer Page, Client Management, Messaging, Basic
  Calendar, Reviews, Basic Analytics, Google Calendar.
- **Essential** = *Everything in Basic* + Sessions, Waitlist, Custom Programs, Session
  Analytics, Programs Analytics, Exercise List, Exercise Management, Cash Payments, Payment
  Installments.
- **Pro** = *Everything in Essential* + Package Management, Additional Services, Digital &
  Cash Payments, Pay-in-3 Installments, Electronic Invoicing, Transaction Management, Business
  Dashboard, Advanced Analytics, Priority Support.

Inherited features are flagged `isInheritedFeature` and rendered highlighted by `FeatureItem`.
Detailed copy lives under `pricing.detailedFeatures.{basic|essential|pro}.<feature>.{name,description}`
plus `pricing.detailedFeatures.everythingIn{Basic,Essential}.*`.

The Studio/Gym facility feature lists are built inline in `PricingSection.tsx`
(`studioFeatures`, `gymFeatures`) from `pricing.features.*` keys (unlimited trainers,
unlimited clients, member subscription management, commission on PT services, etc.).

## AI add-ons

`AIPricingSection` renders two cards opening `AIFeatureDialog`:
- **Client AI** (amber): AI Workout Coach, Exercise Demos, Advanced Insights.
- **Trainer AI** (violet): Business Insights, Chat Assistant, Client Analytics, Smart
  Recommendations.

Runtime gating of these features is `useAIAccess` — see [`../ai/TECHNICAL.md`](../ai/TECHNICAL.md).

## Gotchas

- **id vs display name mismatch** (`standard`→Basic, `freemium`→Essential, `gym`→Studio).
- **Annual €5 ≠ a separate plan** — it's Essential's annual price; older docs that list a
  "€5 Standard" plan are stale (see the GAPS/strategy notes).
- Pricing copy is **only as correct as the translations** — both `en.ts` and `it.ts` must be
  updated together (see [`../i18n/TECHNICAL.md`](../i18n/TECHNICAL.md)).
- Studio/Gym are flagged `comingSoon` in the UI.
