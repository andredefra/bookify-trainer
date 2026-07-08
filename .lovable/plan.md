## Mock Weekly Check-in data

Aggiungo dei check-in fittizi lato client-side quando l'utente demo (`00000000-0000-0000-0000-000000000002`) apre la Overview, così il card "Weekly Check-in" mostra il flusso completo senza toccare il DB.

### Modifica

**`src/hooks/useClientCheckIns.ts`** — dopo il fetch, se `clientId` è il demo UUID:
- se **`settings`** è `null`, iniettare mock settings (weekly, tutti i toggle attivi).
- se **`submissions`** è vuoto, iniettare 4 mock:
  1. **Pending** — dovuto oggi (mostra banner giallo "due today", pulsante "Complete Check-in").
  2. **Completed, awaiting review** — 3 giorni fa, con weight/mood/measurements, `trainer_feedback` vuoto (mostra "Awaiting review").
  3. **Reviewed con feedback** — 10 giorni fa, con `trainer_feedback` "Great job this week! Keep the protein intake up." → attiva il badge "New Feedback".
  4. **Reviewed** — 17 giorni fa, feedback già visto.

`submitCheckIn` per il demo user aggiorna solo lo stato locale (nessuna insert reale su Supabase) così i mock restano coerenti.

### File da modificare

- `src/hooks/useClientCheckIns.ts` — costante `DEMO_CLIENT_ID`, funzione `getDemoMocks()`, iniezione nel `fetchCheckIns`, short-circuit demo in `submitCheckIn`.

Nessuna modifica a DB, RLS, UI del card o dialog.
