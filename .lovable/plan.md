## Goal
For invited gyms only, simplify the Trainers Management screen and the Settings tabs, and improve the UI/UX of the trainers area.

## Changes

### 1. `src/components/gym/dashboard/tabs/SettingsTab.tsx`
Accept an `isInvited` prop. When invited, render only the **Profile**, **Branding**, and **Notifications** tabs (remove Integrations, Invoicing, Billing triggers + content). Non-invited gyms keep the full set.

### 2. `src/components/gym/dashboard/GymDashboardContainer.tsx`
Pass `isInvited` to `<SettingsTab />`.

### 3. `src/components/gym/dashboard/tabs/TrainersManagementTab.tsx`
Replace current layout with a streamlined invited-gym version (since invited gyms are the only consumers reaching this with that role, but to be safe accept an `isInvited` prop from the container; when true):
- Header: "Trainers" + subtitle "Your personal trainers at this gym".
- Top action card: **"Invite a trainer"** — shows the gym's unique registration link (`{origin}/register?gym={gymId}&role=trainer`) in a read-only input with a **Copy link** button (uses `navigator.clipboard`, toast on success). Short helper text: "Share this link so trainers can register under your gym."
- Remove the "Assign Trainer", "Invite Trainer" buttons and the inner `Tabs` (Trainers / Assignments / Performance). Render `<TrainersList />` directly under a status filter row that already exists in the list.
- Keep the search input above the list.

### 4. `src/components/gym/dashboard/tabs/trainers/TrainersList.tsx`
UI/UX polish for each trainer card:
- Clear availability pill (Online/Away/Offline) next to the name with the existing colored dot.
- Show specialties as subtle badges, email row.
- Action row reduced to two buttons: **Message** (primary outline) and **View Profile** (solid). Remove the "Assign" button and the €/mo + clients meta (assignment-related) for invited gyms — pass an `isInvited` prop from the parent and conditionally hide assignment/contract info.
- Tighten spacing, consistent card padding, hover ring.

### 5. Container wiring
`GymDashboardContainer.tsx` passes `isInvited` to `TrainersManagementTab` and `SettingsTab`. `TrainersManagementTab` passes it to `TrainersList`.

## Out of scope
No backend/data changes. Non-invited gym dashboard behavior is unchanged.
