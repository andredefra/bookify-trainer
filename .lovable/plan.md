# Piano Contenuti v2

## 1. Kanban a 4 colonne
- **Bozza → In approvazione → Validato → Calendarizzato**
- Nuovo status `Scheduled` aggiunto a `mkt_content.status`.
- I post `Scheduled` restano editabili (modificabili sia da kanban che da Calendario).
- Quando nel **Calendario** l'operatore marca un post come **Posted** (pubblicato manualmente), il post diventa **read-only** ovunque (nessun edit consentito su nessun campo tranne le metriche `views` / `dms_received` / `published_link`).

## 2. Tab Mesi
- Sopra il kanban tab orizzontali: `Mese 1`, `Mese 2`, … + bottone `+ Nuovo mese`.
- Ogni mese ha `start_date`, `end_date`, `status` (`open` | `closed`), `month_index`.
- Bottone **"Chiudi mese"**: blocca read-only tutto il mese (anche post non ancora Posted) e si passa al successivo. Il mese chiuso resta consultabile in sola lettura.
- Creazione nuovo mese: dialog con date inizio/fine.

## 3. Sequenza & import template
- Ogni post ha `sequence_number` (intero progressivo per mese).
- All'import CSV/Excel: numerazione automatica nell'ordine del file, badge `#N` visibile sulla card.
- L'ordine `sequence_number` è il vincolo che lo scheduler AI deve rispettare (post #5 sempre dopo #4).

## 4. AI Scheduler
- L'utente NON inserisce data/ora per il singolo post. Inserisce solo `start_date` / `end_date` del mese.
- Edge function nuova **`mkt-schedule-month`** (Lovable AI gateway, `google/gemini-3-flash-preview`):
  - Input: tutti i post `Validated` del mese ordinati per `sequence_number` + persona + formato + brand docs attivi (strategia).
  - Output: per ogni post `scheduled_date` + `scheduled_time` rispettando sequenza, distribuendo nel range del mese, scegliendo giorno/orario in base a persona (Giulia/Matteo/Lorenzo) e formato.
  - Sposta lo status a `Scheduled`.
- Pulsante **"Calendarizza con AI"** in testa al mese; ri-eseguibile.
- Riferimento strategia: l'AI legge i `mkt_brand_docs` attivi (l'utente caricherà il documento di strategia in *Branding › Documenti*).

## 5. Allineamento colonne al tracker Excel
Schema importato dall'Excel allegato: `#, Day, Social Media Channel, Tipo Format, Tipo Persona, Obiettivo, Fase del Funnel, Situazione, Post Copy / Text, Content type, CTA, Media Prompt, Media Links, Status, Post Link`.

Mappatura → `mkt_content`:

| Tracker | Campo DB | Stato |
|---|---|---|
| # | `sequence_number` | NUOVO |
| Day | derivato da `scheduled_date` | — |
| Social Media Channel | `social_channel` | NUOVO (default Instagram) |
| Tipo Format | `content_format` | esiste |
| Tipo Persona | `persona_id` | esiste |
| Obiettivo | `objective` | NUOVO |
| Fase del Funnel | `funnel_stage` | esiste |
| Situazione | `situation` | NUOVO |
| Post Copy / Text | `post_copy` | esiste |
| Content type | `content_type` | NUOVO (distinto dal formato) |
| CTA | `cta` | esiste |
| Media Prompt | `media_prompt` | esiste |
| Media Links | `media_url` | esiste |
| Status | `status` | esiste + `Scheduled` |
| Post Link | `published_link` | esiste |

Campi extra mantenuti: `hook`, `notes`, `views`, `dms_received`.

CSV/Excel template e parser aggiornati con gli stessi header dell'Excel (case-insensitive).

## 6. Read-only enforcement
- `Posted` → editor mostra tutti i campi disabilitati tranne metriche.
- `closed` month → tutti i post del mese disabilitati.
- Tutte le mutation `useUpdateContent` rifiutano lato UI se uno dei due flag è attivo (toast).

## 7. File toccati

### Database (1 migration)
- `mkt_plan_months` (id, month_index, start_date, end_date, status, closed_at, created_at, updated_at) + grants + RLS via `is_mkt_admin()`.
- `ALTER mkt_content` aggiungi: `plan_month_id` (FK), `sequence_number` int, `social_channel` text, `objective` text, `situation` text, `content_type` text.
- `status` resta TEXT; aggiunto valore logico `Scheduled` lato app (no enum DB → niente migrazione enum).

### Edge function
- `supabase/functions/mkt-schedule-month/index.ts` (nuovo) + entry in `supabase/config.toml`.

### Frontend
- `src/admin/pages/ContentPlan.tsx` — tab mesi, 4 colonne, "Calendarizza con AI", "Chiudi mese".
- `src/admin/components/content/PostEditorDialog.tsx` — nuovi campi, rimuovi data/ora manuale, gestione read-only.
- `src/admin/components/content/CsvImportDialog.tsx` + `src/admin/lib/csv.ts` — header allineati Excel + `sequence_number` auto.
- `src/admin/hooks/usePlanMonths.ts` (nuovo), `useContent.ts` (filtro per mese + check read-only).
- `src/admin/pages/Calendar.tsx` — bottone "Segna come Posted" che blocca l'edit.
- `src/admin/types.ts`, `src/admin/i18n/it.ts`, `src/admin/lib/ai.ts` (`scheduleMonth()`).

## Non incluso in v1
- Drag&drop manuale sul calendario (l'AI è l'unico scheduler in v1; edit manuale post-Scheduled possibile dall'editor finché non Posted).
- Riassegnazione automatica tra mesi.
