Two surgical changes scoped to the basic-plan trainer dashboard:

### 1. Remove "Recent Activities" widget on basic plan
In `src/components/trainer/dashboard/tabs/OverviewTab.tsx`, add `"recent-activities"` to the `basic` entry of `PLAN_HIDDEN_WIDGETS`. The Messages widget remains and continues to cover what's relevant on basic. Other plans are unaffected.

### 2. Sidebar "Upcoming" should show calendar activities, not sessions
The desktop sidebar's Upcoming list is fed by `sampleSessions` (Morning HIIT, Personal Training) in `src/components/trainer/dashboard/DashboardContainer.tsx`. These are session-typed and not valid for basic.

Add a `basicSampleActivities: TrainerSessionItem[]` array with 2–3 non-session calendar-activity items appropriate for basic users (e.g. "Workout reminder", "Stretching session", "Weekly plan review") using simple date/time strings matching the existing `TrainerSessionItem` shape. When `plan === "basic"`, pass this array (instead of `sampleSessions`) to `DashboardSidebar` and to `OverviewTab`. Essential/Pro keep `sampleSessions`.

No other components, business logic, or shared sample data are touched.