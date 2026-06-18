# MyPersonal.fit — Documentation

This folder documents **what the codebase does today** (the as-built reality), following
the same convention used in `fightback-webapp/docs`:

- **`ARCHITECTURE.md`** — the top-level map: stack, folder structure, routing, the
  multi-persona model, the data/state layer, environments, and how the pieces fit.
- **One folder per module/feature**, each containing:
  - **`TECHNICAL.md`** — deep technical reference: file inventory, components, hooks,
    services, data flows, Supabase tables touched, edge functions, gotchas.
  - **`REQUIREMENTS.md`** (where it applies) — the functional behaviour: pages, flows,
    states, i18n keys, business rules.

> Scope note: this set documents **existing** behaviour, including the parts that are
> mocked or demo-only (e.g. the hardcoded client identity, localStorage-backed gym
> invites). Where something is a stub, the docs say so explicitly. A separate
> `GAPS.md` (phase 2) will track what's missing for the MVP go-live.

## Conventions

- File paths are relative to the repo root (`bookify-trainer/`).
- The app is **React 18 + Vite + TypeScript**, UI via **shadcn/ui + Tailwind**, data via
  **`@tanstack/react-query`**, backend via **Supabase** (Postgres + Auth + Storage +
  Deno edge functions). See [`ARCHITECTURE.md`](ARCHITECTURE.md).
- The path alias `@/` maps to `src/`.

## Module index

| Module | Docs | What it covers |
|--------|------|----------------|
| **Architecture** | [`ARCHITECTURE.md`](ARCHITECTURE.md) | Stack, routing, persona model, data layer, environments |
| **Supabase backend** | `supabase/TECHNICAL.md` | DB schema & migrations, RLS model, the 23 edge functions, storage |
| **Authentication** | `auth/TECHNICAL.md` | Real Supabase auth (admin/trainer) vs the demo-client model; session handling |
| **i18n** | `i18n/TECHNICAL.md` | `LanguageContext`, route-forced language, `translations/` dictionaries |
| **Public site** | `public-site/REQUIREMENTS.md` · `public-site/TECHNICAL.md` | Landing pages (IT/EN), find-trainer, public trainer profile |
| **Pricing & plans** | `pricing-plans/REQUIREMENTS.md` · `pricing-plans/TECHNICAL.md` | Tiers (Basic/Essential/Pro/Studio/Gym), feature lists, gating |
| **Trainer dashboard** | `trainer-dashboard/REQUIREMENTS.md` · `trainer-dashboard/TECHNICAL.md` | Trainer area: clients, sessions, programs, packages, sales, settings |
| **Client area** | `client-area/REQUIREMENTS.md` · `client-area/TECHNICAL.md` | Client/user dashboards, check-ins, packages, programs, messaging |
| **Gym** | `gym/REQUIREMENTS.md` · `gym/TECHNICAL.md` | Gym dashboard, onboarding (token invite), members, analytics |
| **Studio** | `studio/TECHNICAL.md` | Studio dashboard (boutique coaching variant) |
| **Admin / marketing** | `admin-marketing/TECHNICAL.md` | The isolated `/admin/*` sub-app: content plan, calendar, outreach, branding |
| **Billing** | `billing/TECHNICAL.md` | Stripe checkout/portal, subscription state, the `*-subscription` hooks |
| **AI** | `ai/TECHNICAL.md` | Trainer/client chat, realtime voice, document/workout analysis |
| **UI kit** | `ui/TECHNICAL.md` | shadcn/ui primitives, theming, shared component conventions |

*(Module docs are produced incrementally; this index is the source of truth for the
planned set.)*
