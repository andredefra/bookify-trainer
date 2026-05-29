# Alternative Trainer Dashboards: Basic & Essential

Add two new dashboard variants that simulate the Basic and Essential trainer plans without touching the existing `/dashboard` (Pro).

## Routes

- `/dashboard-basic` → `src/pages/DashboardBasic.tsx`
- `/dashboard-essential` → `src/pages/DashboardEssential.tsx`

Register both in `src/App.tsx`.

## Login gating (`src/pages/Login.tsx`)

Add a plan selector that only appears when `loginType === 'trainer'`: three buttons — Pro (default), Essential, Basic.

- Pro → `/dashboard` (unchanged, any creds, as today)
- Essential / Basic → require email `andrea.mypersonal.fit@gmail.com` + password `@Tr3ggy@` (same rule already in place for Gym/Studio). On match, navigate to `/dashboard-essential` or `/dashboard-basic`; on mismatch, show the same restricted toast.

Persist the chosen plan in the `demo-user` localStorage object as `plan: 'basic' | 'essential' | 'pro'`.

## Dashboard variant architecture

Reuse all existing tab components. Introduce a `plan` prop on the container so we can filter without duplicating logic.

1. Extend `DashboardContainer` (`src/components/trainer/dashboard/DashboardContainer.tsx`) to accept `plan?: 'basic' | 'essential' | 'pro'` (default `'pro'`) and pass it to:
   - `DashboardSidebar` → `DesktopSidebar` / `MobileSidebar` → `SidebarNavigation`
   - `OverviewTab` (to hide Expiration Alerts on Basic)
   - `ClientsTab` (to hide Programs/Packages sub-sections in client details on Basic)
   - `SettingsTab` (to hide Installment Plans + Payment Reminders on Basic, and Invoices integration on both Basic and Essential)

2. `SidebarNavigation` filters `navigationItems` by plan:
   - **Basic** keeps: Overview, CRM (sales), Clients, Services, Calendar, Messages, Reviews, Settings, Personal Trainer Page link
   - **Essential** keeps everything Basic has plus: Programs, Sessions, Packages, Transactions, Business Data (analytics)
   - **Pro** keeps all (current behavior)

3. `DashboardContainer` guards tab rendering: if the active tab isn't allowed for the current plan, fall back to `overview`. This prevents direct-state access to hidden tabs.

4. New pages `DashboardBasic.tsx` / `DashboardEssential.tsx` mirror `Dashboard.tsx` (auth redirect for client type) and render `<DashboardContainer customName="Trainer" plan="basic" />` / `plan="essential"`. Each sets its own `<title>` ("Trainer Dashboard — Basic" / "Essential").

## Per-tab content filtering

- **OverviewTab**: accept `plan` prop; conditionally render `<ExpirationAlertsCard>` only when `plan !== 'basic'`.
- **ClientsTab** (client detail view): accept `plan`; in the detail panel hide the Programs and Packages sections when `plan === 'basic'` (show a small "Not available on Basic plan" placeholder or simply omit the tabs/sections).
- **SettingsTab** / `SettingsTabContent`: accept `plan`; hide Installment Plans + Payment Reminders sections for Basic, and hide Invoices integration for Basic and Essential. Pro keeps everything.

(All other tabs render unchanged; they're simply unreachable via the sidebar on Basic.)

## Verification

- Login as Pro with any creds → `/dashboard` works exactly as before.
- Login as Essential/Basic with the restricted creds → reaches the new routes; wrong creds → toast and stays on login.
- Sidebar on each route shows only the allowed items; deep-linking to a hidden tab via state falls back to Overview.
- Overview, Clients detail, and Settings hide the right pieces per plan.

## Out of scope

No backend, no pricing logic changes, no edits to Pro `/dashboard` behavior, no changes to client/gym/studio dashboards.
