

## Plan: Fix Demo User AI Usage Always Showing 0/5

### Root Cause

The `useAIAccess` hook has a race condition. Even though `useState(isDemoUser ? 4 : 0)` should initialize to 4, the `useEffect` that calls `fetchMonthlyUsage` is gated behind `subscriptionLoading`. The `useClientSubscription` hook runs its own async fetch, and by the time all state updates batch and commit, the initial value of 4 gets lost or overwritten. The `subscriptionLoading` dependency also causes the effect to re-fire in ways that can reset state.

### Fix (single file: `src/hooks/useAIAccess.ts`)

1. **Run demo user initialization immediately in a separate `useEffect` with no dependencies** — not gated by `subscriptionLoading`. This ensures demo users always get `monthlyUsage = 4` regardless of subscription loading timing.

2. **Skip the `subscriptionLoading`-gated effect entirely for demo users** — only run the Supabase fetch path for real authenticated users.

3. **Guard all error/catch paths** so they never reset `monthlyUsage` to 0 for demo users.

The key change:

```typescript
useEffect(() => {
  // Demo users: set usage immediately, no async needed
  if (isDemoUser) {
    setMonthlyUsage(4);
    setLoading(false);
    return;
  }
  // Real users: wait for subscription to load first
  if (!subscriptionLoading) {
    fetchMonthlyUsage();
  }
}, [subscriptionLoading, isDemoUser]);
```

And in `fetchMonthlyUsage`, remove the demo user branch entirely — it will only ever be called for real users.

