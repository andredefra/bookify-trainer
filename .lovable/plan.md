## Goal
For the launch there are no live sessions, packages, or programs on the client side. Trainers can't set a per-session price yet, so the client-facing UI must not advertise prices, and "Book Session" must become a lightweight event request — no payment, no session-duration selector, no estimated price.

## Changes

### 1. `src/components/trainer/BookingForm.tsx` (shared by 3 dialogs)
- Remove the info block that mentions "Book & Pay" vs "Send Request".
- Remove the "Book & Pay" primary submit button (and its `CreditCard` icon import).
- Rename the remaining submit button to **"Send Request"** with the `Send` icon; keep it as the form's `type="submit"` so all existing `onSubmit` wiring keeps working.
- Remove the now-unused `onRequest` prop / `handleRequest` helper and its secondary button (they duplicated the same request path).

Effect: the two dialogs "Book a Session with …" (`BookingDialog.tsx`, `overview/sessions/BookSessionDialog.tsx`, `overview/trainers/BookSessionDialog.tsx`) now show one "Send Request" button and no payment mention.

### 2. `src/components/client/trainers/dialogs/RequestSessionDialog.tsx`
- Remove the "Session duration" `Label` + `Select` (60/90 min) block and the `duration` state.
- Remove the "Estimated price" summary card at the bottom and the `estimatedPrice` `useMemo` (drop the `Euro` icon import if it becomes unused).
- Remove the `€{trainer.hourlyRate}/hour` line in the trainer summary — keep just avatar + name.
- The stored request payload keeps `trainerId`, `trainerName`, `trainerImage`, `proposedSlots`, `message`, `status`, `createdAt`; drop `hourlyRate`, `duration`, `estimatedPrice`.
- Update the dialog copy from "Request a session" → **"Request an event"** and description "Propose up to 3 dates that work for you. The trainer will confirm one and send a final invitation."

### 3. `src/components/client/trainers/MarketplaceTrainerCard.tsx`
- Remove the `<Badge>{trainer.price}/session</Badge>` in the header row (keep the name/specialty block full-width).

### 4. `src/components/client/trainers/TrainerCardContent.tsx`
- Remove the `hourlyRate` row (`DollarSign` + `${hourlyRate}/hour`). Drop the `DollarSign` import.

### 5. `src/components/client/trainers/profile/TrainerHeaderInfo.tsx`
- Remove the `€{trainer.hourlyRate}/hour` grid cell so the info row becomes 3 columns (location / experience / rating). Drop the `Euro` import if unused.

## Out of scope
- No changes to trainer-side / studio-side price fields or program/package pricing (those stay authoritative for the trainer dashboard).
- No DB / edge function / RLS changes — mock data left untouched; UI simply hides the price.
- `TrainerProfile.tsx` mock still defaults `hourlyRate: 50` in memory (unused after the header change), but I won't rip data-model fields out — safer for future re-enable.
- Payment dialogs elsewhere (packages, programs, invited sessions) are untouched; only the generic "Book Session" flow changes.

## Result
- Client Trainer cards (both grid and marketplace) show no price and no `$/€/session` badge.
- Trainer profile header shows location, experience, rating — no `€/hour`.
- Clicking "Book Session" opens a dialog titled "Book a Session with …" whose only CTA is **Send Request** — no payment, no info block.
- Clicking the profile-page "Book Session" opens "Request an event" — proposed dates + message only, no duration, no estimated price.
