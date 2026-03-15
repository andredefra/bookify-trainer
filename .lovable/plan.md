

## Plan: Rename "Plan Training Day" to "Plan an Event" with Session Request Support

### What
Replace the "Plan Training Day" concept with a broader "Plan an Event" dialog. The event types become:
1. **Training Day** (Workout, Cardio, Stretching, Rest Day) -- same as now, local-only
2. **Session with Trainer** -- sends a request to the client's personal trainer. If the trainer has a basic/free plan, it creates a normal calendar event instead of a real bookable session.

### Changes

**`src/components/client/tabs/MyCalendarTab.tsx`** (main file, all changes here)

1. **Rename UI labels**: "Plan Training Day" button and dialog title become "Plan an Event". Subtitle updated accordingly.

2. **Add event category selector** at the top of the dialog:
   - "Training Day" -- shows existing activity type selector (workout/cardio/stretching/rest)
   - "Session with Trainer" -- shows trainer selector, session type (video/in-person), and a note that this sends a request to the trainer

3. **Update `PlannedActivity` interface** to support both categories:
   - Add `category: 'training' | 'session'`
   - Add optional `trainer?: string`, `sessionMode?: 'video' | 'in-person'`, `requestStatus?: 'pending' | 'confirmed' | 'declined'`
   - Add optional `trainerPlan?: 'free' | 'essential' | 'pro'`

4. **Session request logic** in `handleAddActivity`:
   - When category is "session", check trainer plan from mock data (using `availableTrainers` + a plan field)
   - If trainer plan is `free`/basic: create a normal event (no request sent), show info text "This trainer is on a basic plan -- session added as a calendar event"
   - If trainer plan is `essential`/`pro`: create with `requestStatus: 'pending'`, display as "Request Sent" badge

5. **Day detail rendering**: 
   - Session requests show a "Request Sent" or "Confirmed" badge with trainer name
   - Normal training events render as before
   - Basic-plan sessions show as regular events with trainer name but no request status

6. **Legend update**: Add a third color (amber/yellow) for session requests

### No database changes -- all mock/local state for now.

