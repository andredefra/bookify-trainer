
## Goal

1. Add a **"View History"** entry point to the Log Weight and Log Body Measurements dialogs (bottom-left), opening a table of previous logs. From that table the user can go back to the log form.
2. Make saving a weight or measurements log actually flow into the Analytics page so:
   - **Weight Goal** card current value + progress updates
   - **BMI & Weight** card updates (weight + BMI recomputed from `profile.height`)
   - **Body Measurements** card updates with the new entries
   - **Body Fat %** card recomputes via the existing US Navy formula, which already reads waist/neck/hips + `profile.height` + `profile.gender`

No changes to the trainer side or to the body-fat formula itself — the formula is already correct; we only need the data to reach it.

## UI changes

### `LogWeightDialog.tsx` / `BodyMeasurementsDialog.tsx`
- Add a **"View History"** ghost button with a `History` icon in the `DialogFooter`, aligned left (footer becomes `justify-between`).
- Clicking it calls a new `onViewHistory` prop passed by the parent.
- Dialogs stay presentational; no data fetching inside.

### New `WeightHistoryDialog.tsx` and `BodyMeasurementsHistoryDialog.tsx`
- New dialogs under `src/components/client/overview/fitness-progress/`.
- Content: a shadcn `Table` listing all entries sorted desc by date.
  - Weight table columns: Date, Weight (kg), Notes, action (delete row).
  - Measurements table columns: Date, Waist, Hips, Thighs, Shoulders, Arms, Neck, action (delete row).
- Empty state: "No logs yet."
- Footer has a **"Back to Log"** button that closes the history and reopens the log form, and a Close button.
- Receives `logs`, `onDelete(id)`, `onBack`, `open`, `onOpenChange` props.

### `FitnessProgressCard.tsx` / `FitnessDialogs.tsx`
- Add `openWeightHistoryDialog` and `openMeasurementsHistoryDialog` state.
- Wire `onViewHistory` on each log dialog to close it and open the corresponding history dialog.
- Wire `onBack` on each history dialog to close it and reopen the log dialog.
- Pass the log arrays and delete handlers into the history dialogs.

## Data persistence changes

Analytics (`UserAnalytics.tsx` and `AnalyticsTab.tsx`) already reads from `localStorage`:
- `fitness-progress-data` → goals (drives Weight Goal card + BMI weight fallback)
- `body-measurements-data` → measurements (drives BMI, Body Measurements, Body Fat cards)

Today the log flow only mutates in-memory React state, so nothing reaches Analytics. Fix:

### `hooks/useGoalManagement.ts` (existing)
- On every update to `progressData`, write to `localStorage["fitness-progress-data"]` (a `useEffect` that syncs).
- On mount, hydrate from `localStorage["fitness-progress-data"]` if present (fallback to `initialProgressData`).

### `hooks/useBodyMeasurements.ts` (existing)
- Add `weight` field handling: when saving a weight-only log we still update the last measurement's weight so BMI stays in sync (see below).
- Add `deleteBodyMeasurement(id)`.
- On mount, hydrate from `localStorage["body-measurements-data"]`; if empty, keep the current mock seeding for demo mode.
- On every change to `bodyMeasurements`, sync to `localStorage["body-measurements-data"]`.

### New `hooks/useWeightLogs.ts`
- Manages a `weight-logs-data` array in localStorage: `{ id, date, weight, note }`.
- Exposes `weightLogs`, `addWeightLog(data)`, `deleteWeightLog(id)`.
- `addWeightLog` also:
  - Calls the existing `logWeight` flow in `useActivityLogging` so any `weight_management` / `body_composition` goal in `progressData` updates its `current`, `progress`, and `logs` (already implemented).
  - Appends a lightweight body-measurement snapshot `{ id, date, weight, source: 'manual' }` via `useBodyMeasurements.addBodyMeasurements`, so BMI & Weight, Body Fat, and Body Measurements cards all see the new weight for calculations. The existing `calculateBodyComposition` will recompute BMI when height is present.

### `useFitnessGoals.ts`
- Expose the new `weightLogs`, `deleteWeightLog`, `deleteBodyMeasurement`, and route `logWeight` through `useWeightLogs.addWeightLog` (which internally calls the existing goal-update logic).

## Analytics flow (no code changes needed beyond the data reaching localStorage)

Once persistence lands:
- `StatisticsSection` and `GoalsProgress` on `/user/analytics` and `/client/analytics` already read `fitness-progress-data` and `body-measurements-data`.
- `GoalsProgress` already computes BMI from `profile.height` + latest weight, and body fat via `calculateBodyFatPercentage({ waist, neck, hips, height, gender })` using `useUserProfile()`.
- So logging weight/measurements will update Weight Goal, BMI & Weight, Body Measurements, and Body Fat % automatically.

## Files touched

- `src/components/client/overview/fitness-progress/LogWeightDialog.tsx` — add `onViewHistory` prop + footer button.
- `src/components/client/overview/fitness-progress/BodyMeasurementsDialog.tsx` — same.
- `src/components/client/overview/fitness-progress/WeightHistoryDialog.tsx` — new.
- `src/components/client/overview/fitness-progress/BodyMeasurementsHistoryDialog.tsx` — new.
- `src/components/client/overview/fitness-progress/FitnessDialogs.tsx` — mount the two new dialogs, plumb history props.
- `src/components/client/overview/fitness-progress/FitnessProgressCard.tsx` — new state + handlers for open/close/back navigation.
- `src/components/client/overview/fitness-progress/hooks/useGoalManagement.ts` — localStorage hydrate/sync for `fitness-progress-data`.
- `src/components/client/overview/fitness-progress/hooks/useBodyMeasurements.ts` — localStorage hydrate/sync for `body-measurements-data`, add delete.
- `src/components/client/overview/fitness-progress/hooks/useWeightLogs.ts` — new, manages weight-log history + fan-out to goals + measurements.
- `src/components/client/overview/fitness-progress/hooks/useFitnessGoals.ts` — expose new APIs.

No changes to `useUserProfile`, `bodyFatCalculations`, or the Analytics components themselves.
