
# Piano Contenuti v3 — flusso completo

## 1. Tabella & Flusso Kanban

**Template / vista lista**
- Rimuovere colonna "Post Link" dalla vista template standard del piano (resta in DB ma nascosta finché il post non è Pubblicato).
- Mantenere `sequence_number` come ID di riconoscimento.

**Stati e colonne (4):** Bozza → In approvazione → Validato → Calendarizzato.
- **Bozza / Approvazione / Validato:** data/ora editabili manualmente.
- **"Calendarizza con AI"**: prende solo i post `Validated` del mese attivo, ordina per `sequence_number`, l'AI assegna data+ora ottimale nel range del mese → status diventa `Scheduled` → spariscono dalla colonna Validato, appaiono in Calendarizzato e nel Calendario.
- **Calendarizzato:** data/ora liberamente modificabili (drag&drop nel calendario o input nel dialog). Sequenza non più forzata.
- **Posted:** read-only tranne metriche.

**Calendario**: mostra solo `Scheduled` + `Posted` (rimuove `Validated` dalla vista calendario; ora il calendario riflette solo ciò che è stato deliberatamente calendarizzato).

## 2. Ciclo Pubblicazione

Sul post `Scheduled` (sia in colonna Calendarizzato che in Publishing Card del calendario) compare bottone **"Segna come pubblicato"** che apre dialog con:
- Data effettiva (default = `scheduled_date`)
- Ora effettiva (default = `scheduled_time`)
- URL Instagram (obbligatorio)

Submit → aggiorna `scheduled_date/time` con valori effettivi, salva `published_link`, `published_at` (nuovo campo), status → `Posted`. Post diventa read-only (sblocco solo `views`, `dms_received`, `published_link` per analytics futuri).

## 3. Knowledge Base (Brand Docs & Assets)

**UI**: nuova pagina/sezione `Branding` rivista con due aree drag&drop:
- **Brand Documents** (PDF/DOCX/MD/TXT): strategia, tone of voice, brief.
- **Brand Assets** (immagini/loghi/font): usati come riferimento visivo per generazione media.

CRUD completo (upload, rename, delete, replace).

**Elaborazione AI asincrona**:
1. Upload → riga in `mkt_brand_docs` con `processing_status='processing'`.
2. Edge function `mkt-process-brand-doc` invocata in background:
   - Estrae testo (PDF.js/mammoth lato server, o text-as-is).
   - LLM classifica tipologia (`doc_type`: strategy / tone_of_voice / persona_profile / product_brief / other).
   - Genera `recap` (3-5 righe).
   - Estrae eventuali **Personas** (nome, fascia età, pain, soluzione, copy focus).
3. `processing_status` → `done` / `failed` con `error_message`.
4. UI mostra badge stato per doc (Processing… / Done / Failed con retry).

**Persona auto-aggiunte**: se l'AI trova una persona non presente in `mkt_personas` (match fuzzy sul nome), la inserisce con flag `is_ai_generated=true` + badge "AI-generated" in dashboard. L'utente la modifica/rinomina/cancella liberamente.

**Contesto globale**: tutti i recap dei doc `is_active=true` vengono concatenati nel system prompt di tutte le funzioni AI (`mkt-generate-copy`, `mkt-schedule-month`, chat post).

## 4. Generazione Contenuti

**Copy / testo / tone of voice / varianti**: Lovable AI Gateway (`google/gemini-3-flash-preview`) — già esistente, nessuna API key esterna.

**Media statici (immagini, caroselli)**: Lovable AI Gateway image generation (`google/gemini-3-flash-image-preview` / Nano Banana). Brand assets caricati nella KB diventano riferimento visivo (passati come image input quando supportato).

**Reels/video**: out of scope in questa iterazione. Placeholder UI con messaggio "Generazione video disponibile prossimamente" — nessuna chiamata, nessun secret richiesto.

**Template/CSV con copy esistente**: il copy importato è la traccia. Pulsanti "Espandi" / "Genera variante" già usano la chat AI esistente — restano invariati e usano il copy come base.

## 5. Chat AI contestuale per Bozza (modalità "diff & approve")

Nel `PostEditorDialog`, pannello laterale (o tab) **"AI Assistant"**:
- Conversazione isolata al post corrente (memoria solo in sessione, non persistita in v1).
- L'utente chiede modifiche ("rendi più aggressivo", "accorcia hook", "cambia angolo carosello").
- L'AI risponde con un **diff strutturato** (JSON `{ field, current_value, proposed_value, rationale }`) per uno o più campi tra: `hook`, `post_copy`, `cta`, `media_prompt`, `notes`.
- UI renderizza ogni proposta come card con bottoni **Applica** / **Scarta** / **Applica tutto**.
- "Applica" aggiorna il campo nel form (non salva finché l'utente non salva il post); storico delle proposte salvato in `mkt_generations`.

Edge function: nuova `mkt-chat-post` (separata da `mkt-generate-copy` per usare `response_format: json_object` con schema diff).

## 6. Database — migration unica

**Nuovi campi `mkt_content`**:
- `published_at timestamptz`

**Nuovi campi `mkt_brand_docs`**:
- `doc_type text` (strategy/tone_of_voice/persona_profile/product_brief/other)
- `recap text`
- `processing_status text default 'pending'` (pending/processing/done/failed)
- `processing_error text`
- `processed_at timestamptz`

**Nuovi campi `mkt_personas`**:
- `is_ai_generated boolean default false`
- `source_doc_id uuid references mkt_brand_docs`

**Nuovo bucket storage**: `mkt-brand-assets` (privato), reso accessibile via signed URL agli admin.

Nessuna nuova tabella.

## 7. File touched

- **Migration**: 1 file.
- **Nuove edge functions**: `mkt-process-brand-doc/index.ts`, `mkt-chat-post/index.ts`.
- **Edit edge functions**: `mkt-generate-copy` (concatena `recap` dei doc), `mkt-schedule-month` (idem).
- **Frontend**:
  - `src/admin/pages/Branding.tsx` — rework con drag&drop + status badges + asset area.
  - `src/admin/pages/ContentPlan.tsx` — nasconde colonna Post Link; nessun cambio kanban (4 col già OK); il bottone "Calendarizza con AI" già esiste.
  - `src/admin/pages/Calendar.tsx` — filtra fuori `Validated` (solo `Scheduled` + `Posted`); aggiunge bottone "Pubblicato" sulla card.
  - `src/admin/components/calendar/PublishingCard.tsx` — sostituisce input URL singolo con dialog "Conferma pubblicazione" (data+ora+url).
  - `src/admin/components/content/PostEditorDialog.tsx` — nuovo pannello "AI Assistant" con diff cards; nasconde "Post Link" finché non Posted.
  - `src/admin/components/content/PostAiChatPanel.tsx` — nuovo componente.
  - `src/admin/hooks/useBrandDocs.ts`, `useBrandAssets.ts` — nuovi.
  - `src/admin/lib/ai.ts` — `chatPostDiff()`, `processBrandDoc()`.
  - `src/admin/types.ts`, `src/admin/i18n/it.ts` — update.
- **Storage**: creazione bucket via tool.

## 8. Fuori scope v1

- Generazione video/reels (placeholder).
- Persistenza chat-per-post tra sessioni.
- Drag&drop di asset come riferimento visivo dentro la chat post (in v1 i brand assets influenzano solo il system prompt testuale).
- Dashboard Analytics: i campi (`published_at`, `views`, `dms_received`, `published_link`) sono già preparati ma la vista analytics arriva dopo.

## Diagramma flusso

```text
[Upload doc]──async──▶[AI classifica+recap+persona]──▶[Brand context globale]
                                                         │
                                                         ▼
[Bozza]→[Approvazione]→[Validato]──"Calendarizza AI"──▶[Calendarizzato]──"Pubblicato"──▶[Posted/RO]
   ▲                                                       │                                │
   └──────────── chat AI per post (diff/approve) ──────────┘                                ▼
                                                                                       Analytics
```
