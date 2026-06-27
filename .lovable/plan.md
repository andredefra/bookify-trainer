## Issues

1. The Workouts modal doesn't scroll — only the first day is visible and the user can't reach the other days.
2. Every exercise shows "First time logged" because `demoWorkoutLogs` contains only one occurrence of each exercise, so there's no prior session to compare against.

## Fixes

### 1. Make the dialog scrollable (`ClientWorkoutsDialog.tsx`)
The `ScrollArea` is nested inside a flex column whose parent doesn't constrain height correctly, so the inner viewport never gets a bounded size and the page just clips.
- Add `min-h-0` to the flex container and to the `ScrollArea` so the viewport can shrink and scroll.
- Give the `ScrollArea` an explicit max-height fallback (e.g. `h-[calc(85vh-8rem)]`) to guarantee scrollability across browsers.
- Ensure `DialogContent` keeps `flex flex-col` with `overflow-hidden` and that the header is `shrink-0`.

### 2. Expand demo workout history (`src/data/training/demoWorkoutLogs.ts`)
Add 2 additional past sessions (e.g. ~7 and ~14 days ago) that repeat the same exercises (Bench Press, Lat Pulldown, Shoulder Press, Squats, Romanian Deadlift) with slightly lower weights/reps. This makes the "vs prior" column light up with green ▲ trends and the per-exercise "+X kg avg, +Y reps avg vs last time" summary actually appear, demonstrating progression as requested.

No other files change. Trainer-side logic and UI behavior stay the same; only presentation (scroll) and demo data are touched.
