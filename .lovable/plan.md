## Goal
Calendar integration should live only in **Settings → Availability**, not in the Calendar tab sidebar.

## Current state
- `src/components/trainer/dashboard/tabs/settings/AvailabilitySection.tsx` already has a "Calendar Integration" block (the one in the screenshot).
- `src/components/trainer/dashboard/tabs/CalendarTab.tsx` (lines ~473–492) also shows a "Google Calendar" card in the sidebar with a Connect button. This duplicate needs to go.
- The "Google Calendar" button in the CalendarTab header (line ~266) is also a connect-style action that belongs in settings.

## Changes
1. **`src/components/trainer/dashboard/tabs/CalendarTab.tsx`**
   - Remove the entire "Google Calendar Integration" `<Card>` block in the sidebar (lines ~473–492).
   - Remove the "Google Calendar" button in the header toolbar (around line 266) so the only entry point is Settings → Availability.

2. **`src/components/trainer/dashboard/tabs/settings/AvailabilitySection.tsx`**
   - Keep the existing "Calendar Integration" section as the single source. No content change required (the green "available in the full version" notice stays).

No other tabs reference Google Calendar integration UI, so no further edits needed.