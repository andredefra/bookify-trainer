# Supabase Backend — Technical Reference

## Overview

Supabase is the entire backend: **Postgres** (schema + RLS), **Auth**, **Storage**, and
**Deno edge functions**. There is no separate API server. The frontend talks to Postgres
directly through the generated client (`src/integrations/supabase/client.ts`) and invokes
edge functions via `supabase.functions.invoke(...)`.

- Project URL and **anon (publishable)** key are hardcoded in `client.ts` (committed
  intentionally) and mirrored in `.env` as `VITE_SUPABASE_*`.
- The generated `Database` types live in `src/integrations/supabase/types.ts`
  (**auto-generated — do not hand-edit**). Tables added by migration but not yet
  regenerated are accessed through the untyped `sb` handle (see the admin module).

## Database & migrations

- **Source of truth:** `supabase/migrations/` — **91+ timestamped SQL files**
  (`YYYYMMDDHHMMSS-<uuid>.sql`). **Add a new migration; never edit an existing one.**
- Each migration typically: `CREATE TABLE` → `GRANT` to `authenticated`/`service_role` →
  `ENABLE ROW LEVEL SECURITY` → `CREATE POLICY …` → `CREATE TRIGGER … update_updated_at_column()`.

### Table families (by prefix / domain)

| Family | Example tables | Purpose |
|--------|----------------|---------|
| Profiles & auth | `profiles`, `user_subscriptions` | User profile + subscription tier |
| Trainer ↔ client | `client_invitations`, `trainer_reviews`, `trainer_notifications` | Roster, invites, reviews, alerts |
| Programs | `training_plans`, program/assignment tables, `client_package_assignments` | Training programs & assignments |
| Sessions | session/booking/postponement tables | Scheduling & postponements |
| Packages & payments | package tables, `*payments*`, transactions | Commercial layer |
| Check-ins | `check_in_settings`, `check_in_submissions` | Client check-in feature |
| Messaging | `conversations`, messages | In-app chat |
| Gym | `gym_clients`, `gym_packages`, `gym_package_assignments`, `gym_connection_requests`, `gym_client_communications`, `gym_email_templates`, `gym_automation_rules` | Gym/studio domain |
| Marketing (`mkt_*`) | `mkt_admins`, `mkt_content`, `mkt_plan_phases`, `mkt_generations`, `mkt_personas`, `mkt_brand_docs`, `mkt_brand_assets`, `mkt_mcp_connections`, `mkt_outreach_lists`, `mkt_outreach_contacts` | Admin marketing module |

## RLS model

RLS is pervasive: **292 `CREATE POLICY`** statements across migrations, **243** referencing
`auth.uid()`. Two policy styles are used:

1. **Ownership predicates** — e.g. `trainer_id = auth.uid()` for trainer-owned rows, or
   `client_id`-based predicates for client-owned rows.
2. **`SECURITY DEFINER` helper functions** — to avoid recursive policy evaluation and
   centralize role checks:
   - `public.is_mkt_admin()` — used by every `mkt_*` table policy (`FOR ALL USING
     (is_mkt_admin()) WITH CHECK (is_mkt_admin())`). Resolves admin membership server-side.
   - `public.has_role(...)` — role check helper.
   - `public.update_updated_at_column()` — shared trigger function for `updated_at`.

Grants follow the pattern: `authenticated` gets `SELECT/INSERT/UPDATE/DELETE`, `service_role`
gets `ALL` (edge functions running with the service-role key bypass RLS).

> **As-built caveat.** Because consumer dashboards run as the **anon role against a shared
> `DEMO_CLIENT_ID`** (see [`../auth/TECHNICAL.md`](../auth/TECHNICAL.md)), the ownership
> policies are not yet exercising real per-user isolation on the consumer side. The policy
> infrastructure exists; the real-auth wiring does not.

## Storage buckets

Created via migrations (`storage.buckets`). Buckets observed:

| Bucket | Used for |
|--------|----------|
| `media` | General media |
| `user-media` | Client/user uploads (e.g. health docs, progress photos) |
| `chat-media` | Message attachments |
| `mkt-assets` | Marketing brand assets |
| `mkt-brand-docs` | Marketing brand documents (analyzed by `mkt-process-brand-doc`) |

Admin storage helpers (`src/admin/lib/storage.ts`) additionally reference an `mkt-media`
bucket; URLs are persisted packed as `bucket:/path` and resolved to **signed URLs** on read
(buckets are private). *(If `mkt-media` is missing from migrations, that's a gap to verify.)*

## Edge functions

23 Deno functions under `supabase/functions/`, one `index.ts` each. Common shape: handle
`OPTIONS` CORS preflight (`Access-Control-Allow-Origin: *`), read secrets via
`Deno.env.get(...)`, and (for privileged work) build a **service-role** Supabase client.

### Billing / Stripe

| Function | Input | Services | Secrets | Service-role | `verify_jwt` |
|----------|-------|----------|---------|:---:|:---:|
| `create-checkout` | `{ priceId }` | Stripe (create session) | `STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY` | no (anon) | true (default) |
| `customer-portal` | Auth header | Stripe (portal session) | `STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | yes | true |
| `check-subscription` | Auth header | Stripe (customer lookup) | same as above | yes | true |

### AI / analysis

| Function | Input | Services | Secrets |
|----------|-------|----------|---------|
| `openai-chat` | `{ message, conversation_id?, action_type?, plan_id? }` | OpenAI Chat (`gpt-4o-mini`) | `OPENAI_API_KEY`, `SUPABASE_*` (service-role) |
| `openai-realtime` | WebSocket upgrade | OpenAI Realtime API (`wss://`) | `OPENAI_API_KEY` |
| `openai-trainer-chat` | `{ message, conversation_id?, user_context?, workoutContext?, imageUrl? }` | OpenAI Chat (`gpt-4o-mini`) | `OPENAI_API_KEY`, `SUPABASE_*` (service-role) |
| `analyze-training-program` | program + workout-log payload | OpenAI Chat | `OPENAI_API_KEY` |
| `analyze-workout` | `{ workoutLog, fitnessData, userProfile }` | OpenAI Chat | `OPENAI_API_KEY` |
| `analyze-program-document` | `{ documentText? }` | **Lovable AI Gateway** | `LOVABLE_API_KEY` |

### Sessions / postponement

| Function | Input | Services | Secrets |
|----------|-------|----------|---------|
| `handle-session-postponement` | `{ postponement_id, participants[], session_details }` | Resend (email) | `RESEND_API_KEY`, `SUPABASE_*` (service-role) |
| `respond-to-postponement` | query: `token`, `response=accept\|decline` | — | `SUPABASE_*` (service-role) |
| `detect-installment` | `{ clientName, amount, transactions, date }` | Lovable AI Gateway | `LOVABLE_API_KEY` |

### Contact / email

| Function | Input | Services | Secrets |
|----------|-------|----------|---------|
| `send-contact-email` | `{ subject, firstName, lastName, email, gym, city, message }` | Resend | `RESEND_API_KEY` |
| `send-marketing-email` | `{ templateId, testEmail?, isTest?, assignmentId?, clientData? }` | Resend | `RESEND_API_KEY`, `SUPABASE_*` (service-role) |

### Marketing automation (`mkt-*`) — all `verify_jwt = false`

These skip JWT verification and authorize via the `mkt_admins` allowlist server-side. All use
the service-role client.

| Function | Input | Services |
|----------|-------|----------|
| `mkt-bootstrap-admin` | none | seeds/repairs the admin account idempotently |
| `mkt-generate-copy` | `{ mode, postContext?, existingCopy?, userQuestion? }` | Lovable AI (copy gen/rewrite/shorten/retone) |
| `mkt-schedule-phase` | `{ phaseId }` | Lovable AI (assigns dates/times to `Validated` posts) |
| `mkt-process-brand-doc` | `{ docId }` | Lovable AI (classify doc, recap, extract personas) — fire-and-forget |
| `mkt-chat-post` | `{ postId, message, history? }` | Lovable AI (per-post edit suggestions) |
| `mkt-mcp-composio` | `{ operation\|op, toolName?, args?, connectionId? }` | Composio MCP (Instagram tool bridge) |
| `mkt-outreach-execute` | `{ op: generate\|tick, runId?, dryRun? }` | Composio MCP (follow/DM/comment actions) |
| `mkt-outreach-poll-replies` | `{ runId? }` | Composio MCP (poll DMs/comments) + Lovable AI (sentiment) |

### Cron

| Function | Trigger | Purpose |
|----------|---------|---------|
| `marketing-automation-cron` | scheduled | Evaluates active automation rules (e.g. package expiry) and invokes `send-marketing-email` |

### `verify_jwt` summary (`supabase/config.toml`)

`verify_jwt = false` is set **only** for the 8 `mkt-*` functions. All other functions use the
default (`true`) and rely on the `Authorization` bearer token.

### Secrets

| Secret | Used by |
|--------|---------|
| `OPENAI_API_KEY` | `openai-*`, `analyze-training-program`, `analyze-workout` |
| `STRIPE_SECRET_KEY` | `create-checkout`, `customer-portal`, `check-subscription` |
| `RESEND_API_KEY` | `send-contact-email`, `send-marketing-email`, `handle-session-postponement` |
| `LOVABLE_API_KEY` | `mkt-*`, `detect-installment`, `analyze-program-document` |
| `SUPABASE_SERVICE_ROLE_KEY` | all privileged functions (Stripe, email, session, marketing, cron) |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY` | client construction |

> **Note:** two distinct AI providers are in use — **OpenAI** (chat/realtime/analysis on the
> trainer/client product) and the **Lovable AI Gateway** (all `mkt-*` marketing AI plus
> `detect-installment` and `analyze-program-document`). There is no Azure OpenAI and no
> pgvector/embedding pipeline in the codebase today.

## Functions invoked from the frontend

| Caller | Function |
|--------|----------|
| `useClientPostponements` / `useSessionPostponements` | `respond-to-postponement`, postponement notification |
| `useInstallmentDetection` | `detect-installment` |
| `useContactForm` | `send-contact-email` |
| billing hooks | `create-checkout`, `customer-portal`, `check-subscription` |
| AI features | `openai-chat`, `openai-trainer-chat`, `openai-realtime`, `analyze-*` |
| admin `lib/ai.ts`, `useOutreach` | `mkt-*` |

## Gotchas

- **Service-role bypasses RLS.** Any logic in an edge function runs with full DB access — RLS
  is not a safety net there. The `verify_jwt = false` `mkt-*` functions are therefore
  security-sensitive and must re-check `is_mkt_admin()` / `mkt_admins` themselves.
- **Generated files.** `client.ts` and `types.ts` are regenerated by Supabase/Lovable;
  manual edits are lost. New `mkt_*` columns won't appear in `Database` types until
  regenerated — hence the untyped `sb` handle.
- **Migrations are append-only.** Renumbering or editing old migrations breaks the migration
  history.
