The Measurements card in the client analytics (`BodyMeasurementsCard` in goals-progress) omits Chest because the default mock in `src/components/client/tabs/AnalyticsTab.tsx` → `getBodyMeasurements()` has no `chest` field on either entry. `UserAnalytics.tsx` was already patched; `AnalyticsTab.tsx` was missed.

### Fix
Add `chest` to both default entries in `AnalyticsTab.tsx#getBodyMeasurements()`:
- entry 1 (2024-03-15): `chest: 100`
- entry 2 (2024-03-01): `chest: 102`

No component changes; the card already renders `chest` when present.

Note: if the user's browser has `body-measurements-data` cached in localStorage from before the update, that legacy blob (still without `chest`) will be used. If chest still doesn't show after the fix, clearing that localStorage key will make the new defaults render.
