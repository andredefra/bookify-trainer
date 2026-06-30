## Modifiche su `ClientDashboardBasic` (demo Andrea)

Tutto isolato sul dashboard `/client-dashboard-basic` — nessun impatto su altri profili.

### 1) Overview: rimuovere Upcoming Expirations
In `src/components/client/tabs/Overview.tsx` aggiungere prop opzionale `variant?: "basic"`. Quando `variant === "basic"`:
- non renderizzare `<ExpirationAlertsCard />` (la griglia diventa 1 colonna con la sola `QuickAnalyticsCard`);
- al posto di `<UpcomingSessionsCard />` renderizzare il nuovo `<UpcomingEventsCard />`.

In `src/pages/ClientDashboardBasic.tsx` passare `variant="basic"` a `<Overview />`.

### 2) Nuovo widget "Upcoming Events"
Nuovo file `src/components/client/overview/UpcomingEventsCard.tsx`:
- Titolo "Upcoming Events", descrizione "Planned activities and sessions from your calendar".
- Bottone in alto a destra "Open Calendar" che fa `navigate('/client-dashboard-basic', { state: { activeTab: 'my-calendar' } })`.
- Sorgente dati: legge da `localStorage` (chiave `basic-calendar-events`) — stessa chiave che useremo per persistere gli eventi del `MyCalendarTab` (vedi step 4). Se vuoto, seed con 2 eventi mock realistici (es. "Upper Body Workout" domani 18:00, "Session with Marco Rossi" tra 3 giorni 10:00).
- Mostra max 4 eventi futuri ordinati per data, con icona (Dumbbell/User/Heart/Bed), titolo, data relativa (Today/Tomorrow/EEE d MMM), orario, e badge categoria (Training / Session).
- Stato vuoto: messaggio + CTA "Plan an Event".

### 3) Persistenza eventi MyCalendarTab (light touch)
In `MyCalendarTab.tsx` cambiare `useState<PlannedActivity[]>([])` per leggere/scrivere `localStorage` sotto `basic-calendar-events` (con `useEffect` di sync e parse delle date). Così l'Upcoming Events card e il calendario condividono la stessa fonte.

### 4) Pre-popolare goal del cliente
I goal vengono inietta come `progressData` passato a `<Overview />` (attualmente `[]`).

In `src/pages/ClientDashboardBasic.tsx` costruire un array `initialGoals: ProgressItem[]` e passarlo:

- **1 goal personale** (`source: 'personal'`):
  - "Lose Weight" — current 82, target 76, unit kg, goalType `weight_loss`, targetDate +60gg.
- **2 goal del trainer** (`source: 'trainer'`, `trainerName: 'Marco Rossi'`):
  - "Bench Press 1RM" — current 70, target 90, unit kg, goalType `strength`, exerciseId opzionale, targetDate +90gg.
  - "Run 5K under 25 min" — current 28, target 25, unit min, goalType `endurance`, targetDate +75gg.

Ogni goal include `id`, `createdAt`, `lastUpdated`, `progress` calcolato, e un primo `logs[0]` con il valore iniziale (struttura coerente con `useGoalManagement.addGoal`).

### File coinvolti
- `src/components/client/tabs/Overview.tsx` (modifica: prop `variant`)
- `src/components/client/overview/UpcomingEventsCard.tsx` (nuovo)
- `src/components/client/tabs/MyCalendarTab.tsx` (persistenza localStorage)
- `src/pages/ClientDashboardBasic.tsx` (passa `variant="basic"` e `progressData` pre-popolato)

Nessuna modifica a DB, edge functions, o ad altri dashboard.