## Move "Remove Client" button

Move the destructive "Remove Client" button out of the dialog footer and place it inside the left "Client Profile" sidebar card, directly below the "March 2023" date chip.

### Changes

1. **`ProfileDialogFooter.tsx`** — Remove the `Remove Client` button and its `onRemove` prop rendering from the footer. Footer keeps Message / Schedule Event / help / Close only.

2. **`ClientProfile.tsx`** (left sidebar card) — Accept a new optional `onRemove?: () => void` prop. Below the "March 2023" chip, render a full-width destructive button "Remove Client" (trash icon) when `onRemove` is provided.

3. **`ClientProfileDialog.tsx`** — Pass `onRemove={() => setConfirmOpen(true)}` to `<ClientProfile>` instead of to the footer. Keep the existing `AlertDialog` confirmation flow unchanged.

No business logic changes — purely repositioning the trigger.