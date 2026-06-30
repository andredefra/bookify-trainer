Hide all AI-based elements from the Analytics view of the Basic client demo (Andrea), leaving only Overview and Activity tabs.

## Scope
Changes are gated by a `hideAI` prop so only the Basic client dashboard is affected. Regular client/user dashboards remain unchanged.

## Changes

**1. `src/components/client/analytics/WorkoutAnalytics.tsx`**
- Add `hideAI?: boolean` prop.
- When `hideAI` is true:
  - Don't render the "AI Analysis" button (the one with the Brain icon next to the timeframe Select).
  - Remove the "AI Insights" `TabsTrigger` and its entire `TabsContent` block (lines ~522-611).
  - Change `TabsList` from `grid-cols-3` to `grid-cols-2`.
  - Don't render the bottom `<AnalyticsChat />` section.

**2. `src/components/client/tabs/AnalyticsTab.tsx`**
- Add `hideAI?: boolean` prop, forward to `<WorkoutAnalytics hideAI={hideAI} />`.

**3. `src/pages/ClientDashboardBasic.tsx`**
- Pass `hideAI` to `<AnalyticsTab />`.

No backend/data changes; no other dashboards touched.
