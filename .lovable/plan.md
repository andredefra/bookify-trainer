# Admin AI: fix with Lovable AI, add a help assistant, show the real status

## 1) Why it fails
- All admin AI functions (mkt-process-brand-doc, mkt-generate-copy, mkt-chat-post, mkt-schedule-phase) call the Lovable AI gateway using `LOVABLE_API_KEY` from your Supabase secrets. The chat drawer goes through mkt-generate-copy.
- The gateway answers `lovable_api_key_not_registered`. This means the key saved in Supabase is not in Lovable's list of keys registered for this project. It may be stale, copied from elsewhere, or never registered.
- "Attivo" in Impostazioni is a fixed value stored in the connectors table, not a live check.

## Fix: keep Lovable AI and register a key for this project
Lovable AI does work with your own Supabase. The project needs a key that is registered for it and saved in your Supabase secrets.

1. I issue a fresh key for this project. Lovable registers it and saves it as `LOVABLE_API_KEY` in your connected Supabase's secrets. You don't type anything, and no key goes through the chat.
2. I redeploy the four mkt-* functions so they pick up the new key.
3. I test each function once and check the responses and the AI request log.
4. If the new key doesn't land in your Supabase secrets, there is one fallback step. The owner opens Supabase > Edge Functions > Secrets, deletes the old `LOVABLE_API_KEY`, and tells me; I then issue the key again.

Things the owner may need to check:
- The workspace has Lovable credits. Settings > Plans & credits.
- If the gateway answers that AI is turned off or a credit limit was reached, a workspace admin raises the limit in workspace settings.

Billing: AI usage comes out of the workspace's Lovable credits. Nothing is billed to the owner's own accounts.

## 2) Help assistant in the chat drawer
- New function `mkt-admin-assistant`, using the same Lovable AI gateway.
- It has a built-in guide to every admin section: Dashboard, Branding, Piano Contenuti, Calendario, CRM, Waitlist and Impostazioni. It answers "come faccio a…" questions.
- The drawer sends the page you are on. The assistant shows that page's name and suggested questions for it.
- Read-only tools run with the admin's own session, so the usual permissions apply:
  - waitlist counts by audience and period
  - CRM contact and stage counts
  - posts by status and date
  - the brand document list
  - persona balance
- No insert, update or delete tools at all, so it can never write anything.
- Answers stream in as they are written. The conversation is kept in memory only.

## 3) Truthful AI status
- New function `mkt-ai-health` makes a tiny test call.
- Impostazioni shows: Attivo (the test succeeded), Chiave non registrata, Crediti esauriti, or Errore with the message.
- It checks when the page opens and has a "Verifica" button.

## Technical notes
- Existing calls keep their current model and request shape. The new assistant and health functions use the current default model through the Responses endpoint, with streaming.
- Gateway error handling in all functions:
  - 402 or 403: shown clearly to the user, no retry.
  - 429 or 5xx: limited retries with backoff.
- Files: the 4 existing mkt-* functions (error handling only), mkt-admin-assistant (new), mkt-ai-health (new), AdminAIChatDrawer.tsx, Settings.tsx, admin/i18n/it.ts.
- No schema changes and no data deletion.

## Estimate
- Lovable credits to build this: about 5-8 messages.
- Running cost, from workspace AI credits, roughly:
  - each brand document: a few cents
  - each chat reply or copy: about a cent or less
  - each health check: negligible
