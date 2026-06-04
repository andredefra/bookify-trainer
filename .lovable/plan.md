## Plan

1. **Make invited-gym detection robust**
   - Update the gym dashboard to treat a gym as “invited” not only when `source === "invited"`, but also when its stored `id` is an invite token (`inv_...`) or when it matches a verified trainer-created gym invite.
   - This covers the exact flow shown in your screenshot where the new gym is still being treated like a full studio/gym admin.

2. **Force the invited-gym dashboard into the simplified view**
   - Keep only **Trainers Management** and **Settings** in the sidebar.
   - Ensure Trainers Management renders the simplified invited version: invite link, search, trainer cards only.
   - Remove assignment buttons, Assignment tab, Performance tab, contract/earnings/client-count details for invited gyms.

3. **Fix settings for invited gyms**
   - Keep only **Profile**, **Branding**, and **Notifications**.
   - Hide **Integrations**, **Invoicing**, and **Billing** for all invited-gym detection cases.

4. **Polish the copy for invited gyms**
   - Rename the page from “Trainer Management” to “Trainers”.
   - Use copy aligned with the limited invited-gym role: invite trainers via link, message trainers, view profile, and see availability status.

## Technical details

Files to update:
- `src/components/gym/dashboard/GymDashboardContainer.tsx`
- `src/pages/GymDashboard.tsx` if needed to avoid overwriting invited-gym IDs
- possibly a small helper in `src/utils/mockGymInvites.ts` or a local helper in the dashboard to recognize verified invited gym users

No backend/database changes.