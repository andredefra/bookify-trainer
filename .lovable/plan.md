Implementerò questi interventi nel tab Calendar:

1. Più eventi mock nel calendario
- Aggiungere un set iniziale di eventi demo distribuiti nel mese corrente e nei mesi vicini.
- Includere esempi di Training Day, General Event e Trainer Session/request, così i marker e la lista giornaliera risultano più popolati.
- Mantenere gli eventi salvati in localStorage senza sovrascrivere quelli creati dall’utente.

2. Navigazione mese precedente/successivo
- Correggere la sincronizzazione tra `selectedDate` e `currentMonth`, che oggi può riportare il calendario al mese del giorno selezionato e impedire di navigare liberamente tra i mesi.
- Lasciare il bottone Today come azione esplicita per tornare a oggi.
- Quando si clicca un giorno di un altro mese, aggiornare normalmente la selezione.

3. Conferma prima di rimuovere un evento
- Sostituire la rimozione immediata con un dialog di conferma.
- Mostrare titolo dell’evento e azioni Cancel / Remove.
- Rimuovere l’evento solo dopo conferma e mostrare un feedback toast.

File coinvolto:
- `src/components/client/tabs/MyCalendarTab.tsx`

Non toccherò database o logiche backend: resterà una modifica frontend/mock come richiesto.