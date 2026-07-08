## Body measurements update

Aggiungiamo **Chest** e **Abdomen** e rinominiamo **Thighs → Quadriceps** in tutti i punti dell'app in cui compaiono i body measurements: dialog di logging, storico, check-in (client + trainer), e analytics.

### Modifiche funzionali

1. **Nuovi campi**: `chest` (cm) e `abdomen` (cm) affiancati agli attuali (waist, hips, arms).
2. **Rename**: il campo `thighs` viene rinominato in `quadriceps` (label "Quadriceps"). I dati storici mock vengono aggiornati; nel merge dei log esistenti in localStorage, se è presente `thighs` viene mappato automaticamente a `quadriceps` per non perdere lo storico.
3. **Ordine visuale suggerito** nei dialog e nelle card (2 colonne):
   Chest • Waist  
   Abdomen • Hips  
   Quadriceps • Arms

### File da aggiornare

**Client — logging & history**
- `src/components/client/overview/fitness-progress/types.ts` — aggiunge `chest`, `abdomen`, `quadriceps` (rimuove `thighs`).
- `src/components/client/overview/fitness-progress/BodyMeasurementsDialog.tsx` — nuovi input + rename label Thighs→Quadriceps.
- `src/components/client/overview/fitness-progress/BodyMeasurementsHistoryDialog.tsx` — nuove colonne Chest / Abdomen + rename colonna Thighs→Quadriceps.
- `src/components/client/overview/fitness-progress/hooks/useBodyMeasurements.ts` — mock seed con nuovi campi + migrazione runtime `thighs → quadriceps`.
- `src/components/client/overview/fitness-progress/utils.ts` — utility su set di misure.
- `src/components/client/overview/fitness-progress/data/goalTemplates.ts` — eventuali template collegati.

**Client — check-in**
- `src/components/client/overview/checkin/ClientCheckInDialog.tsx` — nuovi input + rename.
- `src/components/client/overview/checkin/ClientCheckInHistoryDialog.tsx` — nuove colonne + rename.
- `src/hooks/useClientCheckIns.ts`, `src/hooks/useCheckInSubmissions.ts` — tipi/DTO estesi con `chest`, `abdomen`, `quadriceps` (+ mapping compat `thighs`).

**Trainer — check-in & profilo cliente**
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/metrics/ManualCheckInDialog.tsx` — nuovi input + rename Thighs→Quadriceps.
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/metrics/ConfigureCheckInsDialog.tsx` — se elenca le misure disponibili, aggiornare.
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/metrics/DeltaBadge.tsx` — supporto per i nuovi campi.

**Analytics (client + trainer)**
- `src/components/client/analytics/sections/body-composition/MeasurementsCard.tsx` — mostra Chest, Abdomen, Quadriceps (oltre a Waist, Hips, Arms).
- `src/components/client/analytics/sections/goals-progress/BodyMeasurementsCard.tsx` — trend per Chest / Abdomen / Quadriceps.
- `src/components/client/analytics/sections/goals-progress/utils/measurementsStatus.ts` e `trendCalculations.ts` — includono i nuovi campi.
- `src/components/user/tabs/UserAnalytics.tsx`, `src/components/user/overview/UserFitnessProgress.tsx` — rename Thighs→Quadriceps e nuovi campi dove elencati.
- `src/components/trainer/dashboard/tabs/analytics/utils/metricsCalculator.ts`, `clientDataConverter.ts`, `data/clientMockData.ts` — nuovi campi nel calcolo delle metriche e mock coerenti.

**Compat & fitness integrations**
- `src/components/client/settings/fitness-integrations/FitnessAppList.tsx` — se elenca le misure sincronizzate, aggiornare label.
- `src/components/client/analytics/utils/bodyFatCalculations.ts` — non modifichiamo la formula (usa waist/hips/neck), ma verifichiamo che i nuovi campi non la rompano.

### Note

- Nessuna modifica a Supabase migrations in questa passata: i dati vivono in localStorage/mock nel percorso `client-dashboard-basic`. Se in futuro andremo a persistere su DB, aggiungeremo una migration dedicata con nuove colonne `chest`, `abdomen`, `quadriceps` (+ backfill da `thighs`).
- WHtR resta calcolato su waist/height (immutato). L'header dell'immagine di riferimento non cambia.