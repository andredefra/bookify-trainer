## Goal
Seed realistic historical data so Log Weight and Body Measurements show a real history, and restore the missing **Weight Goal**, **Body Measurements** and **Body Fat %** cards in Goals Progress by aligning them with the profile's height/gender/age.

## Why cards are missing today
- **Weight Goal card** renders only if a `weight_management` goal exists in `progressData`. The current seed has none → card hidden.
- **Measurements card** shows "Insufficient Data" because localStorage got persisted as `[]` after prior interactions, so `latestMeasurements` is null.
- **Body Fat % card** always renders but shows "Missing: Waist, Neck" for the same reason (no measurements).

## Changes

### 1. `hooks/useWeightLogs.ts` — seed history
Add a `getMockWeightLogs()` that returns ~8 entries over the last ~120 days showing a gentle downward trend (e.g. 82 → 78 kg). Hydrate with mocks when localStorage is empty AND no authenticated user (same pattern as `useBodyMeasurements`).

### 2. `hooks/useBodyMeasurements.ts` — expand mock history
Replace the current 2-entry mock with ~6 entries spread across the last ~150 days, with consistent weight values matching the weight-log trend and full waist/neck/hips/thighs/shoulders/arms so Body Fat % can compute for both genders.

Force re-seed when storage holds an empty array `[]` (not just null) so users who lost their data recover the demo history.

### 3. `hooks/useGoalManagement.ts` — seed a weight goal
When hydration finds no stored `fitness-progress-data` (or an empty array), inject a default `weight_management` goal aligned with the seeded weight logs:
```
goal: "Reach target weight"
goalType: "weight_management"
current: 78, target: 75, unit: "kg"
logs: derived from the seeded weight-log dates
```
Plus one `activity_level` goal so the Workout Goal card also renders.

### 4. Alignment with profile (height/gender/age)
No new code needed — `GoalsProgress.tsx`, `bodyFatCalculations`, and `calculateBMI` already read `profile.height` and `profile.gender` from `useUserProfile`, which defaults to `height: 175`, `gender: 'male'` for the demo user. Once measurements + weight goal exist, all four cards (Weight Goal, BMI & Weight, Body Measurements, Body Fat %) render correctly with values derived from that profile.

### 5. History dialogs auto-benefit
`WeightHistoryDialog` and `BodyMeasurementsHistoryDialog` read from the same hooks, so the seeded rows appear immediately in "View History" tables — no changes needed there.

## Files touched
- `src/components/client/overview/fitness-progress/hooks/useWeightLogs.ts`
- `src/components/client/overview/fitness-progress/hooks/useBodyMeasurements.ts`
- `src/components/client/overview/fitness-progress/hooks/useGoalManagement.ts`

## Out of scope
- No changes to analytics cards, body-fat formula, or profile settings.
- No DB/migration work — demo data only, stored in localStorage.