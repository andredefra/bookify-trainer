# Architecture

MyPersonal.fit is a **single-page React application** that connects personal trainers,
gyms/studios, and clients. It is a [Lovable](https://lovable.dev)-generated project: changes
pushed to git sync back to Lovable, and `lovable-tagger` runs as a Vite plugin in dev mode.

> **As-built note.** This document describes the codebase **as it actually is today**,
> including the parts that are demo/mock-only. The most important thing to understand up
> front: **the only real authentication in the app is the `/admin` module.** Every
> consumer-facing dashboard (trainer, client, gym, studio) is gated by a `localStorage`
> "demo user", not by Supabase Auth. See [Authentication model](#authentication-model).

## Stack

| Layer | Technology |
|-------|-----------|
| Build/dev | Vite 5, `@vitejs/plugin-react-swc`, `lovable-tagger` (dev only) |
| Language | TypeScript (loose: `strict`, `strictNullChecks`, `noImplicitAny` all **off**) |
| UI | React 18, **shadcn/ui** (Radix primitives in `src/components/ui/`), Tailwind CSS, `lucide-react` |
| Routing | `react-router-dom` v6 (flat route table) |
| Server state | `@tanstack/react-query` (used app-wide as the provider, but **only ~2 hooks actually use it**; most hooks use `useState`/`useEffect` + direct Supabase calls) |
| Forms/validation | `react-hook-form` + `zod` |
| Backend | **Supabase** — Postgres + Auth + Storage + Deno **edge functions** |
| Charts / misc | `recharts`, `date-fns`, `papaparse`, `embla-carousel`, `react-grid-layout` |

Path alias: **`@/` → `src/`** (configured in `vite.config.ts` and `tsconfig`).

## Commands

```sh
npm i            # install (npm is documented; bun.lock* also committed)
npm run dev      # Vite dev server → http://localhost:8080
npm run build    # production build
npm run build:dev # build in development mode (keeps lovable-tagger)
npm run lint     # eslint
npm run preview  # preview a built bundle
```

There is **no test runner** and **no CI** configured. See [`GAPS.md`](GAPS.md) (phase 2).

## Folder structure

```
bookify-trainer/
├── src/
│   ├── App.tsx                 # Root: providers + flat route table
│   ├── main.tsx                # createRoot(<App/>)
│   ├── pages/                  # One component per route (see Routing)
│   ├── components/
│   │   ├── ui/                 # shadcn/ui primitives (generated)
│   │   ├── trainer/dashboard/  # Trainer persona subtree (plan-aware)
│   │   ├── client/             # Client persona subtree
│   │   ├── user/               # "User" persona subtree (separate from client)
│   │   ├── gym/dashboard/      # Gym persona subtree (invited-mode logic)
│   │   ├── studio/dashboard/   # Studio persona subtree
│   │   ├── pricing/, navbar/, login/, register/, contact/, shared/, common/
│   │   └── *.tsx               # Public landing sections (Hero, Features, …)
│   ├── context/                # React Context providers (see Data & state)
│   ├── hooks/                  # ~53 domain hooks (+ hooks/gym/* ~14 more)
│   ├── services/               # clientInvitationService, services/gym/*
│   ├── integrations/supabase/  # client.ts + types.ts (GENERATED — do not edit)
│   ├── translations/           # en.ts, it.ts, index.ts (app-wide i18n)
│   ├── data/                   # Mock/seed data + exercise & training libraries
│   ├── utils/                  # demoUserUtils, mockGymInvites, RealtimeAudio, …
│   ├── constants/              # sessionTypes.ts
│   ├── lib/                    # utils.ts (cn() etc.)
│   └── admin/                  # Self-contained /admin sub-app (see admin-marketing docs)
├── supabase/
│   ├── config.toml             # Edge function config (verify_jwt flags)
│   ├── functions/              # 23 Deno edge functions (one index.ts each)
│   └── migrations/             # 91+ timestamped SQL migrations
├── public/
└── docs/                       # ← this documentation
```

## Routing

All routes are declared **flat** in `src/App.tsx` inside a single `<Routes>` block. There
is **no nested layout routing and no route guards** at the app level — the one exception is
the admin module, which guards itself internally.

### Provider tree (`App.tsx`)

```
<QueryClientProvider>          # single app-wide React Query client
  <BrowserRouter>
    <LanguageProvider>         # i18n (see i18n/TECHNICAL.md)
      <TooltipProvider>
        <Toaster /> <Sonner /> # two toast systems (shadcn + sonner)
        <AppContent />         # DomainRedirect + ScrollToTop + RevealObserver + <Routes>
```

`AppContent` also mounts three cross-cutting effects:
- **`DomainRedirect`** — if the host is `mypersonalai.it`, hard-redirects to
  `my-personal-fit.it/user` (preserving query params).
- **`ScrollToTop`** — scrolls to top on every route change.
- **`RevealObserver`** — `IntersectionObserver` that adds a `visible` class to `.reveal`
  elements (landing-page scroll animations).

### Route table

| Route | Page | Audience | Language forced? |
|-------|------|----------|------------------|
| `/` | `Index` | Public landing (EN) | — |
| `/it` | `IndexIta` | Public landing (IT) | — |
| `/login` | `Login` | Persona selector → dashboard redirect | — |
| `/register` | `Register` | — | — |
| `/find-trainer` | `FindTrainer` | Public trainer discovery | — |
| `/trainer/:idOrSlug` | `TrainerProfile` | Public trainer profile + booking | — |
| `/dashboard` | `Dashboard` | **Trainer (Pro)** | EN |
| `/dashboard-basic` | `DashboardBasic` | **Trainer (Basic)** | — |
| `/dashboard-essential` | `DashboardEssential` | **Trainer (Essential)** | — |
| `/client-dashboard` | `ClientDashboard` | **Client** | — |
| `/user-dashboard` | `UserDashboard` | **User** (alternate consumer flow) | — |
| `/gym-dashboard` | `GymDashboard` | **Gym** | — |
| `/gym-onboarding/:token` | `GymOnboarding` | Gym invite acceptance (localStorage-backed) | — |
| `/studio-dashboard` | `StudioDashboard` | **Studio** | — |
| `/user` | `UserLanding` | Consumer landing | IT |
| `/user-en` | `UserLandingEn` | Consumer landing | EN |
| `/user-login`, `/user-register` | `UserLogin`, `UserRegister` | Consumer auth (demo) | — |
| `/privacy`, `/terms`, `/cookies` | legal pages | — | — |
| `/admin/*` | `AdminRoutes` | **Admin / marketing** (real auth) | IT (own i18n) |
| `*` | `NotFound` | 404 | — |

"Language forced" routes override the saved language preference — see
[`i18n/TECHNICAL.md`](i18n/TECHNICAL.md).

## The multi-persona model

The app is really **five front-ends in one bundle**, one per persona. Each has its own page,
its own component subtree, and its own (demo) identity. They are **not** generated from a
shared role abstraction — each is a hand-built dashboard.

| Persona | Page(s) | Subtree | Container | Distinguishing logic |
|---------|---------|---------|-----------|----------------------|
| **Trainer** | `/dashboard`, `/dashboard-basic`, `/dashboard-essential` | `components/trainer/dashboard/` | `DashboardContainer` | **Plan-aware** (Basic/Essential/Pro) tab gating via `TrainerPlanContext` |
| **Client** | `/client-dashboard` | `components/client/` | direct tab render | Hardcoded `DEMO_CLIENT_ID` in Supabase queries |
| **User** | `/user-dashboard` | `components/user/` | `UserDashboard` | Uses a **separate** localStorage key `user-app-user` |
| **Gym** | `/gym-dashboard`, `/gym-onboarding/:token` | `components/gym/dashboard/` | `GymDashboardContainer` | **Invited mode**: restricted tabs when `source:'invited'` / `id` starts `inv_` |
| **Studio** | `/studio-dashboard` | `components/studio/dashboard/` | `StudioDashboardContainer` | Full feature set; "boutique" coaching variant |
| **Admin** | `/admin/*` | `src/admin/` | `AdminLayout` | **Real Supabase auth** + `mkt_admins` allowlist |

### Trainer plan tiers

The trainer dashboard renders the **same `DashboardContainer`** for all three tiers; the
tier is passed as a `plan` prop (`'basic' | 'essential' | 'pro'`) and exposed via
`TrainerPlanContext`. Visible tabs are filtered by an allow/exclude list:

```ts
// DashboardContainer.tsx — PLAN_ALLOWED_TABS
basic:     [overview, sales, clients, calendar, messages, reviews, settings]
essential: basic + [programs, sessions, transactions, analytics]
pro:       essential + [services, packages]
```

`Login.tsx` resolves which tier to send a trainer to (today via **hardcoded
email/password** checks), then redirects to `/dashboard`, `/dashboard-essential`, or
`/dashboard-basic`. See [`pricing-plans/`](pricing-plans/REQUIREMENTS.md) for what each tier
sells and [`trainer-dashboard/`](trainer-dashboard/TECHNICAL.md) for the tab internals.

### Gym "invited" mode

A gym reached via a trainer's invite link (`source:'invited'`, or `id` starting with
`inv_`) is locked to three tabs — `trainers-management`, `messages`, `settings` — and
forced onto `trainers-management` on entry. A non-invited demo gym has its id normalized to
the fixed UUID `11111111-1111-1111-1111-111111111111`. The invite tokens themselves live in
`localStorage` (`src/utils/mockGymInvites.ts`) — see [`gym/TECHNICAL.md`](gym/TECHNICAL.md).

## Authentication model

This is the single most important architectural caveat.

### Consumer dashboards — demo auth (no real auth)

There are **no route guards** on the trainer/client/user/gym/studio dashboards. Each page
runs a small `useEffect` that reads a `localStorage` key and redirects to the relevant login
if it's missing:

```ts
const user = localStorage.getItem('demo-user');   // or 'user-app-user' for /user-dashboard
if (!user) navigate('/login');
```

Two parallel demo-identity systems exist:

| Key | Used by | Shape |
|-----|---------|-------|
| `demo-user` | trainer, client, gym, studio | `{ id, name, email, type, plan?, profileImage?, source?, gymName?, studioName? }` |
| `user-app-user` | `/user-dashboard` only | same shape |

`Login.tsx` does **not** call Supabase Auth — it inspects a persona selector + hardcoded
credentials and writes `demo-user`, then navigates. Well-known demo accounts get fixed
UUIDs from `src/utils/demoUserUtils.ts`:

```
gym       11111111-…-111111111111
trainer1  22222222-…-222222222222
trainer2  33333333-…-333333333333
client1-3 44444444 / 55555555 / 66666666
```

Separately, several **client-side Supabase queries hardcode** the client identity:

```ts
const DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002';
```

(used in `ClientHeader.tsx`, `useClientPackages.ts`, `useTrainingPrograms.ts`,
`PackagePaymentDialog.tsx`, `usePackagePayment.ts`). So even though queries hit a real
Supabase DB, they all read/write the **same demo client row** — there is no per-user
isolation on the consumer side yet.

### Admin — real auth

`/admin/*` is the only properly authenticated area. `useAdminSession()` subscribes to
`supabase.auth.onAuthStateChange` / `getSession()`, then checks the signed-in email against
the `mkt_admins` table. `AdminGuard` redirects to `/admin/login` if signed out, or to `/`
if signed in but not an admin. See [`admin-marketing/TECHNICAL.md`](admin-marketing/TECHNICAL.md)
and [`auth/TECHNICAL.md`](auth/TECHNICAL.md).

> **Implication:** the RLS policies in the DB (292 policies across the migrations, keyed on
> `auth.uid()`) are effectively exercised only by the admin path and any future real-auth
> flow. The consumer side runs as the anon role against a shared demo identity.

## Data & state layer

There is **no Redux/Zustand**. State lives in three places: React Context (a few
providers), hook-local `useState`, and the Supabase server.

### Contexts (`src/context/`)

| Context | State | Mounted at | Backing |
|---------|-------|-----------|---------|
| `LanguageContext` | `language`, `t(key)` | **App root** (wraps everything) | `localStorage` + route override |
| `TrainerPlanContext` | trainer tier (`basic\|essential\|pro`) | trainer `DashboardContainer` | prop at mount (not persisted) |
| `SalesEntriesContext` | sales entries by email | trainer `DashboardContainer` | `localStorage` (`trainer-sales-entries`) + seed data |
| `ClientRosterContext` | removed/terminated client ids | trainer `DashboardContainer` | `localStorage` (`trainer-client-roster`) |

Only `LanguageContext` is app-wide; the other three are **scoped to the trainer dashboard**.

### Hooks (`src/hooks/`, `src/hooks/gym/`)

~67 domain hooks. The dominant pattern is **direct Supabase query inside `useState` +
`useEffect`** (not React Query). Grouped by domain:

| Domain | Representative hooks |
|--------|---------------------|
| Subscription / billing | `useSubscription`, `useClientSubscription`, `useUserSubscription`, `useAIAccess`, `useTrainerAISubscription`, `usePackagePayments`, `useGymPaymentActions`¹ |
| Client management | `useClientInvitations`, `useTrainerInvitations`, `useUserProfile`, `useTrainerProfile`, `useClientCheckIns`, `useCheckIn*` |
| Sessions | `useGymSessions`, `useSessionPostponements`, `useClientPostponements`, `useClientSessionTracking`, `usePackageSessionBookings` |
| Packages / sales | `useClientPackages`, `useActivePackages`, `usePackageSales`, `useProgramSales`, `useSessionSales` |
| Programs / exercises | `useTrainingPrograms`, `useProgramAssignments`, `useExerciseTracking`, `useExerciseLibrary`² |
| Messaging / notifications | `useMessages`, `useMessageAutomation`, `useNotifications`, `useClientNotifications` |
| Reviews | `useTrainerReviews`, `useGymReviews` |
| AI | `useRealtimeVoice`, `useAIAccess` |
| Gym (`hooks/gym/`) | `useGymConnection`, `useGymMembers`, `useGymAnalytics`, `useGymCalendar`, `useMarketingAutomation`, `useTrainerShifts`, … |
| Utility | `use-toast`, `use-mobile`, `useDebounce`, `useResponsiveLayout`, `useWidgetLayout` |

¹ `useGymPaymentActions` and `useGymTransactions` are the **only** hooks using React Query
(`useMutation`). ² `useExerciseLibrary` is **localStorage-only** (custom/modified/deleted
exercises), not Supabase-backed.

**Demo/mock fallbacks** are baked into several hooks: `useGymSessions`,
`useClientPackages`, `usePackageSales`, `useTrainingPrograms` fall back to demo data
(checking `localStorage 'demo-user'` / using `DEMO_CLIENT_ID`).

### Services (`src/services/`)

Encapsulate the more complex multi-table queries:
- `clientInvitationService.ts` — `ClientInvitationService` static class
  (create / list trainer-side / list client-side / respond), backed by `client_invitations`.
- `services/gym/membersService.ts` — `fetchMembers()` (joins `gym_clients` +
  `gym_package_assignments` + `profiles`, **falls back to `getDemoMembers()`**), plus member
  CRUD and package assignment.
- `services/gym/calendarService.ts` — gym calendar events.

### Mock & seed data

| File | Nature |
|------|--------|
| `utils/mockGymInvites.ts` | Gym invites — **localStorage only** (`mock-gym-invites`) |
| `utils/demoUserUtils.ts` | Demo UUID generation + well-known account map |
| `data/trainerMockData.ts`, `data/gymTrainersMockData.ts` | Mock trainer/gym objects |
| `data/exercises/*`, `data/training/*` | Exercise database + training-program types |
| `SalesEntriesContext` seed | 4 demo contacts with preset sales |

## Backend (Supabase)

### Client (`src/integrations/supabase/client.ts`)

Auto-generated and committed with **hardcoded** project URL + anon (publishable) key:

```ts
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
```

Imported directly in 39+ hooks — there is no centralized API wrapper. The admin module wraps
it as an **untyped** handle (`sb`) for the `mkt_*` tables not present in `Database` types.

### Database & migrations

`supabase/migrations/` holds **91+ timestamped SQL migrations** (the schema's source of
truth — add new migrations, never edit old ones). RLS is heavily used: **292 `CREATE POLICY`
statements**, **243 `auth.uid()`** references. See [`supabase/TECHNICAL.md`](supabase/TECHNICAL.md).

### Edge functions

23 Deno functions in `supabase/functions/` (each `index.ts`), grouped:

| Group | Functions | External services |
|-------|-----------|-------------------|
| Billing / Stripe | `create-checkout`, `customer-portal`, `check-subscription` | Stripe |
| AI / analysis | `openai-chat`, `openai-realtime`, `openai-trainer-chat`, `analyze-training-program`, `analyze-workout`, `analyze-program-document` | OpenAI, Lovable AI Gateway |
| Sessions | `handle-session-postponement`, `respond-to-postponement`, `detect-installment` | Resend, Lovable AI |
| Contact / email | `send-contact-email`, `send-marketing-email` | Resend |
| Marketing automation | `mkt-bootstrap-admin`, `mkt-generate-copy`, `mkt-schedule-phase`, `mkt-process-brand-doc`, `mkt-chat-post`, `mkt-mcp-composio`, `mkt-outreach-execute`, `mkt-outreach-poll-replies` | Lovable AI, Composio MCP (Instagram) |
| Cron | `marketing-automation-cron` | invokes `send-marketing-email` |

All 8 `mkt-*` functions run with **`verify_jwt = false`** (`supabase/config.toml`) and
authorize via the `mkt_admins` allowlist. Full per-function reference (inputs, secrets,
service-role usage) in [`supabase/TECHNICAL.md`](supabase/TECHNICAL.md). Secrets used:
`OPENAI_API_KEY`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `LOVABLE_API_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`.

## Environments

There is no multi-environment setup. A single Supabase project is targeted; the URL and anon
key are **hardcoded** in `src/integrations/supabase/client.ts` and mirrored in `.env`
(`VITE_SUPABASE_*`). Edge-function secrets are configured in the Supabase dashboard, read via
`Deno.env.get(...)`. There are no dev/staging/prod separations and no CI/CD pipeline today.

## Adding a new feature

There is no scaffolding convention; follow the existing persona-subtree shape:

1. **New page** → add `src/pages/<Name>.tsx` and register a `<Route>` in `App.tsx`.
2. **New dashboard tab** (existing persona) → add `tabs/<Name>Tab.tsx` under the persona's
   `components/<persona>/dashboard/tabs/`, register it in that persona's sidebar/tab switch,
   and (for trainer) add it to `PLAN_ALLOWED_TABS` / the sidebar plan-exclude list.
3. **New data access** → prefer adding a hook in `src/hooks/` that queries Supabase via the
   `@/integrations/supabase/client` singleton. Match the surrounding `useState`/`useEffect`
   pattern unless you deliberately introduce React Query.
4. **New backend logic** → add a Deno function under `supabase/functions/<name>/index.ts`
   (CORS preflight + `Deno.env.get` secrets + service-role client), and register
   `verify_jwt` in `supabase/config.toml` if it should be public.
5. **New schema** → add a new timestamped migration in `supabase/migrations/`; never edit an
   existing one.

## Cross-references

- [`supabase/TECHNICAL.md`](supabase/TECHNICAL.md) — DB, RLS, edge functions
- [`auth/TECHNICAL.md`](auth/TECHNICAL.md) — demo auth vs real admin auth
- [`i18n/TECHNICAL.md`](i18n/TECHNICAL.md) — language context & route forcing
- [`admin-marketing/TECHNICAL.md`](admin-marketing/TECHNICAL.md) — the `/admin` sub-app
- Persona docs: [`trainer-dashboard/`](trainer-dashboard/TECHNICAL.md),
  [`client-area/`](client-area/TECHNICAL.md), [`gym/`](gym/TECHNICAL.md),
  [`studio/`](studio/TECHNICAL.md)
- [`pricing-plans/`](pricing-plans/REQUIREMENTS.md) · [`billing/`](billing/TECHNICAL.md) ·
  [`ai/`](ai/TECHNICAL.md) · [`public-site/`](public-site/REQUIREMENTS.md)
