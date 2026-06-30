
# Add Calendar Integrations (Google + Apple) to Settings → Integrations

## Modifica – `src/components/client/tabs/settings/IntegrationsSection.tsx`

Aggiungere una nuova card **"Calendar Integrations"** sopra la Privacy box (sotto Smart Scale section) con due righe in stile coerente con le altre integrazioni:

1. **Google Calendar**
   - Icona: `Calendar` (lucide) in cerchio blu (bg-blue-100 / text-blue-600).
   - Titolo: "Google Calendar"
   - Descrizione: "Sync training sessions and reminders with your Google Calendar"
   - Bottone "Connect" → on click apre toast "Connessione a Google Calendar in arrivo" (placeholder, demo-mode).

2. **Apple Calendar**
   - Icona: `CalendarDays` o `Apple` (lucide) in cerchio slate.
   - Titolo: "Apple Calendar (iCloud)"
   - Descrizione: "Sync training sessions and reminders with Apple Calendar"
   - Bottone "Connect" → stesso pattern toast placeholder.

Header card: icona `CalendarCheck`, titolo "Calendar Integrations", descrizione "Sync your training schedule and reminders with your personal calendar".

## Note
- Solo UI/presentazione: nessuna chiamata OAuth reale in questa fase, coerente con il pattern già usato per Zepp/Fitbit/Garmin/Samsung (bottoni Connect non funzionanti).
- Nessuna modifica DB, nessun connector reale collegato.
- Nessun cambiamento ad altre pagine.
