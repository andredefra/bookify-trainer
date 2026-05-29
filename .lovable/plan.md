# Show prospect contact requests inside the Notification Center

The bell counts pending prospect requests but `NotificationCenter` only renders entries from `useNotifications`, so the panel shows "No notifications".

## Change

Edit `src/components/trainer/dashboard/header/NotificationCenter.tsx`:

1. Read `trainer-contact-requests` from localStorage (subscribe to `trainer-contact-requests-changed`) and filter for `status === "pending"`.
2. Render a "Message Requests" section at the top of the panel — one row per pending prospect with the Mail icon, "New message request from {fromName}", subject as subtitle, and time-ago.
3. Combined empty state ("No notifications") only when both the prospect list and `notifications` are empty.

No other files change.
