
## Goal

Change the "My Studio or Gym" settings flow so trainers can add the gym/studio they work at (searching existing ones or creating an unverified one), then generate a unique invite link that lets that gym/studio onboard onto the platform — fully mocked, no real backend.

## 1. Settings → My Studio or Gym (`MyGymsSection.tsx`)

- Rename primary CTA from "Request Your First Affiliation" / "Request Affiliation" to **"Add your gym or studio"**.
- Replace the current request dialog with a multi-step modal:

  **Step 1 — Search**
  - Single input: search by name OR address (reuse `searchGyms`).
  - Show results as today; each result has a "Select" action.
  - Below results: a "Can't find it? Add it manually" link/button.

  **Step 2a — Selected existing gym**
  - Shows summary; trainer confirms → affiliation added as `approved` + `verified` (existing mock list is verified).

  **Step 2b — Add new (manual)**
  - Fields: Name, Type (radio: Gym / Studio), Street/Address, City (optional), Notes (optional).
  - On Confirm → show confirmation screen:
    > "You are adding an unverified {gym|studio}. Invite the {gym|studio} to the platform so they can verify the entity and gain credibility and trust."
  - Two buttons: **Cancel** / **Confirm & generate invite link**.

  **Step 3 — Invite link**
  - Generate a unique slug (e.g. `crypto.randomUUID()`) and build URL: `${window.location.origin}/gym-onboarding/{token}`.
  - Show link in read-only input with Copy button + share hint.
  - Persist the pending entity + token in `localStorage` under `mock-gym-invites` (array of `{ token, name, type, address, status: 'pending'|'verified', trainerId, createdAt }`).
  - Also add affiliation entry locally marked `unverified` so it appears in the affiliation list.

- Affiliation card: show an **Unverified** badge (amber) for manually added entries, plus a "Copy invite link" action to re-share. Verified ones show a **Verified** badge (green).

## 2. Gym/Studio onboarding page (mock auth)

- New route: `/gym-onboarding/:token` → new page `src/pages/GymOnboarding.tsx`.
- Page reads the token from `localStorage.mock-gym-invites`. If unknown token → friendly "Invalid or expired link" state.
- Layout: branded card with 3 sections:
  1. **Confirm trainer's entries** — pre-filled name, type, address; editable inputs; "Looks correct" confirmation.
  2. **Verification documents (mock)** — drag/drop or file input accepting PDFs/images; files kept in component state only, listed by name (no upload). Helper text explains they help build trust.
  3. **Create your account** — email + password + confirm password fields.
- Submit button "Complete onboarding":
  - Validates fields (zod).
  - Updates the invite entry in localStorage to `status: 'verified'`, attaches submitted data, stores a mock gym user: `localStorage.setItem('demo-user', JSON.stringify({ type:'gym', email, id: token, name }))`.
  - Also flip the matching trainer affiliation entry to `verified`.
  - Redirect to `/gym-dashboard`.

## 3. Gym dashboard restriction for invited gyms

- In `GymSidebar.tsx`, when the logged-in gym user originated from a mock invite (detect via a flag on `demo-user`, e.g. `source: 'invited'`), render **only** two items: `Trainers Management` and `Settings`. Default tab = `trainers-management`.
- `GymDashboardContainer.tsx`: when `source === 'invited'`, force `activeTab` into the allowed set and skip rendering hidden tab content. Header/branding unchanged.

## 4. Login support (mock)

- `Login.tsx` already reads `demo-user` from localStorage. Add a small mock check: if the entered email matches a `mock-gym-invites` entry with `status: 'verified'`, log them in as that gym (`type: 'gym'`, `source: 'invited'`) and route to `/gym-dashboard`. Password is accepted as long as non-empty (mock).

## 5. Files touched

- `src/components/trainer/dashboard/tabs/settings/sections/MyGymsSection.tsx` — full rewrite of dialog flow.
- `src/components/trainer/dashboard/tabs/settings/sections/GymInfoCard.tsx` — add Verified/Unverified badge + "Copy invite link" action (if affiliation has token).
- `src/hooks/useTrainerGymAffiliations.ts` — add `addManualGym(data) → { token, link }` and `verified`/`token` fields on the local affiliation shape (kept local — no DB writes).
- `src/pages/GymOnboarding.tsx` — new page.
- `src/App.tsx` — register `/gym-onboarding/:token` route.
- `src/components/gym/dashboard/GymSidebar.tsx` — filter nav for invited gyms.
- `src/components/gym/dashboard/GymDashboardContainer.tsx` — restrict default + active tab for invited gyms.
- `src/pages/Login.tsx` — mock login for invited gyms.

## Notes

- Everything is mocked via `localStorage` keys `mock-gym-invites` and `demo-user`; no Supabase tables, RLS, or migrations.
- Existing verified mock gyms in `searchGyms` remain unchanged and treated as `verified`.
- Copy is in English to match the rest of the settings UI; can be localized later.
