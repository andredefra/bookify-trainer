## Fix gym affiliations error & add remove action

### 1. Silence the "Failed to load gym affiliations" error toast
`src/hooks/useTrainerGymAffiliations.ts` → `fetchAffiliations()` always shows a destructive toast when the Supabase query fails. In demo mode (no authenticated user) this fires every time `MyGymsSection` mounts. Update the hook to:
- Skip the fetch (and toast) when there's no authenticated Supabase user — just set `affiliations` to `[]` and return.
- Keep the `console.error` for real debugging but remove the user-facing toast on failure (the section already manages its own local/demo state).

### 2. Add "Remove" action for affiliations
`src/components/trainer/dashboard/tabs/settings/sections/MyGymsSection.tsx`:
- Add a `Trash2` icon button on each affiliation card (both `verifiedAffiliations` and `manualAffiliations`) next to the existing "Set as Primary" button.
- Clicking opens an `AlertDialog` confirm ("Remove [name] from your affiliations?").
- On confirm:
  - **Verified**: remove from `verifiedAffiliations` state.
  - **Manual**: remove from `manualAffiliations`, persist via `saveLocalAffiliations`, and also remove the matching invite from `mockGymInvites` (add a `deleteInvite(token)` helper to `src/utils/mockGymInvites.ts`).
  - If the removed item was `isPrimary` and other affiliations remain, promote the first remaining one to primary.
  - Show success toast.

### Files touched
- `src/hooks/useTrainerGymAffiliations.ts` — guard fetch + drop error toast
- `src/utils/mockGymInvites.ts` — add `deleteInvite(token)`
- `src/components/trainer/dashboard/tabs/settings/sections/MyGymsSection.tsx` — Remove button + confirm dialog + handlers

No DB or backend changes.