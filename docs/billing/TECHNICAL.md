# Billing & Subscriptions — Technical Reference

## Overview

Billing is handled by **Stripe**, reached only through three edge functions
(`create-checkout`, `customer-portal`, `check-subscription`). The frontend never holds the
Stripe secret key — it invokes the functions, which use the Stripe API and (for the
privileged ones) the Supabase service-role client.

There are **two parallel subscription notions** in the codebase:

- **Trainer subscription** (`useSubscription`) — synced live with Stripe via
  `check-subscription`.
- **Client subscription** (`useClientSubscription`) — a `client_subscriptions` row with a
  `plan: 'free' | 'pro'`, used to gate consumer features (notably AI).

Plan **pricing/feature definitions** for the marketing tiers (Basic/Essential/Pro/Studio/Gym)
live separately — see [`../pricing-plans/TECHNICAL.md`](../pricing-plans/TECHNICAL.md). This
doc covers the runtime subscription/payment machinery.

## Files

| File | Purpose |
|------|---------|
| `supabase/functions/create-checkout/index.ts` | Creates a Stripe Checkout session for a `priceId` |
| `supabase/functions/customer-portal/index.ts` | Creates a Stripe Billing Portal session |
| `supabase/functions/check-subscription/index.ts` | Validates subscription status; syncs the early-adopter tier with Stripe |
| `src/hooks/useSubscription.ts` | Trainer-side subscription state + checkout/portal triggers |
| `src/hooks/useClientSubscription.ts` | Client-side `free\|pro` subscription state (with demo fallback) |
| `src/hooks/useUserSubscription.tsx` | Variant for the `/user-dashboard` flow |
| `src/hooks/useAIAccess.ts` | Gates AI features by subscription + usage limits |
| `src/hooks/usePackagePayments.ts`, `useGymPaymentActions.ts`, `usePackageSales.ts` | Package/commercial payment flows (in-app, not Stripe subscriptions) |

## Edge functions

### `create-checkout`

- **Input:** `{ priceId: string }`
- **Auth:** builds a Supabase client with the **anon** key from the request's `Authorization`
  header to identify the user (`STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`).
- **Behaviour:** looks up (or implicitly creates) the Stripe customer by email, then
  `stripe.checkout.sessions.create(...)`. Returns the session URL for redirect.
- `verify_jwt`: default (true).

### `customer-portal`

- **Auth:** requires `Authorization` header; uses the **service-role** client
  (`STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
- **Behaviour:** finds the Stripe customer and returns a Billing Portal session URL so the
  user can manage/cancel their subscription.

### `check-subscription`

- **Auth:** requires `Authorization` header; **service-role** client.
- **Behaviour:** looks up the customer in Stripe, determines the active subscription/tier, and
  **syncs the early-adopter tier** back into the DB. This is the source of truth for
  `useSubscription`'s state.

All three set the standard CORS headers and use Stripe API version `2023-10-16`.

## Hooks

### `useSubscription` (trainer)

```ts
interface SubscriptionData { /* tier, status, dates, … */ }
```

- On mount, invokes `check-subscription` to populate `subscription`.
- Exposes a **checkout** action → invokes `create-checkout` with a `priceId` and redirects.
- Exposes a **manage** action → invokes `customer-portal` and redirects.

### `useClientSubscription`

```ts
interface ClientSubscriptionData {
  plan: 'free' | 'pro';
  status: 'active' | 'cancelled' | 'expired' | 'trialing';
  isPro: boolean;     // plan === 'pro' && active/trialing
  // …
}
```

- **Demo mode:** if a `demo-user` exists, resolves `userId` via `getCurrentDemoUserId()` and
  short-circuits to a synthetic state (default `free/active`).
- **Real mode:** reads `client_subscriptions` for the user; if no row exists it **auto-creates
  a `free/active` row**. `isPro` is derived from `subscription_plan === 'pro'` and an active/
  trialing status.

### `useAIAccess` — feature gate

Gates the AI features (chat, analysis) by subscription **and** usage limits.

```ts
const FREE_MONTHLY_LIMIT = 5;     // requests / month on free
const PRO_DAILY_LIMIT   = 100;    // requests / day on pro
const DEMO_INITIAL_USAGE = 4;     // demo users start near the free limit (to showcase the paywall)
```

- **Demo mode** (`localStorage 'demo-user'`): never fetches; forces usage to
  `DEMO_INITIAL_USAGE` (4/5) so the UI demonstrates the near-limit / upgrade state.
- **Real mode:** reads the `ai_usage_tracking` table — counts rows for the current `user_id`
  since the start of the month (free) — and compares against the limit based on
  `useClientSubscription().isPro`.
- Returns `{ hasAccess, reason?: 'no_subscription'|'rate_limit_exceeded'|'free_plan',
  remainingRequests?, maxRequests? }`.

`ai_usage_tracking` is written server-side by `openai-trainer-chat` (and read here). See
[`../ai/TECHNICAL.md`](../ai/TECHNICAL.md).

## Other payment flows

Package/session sales (`usePackagePayments`, `useGymPaymentActions`, `usePackageSales`,
`useSessionSales`, `useProgramSales`) model the **in-app commercial layer** (a trainer/gym
selling packages to clients, cash or digital, with installments). These are recorded in
Supabase tables, not as Stripe subscriptions. Installment detection is AI-assisted via the
`detect-installment` edge function (`useInstallmentDetection`).

## Gotchas

- **Two subscription models.** Trainer (`useSubscription`, Stripe-synced) and client
  (`useClientSubscription`, `client_subscriptions` row) are distinct — don't conflate them.
- **Demo mode skews AI gating.** With a `demo-user` present, `useAIAccess` is hardwired to 4/5
  usage regardless of the real `ai_usage_tracking` table.
- **Stripe mode is key-driven.** Test vs live depends entirely on which `STRIPE_SECRET_KEY` is
  configured; there is no in-code mode switch. Split/marketplace payments (Stripe Connect) are
  **not** implemented.
