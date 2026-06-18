# Piano — Area "Outreach" Instagram con Composio MCP

Nuova sezione **Admin > Marketing > Outreach** per gestire campagne di contatto manuale-style su Instagram tramite Composio MCP (account `andredefra64@gmail.com`, server `https://connect.composio.dev/mcp`).

## 1. Connessione MCP Composio

- Aggiungo un **client MCP runtime** (AI SDK `@ai-sdk/mcp`) che si collega a `https://connect.composio.dev/mcp` via OAuth.
- Tabella `mkt_mcp_connections` (scoped a admin marketing): `id, provider='composio', email, mcp_url, oauth_tokens (encrypted), status, last_check_at`.
- UI in **Outreach > Impostazioni**: bottone "Collega Composio" → OAuth flow → mostra stato `ready` + email connessa + lista tool Instagram esposti (follow, sendDM, comment, getProfile, getPostComments, getDMs).
- Edge function `mkt-mcp-composio` (con `verify_jwt=false` + check admin in-code) per: connect/list-tools/call-tool.

## 2. Liste contatti (lead list)

- Tabella `mkt_outreach_lists`: `id, name, instagram_target_page, created_at`.
- Tabella `mkt_outreach_contacts`: `id, list_id, creator, username, followers, engagement, er, audience_city, audience_age, avg_reel_plays, avg_views, email, gender (m/f/unknown auto-detected), age_bucket (auto), is_milan (bool auto da audience_city)`.
- **Import CSV bulk** con colonne esatte fornite (`creator; username; followers; Engagement; ER; Audience city; Audience age; Avg. reel plays; Avg. views; Email`).
- Al momento dell'import:
  - **gender** dedotto dal nome `creator` via heuristic + fallback AI (Lovable AI Gateway, batch),
  - **is_milan** = `audience_city` contiene "Milan/Milano",
  - **age_bucket** = parsing su `Audience age` (es. "25-34" dominante).

## 3. Preset messaggi DM segmentati

- Tabella `mkt_dm_presets`: `id, name, gender (m/f/any), city_filter (milan/non_milan/any), age_bucket (18-24/25-34/35-44/any), body_template (con `{{username}}`, `{{creator}}`), is_active`.
- UI **Outreach > Preset DM**: CRUD con anteprima. Seed iniziale: 4 preset base (uomo MI, donna MI, uomo non-MI, donna non-MI).
- Al momento dell'azione il sistema sceglie automaticamente il preset migliore in base a `gender + is_milan + age_bucket` (fallback: any).

## 4. Sequenza di automazione "human-like"

Per ogni contatto, sequenza in 3 step con **delay randomizzati** (es. 30-120s tra step, 2-10min tra contatti) per sembrare manuale:

1. **Follow** del `username`
2. **DM** col preset matchato (con micro-variazioni: saluto, emoji)
3. **Commento** su ultimo post pubblico (testo soft tipo "ti ho scritto in DM ✨" — anch'esso da preset commenti)

- Tabella `mkt_outreach_runs`: `id, list_id, status (draft/running/paused/done), started_at, finished_at, config (jsonb: delays, daily_cap, dry_run)`.
- Tabella `mkt_outreach_actions`: `id, run_id, contact_id, step (follow/dm/comment), preset_id, status (pending/done/failed/skipped), payload, response, executed_at, error`.
- Edge function `mkt-outreach-execute` invocata da **pg_cron** ogni minuto: prende N azioni `pending` dovute, le esegue via MCP Composio, rispetta `daily_cap` (default 30 DM/giorno per evitare ban IG).
- **Dry-run mode** per testare senza chiamare davvero IG.

## 5. Tracking risposte

- Edge function `mkt-outreach-poll-replies` schedulata ogni 15min: per ogni contatto con DM inviato, chiama `getDMs`/`getPostComments` via Composio e aggiorna:
- Tabella `mkt_outreach_replies`: `id, action_id, contact_id, channel (dm/comment), text, sentiment (positive/neutral/negative — via Lovable AI), received_at, raw`.
- Dashboard Outreach mostra KPI: contatti totali, follow fatti, DM inviati, commenti, **% risposte**, breakdown sentiment, lista risposte cliccabili.

## 6. UI / Routing

Nuova voce sidebar **Outreach** (icona `Send`) → 4 sub-tab:

- **Liste** — import CSV, gestione liste/contatti, filtri (gender/città/età), assegna a run
- **Preset DM** — CRUD preset segmentati
- **Campagne (Runs)** — crea run da lista + preset set + config delay/cap, start/pause, progresso live
- **Risposte & Analytics** — KPI + tabella risposte con sentiment
- **Impostazioni** (in alto) — connessione Composio MCP

## 7. Sicurezza & isolamento

- Tutte le nuove tabelle: RLS con `is_mkt_admin()` only, grant solo a `authenticated` + `service_role`.
- OAuth token Composio cifrati a riposo (pgsodium se disponibile, altrimenti scope ristretto + service_role-only).
- Validazione CSV server-side con Zod, max 5000 righe per import.
- Rate limit hard: max 30 DM/giorno, max 50 follow/giorno (configurabile, default conservativo).

## File toccati

- **Migration**: 1 file (6 nuove tabelle + RLS + grants + cron jobs)
- **Edge functions**: 3 nuove (`mkt-mcp-composio`, `mkt-outreach-execute`, `mkt-outreach-poll-replies`)
- **Frontend nuovo**: `src/admin/pages/Outreach.tsx` + 5 componenti tab + 3 hook (`useOutreachLists`, `useOutreachRuns`, `useDmPresets`) + tipi
- **Frontend edit**: `AdminSidebar.tsx` (voce Outreach), `AdminRoutes.tsx` (route), `i18n/it.ts`, `config.toml`
- **Lib**: `src/admin/lib/composio.ts` (wrapper client per chiamare le edge MCP)

## Domande operative

1. **Account Instagram da cui partono le azioni**: quale username IG verrà collegato in Composio? (lo specificherai dopo)
2. **Daily cap**: confermi 30 DM + 50 follow al giorno come default? (più alti = rischio ban IG)
3. **Commento post**: vuoi che il commento sia sempre sull'**ultimo** post, o su un post **random** tra gli ultimi 3-5 (più naturale)?
4. **Dry-run**: vuoi che la prima campagna parta automaticamente in dry-run finché non confermi 5-10 esiti reali?

Confermi per procedere o aggiusto qualcosa?