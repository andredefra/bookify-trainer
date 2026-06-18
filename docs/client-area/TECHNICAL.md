# Client Area — Technical Reference

## Overview

The "client area" is the consumer-facing app where an end-user follows their training,
tracks workouts, manages packages, and talks to their trainer. Confusingly there are **two
parallel implementations** of this persona:

- **`/client-dashboard`** (`ClientDashboard`) — the richer, gym-aware client surface. Reads
  the `demo-user` localStorage key.
- **`/user-dashboard`** (`UserDashboard`) — a leaner "MyPersonal AI app" surface targeted by
  the `/user` consumer landing. Reads a **different** key, `user-app-user`.

Both are demo-only (no real auth) and several client queries hit a **shared**
`DEMO_CLIENT_ID` row — see [`../auth/TECHNICAL.md`](../auth/TECHNICAL.md).

## Files

| File | Purpose |
|------|---------|
| `src/pages/ClientDashboard.tsx` | Route `/client-dashboard`; reads `demo-user`, renders tabs directly |
| `src/components/client/ClientDashboard.tsx` | Component variant of the above |
| `src/components/client/ClientHeader.tsx` | Header; **hardcodes `DEMO_CLIENT_ID`** for notification queries |
| `src/components/client/ClientSidebar.tsx` | Client navigation |
| `src/components/client/tabs/*` | Client tabs (see table) |
| `src/pages/UserDashboard.tsx` | Route `/user-dashboard`; reads `user-app-user`, renders `UserDashboard` component |
| `src/components/user/UserDashboard.tsx` | The `/user` flow dashboard |
| `src/components/user/UserHeader.tsx` · `UserSidebar.tsx` · `tabs/*` | User-flow chrome + tabs |

## Two flows compared

| | `/client-dashboard` | `/user-dashboard` |
|--|--------------------|-------------------|
| localStorage key | `demo-user` | `user-app-user` |
| Redirect on missing | `/login` | `/user-login` |
| Subtree | `components/client/` | `components/user/` |
| Demo identity | "Demo Client" (`client@demo.com`) | parsed from `user-app-user` |
| Tabs | overview, analytics, sessions, packages, training-program, training-log, trainers, mygym, my-calendar, messages, settings | overview, training-program, training-log, analytics, my-trainers, messages, settings |

`/user-dashboard` routes its active tab via React Router search params / `location.state`;
`/client-dashboard` keeps tab state locally.

## Client tabs (`components/client/tabs/`)

| Tab | Purpose | Primary data |
|-----|---------|-------------|
| Overview | Home summary, fitness progress, body measurements | `useUserProfile`, body-measurement hooks |
| Analytics | Progress charts | check-in / workout analytics |
| Sessions | Upcoming/past sessions; postponement responses | `useClientSessionTracking`, `useClientPostponements` |
| Packages (`MyPackagesTab`) | Owned packages, sessions remaining, payment | `useClientPackages`, `usePackagePayment` (→ `DEMO_CLIENT_ID`) |
| Training Program | Assigned program, exercises | `useTrainingPrograms` (→ `DEMO_CLIENT_ID`) |
| Training Log | Workout logging | `useWorkoutLogs`, `useExerciseTracking` |
| Trainers | The client's trainers; public profile view (no marketing block) | `useTrainerProfile` |
| My Gym (`MyGymTab`) | Connected gym/studio info | `useGymConnection` |
| My Calendar | Personal calendar | calendar hooks |
| Messages | Chat with trainer; AI assistant | `useMessages`, `useAIAccess` |
| Settings | Profile, subscription, health documents | `useClientSubscription`, `HealthDocumentsUpload` |

## Data layer

- **Identity:** demo via `demo-user` / `getCurrentDemoUserId()`; several queries hardcode
  `DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002'`
  (`ClientHeader`, `useClientPackages`, `useTrainingPrograms`, `PackagePaymentDialog`,
  `usePackagePayment`).
- **Subscription / AI gating:** `useClientSubscription` (`free|pro`, `client_subscriptions`
  table) + `useAIAccess` (5/month free, 100/day pro, demo forced to 4/5). See
  [`../billing/TECHNICAL.md`](../billing/TECHNICAL.md).
- **Programs & exercises:** `useTrainingPrograms` reads `client_package_assignments` with
  nested training-program data; the exercise library itself is **localStorage-only**
  (`useExerciseLibrary`).
- **Check-ins:** `useClientCheckIns` / `useCheckInSubmissions` / `useCheckInSettings`
  (`check_in_settings`, `check_in_submissions`).
- **Notifications:** `useClientNotifications`.
- **AI assistant / voice:** `openai-trainer-chat`, `openai-realtime` — see
  [`../ai/TECHNICAL.md`](../ai/TECHNICAL.md).

## Gotchas

- **Two keys, two flows.** `/client-dashboard` and `/user-dashboard` do not share state and
  read different localStorage keys. Decide which flow a feature belongs to.
- **Shared client row.** All consumer writes go to `DEMO_CLIENT_ID`; there is no per-user
  isolation yet.
- **Component duplication.** `src/pages/ClientDashboard.tsx` and
  `src/components/client/ClientDashboard.tsx` overlap — confirm which one the route uses
  before editing.
