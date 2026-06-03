## Issues

**1. Onboarding link "Invalid or expired"**

The gym/studio invite is stored only in `localStorage` (`mock-gym-invites`) under `src/utils/mockGymInvites.ts`. localStorage is scoped per-browser/per-device, so opening the link in a different browser (your Edge screenshot) or on another device returns `undefined` from `getInviteByToken` and renders the error state.

**2. Client value shows 5000€ on card but 0 in the Edit dialog**

- `SalesCard.tsx` renders the static mock `contact.value` (e.g. 5000 for Giovanni Verdi from `useSalesContacts.ts`).
- `EditableContactDialog.tsx` for clients shows `getTotal(email)` from `SalesEntriesContext` (Sales — Entries), which is empty on first load → 0.

Two sources of truth for client value → mismatch.

## Plan

### Fix 1 — Portable onboarding link

Update `src/utils/mockGymInvites.ts` so the invite is also encoded inside the token, making the link openable from any browser/device without a backend:

- In `createInvite`: build a JSON payload (`name`, `kind`, `street`, `city`, `notes`, `trainerId`, `trainerEmail`, `createdAt`), base64url-encode it, and use that as the `token` (with a short prefix like `inv_`).
- In `getInviteByToken`: first try the existing localStorage lookup; if missing and the token decodes to a valid payload, reconstruct a `MockGymInvite` with `status: "pending"` and return it (also persist it to localStorage so subsequent calls work normally).
- `buildOnboardingUrl` stays the same — the URL is now self-contained.

This keeps the mock flow but makes invite links shareable across browsers, matching real-world behavior.

### Fix 2 — Single source of truth for client value

Make Sales — Entries the canonical source for client `value`, and seed it so existing mock clients display their expected totals.

- `src/context/SalesEntriesContext.tsx`: when no `trainer-sales-entries` exists in localStorage, seed it with mock entries that sum to the values currently shown on the cards:
  - `g.verdi@example.com` → one Program entry of 5000€
  - `s.esposito@example.com` → one Package entry of 2400€
  - `a.russo@example.com` (terminated) → 3600€
- `src/components/trainer/dashboard/tabs/sales/SalesCard.tsx`: when `contact.status === "client"`, display `getTotal(contact.email)` instead of `contact.value`, so the card and the Edit dialog always agree and the value reflects real Sales — Entries.

Non-client statuses (lead, prospect, lost) keep showing the editable `contact.value` as today.

### Files touched

- `src/utils/mockGymInvites.ts` — self-encoding token + decode fallback
- `src/context/SalesEntriesContext.tsx` — seed mock entries on first load
- `src/components/trainer/dashboard/tabs/sales/SalesCard.tsx` — clients render `getTotal(email)`

No schema/backend changes; mock-data layer only.