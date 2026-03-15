

## Fix: `localStorage.clear()` in `useWorkoutLogs` Destroys Demo User Session

### Root Cause

**`src/hooks/useWorkoutLogs.ts`** calls `localStorage.clear()` on both lines 9 and 15. This nukes ALL localStorage data, including the `demo-user` key that `useAIAccess` depends on to detect demo mode and set usage to 4/5.

The Training Log tab uses both `useWorkoutLogs` and `useAIAccess`. When the tab mounts, `useWorkoutLogs` fires its effect and clears localStorage. By the time `useAIAccess` checks `localStorage.getItem('demo-user')`, it's already gone — so `isDemoMode()` returns `false`, `monthlyUsage` stays at 0, and you see 0/5.

### Fix (single file: `src/hooks/useWorkoutLogs.ts`)

Replace `localStorage.clear()` with targeted removal of only the workout-related key:

```typescript
localStorage.removeItem('workoutLogs');
```

This preserves `demo-user` and all other localStorage data while still resetting workout data as intended.

### Changes

**`src/hooks/useWorkoutLogs.ts`** — Replace both `localStorage.clear()` calls (lines 9 and 15) with `localStorage.removeItem('workoutLogs')`.

No other files need changes. The existing `useAIAccess` logic already correctly handles demo mode — it was just never able to detect it because the data was wiped.

