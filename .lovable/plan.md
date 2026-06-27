## Obiettivo
Creare un file markdown di descrizione prodotto per la funzionalità **Client Workouts View**, ovvero la vista workout giornalieri loggati dal cliente con confronto progressione rispetto alla volta precedente dello stesso esercizio.

## Contesto
La funzionalità è già stata sviluppata e si trova nel trainer dashboard (piano Basic) come dialog aperto dal pulsante Dumbbell sulla card cliente.

## File da consultare per la descrizione
- `src/components/trainer/dashboard/tabs/clients/ClientWorkoutsDialog.tsx` — UI completa con filtri, raggruppamento, paginazione
- `src/data/training/demoWorkoutLogs.ts` — dati demo
- `src/components/trainer/dashboard/tabs/clients/ClientCard.tsx` — bottone di accesso

## Cosa includere nel documento
- Nome feature e piano di appartenenza (Basic)
- Cosa fa: visualizza tutti i workout giornalieri loggati dal cliente
- Progressione: confronto serie-per-serie con la volta precedente dello stesso esercizio (delta peso/reps con icone ▲▼=)
- Riassunto per esercizio: "+X kg avg, +Y reps avg vs last time"
- Filtri disponibili: data (preset + range custom), esercizio specifico
- Raggruppamento: per mese collassabile → per giorno collassabile
- Paginazione: 30 sessioni per pagina
- Accesso: bottone Workouts (icona Dumbbell) sulla card cliente nel tab Clients

## Percorso di salvataggio
`docs/trainer-dashboard/client-workouts-view.md`

## Formato
Markdown semplice, titolo H1, sezioni descrittive in italiano e inglese (bilingue come il resto dell'app).