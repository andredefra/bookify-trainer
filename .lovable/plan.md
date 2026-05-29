## Changes

### 1. Basic plan: "Schedule Session" → "Schedule Event" in Client Profile dialog

**`ProfileDialogFooter.tsx`** — accept a `plan` prop (or a `scheduleLabel`/`onScheduleEvent` handler). When `plan === "basic"`, render the button as "Schedule Event" and trigger an event-creation flow instead of session scheduling.

**`ClientProfileDialog.tsx`** — read `useTrainerPlan()` and pass it (or the appropriate handler) down to `ProfileDialogFooter`. Add an `onScheduleEvent?: (clientName: string) => void` prop alongside the existing `onScheduleSession`.

**`ClientsTab.tsx`** —
- Add `showCreateEventDialog` state and an `eventPrefillClient` string.
- Implement `handleScheduleEvent(clientName)` which sets the prefill client and opens the existing `CreateEventDialog` (from `../dialogs/CreateEventDialog`).
- Pass `onScheduleEvent={handleScheduleEvent}` to `ClientProfileDialog`.
- Render `<CreateEventDialog open={showCreateEventDialog} onOpenChange={...} />` with the client name prefilled into the `client` field.

**`CreateEventDialog.tsx`** — add an optional `defaultClient?: string` prop and seed `formData.client` from it when the dialog opens, so the event is directly related to the selected user.

Pro/Essential behavior is unchanged (still "Schedule Session" → `EnhancedScheduleSessionDialog`).

### 2. Sales tab layout — Total moved below Add Entry

**`SalesTab.tsx`** — restructure the header row:
- Left side: only the title ("Sales — Entries") + description paragraph.
- Right side: a vertical stack containing the `Add Entry` button on top and the `Total €X.XX` label aligned to the right directly underneath the button.

Concretely:

```tsx
<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
  <div> {/* title + description */} </div>
  <div className="flex flex-col items-end gap-2">
    <Button size="sm" onClick={() => setDialogOpen(true)}>
      <Plus className="h-4 w-4 mr-1" /> Add Entry
    </Button>
    <div className="text-right">
      <p className="text-xs text-muted-foreground">Total</p>
      <p className="text-lg font-bold">€{total.toFixed(2)}</p>
    </div>
  </div>
</div>
```

No data, hooks, or other plans are affected.

### Verification
- Login as `andrea.mypersonal.fit@gmail.com` (Basic) → open any client profile → footer shows "Schedule Event"; clicking it opens `CreateEventDialog` with that client pre-selected. Sales tab shows Add Entry button with Total stacked right-aligned beneath it.
- Login as Essential / Pro → footer still shows "Schedule Session" with the existing session-scheduling flow.