## What's actually wrong

1. **Overview seed uses the wrong `goalType`.** `ClientDashboardBasic.tsx` seeds `"Lose Weight" 82→76 kg` with `goalType: "weight_loss"`, but the Analytics Weight Goal card looks for `"weight_management"`. That's why Weight Goal is missing in Analytics. There is also no Monthly Step Target goal seeded, so Workout Goal is missing.
2. **My previous weight/measurement seeds never ran** because:
   - The gate `if (!user)` blocked seeding for real Supabase users (e.g. `andrea.mypersonal.fit`).
   - When localStorage already held a small stub entry (69 kg, the 44/44 measurement) the "seed only if empty" logic skipped.
3. **Weight seed value (78 kg) was not aligned** with the visible Lose Weight goal (82 kg).

## Fixes

### `src/pages/ClientDashboardBasic.tsx`
- Change `mk("Lose Weight", 82, 76, "kg", "weight_loss", …)` → `goalType: "weight_management"`.
- Add a new seeded goal: `mk("Monthly Step Target", 210000, 300000, "steps", "activity_level", 30, "personal")` so the Workout Goal card renders in Analytics.
- Keep Bench Press and Run 5K as-is.

### `src/components/client/overview/fitness-progress/hooks/useWeightLogs.ts`
- Remove the `!user` gate — seed for any user.
- Reseed whenever the stored array has **fewer than 3 entries** (treated as un-seeded stub data) and no `weight-logs-seeded-v2` flag is set. After seeding, write the flag.
- Align mock trend with the Lose Weight goal: 82.4 → 82.0 → 81.1 → 80.4 → 79.6 → 78.9 → 78.4 → 78.0 → **82.0 (today)** so the latest weight matches the goal's `current: 82`. Actually use a smoother realistic history that ends near 82 kg (the current goal value): 84.5 → 84.0 → 83.4 → 83.0 → 82.7 → 82.4 → 82.1 → 82.0 (today).

### `src/components/client/overview/fitness-progress/hooks/useBodyMeasurements.ts`
- Same treatment: remove the `!user` gate; reseed when count < 3 and no `body-measurements-seeded-v2` flag; write flag after seeding.
- Update mock weights to match the new weight-log trend (ending at 82 kg today).
- Keep the 6-entry history with realistic circumferences that match the old Analytics values users had before (Waist 84–89, Hips 95–100, Thighs 55–58, Shoulders 115–118, Arms 33–34, Neck 38–39).

### Result
- Log Weight → View History: 8 entries from ~4 months ago to today, aligned with the Lose Weight goal (82 kg current).
- Body Measurements → View History: 6 entries over ~5 months with matching weights.
- Analytics Goals Progress: all 6 cards visible — Weight Goal (from `weight_management`), BMI & Weight, Workout Goal (Monthly Step Target from `activity_level`), Progress Trends, Body Measurements, Body Fat % (computed from waist/neck/hips + profile height 175 / gender male).

## Files touched
- `src/pages/ClientDashboardBasic.tsx`
- `src/components/client/overview/fitness-progress/hooks/useWeightLogs.ts`
- `src/components/client/overview/fitness-progress/hooks/useBodyMeasurements.ts`

No DB, RLS or analytics component changes needed.