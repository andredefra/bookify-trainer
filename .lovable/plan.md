
# MyPersonal Admin Marketing Tool — v1 Plan

Fully isolated internal module. **No existing files, routes, components, or tables are modified or deleted.** Only additive changes: a single new route entry in `src/App.tsx` (`/admin/*`) and brand new files under `src/admin/**`.

## 1. Access control

- Use existing Supabase Auth (email/password). The admin user (`andrea.mypersonal.fit@gmail.com`) is created **manually** in the Supabase dashboard — no credentials hardcoded.
- New table `mkt_admins(email)` seeded with that email. Route guard checks: logged in **and** email in `mkt_admins`. Non-admins are bounced to `/`.
- `/admin/login` is a dedicated login page (separate from existing `/login`, which keeps its demo behavior untouched).

> Note on the "@Tr3ggy@" password in the message: the attached spec explicitly forbids hardcoding credentials. I will follow the spec — the password is set once in the Supabase Auth dashboard, not committed to code.

## 2. Database (single migration, all `mkt_` prefixed, RLS on)

Tables exactly per spec §4:
- `mkt_admins` — email allowlist
- `mkt_personas` — seeded: Giulia, Matteo, Lorenzo, Luca, Andrea, Marco
- `mkt_content` — editorial backlog (the core table) with `updated_at` trigger
- `mkt_generations` — unlimited AI variant history (cascade delete with content)
- `mkt_brand_docs` — text context fed to AI when `is_active`
- `mkt_brand_assets` — logo/colors/reference images
- `mkt_connectors` — seeded: Lovable AI (active), Google Calendar (active), Image Generation (coming_soon), Higgsfield Video (coming_soon)

RLS policy on every `mkt_` table: allow only if `auth.email()` is in `mkt_admins`. Helper SQL function `public.is_mkt_admin()` (SECURITY DEFINER) to avoid recursive policies. GRANTs to `authenticated` + `service_role` for every table.

Three **private** storage buckets: `mkt-media`, `mkt-assets`, `mkt-brand-docs`. Bucket policies mirror the admin check. All downloads use `createSignedUrl`.

## 3. New dependencies

`@dnd-kit/core`, `@dnd-kit/sortable`, `papaparse` (+ `@types/papaparse`). TanStack Query and sonner are already in the project.

## 4. File layout (all new, under `src/admin/`)

```text
src/admin/
  routes/AdminRoutes.tsx          // nested <Routes> mounted at /admin/*
  guards/AdminGuard.tsx           // checks session + mkt_admins
  layout/AdminLayout.tsx          // sidebar nav (IT labels), header, AI chat drawer slot
  layout/AdminSidebar.tsx
  layout/AdminAIChatDrawer.tsx    // copy-only assistant; placeholder hook for v3 agentic actions
  pages/Login.tsx                 // /admin/login
  pages/Dashboard.tsx             // /admin
  pages/Branding.tsx              // /admin/branding
  pages/ContentPlan.tsx           // /admin/content-plan
  pages/Calendar.tsx              // /admin/calendar
  pages/Settings.tsx              // /admin/settings
  components/content/PostEditorDialog.tsx
  components/content/GenerationsHistoryPanel.tsx
  components/content/MediaUploader.tsx         // manual upload + disabled "Genera con AI"
  components/content/CsvImportDialog.tsx
  components/content/KanbanBoard.tsx           // Draft + Approval columns
  components/calendar/CalendarGrid.tsx         // dnd-kit month/week
  components/calendar/PublishingCard.tsx       // copy/download/gcal/confirm
  components/branding/BrandDocsSection.tsx
  components/branding/BrandAssetsSection.tsx
  components/dashboard/{NextPostCard,StatusCounts,PersonaBalance,ThisWeekList}.tsx
  components/settings/ConnectorCard.tsx
  lib/ai.ts                       // generateCopy(post, mode) wrapper around Lovable AI
  lib/gcal.ts                     // buildGoogleCalendarLink(post)
  lib/storage.ts                  // signed-URL helpers per bucket
  lib/csv.ts                      // papaparse + persona name → id mapping
  hooks/useAdminSession.ts
  hooks/useContent.ts, useGenerations.ts, useBrandDocs.ts, useBrandAssets.ts, useConnectors.ts, usePersonas.ts
  queries/keys.ts
  i18n/it.ts                      // UI strings (Italian)
```

`src/App.tsx` gets exactly one additive line: `<Route path="/admin/*" element={<AdminRoutes />} />`. No other edits anywhere.

## 5. Pages (per spec §6, Italian UI)

- **Dashboard** `/admin`: Next post to publish (soonest Validated), status counts, persona balance bar (33/33/33 hint), this-week list.
- **Branding** `/admin/branding`: brand docs (upload file to `mkt-brand-docs` + editable text + `is_active` toggle) and brand assets (logo/images gallery + color swatches with hex).
- **Content Plan** `/admin/content-plan`: CSV import (preview before insert, downloadable template), "New Post" button, Kanban of Draft + Approval. Editor dialog with persona/format/hook/copy/CTA/media_prompt + AI actions (Genera/Riscrivi/Accorcia/Cambia tono), Generations history panel with "Usa questa", manual media upload (always-on) + disabled "Genera con AI" placeholder, Draft→Approval→Validated buttons with optimistic mutations.
- **Calendar** `/admin/calendar`: month/week view of Validated+Posted only; dnd-kit drag to set date/time; Publishing Card with Copia testo, Scarica media (signed URL), Aggiungi a Google Calendar (template link, no OAuth), Conferma pubblicato (paste IG URL → status=Posted). Overdue flag for past-date non-Posted.
- **Settings** `/admin/settings`: connector cards from `mkt_connectors`. Italian note that real keys live in Supabase secrets, not here.

## 6. AI (Lovable AI Gateway)

Single helper `src/admin/lib/ai.ts` exposing `generateCopy(postId, mode)` where `mode ∈ {generate, rewrite, shorten, retone}`. Implemented as a Supabase edge function `mkt-generate-copy` that:
1. Loads the post + linked persona + funnel stage + all `is_active` brand docs.
2. Builds a system prompt = fixed Italian tone-of-voice (spec §7) + persona block + brand context.
3. Calls Lovable AI Gateway (`LOVABLE_API_KEY`, model `google/gemini-2.5-flash`).
4. Inserts the result into `mkt_generations` (no replacement). Returns the new row.

Unlimited generations. "Usa questa" sets `is_selected=true` (others false) and writes the text into `post_copy` / `hook` depending on `gen_type`. AI chat drawer is read-only: it generates suggestions but never writes to DB (clear `// TODO(v3): agentic actions` placeholder).

## 7. Google Calendar link (no OAuth)

`buildGoogleCalendarLink(post)` returns the `https://calendar.google.com/calendar/render?action=TEMPLATE&text=…&dates=…&details=…` URL per spec §8, 15-min event in UTC, all params URL-encoded.

## 8. Out of scope (hooks only)

- AI image/video generation → disabled "Genera con AI" button + `coming_soon` connectors.
- Higgsfield, Meta/IG API, GCal OAuth, agentic AI writes → not built; commented placeholders only.

## 9. Build order

1. Migration (tables + RLS + GRANTs + seeds + buckets + policies).
2. Edge function `mkt-generate-copy` + secret check (`LOVABLE_API_KEY` already present).
3. Route guard, layout, login page.
4. Content Plan (CSV, editor, AI, media upload, status flow).
5. Calendar (drag-drop, Publishing Card, GCal link, confirm posted).
6. Dashboard widgets.
7. Branding + Settings.

## Post-implementation steps the user must do once

1. In Supabase Auth → Users, create user `andrea.mypersonal.fit@gmail.com` with the chosen password.
2. The migration auto-seeds that email into `mkt_admins` so the guard lets them in immediately.
3. Visit `/admin/login`.
