## Fixes per admin marketing tool

### 1. AI Chat non funziona (Edge Function 2xx error)
Cause probabili nel `mkt-generate-copy`:
- Il modello `google/gemini-2.5-flash` può non essere disponibile sul gateway → sostituire con il default consigliato `google/gemini-3-flash-preview`.
- Verifico `LOVABLE_API_KEY` è presente (provisioning automatico se manca).
- Aggiungo logging più chiaro così, se ricapita un 4xx/5xx, il messaggio mostrato in UI è leggibile (es. "Crediti esauriti" 402 / "Limite richieste" 429).

Verifica: dopo il deploy, controllo i log della function e provo un messaggio dal drawer AI.

### 2. Personas allineate al documento strategico
Il documento (cap. 3.2–3.4) definisce **3 sole** target personas su cui ruotare la regola 33/33/33:
- **Giulia** — La Social Olistica (24–28 anni, social/classi gruppo)
- **Matteo** — Il Coach Analitico (30–38 anni, online/ibrido)
- **Lorenzo** — L'In-Sala H24 (28–35 anni, floor PT)

Attualmente nel DB ce ne sono 6 (Andrea, Luca, Marco in più). 

Migration: 
- Elimino le personas non previste (`Andrea`, `Luca`, `Marco`) — con `ON DELETE SET NULL` già presente su `mkt_content.persona_id` non rompe contenuti esistenti.
- Aggiorno `description`, `pain`, `solution`, `copy_focus`, `age_range` di Giulia / Matteo / Lorenzo con i testi precisi del documento (cap. 3.2/3.3/3.4) così l'AI usa la persona corretta nel prompt.

### 3. Ordine sidebar
Nuovo ordine richiesto:
1. Dashboard
2. **Branding**  ← spostato qui
3. Piano Contenuti
4. Calendario
5. Impostazioni

Modifica unica in `src/admin/layout/AdminSidebar.tsx` (array `items`).

### File toccati
- `supabase/functions/mkt-generate-copy/index.ts` — modello + error message
- `supabase/migrations/<new>.sql` — sync personas
- `src/admin/layout/AdminSidebar.tsx` — riordino voci
