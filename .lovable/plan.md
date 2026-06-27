
## Goal
Create a single, detailed Markdown reference covering every feature available to:
1. The **Basic trainer plan** (the one Andrea's demo account `andrea.mypersonal.fit@gmail.com` is on).
2. The **Pro trainer plan** (full feature set, inheriting Essential + Basic).

The doc will live in `docs/trainer-dashboard/` alongside the other feature docs.

## File to create
`docs/trainer-dashboard/basic-vs-pro-features.md`

## Source material I'll consolidate
- `src/components/pricing/utils/planFeatures.ts` (canonical Basic / Essential / Pro list).
- `src/translations/en.ts` → `pricing.detailedFeatures.*` (official descriptions).
- Trainer dashboard tabs in `src/components/trainer/dashboard/tabs/` (Overview, Clients, Messages, Calendar, Reviews, Analytics, Sessions, Programs, Packages, Services, Sales, Transactions, Settings) to describe structure/flow per feature.
- Existing docs in `docs/trainer-dashboard/` and `docs/pricing-plans/` for cross-references.
- Memory notes on Essential vs Pro payments, program sales, analytics, packages, invoicing, AI Plus addon, Studio addon, etc.

## Document structure

1. **Overview**
   - Plan positioning (Basic = free starter, Essential = paid mid, Pro = full business).
   - Note: Andrea's demo account is on Basic; Essential/Pro are stacked (Pro = Essential + Basic + Pro-only).
   - Add-ons that apply on top (AI Plus €1.99, Studio €89).

2. **Basic plan — full feature catalog** (Andrea's account)
   For each of the 8 Basic features, a subsection with:
   - **What it is** (1–2 lines).
   - **Where it lives** (dashboard tab / route / component file).
   - **Structure** (key UI blocks, modals, side panels).
   - **Flow** (typical user steps end-to-end).
   - **Limits / notes** (what is NOT included vs higher plans).
   
   Features covered:
   - Sales Management (basic, no invoicing)
   - Personal Page (public trainer profile)
   - Client Management + **Client Workouts View** (new Dumbbell button → cross-reference `client-workouts-view.md`)
   - Messaging (text/video chat)
   - Calendar (personal availability)
   - Reviews (read-only, cannot hide/delete — per project rule)
   - Analytics (basic KPIs)
   - Google Calendar sync

3. **Pro plan — full feature catalog**
   Start with **"Everything in Essential"** summary (table) then **"Everything in Basic"** summary.
   Then detail each Essential and Pro feature with the same What/Where/Structure/Flow/Notes template:
   - Essential: Sessions booking, Waitlist, Programs (wizard, routines, circuits, periodization), Session analytics, Program analytics, Exercise list (read-only DB), Exercise management (private DB), Cash payments + confirmation dialog, Payment installments.
   - Pro: Packages (session-based + duration), Services, Full payments (Stripe e-commerce), Pro installments, Invoicing (draft → sent workflow + receipts), Transactions tab, Business dashboard, Advanced analytics (time filters + aggregated clients view + context-aware AI), Priority support.

4. **Cross-plan reference table**
   Matrix: Feature × Basic / Essential / Pro (✓ / — / Add-on).

5. **Add-ons (apply to any plan)**
   - AI Plus (€1.99/mo) — advanced AI features.
   - Studio (€89/mo) — turns trainer into studio operator with multi-trainer mgmt.

6. **Demo account quick reference**
   - Email: `andrea.mypersonal.fit@gmail.com`
   - Plan: Basic
   - Demo user UUID rule (`00000000-0000-0000-0000-000000000002`) — note that LocalStorage `demo-user` flag must be preserved.
   - Where to upgrade simulation lives (`PlanCard` "Coming Soon" popup).

7. **Related docs**
   - Links to: `client-workouts-view.md`, `docs/pricing-plans/REQUIREMENTS.md`, `docs/trainer-dashboard/REQUIREMENTS.md`, `docs/admin-marketing/*`.

## Out of scope
- No code changes.
- No translation edits.
- Italian version not generated unless asked.
