# Piano v2.1 — Storage admin-only + Fasi al posto dei Mesi

## 1. Storage Buckets (Admin > Marketing only)

Creazione di 2 bucket **privati**, dedicati esclusivamente all'area Admin Marketing:

- `mkt-brand-docs` — per PDF/DOCX/MD/TXT della knowledge base
- `mkt-assets` — per logo/font/immagini di brand

**RLS** su `storage.objects` per entrambi: solo chi soddisfa `public.is_mkt_admin()` può `SELECT/INSERT/UPDATE/DELETE`. Nessuna esposizione su `anon` o `authenticated` generici → impossibile che si confondano con `chat-media`, `user-media`, `images`, `media` (che restano invariati e public).

Il bucket esistente `mkt-media` (già nei riferimenti del codice) viene mantenuto se presente; se non esiste verrà creato anch'esso privato con stesse policy admin.

## 2. "Mesi" → "Fasi" sequenziali

Il piano contenuti non è più diviso per mese di calendario ma per **Fasi di produzione**, lavorate in sequenza giorno dopo giorno. L'AI calendarizzerà rispettando rigorosamente:
1. ordine di `phase_index` (Fase 1 prima di Fase 2),
2. all'interno della fase, ordine di `sequence_number`.

### Database (1 migration)

- Rinomina tabella `mkt_plan_months` → `mkt_plan_phases`
- Rinomina colonna `month_index` → `phase_index`
- Rinomina FK su `mkt_content`: `plan_month_id` → `plan_phase_id`
- `start_date` / `end_date` → diventano **opzionali** (NULL) — la fase non ha più un range vincolato
- Aggiunge `description text` e `target_post_count int` (opzionali) alla fase
- Label di default: `"Fase N"` invece di `"Mese N"`

### Edge function

- Rinomina `mkt-schedule-month` → `mkt-schedule-phase`
- Accetta `phaseId` invece di `monthId`
- Prende tutti i post **Validati** della fase (in ordine `sequence_number`)
- L'AI assegna date/orari **futuri** (a partire da domani) rispettando la sequenza globale: post della Fase 1 prima di quelli della Fase 2, e dentro la fase per `sequence_number` crescente
- Non c'è più vincolo `within(start_date, end_date)` — l'AI distribuisce nel periodo che ritiene ottimale

### Frontend

- `usePlanMonths.ts` → `usePlanPhases.ts` (stessa shape API, naming aggiornato)
- `ContentPlan.tsx`: tab "Fase 1, Fase 2, …" + dialog "Nuova fase" (label opzionale + descrizione, **niente date obbligatorie**)
- `PostEditorDialog.tsx` e `CsvImportDialog.tsx`: prop `planMonth` → `planPhase`, campo DB `plan_month_id` → `plan_phase_id`
- `it.ts`: blocco `month.*` → `phase.*` (`Nuova fase`, `Chiudi fase`, `Calendarizza con AI`, `Nessuna fase. Crea la prima per iniziare.`, ecc.)
- `Calendar.tsx`: nessun cambio logico (continua a mostrare Scheduled/Posted), solo label aggiornate dove menziona "mese"

## 3. Fuori scope (rimane com'è)

- Calendar view (Scheduled/Posted, read-only su Posted) — invariato
- Flusso di conferma pubblicazione — invariato
- Chat AI sui post (`mkt-chat-post`) — invariato
- Branding / processing brand docs — invariato (continua a usare gli stessi bucket, ora creati lato server)
- Dashboard KPI — invariato in v2.1

## File toccati

- **Migration**: 1 file (rename + nuove colonne)
- **Bucket creation**: via tool storage (2 bucket privati) + RLS policy
- **Edge functions**: 1 nuova (`mkt-schedule-phase`), 1 da rimuovere (`mkt-schedule-month`), aggiorno `config.toml`
- **Frontend**: `ContentPlan.tsx`, `usePlanPhases.ts` (nuovo), `PostEditorDialog.tsx`, `CsvImportDialog.tsx`, `Calendar.tsx`, `i18n/it.ts`, `types.ts`

Confermi per procedere?
