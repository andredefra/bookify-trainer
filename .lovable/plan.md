## Goal

Replace the current marketplace "Book Session" and "Send Message" actions on a trainer's profile with two new flows that match the rest of the product, and gate Book Session by trainer plan.

---

## 1. Book Session flow (client-initiated session request)

Trigger: client clicks **Book Session** on a marketplace trainer profile (`TrainerHeaderInfo` / `TrainerProfileDialog`).

New modal **`RequestSessionDialog`** with:
- Trainer header (name, avatar, hourly rate shown as "€X / hour")
- **Proposed timeslots**: client picks 1–3 date+time options from the trainer's published availability (reuse `AvailabilityTab` data). Add/remove slot rows.
- **Session type / duration** (60 / 90 min, default 60)
- **Estimated price** auto-calculated from rate × duration, shown read-only with note "Trainer may adjust or waive"
- **Message to trainer** (textarea, required)
- Buttons: Cancel / Send Request

On send → creates a "pending session request" entry. Client gets a toast: *"Request sent. Sarah will review your proposed times and reply."* The request shows up in client's `MySessionsTab` under a new **"Pending Requests"** section (above Session Invitations) with status `awaiting trainer`, listing proposed slots and the message.

Trainer side: the request lands in the trainer's session inbox. Trainer can:
- Reply via message (existing chat) to negotiate, OR
- **Confirm** one of the proposed slots → optionally edit price or toggle **Make this session free** → this generates the actual **Session Invitation** that already exists in the client's sessions area (the screenshot shown — "Invited by Trainer / Accept & Pay / Decline").

So the client-side request is the predecessor to the existing Invited-by-Trainer card; once the trainer confirms, the existing invitation UI/flow takes over unchanged.

---

## 2. Plan gating on marketplace

- Trainers on **Basic** plan: hide the **Book Session** button on their marketplace profile (`TrainerHeaderInfo`) and on the marketplace card (`MarketplaceTrainerCard`). Only **Send Message** is shown.
- Trainers on **Essential / Pro**: both buttons shown as today.

Source: each marketplace trainer record needs a `plan` field; default Essential where missing. Read it from `trainerData` / `gymTrainersMockData` and pass into `TrainerHeaderInfo` + card.

---

## 3. Send Message flow (open to all plans)

Trigger: client clicks **Send Message** on any trainer profile.

New modal **`ContactTrainerDialog`** with:
- Trainer header
- Subject (optional) + Message body (required)
- Send button → creates an "incoming contact request" message thread.

Trainer side: the message appears in the trainer's **Messages tab** under a new **"Requests"** filter at the top of unread, badged with `New contact`. The thread shows the message and two action buttons:
- **Reply** → opens normal chat; thread becomes a regular conversation. The client–trainer connection is implicit (chat-only, no training program / package access).
- **Deny** → archives the thread; client is notified *"Trainer is not available right now."*

Once replied, both sides chat normally via the existing `ClientChatDialog` / messaging components — no client-of-trainer relationship is required.

---

## Files to add / change

**New**
- `src/components/client/trainers/dialogs/RequestSessionDialog.tsx`
- `src/components/client/trainers/dialogs/ContactTrainerDialog.tsx`
- `src/components/client/tabs/sessions/PendingRequestCard.tsx` (client-side "awaiting trainer" card)
- `src/components/trainer/dashboard/tabs/messages/ContactRequestCard.tsx` (Reply / Deny)

**Edit**
- `src/components/client/trainers/profile/TrainerHeaderInfo.tsx` — accept `trainerPlan`, hide Book Session on basic, wire new dialogs.
- `src/components/client/trainers/TrainerProfileDialog.tsx` — own both dialogs' state, drop the old `onBookSession`/`onSendMessage` BookingDialog path.
- `src/components/client/trainers/MarketplaceTrainerCard.tsx` — same plan gating on the card CTA.
- `src/components/client/trainers/hooks/useTrainerMarketplace.ts` — remove old BookingDialog, replace with session-request handler that stores a pending request.
- `src/components/client/trainers/TrainerMarketplace.tsx` — drop legacy `BookingDialog`.
- `src/components/client/tabs/sessions/MySessionsTab.tsx` — add "Pending Requests" section above Session Invitations.
- `src/components/trainer/dashboard/tabs/MessagesTab.tsx` (+ thread list) — show "Requests" group with Reply / Deny.
- `src/data/trainerMockData.ts` / `gymTrainersMockData.ts` — add `plan: "basic" | "essential" | "pro"` field.

State: store pending session requests and contact requests in `localStorage` (`client-session-requests`, `trainer-contact-requests`), consistent with existing client mock data patterns. No DB changes.

---

## Verification

- Visit marketplace, open an Essential/Pro trainer → both Book Session and Send Message visible. Book Session opens new `RequestSessionDialog` with proposed slots + price + message. Submit → entry appears under "Pending Requests" in Sessions tab.
- Open a Basic-plan trainer → only Send Message is visible.
- Send a message → trainer Messages tab shows the contact request with Reply / Deny.
- After trainer confirms a proposed slot (existing trainer flow, optionally free), the client sees the existing **Session Invitations** card with Accept & Pay / Decline (or Accept if free).
