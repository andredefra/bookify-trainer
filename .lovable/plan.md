I’ll update `src/components/trainer/dashboard/tabs/settings/AvailabilitySection.tsx` so the Calendar Integration area is no longer a “full version” placeholder.

Plan:
1. Replace the green placeholder notice with a real setup area directly inside Availability Settings.
2. Add a connected calendars list with mock frontend state, including:
   - provider name/icon label
   - account email
   - primary badge
   - two-way sync switch
   - “Set primary” and “Disconnect” actions
3. Add an “Add calendar” dropdown with options for:
   - Google Calendar
   - Outlook / Microsoft 365
   - Apple iCloud
4. Allow adding more than one calendar in the UI using local React state, so the setup area is clearly visible immediately.
5. Keep this frontend-only for now; no real OAuth/backend calendar connection will be wired unless requested separately.