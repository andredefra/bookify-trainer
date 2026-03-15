

## Plan: Add "My Calendar" Tab to Client Dashboard

### What
Add a new "My Calendar" navigation item in the sidebar, positioned above "Messages". This page shows a full calendar view of all upcoming activities (sessions, training days, package sessions) and lets the client plan new training days.

### Changes

**1. Update Sidebar Navigation** (`src/components/client/ClientSidebar.tsx`)
- Add a new sidebar item `{ id: "my-calendar", label: "My Calendar", icon: CalendarDays }` inserted between "Analytics" and "Messages" in the `sidebarItems` array.

**2. Create MyCalendarTab Component** (`src/components/client/tabs/MyCalendarTab.tsx`)
- Full-page calendar view using the existing `Calendar` component (react-day-picker).
- Left side: calendar with date selection, dots on days with activities.
- Right side: list of activities for the selected date (sessions, training days, planned workouts).
- A "Plan Training Day" button that opens a dialog to add a personal training day with:
  - Date (pre-filled with selected date)
  - Time picker
  - Activity type (Workout, Cardio, Stretching, Rest Day)
  - Notes field
- Planned training days stored in local state (mock data for now).
- Aggregates data from the `upcomingSessions` prop and locally planned activities.
- Color-coded indicators: sessions (blue dot), planned training (green dot).

**3. Register Tab in Dashboard** (`src/pages/ClientDashboard.tsx`)
- Import `MyCalendarTab`.
- Add a new `<TabsContent value="my-calendar">` rendering the component, passing `upcomingSessions`.

### Technical Details
- The calendar reuses the same `Calendar` UI component and patterns from `CalendarSessionView.tsx`.
- The "Plan Training Day" dialog uses existing `Dialog`, `Button`, `Input`, `Select`, and `Textarea` components.
- No database changes needed — planned training days use component-level state with mock data initially.

