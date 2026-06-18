# Admin / Marketing Module — Technical Reference

## Overview

The admin module is a **self-contained sub-application** mounted at `/admin/*`. It is the
internal tool the MyPersonal team uses to run the Instagram marketing operation: plan and
generate post copy with AI, schedule posts into phases, manage brand documents and
AI-extracted personas, and run influencer **outreach** campaigns over an Instagram MCP
bridge (Composio).

It is deliberately **isolated** from the rest of the app:

- Its **own `QueryClient`** (`AdminRoutes.tsx`) so its React Query caches never mix with
  the consumer app's. Default options: `staleTime: 30_000`, `refetchOnWindowFocus: false`.
- Its **own layout, sidebar, route guard, hooks, and Italian-only i18n**.
- It talks to a dedicated set of Postgres tables prefixed **`mkt_*`** and three Storage
  buckets prefixed **`mkt-*`**.
- Because the `mkt_*` tables are **not in the generated Supabase `Database` types**, all
  admin data access goes through an **untyped Supabase handle**: `sb` (`supabase as any`)
  from `src/admin/lib/sb.ts`. Admin code never imports the typed `supabase` directly for
  table access.

> Related backend docs: the edge functions this module invokes (`mkt-*`) are documented in
> [`../supabase/TECHNICAL.md`](../supabase/TECHNICAL.md). All `mkt-*` functions run with
> `verify_jwt = false` and authorize via the `mkt_admins` allowlist instead of a JWT.

## Files

| File | Purpose |
| ---- | ------- |
| `src/admin/routes/AdminRoutes.tsx` | Mounts the admin sub-app: its own `QueryClient`, route table, guard wrapper |
| `src/admin/guards/AdminGuard.tsx` | Gate: redirects to `/admin/login` if signed out, to `/` if signed in but not an admin |
| `src/admin/hooks/useAdminSession.ts` | Resolves the current Supabase session and checks membership in `mkt_admins` |
| `src/admin/layout/AdminLayout.tsx` | Authenticated shell (sidebar + content outlet) |
| `src/admin/layout/AdminSidebar.tsx` | Left navigation; sign-out |
| `src/admin/layout/AdminAIChatDrawer.tsx` | Slide-over AI chat panel available across admin pages |
| `src/admin/lib/sb.ts` | `export const sb: any = supabase` — untyped handle for `mkt_*` tables |
| `src/admin/lib/ai.ts` | Thin wrappers over the `mkt-*` AI edge functions (`generateCopy`, `schedulePhase`, …) |
| `src/admin/lib/gcal.ts` | Builds a no-OAuth Google Calendar "TEMPLATE" reminder URL for a scheduled post |
| `src/admin/lib/csv.ts` | Parses the team's "Marketing Social Tracker" CSV into `mkt_content` rows (via `papaparse`) |
| `src/admin/lib/outreachCsv.ts` | Parses influencer-list CSVs; infers gender / age bucket / Milan flag |
| `src/admin/lib/storage.ts` | Upload + signed-URL helpers for the `mkt-media` / `mkt-assets` / `mkt-brand-docs` buckets |
| `src/admin/hooks/useContent.ts` | CRUD + optimistic update for `mkt_content` (the posts) |
| `src/admin/hooks/usePlanPhases.ts` | CRUD for `mkt_plan_phases` (campaign phases) |
| `src/admin/hooks/useGenerations.ts` | Reads `mkt_generations` and selects the active AI output for a post |
| `src/admin/hooks/useLookups.ts` | Personas, brand docs, brand assets (read + upsert + delete) |
| `src/admin/hooks/useOutreach.ts` | MCP connections, outreach lists/contacts, runs (the outreach engine) |
| `src/admin/types.ts` | `mkt_*` domain types (content/plan/persona/generation/brand-doc) |
| `src/admin/types-outreach.ts` | Outreach domain types (MCP connection, list, contact, statuses) |
| `src/admin/i18n/it.ts` | Italian UI strings for the admin module (admin is IT-only) |
| `src/admin/pages/Login.tsx` | Email/password sign-in (Supabase Auth) |
| `src/admin/pages/Dashboard.tsx` | Admin home |
| `src/admin/pages/ContentPlan.tsx` | The core: phases + posts grid, AI generation, CSV import |
| `src/admin/pages/Calendar.tsx` | Scheduled posts calendar + publish flow |
| `src/admin/pages/Outreach.tsx` | Influencer outreach campaigns |
| `src/admin/pages/Branding.tsx` | Brand documents + AI-extracted personas + assets |
| `src/admin/pages/Settings.tsx` | Module settings |
| `src/admin/components/content/*` | Post editor dialog, CSV import dialog, AI chat panel, generations history, media uploader |
| `src/admin/components/calendar/*` | `PublishingCard`, `ConfirmPublishDialog` |

## Routing

Mounted from the app router in `src/App.tsx`:

```tsx
<Route path="/admin/*" element={<AdminRoutes />} />
```

`AdminRoutes.tsx` wraps everything in its own `QueryClientProvider` and defines:

```tsx
<Routes>
  <Route path="login" element={<Login />} />
  <Route element={<AdminGuard><AdminLayout /></AdminGuard>}>
    <Route index element={<Dashboard />} />
    <Route path="content-plan" element={<ContentPlan />} />
    <Route path="calendar" element={<CalendarPage />} />
    <Route path="outreach" element={<Outreach />} />
    <Route path="branding" element={<Branding />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

`/admin/login` is **outside** the guard. Every other admin route is a child of the guarded
layout route, so the guard runs once and the layout (sidebar + `<Outlet/>`) is shared.

## Authentication & Authorization

Admin auth is the one place in the app that uses **real Supabase Auth** end-to-end (the
consumer client area is demo-only — see [`../auth/TECHNICAL.md`](../auth/TECHNICAL.md)).

### `useAdminSession()`

```ts
export interface AdminSession {
  loading: boolean;
  email: string | null;
  isAdmin: boolean;
  userId: string | null;
}
```

Behaviour:

1. Subscribes to `supabase.auth.onAuthStateChange` and also calls `supabase.auth.getSession()`
   on mount.
2. Whenever a session is observed, it reads the user's `email`/`id` and **checks the
   allowlist**: `sb.from("mkt_admins").select("id").ilike("email", email).maybeSingle()`.
3. `isAdmin` is `true` iff a matching `mkt_admins` row exists (case-insensitive email match).
4. Unsubscribes on unmount; guards against setState-after-unmount with a `cancelled` flag.

### `AdminGuard`

```
loading           → render "Caricamento..." splash
no email (signed out) → <Navigate to="/admin/login" state={{ from }} />
email but !isAdmin    → <Navigate to="/" />   (kick non-admins back to the public site)
isAdmin               → render children
```

> Authorization model: the **frontend** guard hides the UI, and the **backend** `mkt-*`
> edge functions independently re-check `mkt_admins` (they run with `verify_jwt = false`).
> The allowlist table is the single source of truth for "who is an admin".
> `mkt-bootstrap-admin` idempotently seeds the initial admin account.

## Data model (`mkt_*` tables)

Types live in `src/admin/types.ts` and `src/admin/types-outreach.ts`. Key entities:

| Table | Type | Role |
| ----- | ---- | ---- |
| `mkt_admins` | — | Allowlist of admin emails (authorization) |
| `mkt_plan_phases` | `MktPlanPhase` | Campaign phases (`phase_index`, `target_post_count`, date range, `status: open\|closed`) |
| `mkt_content` | `MktContent` | The posts. Full IG post record: `sequence_number`, `scheduled_date/time`, `persona_id`, `funnel_stage`, `content_format`, `hook`, `post_copy`, `cta`, `media_prompt`, `media_url`, `status`, `published_link`, metrics (`views`, `dms_received`) |
| `mkt_generations` | `MktGeneration` | AI outputs per post (`gen_type: copy\|media_prompt\|chat_diff`, `is_selected`) |
| `mkt_personas` | `MktPersona` | Audience personas (pain/solution/copy-focus); `is_ai_generated`, `source_doc_id` |
| `mkt_brand_docs` | `MktBrandDoc` | Uploaded brand documents with async `processing_status: pending\|processing\|done\|failed` and an AI `recap` |
| `mkt_brand_assets` | — | Reusable brand media assets |
| `mkt_mcp_connections` | `MktMcpConnection` | Instagram MCP (Composio) connections; OAuth tokens + `status: pending\|authenticating\|ready\|failed` |
| `mkt_outreach_lists` | `MktOutreachList` | Named influencer lists (with target IG page) |
| `mkt_outreach_contacts` | `MktOutreachContact` | Imported influencers; derived `gender`/`age_bucket`/`is_milan`; `status: new\|queued\|contacted\|replied\|skipped\|failed` |

### `MktContent` status lifecycle

```
Draft → Approval → Validated → Scheduled → Posted
```

`mkt-schedule-phase` only assigns dates/times to posts in **`Validated`** state (moving them
to `Scheduled`), respecting global ordering (`phase_index ASC`, then `sequence_number ASC`).

## Data-access hooks

All hooks use `@tanstack/react-query` against the untyped `sb` handle. Conventions:
query keys are the table name (e.g. `["mkt_content"]`); mutations `invalidateQueries` on
success; `useUpdateContent` additionally does an **optimistic update** with `onMutate` +
rollback.

| Hook (file) | Exposes |
| ----------- | ------- |
| `useContent.ts` | `useContent`, `useUpdateContent` (optimistic), `useCreateContent`, `useDeleteContent`, `useBulkCreateContent` (CSV import) |
| `usePlanPhases.ts` | `usePlanPhases`, `useCreatePlanPhase`, `useUpdatePlanPhase`, `useClosePlanPhase` |
| `useGenerations.ts` | `useGenerations(contentId)`, `useSelectGeneration` (unselects siblings, selects one, copies output into `mkt_content`) |
| `useLookups.ts` | `usePersonas`, `useBrandDocs` + `useUpsertBrandDoc` + `useDeleteBrandDoc`, `useBrandAssets` (+ mutations) |
| `useOutreach.ts` | `useMcpConnections` (+ upsert/delete), MCP `list_tools` invoker, `useOutreachLists` + `useCreateList`, contacts and outreach-run hooks |

## AI helpers (`src/admin/lib/ai.ts`)

Thin typed wrappers around `sb.functions.invoke(...)`. Each throws on transport error
**and** on a `data.error` payload returned by the function.

| Function | Edge function | Purpose |
| -------- | ------------- | ------- |
| `generateCopy(postId, mode)` | `mkt-generate-copy` | `mode: "generate" \| "rewrite" \| "shorten" \| "retone"` — produces a `mkt_generations` row |
| `schedulePhase(phaseId)` | `mkt-schedule-phase` | AI assigns dates/times to `Validated` posts in a phase |
| (chat panel) | `mkt-chat-post` | Field-level edit suggestions for a single post draft |
| (branding) | `mkt-process-brand-doc` | Async: classify a brand doc, write `recap`, extract personas |
| (outreach) | `mkt-mcp-composio`, `mkt-outreach-execute`, `mkt-outreach-poll-replies` | Instagram action bridge over Composio MCP |

## Other libraries

### `gcal.ts` — `buildGoogleCalendarLink(post, persona?)`

Builds a `https://calendar.google.com/calendar/render?action=TEMPLATE…` URL for a 15-minute
reminder event (UTC) so the operator can manually publish the IG post at the scheduled time.
Returns `null` if the post has no `scheduled_date`. **No OAuth** — pure URL construction.

### `csv.ts` — Social Tracker import

Parses the team's "Marketing Social Tracker" Excel/CSV (columns: `#`, Day, Channel, Tipo
Format, Tipo Persona, Obiettivo, Fase del Funnel, Situazione, Post Copy, Content type, CTA,
Media Prompt, Media Links, Status, Post Link) into `ParsedRow[]`, matching persona names to
`mkt_personas` rows (`_personaMatched` flags unmatched). Feeds `useBulkCreateContent`.

### `outreachCsv.ts` — Influencer import

Parses semicolon-separated influencer exports (`creator; username; followers; Engagement;
ER; Audience city; Audience age; Avg. reel plays; Avg. views; Email`). Derives:
- `gender` from name suffix heuristics (`FEMALE_HINTS`/`MALE_HINTS`),
- `age_bucket` from the audience-age column,
- `is_milan` from the audience city.

### `storage.ts` — Buckets

Three buckets: `mkt-media`, `mkt-assets`, `mkt-brand-docs`. Files are stored under a
`crypto.randomUUID()` filename. URLs are persisted in a packed form `bucket:/path`
(`packBucketUrl` / `bucketAndPathFromUrl`) and resolved to **signed URLs** on read
(`getSignedUrl`, default 1h expiry) — buckets are private.

## Pages

| Page | Route | What it does |
| ---- | ----- | ------------ |
| `Login` | `/admin/login` | Supabase email/password sign-in |
| `Dashboard` | `/admin` | Landing/overview |
| `ContentPlan` | `/admin/content-plan` | Phases + posts grid; per-post AI generate/rewrite; CSV import; post editor dialog |
| `Calendar` | `/admin/calendar` | Scheduled posts on a calendar; `PublishingCard` + `ConfirmPublishDialog`; Google Calendar reminder links |
| `Outreach` | `/admin/outreach` | MCP connection setup, influencer lists/contacts, run execution + reply polling |
| `Branding` | `/admin/branding` | Upload brand docs (async AI processing), view/edit AI-extracted personas, manage assets |
| `Settings` | `/admin/settings` | Module settings |

A global **AI chat drawer** (`AdminAIChatDrawer`) is available from the layout across pages.

## i18n

The admin module is **Italian-only** and does **not** use the app-wide `LanguageContext`
(see [`../i18n/TECHNICAL.md`](../i18n/TECHNICAL.md)). All strings live in
`src/admin/i18n/it.ts` (`appName: "MyPersonal Admin"`, nav labels, etc.).

## Gotchas

- **Untyped data layer.** `sb` is `any`. There is no compile-time safety on `mkt_*` queries
  — column typos surface only at runtime. The `types.ts` interfaces are the contract; keep
  them in sync with the migrations manually.
- **`verify_jwt = false`.** Every `mkt-*` edge function is publicly invokable and must
  re-check `mkt_admins` server-side. Treat these endpoints as security-sensitive.
- **Isolated cache.** Do not expect admin queries to share cache with the consumer app —
  they run under a different `QueryClient`.
- **Manual publishing.** Posting to Instagram for content (vs. outreach actions) is
  operator-driven via Google Calendar reminders; the calendar link is a convenience, not an
  automated publish.
