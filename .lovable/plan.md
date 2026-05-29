# Prospect → CRM → Client message lifecycle

Simulate a marketplace prospect contacting every trainer, and add a status tag next to their name that evolves as the trainer acts on the relationship.

## Behavior

1. **Seed a demo prospect contact request** on first load of any trainer dashboard (Basic / Essential / Pro) if none exists in `localStorage["trainer-contact-requests"]`. The request comes from a marketplace user (e.g. "Marco Bianchi") with `status: "pending"` and a new field `relationship: "prospect"`.

2. **In the Messages tab "Requests" section** (existing `ContactRequestCard`), show a `Prospect` badge next to the sender's name so the trainer immediately recognizes this is not a client.

3. **Reply flow** (existing button): on Reply, status becomes `replied`. The conversation is now an active thread shown in the regular messages list with:
   - Tag next to the name: **`Prospect`** (still not in CRM)
   - New action button **`Add to CRM`** next to Reply
   
4. **Add to CRM**: clicking the button
   - Sets `relationship: "crm"` on the contact (persisted in `localStorage`)
   - Hides the `Add to CRM` button
   - Tag next to the name changes to **`CRM user`**
   - Normal messaging continues via existing `ClientChatDialog`
   - A secondary button **`Add as Client`** appears (so the trainer can promote them)

5. **Add as Client**: clicking it sets `relationship: "client"`, removes the tag entirely (no badge next to the name), and the conversation behaves like any normal client thread. (No real client record creation — purely UI/localStorage simulation, consistent with existing mock patterns.)

6. **Deny** keeps existing behavior (archives the request).

## Technical changes

- **`ContactRequest` type** (`ContactRequestCard.tsx`): add `relationship: "prospect" | "crm" | "client"`.
- **`ContactRequestCard.tsx`**: render a `Prospect` Badge next to `fromName`.
- **`MessagesTab.tsx`**:
  - On mount, if `trainer-contact-requests` is empty, seed one pending prospect request.
  - After `Reply`, instead of removing the entry from the visible list, keep replied prospects/CRM contacts in a new "Active Conversations" group above `messageRequests`, rendered with:
    - Name + dynamic tag (`Prospect` | `CRM user` | none for `client`)
    - Buttons: `Reply` (opens `ClientChatDialog`), `Add to CRM` (only when `relationship === "prospect"`), `Add as Client` (only when `relationship === "crm"`).
  - Helpers `promoteToCrm(id)` and `promoteToClient(id)` update localStorage and dispatch `trainer-contact-requests-changed`.
- **Badge styling**: use existing `Badge` component with `secondary` variant for `Prospect`, `default` (primary) for `CRM user`. Semantic tokens only.

## Files

- edit `src/components/trainer/dashboard/tabs/messages/ContactRequestCard.tsx`
- edit `src/components/trainer/dashboard/tabs/MessagesTab.tsx`

No DB or backend changes — fully localStorage-driven, matching the existing contact-request simulation.
