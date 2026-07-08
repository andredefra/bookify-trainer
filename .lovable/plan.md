## Seed mock Upcoming Events

Il card ha già un seed ma l'utente vede vuoto perché in localStorage esiste già `basic-calendar-events` (probabilmente `[]`). Bump della storage key e arricchimento del seed.

### Modifica

**`src/components/client/overview/UpcomingEventsCard.tsx`**:
- Cambiare `STORAGE_KEY` da `"basic-calendar-events"` a `"basic-calendar-events-v2"` così parte pulito.
- Espandere `getSeedEvents()` con 5 eventi realistici allineati al percorso attuale (weight loss, 82 kg → obiettivo):
  1. **Oggi 18:30** — Training: Upper Body Workout
  2. **Domani 07:30** — Training: Morning Run 5K (cardio)
  3. **+2 giorni 10:00** — Session con Marco Rossi (in-person), "Personal training – Lower Body"
  4. **+4 giorni 19:00** — Training: HIIT 20'
  5. **+6 giorni 09:00** — Session con Marco Rossi (video), "Weekly check-in review"

Nessuna altra modifica.
