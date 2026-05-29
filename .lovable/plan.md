Implement notification-to-message navigation.

1. Update `NotificationCenter.tsx`
   - Make each pending message request row a real clickable button/interactive row.
   - On click, close the notification popover and dispatch a `dashboard-navigate` custom event with `{ tab: "messages", subTab: "unread" }`.
   - Keep the existing visual style, but add pointer/hover/focus states so it’s clearly clickable.

2. Update `DashboardContainer.tsx`
   - Listen for the `dashboard-navigate` event.
   - If the requested tab is available for the current trainer plan, call `setActiveTab("messages")`.
   - Clean up the event listener on unmount.

3. Update `MessagesTab.tsx`
   - Listen for the same `dashboard-navigate` event.
   - When `subTab` is provided, switch the internal messages tab to `unread`.
   - Also handle the timing case where the Messages tab mounts after the dashboard tab changes by reading a short-lived pending navigation value from `sessionStorage`.

Expected result: clicking “New message request” in the notification panel closes the panel and opens Dashboard → Messages → Unread, where the request card is visible.