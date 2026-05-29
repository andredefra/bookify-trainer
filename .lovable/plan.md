# Fix: prospect request not visible

The seed effect in `MessagesTab` only runs when `trainer-contact-requests` is empty. After earlier testing (reply/deny), the array already contains entries with non-pending status, so no new pending prospect is ever seeded — and the banner/Unread badge stay hidden.

## Change

In `src/components/trainer/dashboard/tabs/MessagesTab.tsx`, replace the seed condition:

- **Before**: seed only when `all.length === 0`.
- **After**: seed when there is no entry with `status === "pending"` AND `relationship === "prospect"`. Append a fresh "Marco Bianchi" prospect request with a new id to the existing array (don't wipe denied/replied history), then dispatch `trainer-contact-requests-changed`.

This guarantees every trainer profile always has at least one visible prospect request in the Unread tab + the summary banner on Messages + the Unread tab count badge + the header bell badge, even across reloads or after the test message was previously replied/denied.

No other files change.
