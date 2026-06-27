## Goal
Make the Workouts dialog easier to scan over long histories: show more months, and make each day a collapsible row inside its month (two-level accordion).

## UX changes in `ClientWorkoutsDialog.tsx`

1. **Default date range = All time** (instead of Last 30 days) so multiple months show out of the box. Keep the presets (7d / 30d / 3m / All) so the user can narrow down.
2. **Increase page size** from 10 → 30 sessions per page, so several months fit on one page.
3. **Two-level collapsible structure**:
   - **Month group** (existing): `June 2026 (5)` — collapsible. Most recent month expanded by default, older months collapsed.
   - **Day row** (new): inside each month, each workout session becomes a `Collapsible` header showing date • workout name • duration • exercise count. Click to expand and reveal the exercises + set tables + "vs prior" deltas.
   - By default, only the most recent day of the most recent month is expanded; everything else is collapsed. User can toggle freely.
4. **"Expand all / Collapse all" buttons** in the toolbar (scoped to currently visible page) for quick bulk control.

## Progression integrity
Unchanged — `priorExercise` keeps comparing against the full sorted log list, not the filtered/paged subset.

## Files to touch
- `src/components/trainer/dashboard/tabs/clients/ClientWorkoutsDialog.tsx` — switch default range, bump page size, wrap each session in `Collapsible`, track `openDays: Set<string>` state alongside existing `openMonths`, add Expand/Collapse all buttons.
- Add demo workout logs further back in time (e.g. 21, 28, 35, 45, 60 days ago) in `src/data/training/demoWorkoutLogs.ts` so multiple months actually render with "All time" selected.

No schema/data-shape changes. Uses existing shadcn `Collapsible`.
