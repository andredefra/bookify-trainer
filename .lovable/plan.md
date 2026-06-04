## Goals
1. Let invited gyms message their trainers directly from the dashboard.
2. Fix header/sidebar alignment and clean up the page UI/UX.

## Changes

### 1. Add Messages to invited-gym sidebar + container
- `GymDashboardContainer.tsx`: for `isInvited`, include `MessagesTab` in the rendered tabs (alongside `TrainersManagementTab` and `SettingsTab`).
- `GymSidebar.tsx`: when `isInvited`, show nav items: Trainers, Messages, Settings (with proper icons: Users, MessageCircle, Settings).
- "Message" buttons on each trainer card switch `activeTab` to `messages` and preselect that trainer's conversation (pass an `onMessageTrainer` callback through `TrainersManagementTab` → `TrainersList`).

### 2. Reuse existing chat UI
- Reuse `src/components/gym/dashboard/tabs/messages/MessagesTab.tsx` with the existing trainers list + chat panel. No new chat infrastructure.
- Accept optional `initialTrainerId` prop so clicking Message on a card jumps straight into that conversation.

### 3. Header / sidebar alignment fix
- `GymHeader.tsx` + `GymSidebar.tsx`: ensure both use the same fixed height (e.g. `h-16`) and the sidebar starts flush under the header with no extra top padding. Currently the sidebar's first item ("Trainers Management") sits noticeably below the logo row.
- Constrain header content to the same horizontal padding as the main area so the logo aligns with the sidebar edge.

### 4. UI/UX polish for invited-gym Trainers page
- Tighten the page header: smaller title, single-line subtitle, remove extra vertical gaps.
- "Invite a trainer" card: more compact, truncate the long link with `font-mono text-xs` and ellipsis, keep Copy button right-aligned; add a small success toast on copy (already toasted — keep).
- Trainer card refinements:
  - Use a 2-column action row (`Message` outline + `View Profile` solid) with consistent height; today the Message button stretches full width on one card and not the other.
  - Move status dot to the avatar bottom-right (already there) and remove the duplicate status badge next to the name — keep just the colored dot + label inline.
  - Add subtle hover state and consistent card padding.
- Search + filter chips: keep "All / Online / Away / Offline" but make them a single row with `flex-wrap` and reduced spacing.
- Use semantic tokens (`bg-card`, `text-foreground`, `text-muted-foreground`, `border-border`) — no hard-coded colors.

### 5. Files to edit
- `src/components/gym/dashboard/GymDashboardContainer.tsx`
- `src/components/gym/dashboard/GymSidebar.tsx`
- `src/components/gym/dashboard/GymHeader.tsx`
- `src/components/gym/dashboard/tabs/TrainersManagementTab.tsx`
- `src/components/gym/dashboard/tabs/trainers/TrainersList.tsx`
- `src/components/gym/dashboard/tabs/messages/MessagesTab.tsx` (add optional `initialTrainerId` prop)

No backend or DB changes.
