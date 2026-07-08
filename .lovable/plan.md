Add missing `chest` values so the new field actually shows up in:

1. **Check-in details modal** — mock check-in submissions in `src/hooks/useClientCheckIns.ts` (3 entries at lines 50, 67, 86) don't include `chest`, so the details dialog never renders it. Add `chest` to each (e.g. 102, 103, 104 to match the descending trend).

2. **Analytics Measurements box** (`BodyMeasurementsCard` in goals-progress, screenshot 2) — its data comes from `getBodyMeasurements()` in `src/components/user/tabs/UserAnalytics.tsx`, whose two default entries have no `chest`. Add `chest` (e.g. 102 and 104) to both so the tile renders as a 5th item.

No changes to UI components — they already conditionally render chest. Purely a mock-data fix.
