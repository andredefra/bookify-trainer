Nascondi tutte le funzionalità AI nel Training Log solo per il demo basic (`/client-dashboard-basic`).

## Modifiche

1. `src/components/client/tabs/TrainingLogTab.tsx`
   - Aggiungere prop opzionale `hideAI?: boolean`.
   - Quando `hideAI`: nascondere il pulsante con icona Brain accanto a Edit nella lista "Recent Workouts" e non renderizzare `WorkoutAnalysisCard` (rimuovere anche lo stato di selezione AI).
   - Passare `hideAI` a `NewWorkoutLogForm`.

2. `src/components/client/training/workout-form/NewWorkoutLogForm.tsx`
   - Aggiungere prop `hideAI?: boolean` su `NewWorkoutLogForm` e `WorkoutLogFormContent`.
   - Quando `hideAI`: non renderizzare il FAB (`MessageCircle`) né `<WorkoutAIAssistant />`.

3. `src/pages/ClientDashboardBasic.tsx`
   - Passare `hideAI` a `<TrainingLogTab />`.

Nessuna altra pagina viene modificata: il comportamento attuale di trainer/client standard resta invariato (default `hideAI=false`).