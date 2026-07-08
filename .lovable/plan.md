## Add Title field + click-through details to Upcoming Events

Due modifiche legate al Plan-an-Event / Upcoming Events:

### 1. Campo "Title" nel dialog Plan an Event

Attualmente il dialog non ha un titolo dedicato: la card in Overview mostra la stringa che sta in `notes` (o fallback al tipo). Aggiungo un campo Title esplicito.

**`src/components/client/tabs/MyCalendarTab.tsx`**
- Interfaccia `PlannedActivity`: nuovo `title?: string`.
- Stato `newActivity`: aggiungere `title: ""`.
- Nel dialog, sopra il campo "Notes", inserire un `<Input>` "Title" (required per submit; placeholder in base al tipo: es. "Upper Body Workout" o "Personal training – Lower Body").
- `handleAddActivity`: usare il title inserito (fallback: label del tipo o "Session with <trainer>").
- Nel rendering del giorno, mostrare `activity.title` invece della sola parola-tipo capitalizzata.

### 2. Click su Upcoming Event → dettagli con provenienza

**`src/components/client/overview/UpcomingEventsCard.tsx`**
- Aggiungere `title?: string` a `CalendarEvent`; se presente `title`, `labelFor` lo restituisce prima di `notes`.
- Aggiornare il seed dei mock per usare `title` (i valori attuali diventano il titolo, es. "Upper Body Workout", "Personal training – Lower Body", …).
- Al click su un evento, invece di andare subito al calendar, aprire un piccolo `Dialog` "Event Details" con:
  - Titolo grande + badge categoria (Training / Session).
  - Data (Today/Tomorrow/EEE d MMM) + ora.
  - **Origine**: 
    - Training → badge "Planned by you".
    - Session con `trainer` → "Invited by <trainer>" se `requestStatus` è definito (richiesta al PT), altrimenti "Planned with <trainer>".
  - Session mode (In-person / Video) se disponibile.
  - Notes (se presenti).
  - Pulsanti: "Close" e "Open in Calendar" — quest'ultimo chiama `navigate("/client-dashboard-basic", { state: { activeTab: "my-calendar", selectedDate: ev.date } })`.

**`src/components/client/tabs/MyCalendarTab.tsx`**
- All'avvio leggere `location.state?.selectedDate` (via `useLocation`) e, se valido, impostare `selectedDate` a quella data così l'utente atterra sul giorno giusto.

### Non tocco

- Logica trainer plans / session request status.
- Storage keys (già bumped a v2).
- DB/RLS.
