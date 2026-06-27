Add a "Workouts" button to each client card in the trainer Client Management list so a Basic-plan trainer can review all daily workouts a client has logged — whether following an assigned program or doing a free workout — with progression comparison vs the previous time the same exercise was performed.

## Files

1. **`src/components/trainer/dashboard/tabs/clients/ClientWorkoutsDialog.tsx` (new)**
   - Modal dialog (`Dialog` / `DialogContent`, max-w-3xl, scroll area).
   - Header: "Workouts of {client.name}" with a short description.
   - Body: list of `WorkoutLog`s sourced from `demoWorkoutLogs` (this is the demo dataset already used elsewhere) sorted desc by date, grouped by day. Each session shows: date, name, duration, then for each exercise a small block with sets (set #, target/actual reps, weight, ✓).
   - For every set, compute a delta vs the same exercise's most recent prior occurrence in earlier logs (matched by `exerciseDbId` first, fallback `name`, set index aligned). Show a colored badge per set: green up-arrow when weight or reps improved, red down-arrow when worse, gray dash when equal, and "—" when no prior reference. Also show a per-exercise summary line (e.g. "+5 kg vs last time, same reps").
   - Empty state when the client has no logs.

2. **`src/components/trainer/dashboard/tabs/clients/ClientCard.tsx`**
   - Add a new `onViewWorkouts: (client: ClientItem) => void` prop.
   - Add a new outline button between the "Stats" and "View" buttons using a `Dumbbell` icon (Lucide — closest to a "muscular arm" in the set; already imported in this file) labeled "Workouts" (hidden on xs).

3. **`src/components/trainer/dashboard/tabs/ClientsTab.tsx`**
   - Add state `showWorkoutsDialog` and `workoutsClient`.
   - Add handler `handleViewWorkouts(client)` that opens the dialog.
   - Pass it to `<ClientCard onViewWorkouts={...} />`.
   - Render `<ClientWorkoutsDialog client={workoutsClient} open={showWorkoutsDialog} onOpenChange={...} />`.

No database/backend work — uses existing local demo workout data, consistent with how other Basic-plan dashboard sections already operate. No changes to other plans' UIs (the same button will appear there too because `ClientCard` is shared; this is consistent — only the Basic plan requirement is the trigger but the feature is generally useful and matches existing icon-button pattern).