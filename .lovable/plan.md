Restructure the "Plan an Event" dialog so that "Rest Day" is no longer an activity type under Training Day, and add a new top-level event category for generic events.

### What will change

**`src/components/client/tabs/MyCalendarTab.tsx`**
- Remove `rest` / "Rest Day" from the `activityTypes` list used under Training Day.
- Add `"general"` as a third event category alongside `"training"` and `"session"`.
- Update the `PlannedActivity` interface so `category` accepts `"training" | "session" | "general"` and add a generic `type` value for general events.
- Add a third "General Event" button in the Event Type selector (Training Day / Session with Trainer / General Event).
- When "General Event" is selected, show only title, date, time and notes — no Activity Type dropdown and no trainer/session-mode fields.
- Update `handleAddActivity` to create a general-event activity with category `"general"` and type `"general"`.
- Update calendar day modifiers, selected-day list rendering, icon helpers and color helpers to recognise general events.
- Keep existing training/session behaviour unchanged.

**`src/components/client/overview/UpcomingEventsCard.tsx`**
- Update the `CalendarEvent` interface to accept `category: "training" | "session" | "general"`.
- Update `iconFor`, `colorFor` and `labelFor` helpers to handle general events.
- Update the category badge in the list and in the details dialog so general events show as "General Event".
- Update `originBadge` so general events planned by the user show "Planned by you".

### Not in scope
- No database or backend changes (calendar events are stored in localStorage in this view).
- No changes to session request logic or trainer plans.

### UX note
The new General Event category is meant for anything that is not a training session or a trainer appointment (e.g. "Massage", "Meal prep", "Rest/recovery note").