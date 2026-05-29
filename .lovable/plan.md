# Move incoming requests to "Unread" + add notification signal

## Behavior

1. **Messages tab (All Messages)**: replace the full `Requests` block with a compact, single-row summary banner:
   - "You have **1 new request** — View in Unread" (count is dynamic; clicking jumps to the Unread tab).
   - The full prospect card is no longer rendered here.

2. **Unread tab**: render the actual `ContactRequestCard`(s) here, grouped under a "Requests" heading, with the existing Reply / Deny actions. The empty-state ("No unread messages") only shows when there are zero pending requests AND zero unread client messages.

3. **Tab indicator**: the `TabsTrigger` for "Unread" gets a small count badge (e.g. `Unread · 1`) using a primary-tinted pill when `contactRequests.length > 0`. Removed when count is 0.

4. **Header notification**: dispatch a UI-level notification when a pending contact request exists. Add a lightweight `useEffect` in `MessagesTab` that, on first detection of a new pending request id, calls a small helper to push a toast `New message request from {name}` once per id (track shown ids in `sessionStorage` to avoid spamming on every tab switch). Also add a red dot indicator on the `NotificationBell` when there are pending contact requests — extend `NotificationBell` to read `trainer-contact-requests` from localStorage and OR its existing unreadCount with the pending-request count for the dot visibility (no entries added to the persisted notifications list, just the visual dot + count).

## Files

- edit `src/components/trainer/dashboard/tabs/MessagesTab.tsx` — move requests from Messages to Unread tab, replace with summary banner, add count to Unread tab trigger, fire one-time toast per new request id.
- edit `src/components/trainer/dashboard/header/NotificationBell.tsx` — include pending contact requests in the badge/dot count.

No backend changes — all driven by the existing `trainer-contact-requests` localStorage entry and its `trainer-contact-requests-changed` event.
