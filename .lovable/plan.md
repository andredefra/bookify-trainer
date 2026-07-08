## Root causes

1. **BMI shows 0**: `GoalsProgress.tsx` calls `calculateBMI(weight, profile.height)`, but `profile.height` is stored in **cm** (175) while `calculateBMI` expects **meters**. 70 / (175 × 175) rounds to 0.
2. **BMI & Weight shows 70 kg (not 82)** and **Weight Goal / Monthly Step Target cards are missing**: `useGoalManagement` hydrated an older `fitness-progress-data` payload from localStorage that still uses legacy `goalType: "weight_loss" | "strength" | "endurance"`. Since no goal has `weight_management` or `activity_level`, `getWeightData` returns `null` (→ fallback 70) and the two cards render nothing. `AnalyticsTab` also reads that stale localStorage directly.
3. **Measurements → "Insufficient Data"**: `BodyMeasurementsCard` calls `getMeasurementsStatus(latestMeasurements)` **without** a `userProfile`, so the function returns `null` because it needs `userProfile.height` for the WHtR calculation.

## Fixes

### `src/components/client/analytics/sections/GoalsProgress.tsx`
- Convert height cm → m before BMI: `calculateBMI(currentWeight, profile.height / 100)`.
- Pass `userProfile={{ height: profile?.height, gender: profile?.gender }}` down to `BodyMeasurementsCard`.

### `src/components/client/analytics/sections/goals-progress/BodyMeasurementsCard.tsx`
- Accept an optional `userProfile` prop and forward it to `getMeasurementsStatus(latestMeasurements, userProfile)`.

### `src/components/client/overview/fitness-progress/hooks/useGoalManagement.ts`
- On hydration, if the stored array exists but contains **no** goal with `goalType === "weight_management"` **and no** `activity_level`, treat it as legacy data and replace with `initialProgressData` (the current seed from `ClientDashboardBasic`). Also persist immediately so `AnalyticsTab`'s direct localStorage read picks up the refreshed goals.

### `src/components/client/tabs/AnalyticsTab.tsx`
- Update the hard-coded fallback goals to match the current Overview seed (Lose Weight 82 → 76 kg with `weight_management`, Monthly Step Target 210 000 → 300 000 steps with `activity_level`, Bench Press 1RM 70 → 90 kg with `strength_progress`, Run 5K 28 → 25 min with `cardiovascular_endurance`).
- After reading localStorage, if the parsed array lacks `weight_management` **or** `activity_level`, merge the missing goals from the defaults so Analytics always shows the six cards.

## Result
- BMI & Weight: shows **82 kg**, BMI **≈ 26.8** (Overweight), consistent with the Lose Weight goal.
- Weight Goal Progress and Monthly Step Target cards appear again in Analytics.
- Measurements card shows the WHtR status (Healthy / Increased Risk / …) instead of "Insufficient Data".
- All six Goals Progress cards render as before.

## Files touched
- `src/components/client/analytics/sections/GoalsProgress.tsx`
- `src/components/client/analytics/sections/goals-progress/BodyMeasurementsCard.tsx`
- `src/components/client/overview/fitness-progress/hooks/useGoalManagement.ts`
- `src/components/client/tabs/AnalyticsTab.tsx`

No changes to DB, RLS, BMI/WHtR formulas, or profile settings.