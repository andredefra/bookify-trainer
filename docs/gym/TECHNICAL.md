# Gym — Technical Reference

## Overview

The Gym persona is a **facility** that manages a network of trainers and a roster of members.
It is an **intermediary**: it requests services (programs/packages) from trainers, sells
member packages, and tracks commissions — as opposed to the Studio, which creates programs
directly (see [`../studio/TECHNICAL.md`](../studio/TECHNICAL.md)).

A gym enters either by demo login (`demo-user`, `type:'gym'`) or via a **trainer invite link**
(`/gym-onboarding/:token`), which produces an **invited** gym with a restricted dashboard.

## Files

| File | Purpose |
|------|---------|
| `src/pages/GymDashboard.tsx` | Route `/gym-dashboard`; reads `demo-user`, normalizes the demo gym id |
| `src/pages/GymOnboarding.tsx` | Route `/gym-onboarding/:token`; 3-step invite acceptance |
| `src/utils/mockGymInvites.ts` | **localStorage** invite store (`mock-gym-invites`) |
| `src/components/gym/dashboard/GymDashboardContainer.tsx` | Layout + tab router + invited-mode logic |
| `src/components/gym/dashboard/{GymHeader,GymSidebar}.tsx` | Chrome |
| `src/components/gym/dashboard/tabs/*` | 14 tabs (see table) |
| `src/services/gym/membersService.ts` | Member queries (Supabase + demo fallback) |
| `src/services/gym/calendarService.ts` | Calendar events |
| `src/hooks/gym/*` | ~15 gym hooks |
| `src/hooks/useGymConnection.ts` | Client↔gym connection + communications |

## Onboarding flow (`/gym-onboarding/:token`)

- **Token shape:** `inv_<base64url-json>` — self-contained (gym name, kind `gym|studio`,
  street, city, trainer info) so links work cross-browser with **no DB lookup**.
- **Store:** `mockGymInvites.ts` keeps a `MockGymInvite[]` in `localStorage`
  (`token`, `name`, `kind`, `street`, `city`, `status: pending|verified`, `createdAt`,
  `verifiedAt`, `trainerId`, `trainerEmail`, `gymEmail`, `documents[]`).
- **Steps:** (1) confirm entity details, (2) optional document upload (file names only, ≤10),
  (3) create account (email + password, Zod-validated).
- **On submit:** `updateInvite(token, {…, status:'verified'})` and a `demo-user` is written
  (`type:'gym'`, `source:'invited'`, `id: token`), then redirect to `/gym-dashboard`.

> Entirely **localStorage-backed** — no Supabase persistence of the invite or the new gym
> account. This is a demo/mock flow.

## Dashboard & invited mode

`GymDashboardContainer` reads `demo-user`. A **non-invited** demo gym has its id normalized to
the fixed UUID `11111111-1111-1111-1111-111111111111` (written back to localStorage). An
**invited** gym (`source:'invited'` or `id` starting `inv_`) is locked to three tabs —
`trainers-management`, `messages`, `settings` — and forced onto `trainers-management`;
navigation to any other tab redirects back.

### Tabs (14)

| Tab | Purpose | Invited |
|-----|---------|:---:|
| Overview | KPIs (members/sessions/revenue), top trainers, expiry alerts | — |
| Trainers Management | PT network; assignments/contracts; **generate & copy invite links** | ✓ |
| Group Sessions | Gym-wide classes; schedule + assign trainers + analytics | — |
| Availability | Trainer shift calendar & stats | — |
| Performance | Aggregated trainer ratings/reviews | — |
| Calendar | Unified events (sessions, 1:1, sales calls) | — |
| Members | Member directory (card/table), status filter, assign packages | — |
| Packages | Gym package offerings + assignment + revenue + renewal automation | — |
| Service Requests | Requests services from trainers; status + commission | — |
| Transactions | Billing ledger, receipts | — |
| Messages | Async messaging with trainers | ✓ |
| Analytics | Sessions/members/revenue charts | — |
| Settings | Profile/notifications/integrations/invoicing/billing/branding | ✓ |

## Data layer

Services query Supabase first and **fall back to demo data** on error/empty. `getCurrentGymId()`
is hardcoded to the demo gym UUID.

| Table | Hook/Service | Demo fallback |
|-------|--------------|---------------|
| `gym_clients` | `useGymMembers` / `membersService.fetchMembers()` | `getDemoMembers()` |
| `gym_packages`, `gym_package_assignments` | `useGymPackages` | mock packages/assignments |
| `gym_connection_requests` | `useGymConnection` | demo approved connection |
| `gym_client_communications` | `useGymConnection` | demo message history |
| `gym_email_templates` / `email_templates` | `useMarketingAutomation` | default templates |
| `gym_automation_rules` / `automation_rules` | `useMarketingAutomation` | demo rules (disabled) |

Other gym hooks: `useGymAnalytics`, `useGymCalendar`, `useGymGroupSessions`, `useGymReviews`,
`useGymTransactions`¹, `useGymPaymentActions`¹, `useTrainerShifts`, `useTrainerContracts`,
`useTrainerAssignments`, `useGymMemberExpirations` (¹ = use React Query `useMutation`).

## Connection / service-request flow (`useGymConnection.ts`)

```ts
interface GymConnection { status: 'pending'|'approved'|'rejected'; client_id; gym_id; … }
interface GymCommunication { sender_type: 'gym'|'client'; message; is_read; … }
```

1. Client → `sendConnectionRequest(gymId, message?)` → insert `gym_connection_requests`
   (`pending`).
2. Gym reviews pending requests (Trainers Management).
3. Gym → update status `approved|rejected` (+ `gym_response`).
4. Approved → client books from gym packages → insert `gym_package_assignments`; async
   messaging via `gym_client_communications`.
5. `calculatePackageRemaining()` derives days-left, sessions-remaining, progress %.

Demo fallback (`loadDemoData()`): "FitLife Gym" approved connection, demo packages, demo
communications.

## Gotchas

- **Invites are localStorage-only** — not persisted server-side; clearing storage loses them.
- **Invited mode is strict** — only 3 tabs; container forces `trainers-management`.
- **Demo gym id is fixed** (`1111…`); real multi-gym isolation depends on real auth (absent).
- **Two automation table names** appear (`gym_email_templates`/`email_templates`,
  `gym_automation_rules`/`automation_rules`) — confirm which is canonical before relying on it.
