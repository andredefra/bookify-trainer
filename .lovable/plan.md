

## Plan: Client Exercise Library with Trainer + Personal Databases

### Overview
Add an "Exercise Library" button next to "Log Workout" in the client's Training Log tab. The client sees a merged view of two exercise sources:
1. **Trainer's exercises** — read-only, visible only while the client-trainer relationship is active
2. **Client's own exercises** — fully editable (create, edit, delete)

### Architecture

**Data sources (localStorage for now, mirrors trainer pattern):**
- `client_custom_exercises` — client's own custom exercises
- `client_exercise_modifications` — client's modifications to their own exercises
- `client_deleted_exercises` — client's soft-deleted exercises
- Trainer exercises come from the existing `trainer_custom_exercises` + the base exercise database, displayed as read-only

**Key distinction from trainer library:**
- Trainer exercises show a "Trainer" badge and cannot be edited/deleted by the client
- Client exercises show a "My Exercise" badge and are fully manageable
- When client-trainer relationship ends, trainer exercises simply aren't shown

### Changes

#### 1. New hook: `src/hooks/useClientExerciseLibrary.ts`
- Similar to `useExerciseLibraryManager` but loads from two sources:
  - Client's own custom exercises (`client_custom_exercises` localStorage)
  - Trainer's exercise database (base DB + `trainer_custom_exercises`) — marked as read-only
- CRUD operations only affect client-prefixed localStorage keys
- Each exercise gets a `source: 'client' | 'trainer'` tag for UI differentiation

#### 2. New component: `src/components/client/training/ClientExerciseLibraryDialog.tsx`
- Wraps the existing `ExerciseLibraryDialogContent` component (reuse filters, pagination, cards)
- Adds a source filter toggle: "All" | "My Exercises" | "Trainer's Exercises"
- Passes `selectionMode={false}` for management, disables edit/delete for trainer-sourced exercises
- Dialog title: "My Exercise Library"

#### 3. Update: `src/components/client/tabs/TrainingLogTab.tsx`
- Add a "My Exercises" button (Dumbbell icon) to the left of "Log Workout"
- Opens `ClientExerciseLibraryDialog`

#### 4. Update exercise selector in workout log form
- When client logs a workout, the `ExerciseSelector` should pull from the merged client+trainer exercise pool (using the new hook) so the client can pick from both databases

### Technical Details

- The `ExerciseData` type gets an optional `source?: 'client' | 'trainer'` and `readOnly?: boolean` field
- Reuse `ExerciseLibraryDialogContent`, `ExerciseLibraryList`, `ExerciseVisualCard` — these already support selectionMode and edit/delete callbacks; we just conditionally disable edit/delete based on `readOnly`
- The "trainer relationship active" check can initially be a simple boolean (e.g., `localStorage.getItem('client-trainer-id')` or presence of trainer exercises); later wired to Supabase

