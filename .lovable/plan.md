## Goal

Create a **Basic Client prototype** accessible with `andrea.mypersonal.fit@gmail.com` / `@Tr3ggy@` on the **Client** login tab. It mirrors the existing client dashboard but with a reduced, launch-ready feature set, and replaces "My Gym" with a redesigned flow centered on gym connection, gym trainers, and the client's personal membership plan.

## Scope

### 1. Login routing (`src/pages/Login.tsx`)
- When `loginType === 'client'` AND email = `andrea.mypersonal.fit@gmail.com` AND password = `@Tr3ggy@`:
  - Store `demo-user` with `type: 'client'`, `plan: 'basic'`, name "Andrea"
  - Navigate to a new route `/client-dashboard-basic`
- Other client credentials keep current behavior (`/client-dashboard`).

### 2. New page: `/client-dashboard-basic` (`src/pages/ClientDashboardBasic.tsx`)
Cloned from `ClientDashboard.tsx` but:
- Sidebar items reduced to: **Overview, My Gym or Studio, Workout Log, Trainers, Analytics, My Calendar, Messages, Settings**
- **Removed**: Sessions, My Packages, Training Program
- Overview tab adjusted so it does not surface "upcoming sessions" / package widgets (use a lightweight basic variant or pass empty arrays + a flag to hide those blocks).
- Route added in `src/App.tsx`.

A new `ClientSidebarBasic` (or a `variant="basic"` prop on `ClientSidebar`) filters the items list. Preferred: add a `variant` prop to keep one component.

### 3. New "My Gym" experience for Basic (`src/components/client/tabs/MyGymBasicTab.tsx`)
Replaces `MyGymTab` for this profile. Two states:

**A. Not connected**
- Hero card: "Connetti la tua palestra" with input to enter a gym code / select from a mock list (reuse mock gyms already in code if available, otherwise a small inline list of 2–3 demo gyms).
- CTA "Connetti" → stores connection in `localStorage` under key `basic-client-gym-connection`.

**B. Connected** — shows:
1. **Gym header card**: name, address, logo placeholder, badge "Membro attivo".
2. **Il mio piano** (editable card, persisted to `localStorage` key `basic-client-membership`):
   - `Data iscrizione` (date)
   - `Scadenza iscrizione` (date)
   - `Scadenza certificato medico` (date)
   - Auto-calculated status badges (Attivo / In scadenza < 30gg / Scaduto) for both abbonamento and certificato.
   - "Modifica" / "Salva" buttons.
3. **Allenatori della palestra**: grid of trainer cards read from existing mock data (`src/data/gymTrainersMockData.ts` if present, else a local mock list of 3 trainers with name, specialty, photo). Card → "Vedi profilo" (links to existing trainer profile view) and "Messaggia".
4. **Disconnetti palestra** secondary action.

All data is **localStorage-only** (no Supabase writes) consistent with the Basic demo pattern used elsewhere in this project.

### 4. UI language
Italian copy throughout the Basic client surface (consistent with the Basic trainer demo of the same user).

## Technical notes

- New files:
  - `src/pages/ClientDashboardBasic.tsx`
  - `src/components/client/tabs/MyGymBasicTab.tsx`
  - `src/components/client/tabs/mygym-basic/MembershipPlanCard.tsx`
  - `src/components/client/tabs/mygym-basic/GymTrainersGrid.tsx`
  - `src/components/client/tabs/mygym-basic/ConnectGymCard.tsx`
- Modified files:
  - `src/pages/Login.tsx` (route Andrea client → `/client-dashboard-basic`)
  - `src/App.tsx` (register route)
  - `src/components/client/ClientSidebar.tsx` (accept `variant?: 'full' | 'basic'` to filter items)
- localStorage keys:
  - `basic-client-gym-connection` → `{ gymId, gymName, gymAddress, connectedAt }`
  - `basic-client-membership` → `{ joinDate, expiryDate, certificateExpiryDate }`
- No DB migrations, no edge functions, no schema changes.

## Out of scope
- No Supabase data model changes.
- No real auth — same demo-localStorage pattern.
- No changes to the existing full client dashboard (`/client-dashboard`) flow.

## Open question
Confirm that the **gym trainers list** can use **mock data** (3 demo trainers shown to anyone connected), since real gym trainer rosters require a connected backend gym record that doesn't exist for this demo user. I will proceed with mocks unless you say otherwise.