# Admin AI: make it work, help assistant, truthful status

## 1) Why it fails
- All admin AI edge functions (mkt-process-brand-doc, mkt-generate-copy, mkt-chat-post, mkt-schedule-phase; the chat drawer calls mkt-generate-copy) call the Lovable AI gateway with `LOVABLE_API_KEY` from the Supabase secrets.
- Lovable only registers that key for projects running on Lovable Cloud. This project runs on your own Supabase, so the key stored there is not in Lovable's registry and the gateway rejects every call (403 `lovable_api_key_not_registered`).
- "Attivo" in Impostazioni is a fixed value saved in the connectors table, not a live check.

## Recommendation: option (b), Anthropic (Claude)
- (a) isn't possible as things stand. No button or setting registers Lovable AI for an external Supabase. The only route is moving the whole backend to Lovable Cloud, which is a migration and out of scope.
- (b) works with your current setup. It is billed to your own Anthropic account, and you control the key.

### Steps the owner does himself
1. Create an account at console.anthropic.com, add a payment method or credit, and create an API key under API Keys.
2. In Supabase: Project cxclisripwxqathhnjfx > Edge Functions > Secrets > Add new secret. Name it `ANTHROPIC_API_KEY` and paste the key.
3. Optionally delete the old `LOVABLE_API_KEY` secret, since nothing will use it any more.
4. After I deploy, open Impostazioni and press "Verifica": it should show Attivo.

## Build steps
1. Add one shared Claude helper in supabase/functions/_shared. It calls Anthropic Messages API `claude-sonnet-4-5` with the `ANTHROPIC_API_KEY` secret, and handles errors clearly: 401 shows "chiave non valida", 429 and 5xx are retried with limited backoff, and 400 shows a readable message.
2. Switch the four functions to this helper. Their prompts, inputs, outputs and database writes stay the same. JSON outputs use Claude tool-use for structured results.
3. Add a new function, `mkt-admin-assistant`, for the chat drawer:
   - Its system prompt has a guide to every admin section: Dashboard, Branding, Piano Contenuti, Calendario, CRM, Waitlist and Impostazioni.
   - The drawer sends the current page path.
   - Read-only tools run with the admin's own session (so existing permissions apply). They are: waitlist counts by audience and period, CRM contact and stage counts, posts by status and date, the brand document list, and the persona balance.
   - No insert, update or delete tools at all.
4. Change the drawer UI to show the current page name, suggested questions per page, and streamed answers. It stays a single conversation, kept in memory only.
5. Add `mkt-ai-health`, which makes a tiny test call. Impostazioni shows the AI status from that live result: Attivo, Chiave mancante, Chiave non valida, or Errore with the message. It checks on page load and has a "Verifica" button. The stored row is not used for AI any more.
6. Deploy the functions, then test each feature with the real key once it has been added.

## Technical notes
- Files: _shared/claude.ts (new), the 4 mkt-* functions, mkt-admin-assistant (new), mkt-ai-health (new), AdminAIChatDrawer.tsx, Settings.tsx, admin/i18n/it.ts.
- No schema changes and no data deletion. mkt-outreach-poll-replies is unused since Outreach was removed, so it stays untouched.
- Verification needs the key first: until it is added, health shows "Chiave mancante".

## Estimate
- Lovable credits to build this: about 6-10 messages of work.
- Anthropic running cost, roughly: brand doc about EUR 0.02-0.05 each, copy or chat reply about EUR 0.01, health check under EUR 0.001. For normal admin use, a few euro a month.
