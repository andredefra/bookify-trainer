## Changes

### 1. `src/components/ClientProfile.tsx`
Remove the green "{n} sessions" chip below the email (the `Medal` chip in the 2-column grid). Keep the "since" chip and let it span both columns (`grid-cols-1`) so the layout stays balanced.

The small green "12" badge overlaid on the avatar stays — it's a separate visual element and not "below the email".

### 2. `src/components/trainer/dashboard/tabs/clients/ClientProfileDialog.tsx`
Widen the modal so more information fits:
- `DialogContent` `max-w-3xl` → `max-w-5xl` (keeps `95vw` / `90vw` mobile values, keeps `max-h-[90vh]` scroll).

No other behavior or data changes.
