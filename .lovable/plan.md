## Changes to Body Measurements

### 1. Remove `abdomen` field
Revert the previous addition across all files (types, dialogs, history, analytics, hooks, mock data). Keep only: **chest, waist, hips, quadriceps, arms**.

Files to update (remove abdomen references):
- `src/components/client/overview/fitness-progress/types.ts`
- `src/components/client/overview/fitness-progress/BodyMeasurementsDialog.tsx`
- `src/components/client/overview/fitness-progress/BodyMeasurementsHistoryDialog.tsx`
- `src/components/client/overview/fitness-progress/hooks/useBodyMeasurements.ts`
- `src/components/client/overview/checkin/ClientCheckInDialog.tsx`
- `src/components/client/overview/checkin/ClientCheckInHistoryDialog.tsx`
- `src/hooks/useClientCheckIns.ts`, `src/hooks/useCheckInSubmissions.ts`
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/metrics/ManualCheckInDialog.tsx`
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/metrics/ConfigureCheckInsDialog.tsx`
- `src/components/client/analytics/sections/body-composition/MeasurementsCard.tsx`
- `src/components/client/analytics/sections/goals-progress/BodyMeasurementsCard.tsx`
- `src/components/user/tabs/UserAnalytics.tsx`, `src/components/user/overview/UserFitnessProgress.tsx`

### 2. Measurement Guide (help popover)

Create a small reusable component `MeasurementGuidePopover.tsx` under `src/components/client/overview/fitness-progress/`.

- Renders a `HelpCircle` icon button (14–16px) placed next to each measurement field label.
- Uses shadcn `Popover` (click) — works on both desktop and mobile (hover-only would fail on touch). Opens on click; icon has `aria-label`.
- Content: title of the measurement + two short sections **Men** / **Women** with instructions in Italian on where/how to measure with a tape.
- Guide dictionary keyed by measurement: `chest`, `waist`, `hips`, `quadriceps`, `arms`. Example contents:
  - **Chest**: at nipple line (men) / at fullest bust point (women), arms relaxed, tape parallel to floor.
  - **Waist**: narrowest point above navel (both), relaxed abdomen.
  - **Hips**: widest point of glutes/hips (both).
  - **Quadriceps**: mid-thigh, halfway between hip crease and knee, relaxed (both, note women often measure slightly higher).
  - **Arms**: bicep at largest circumference, arm relaxed at side (both).

### 3. Places to add the guide icon
Next to each of the 5 measurement labels in:
- `BodyMeasurementsDialog.tsx` (client logging)
- `ClientCheckInDialog.tsx` (client check-in)
- `ManualCheckInDialog.tsx` (trainer manual check-in)

The history view dialogs and analytics cards will only get the abdomen removal — no guide icons there (guide is only relevant when entering values).

### 4. Verification
Update mock data to drop `abdomen`. Confirm no lingering `abdomen` references via search after edits.
