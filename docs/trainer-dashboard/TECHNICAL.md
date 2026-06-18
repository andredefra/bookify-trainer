# Trainer Dashboard — Technical Reference

## Overview

The trainer dashboard is the persona surface for personal trainers. The **same**
`DashboardContainer` renders all three subscription tiers (Basic / Essential / Pro); the tier
is a prop, and which tabs are visible is filtered by that tier. Identity is the demo
`localStorage` user (`type: 'trainer'`) — there is no real auth here (see
[`../auth/TECHNICAL.md`](../auth/TECHNICAL.md)).

## Files

| File | Purpose |
|------|---------|
| `src/pages/Dashboard.tsx` | Route `/dashboard` → `DashboardContainer` (Pro) |
| `src/pages/DashboardEssential.tsx` | Route `/dashboard-essential` → `DashboardContainer plan="essential"` |
| `src/pages/DashboardBasic.tsx` | Route `/dashboard-basic` → `DashboardContainer plan="basic"` |
| `src/components/trainer/dashboard/DashboardContainer.tsx` | Layout + tab router + plan gating + context providers |
| `src/components/trainer/dashboard/DashboardHeader.tsx` | Top bar |
| `src/components/trainer/dashboard/DashboardSidebar.tsx` | Sidebar wrapper |
| `src/components/trainer/dashboard/sidebar/DesktopSidebar.tsx` · `MobileSidebar.tsx` · `SidebarNavigation.tsx` | Navigation; tab list filtered by plan |
| `src/components/trainer/dashboard/tabs/*.tsx` | One component per tab (see table) |
| `src/context/TrainerPlanContext.tsx` | `useTrainerPlan()` → current tier |
| `src/context/SalesEntriesContext.tsx` | Sales entries by email (localStorage + seed) |
| `src/context/ClientRosterContext.tsx` | Removed/terminated clients (localStorage) |

## Container & providers

`DashboardContainer` props:

```ts
{ customName?: string; plan?: 'basic' | 'essential' | 'pro' /* default 'pro' */ }
```

It wraps its content in three providers (scoped to the trainer dashboard only — they are
**not** mounted at the app root):

```
<TrainerPlanProvider plan={plan}>
  <SalesEntriesProvider>
    <ClientRosterProvider>
      <Header /> <Sidebar /> <main>{activeTab}</main>
```

The current user is read from `localStorage('demo-user')`; a hardcoded `sampleUser`
(`"John Doe"`, `type:'trainer'`, `plan:'pro'`) is used as the demo identity shape.

## Plan gating

Two coordinated mechanisms:

**1. Tab allow-list (`DashboardContainer.tsx`):**

```ts
const PLAN_ALLOWED_TABS = {
  basic:     ["overview","sales","clients","calendar","messages","reviews","settings"],
  essential: ["overview","sales","clients","programs","sessions","calendar","messages",
              "transactions","analytics","reviews","settings"],
  pro:       ["overview","sales","clients","programs","services","packages","sessions",
              "calendar","messages","transactions","analytics","reviews","settings"],
};
```

**2. Sidebar exclude-list (`SidebarNavigation.tsx`):**

```ts
const planExcludes = {
  basic:     ["programs","sessions","services","packages","transactions","analytics"],
  essential: ["services","packages"],
  pro:       [],
};
```

The two are complementary (allow-list drives the tab router; exclude-list drives the nav UI).
**Keep them in sync** when adding a tab.

## Tabs

| Tab | Component | Basic | Essential | Pro |
|-----|-----------|:---:|:---:|:---:|
| Overview | `OverviewTab.tsx` | ✓ | ✓ | ✓ |
| CRM / Sales | `SalesTab.tsx` | ✓ | ✓ | ✓ |
| Clients | `ClientsTab.tsx` | ✓ | ✓ | ✓ |
| Programs | `ProgramsTab.tsx` | — | ✓ | ✓ |
| Sessions | `SessionsTab.tsx` | — | ✓ | ✓ |
| Services | `ServicesTab.tsx` | — | — | ✓ |
| Packages | `PackagesTab.tsx` | — | — | ✓ |
| Calendar | `CalendarTab.tsx` | ✓ | ✓ | ✓ |
| Messages | `MessagesTab.tsx` | ✓ | ✓ | ✓ |
| Transactions | `TransactionsTab.tsx` | — | ✓ | ✓ |
| Business Data (Analytics) | `AnalyticsTab.tsx` | — | ✓ | ✓ |
| Reviews | `ReviewsTab.tsx` | ✓ | ✓ | ✓ |
| Settings | `SettingsTab.tsx` | ✓ | ✓ | ✓ |

Settings includes the membership/plan sub-area
(`tabs/settings/membership/plansData.ts`) — see
[`../pricing-plans/TECHNICAL.md`](../pricing-plans/TECHNICAL.md).

## Data layer

Tabs consume the domain hooks (see [`../ARCHITECTURE.md`](../ARCHITECTURE.md#hooks-srchooks-srchooksgym)):
- Clients/CRM → `ClientRosterContext`, `SalesEntriesContext`, `clientInvitationService`,
  `useTrainerInvitations`, `useTrainerReviews`.
- Programs → `useTrainingPrograms`, `useProgramAssignments`, `useExerciseLibrary`
  (localStorage-only exercise data), `useExerciseTracking`.
- Sessions → `useGymSessions`, `useSessionPostponements`.
- Packages/Sales/Transactions → `usePackageSales`, `useProgramSales`, `useSessionSales`,
  `usePackagePayments`.
- Messages → `useMessages`; Notifications → `useNotifications`.
- Subscription/AI → `useSubscription`, `useAIAccess` (see [`../billing/TECHNICAL.md`](../billing/TECHNICAL.md)).

Several of these fall back to demo/mock data (notably `useTrainingPrograms` and
`usePackageSales`, which use `DEMO_CLIENT_ID`).

## Gotchas

- **Tier is a prop, not a claim.** The dashboard trusts the route/prop for the tier; there's
  no server-side entitlement check. Real plan enforcement would need to come from
  `useSubscription` / the DB.
- **Dashboard-scoped contexts.** `TrainerPlanContext`, `SalesEntriesContext`,
  `ClientRosterContext` only exist inside `DashboardContainer` — don't consume them elsewhere.
- **Two gating lists.** A new tab must be added to both `PLAN_ALLOWED_TABS` and the sidebar
  `planExcludes`, or it'll be reachable but hidden (or vice-versa).
