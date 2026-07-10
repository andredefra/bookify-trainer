In `src/components/client/tabs/settings/NotificationsSection.tsx`, force the Marketing notification to always be on and non-toggleable:

- Set `marketing: true` in the initial state.
- On the Marketing `Switch`: set `checked={true}`, `disabled`, and remove the `onCheckedChange` handler so the user cannot turn it off.
- Leave the other toggles unchanged.

No other files affected.