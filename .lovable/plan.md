## Goal
Make the Workouts dialog usable across long histories: paginate, group, and allow date filtering — while keeping progression ("vs prior") comparisons accurate.

## UX

Top toolbar inside the dialog (sticky under the header):
- **Date range filter**: two shadcn date pickers (From / To) + quick presets ("Last 7 days", "Last 30 days", "Last 3 months", "All time"). Default = Last 30 days.
- **Exercise filter** (optional, dropdown): "All exercises" or pick one — useful to track a single exercise's progression over time.
- **Results counter**: "Showing X of Y sessions".

Body:
- Sessions grouped by **month header** (e.g. "June 2026") with a small count badge. Each group is collapsible (expanded by default for the most recent month, collapsed for older ones).
- Within a group, sessions render as today (date, duration, exercises with set table + vs prior).

Footer (sticky):
- **Pagination**: 10 sessions per page. Prev / Next + "Page N of M". Resets to page 1 when filters change.

## Progression integrity
"vs prior" must still compare against the truly previous occurrence of that exercise, even when filters hide older sessions.
- Keep the **full sorted log list** (newest → oldest) as the source for prior lookups.
- Compute `priorExercise` against the full list, not the filtered subset, so a filtered view still shows correct deltas.
- Filtering and pagination only affect which sessions are *rendered*.

## Empty / edge states
- "No workouts in this range" message with a "Reset filters" button when filtered result is empty.
- If only one session of an exercise exists in history → keep current "First time logged".

## Files to touch
- `src/components/trainer/dashboard/tabs/clients/ClientWorkoutsDialog.tsx` — add toolbar, grouping, pagination, filter state. Use existing shadcn `Popover` + `Calendar` for date range, `Select` for exercise filter, `Button` for pagination, `Collapsible` for month groups.
- No data/schema changes. Demo data stays as is.

## Technical notes
- State: `{ from, to, exerciseKey, page, openMonths: Set<string> }`.
- Derive `fullSorted` once (memo), then `filtered = fullSorted.filter(...)` by date range + exercise presence, then `paged = filtered.slice((page-1)*10, page*10)`, then `grouped = groupBy(paged, 'YYYY-MM')`.
- Page size constant `PAGE_SIZE = 10`.
- Use `date-fns` (already in project) for range checks and month keys; format via existing `safeFormatDate`.
