# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

The actual application lives in `bookify-trainer/` (the git repo root). The outer
`mypersonalfit/` directory only contains this folder — run all commands from
`bookify-trainer/`.

This is a **Lovable**-generated project (`lovable.dev`). Changes pushed to git are
synced back to Lovable and vice-versa; `lovable-tagger` runs as a Vite plugin in dev
mode. `src/integrations/supabase/client.ts` and `src/integrations/supabase/types.ts`
are **auto-generated — do not hand-edit them** (the Supabase URL/anon key are
hardcoded there and committed intentionally; the `.env` mirrors them).

## Commands

```sh
npm i            # install (npm is the documented manager; bun.lock* also present)
npm run dev      # Vite dev server on http://localhost:8080
npm run build    # production build
npm run build:dev # build with development mode (keeps lovable-tagger)
npm run lint     # eslint
npm run preview  # preview a built bundle
```

There is **no test runner configured** — do not assume `npm test` exists.

TypeScript is intentionally loose: `strict`, `strictNullChecks`, `noImplicitAny`,
and unused-var checks are all **off**. Don't try to "fix" code to satisfy strict
mode; match the surrounding style.

## Architecture

Single-page React 18 + Vite + TypeScript app. Routing is flat in `src/App.tsx` with
`react-router-dom`. State/data via `@tanstack/react-query`; UI is **shadcn/ui**
(Radix primitives in `src/components/ui/`) styled with Tailwind. Path alias `@/` →
`src/`.

The app serves **multiple distinct personas**, each with its own dashboard page and
component subtree under `src/components/`:
- **Trainer** (`/dashboard`, `Dashboard*.tsx`, `components/trainer/`)
- **Client/end-user** (`/user-dashboard`, `/client-dashboard`, `components/user/`, `components/client/`)
- **Gym** (`/gym-dashboard`, `/gym-onboarding/:token`, `components/gym/`, `services/gym/`, `hooks/gym/`)
- **Studio** (`/studio-dashboard`, `components/studio/`)
- **Admin / marketing** — see below.

Public marketing/landing pages (`Index`, `IndexIta`, `UserLanding*`) and auth pages
are also routed flatly. Note dashboards do not currently sit behind route guards in
`App.tsx` (only the admin module guards itself).

### Admin marketing module (`src/admin/`)

A **self-contained sub-application** mounted at `/admin/*` via `AdminRoutes.tsx`. It
is deliberately isolated:
- Its **own `QueryClient`** so its caches never mix with the main app's.
- Its own layout, sidebar, guard (`AdminGuard`), hooks, and Italian i18n (`admin/i18n/it.ts`).
- Backed by Supabase tables prefixed `mkt_*`. These aren't in the generated
  `Database` types yet, so admin code uses an **untyped Supabase handle**:
  `import { sb } from "@/admin/lib/sb"` (`sb` is `supabase as any`). Use `sb` (not
  the typed `supabase`) when touching `mkt_*` tables.

### Backend: Supabase edge functions (`supabase/functions/`)

~23 Deno edge functions — there is no separate backend server. They cover Stripe
billing (`create-checkout`, `customer-portal`, `check-subscription`), OpenAI features
(`openai-chat`, `openai-realtime`, `openai-trainer-chat`, `analyze-*`), session
postponement, contact email, and the marketing-automation suite (`mkt-*`).

Conventions: each function is `index.ts`, handles CORS preflight (`OPTIONS`), reads
secrets via `Deno.env.get(...)` (`OPENAI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
etc.), and creates a service-role Supabase client for privileged DB access.
`supabase/config.toml` sets `verify_jwt = false` for the public-facing `mkt-*`
functions — check it before assuming a function requires auth.

DB schema is managed by **91+ timestamped SQL migrations** in
`supabase/migrations/`. Add new schema as a new migration file; never edit existing
ones.

### i18n

Two parallel systems. The **public app** uses `src/context/LanguageContext.tsx`
(`useLanguage()` → `t(key)`) with `en`/`it` dictionaries in `src/translations/`.
Critically, `LanguageContext` **force-overrides language by route**: `/user` → `it`,
`/user-en` and `/dashboard` → `en`, regardless of saved preference. Keep that in mind
when adding localized routes. The **admin module** has its own separate Italian
strings in `src/admin/i18n/it.ts`.

### Data conventions

- `src/data/` holds mock/seed data (`trainerMockData.ts`, `gymTrainersMockData.ts`,
  exercise/training libraries) used by some views — distinguish it from live Supabase data.
- Domain logic lives in `src/hooks/` (one hook per feature, e.g. `useTrainingPrograms`,
  `useGymSessions`, `useClientCheckIns`) and `src/services/`. Prefer extending an
  existing hook over querying Supabase directly inside a component.
