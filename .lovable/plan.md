## Obiettivo
Aggiungere un pulsante **Today** nella tab **My Calendar** del client dashboard che riporti la selezione e la vista del calendario alla data corrente.

## Modifiche previste

### File: `src/components/client/tabs/MyCalendarTab.tsx`

1. **Stato per il mese visualizzato**
   - Aggiungere uno stato `currentMonth` inizializzato con `selectedDate` (o `initialDate`).
   - Aggiornare `initialDate` / `useEffect` da `location.state.selectedDate` in modo che, quando si arriva da un evento della overview, anche `currentMonth` venga sincronizzato sulla data selezionata.

2. **Controllo del calendario**
   - Passare al componente `<Calendar>` le props:
     - `month={currentMonth}`
     - `onMonthChange={setCurrentMonth}`
   - Questo permette di riportare la vista del calendario al mese corrente quando si preme Today.

3. **Pulsante Today**
   - Aggiungere un pulsante "Today" (testo + icona opzionale, es. `CalendarDays`) sopra o accanto al calendario, in modo visibile e coerente con l'UI esistente.
   - Al click:
     - `setSelectedDate(new Date())`
     - `setCurrentMonth(new Date())`
   - Il pulsante può essere disabilitato o stilizzato diversamente quando `selectedDate` è già oggi (opzionale, da valutare in fase di implementazione).

## Cosa non cambia
- Nessuna modifica alla logica di creazione eventi, ai mock trainer, ai seed degli upcoming events o alla navigazione da overview.
- Nessun impatto su backend/DB/RLS.

## Accettazione
- Il calendario mostra un pulsante "Today".
- Click su "Today" seleziona il giorno corrente e riporta la vista del calendario al mese corrente, anche se l'utente si era spostato su mesi lontani.
