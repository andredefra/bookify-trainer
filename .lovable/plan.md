## Goal
Tighten the Basic trainer dashboard so it only exposes what the Basic plan should support, and introduce a manual "Sales > Entries" tracker on the client profile that works for all three plans.

## 1. Overview tab — widget filtering (Basic only)
File: `src/components/trainer/dashboard/tabs/OverviewTab.tsx`

Extend the existing `enabledWidgets` filter so on `plan === "basic"` we strip:
- `revenue-chart` (depends on program/package sales)
- `package-sales` (Pro-only feature)
- `goals` (My Goals — not applicable; replaced with clients' goals concept later)
- already stripped: `expiration-alerts`

Keep: `quick-actions`, `todays-agenda`, `messages`, `client-activity`, `performance-metrics`, `recent-activities`.

Also filter the same list inside `WidgetSettingsDialog` (pass plan and hide those entries) so a Basic user cannot re-enable them from settings. File: `src/components/trainer/dashboard/tabs/overview/WidgetSettingsDialog.tsx`.

Quick Actions widget on Basic: hide "Create Package" and "Record Payment" buttons (no packages, no payments on Basic). File: `src/components/trainer/dashboard/tabs/overview/widgets/QuickActionsWidget.tsx` — read `useTrainerPlan()` and conditionally render.

## 2. Services tab — remove for Basic
The `services` entry is currently in `PLAN_ALLOWED_TABS.basic`. Remove it.

Files:
- `src/components/trainer/dashboard/DashboardContainer.tsx` — drop `"services"` from the `basic` array.
- `src/components/trainer/dashboard/sidebar/SidebarNavigation.tsx` and `MobileSidebar.tsx` — confirm they read the same allow-list (already plan-aware per earlier change) and that Services is hidden on Basic.

## 3. Settings — show current plan as "Basic"
File: `src/components/trainer/dashboard/tabs/settings/MembershipSection.tsx`

Currently `useState(user.plan || "freemium")`. Use `useTrainerPlan()` to seed the initial current plan when plan is `basic` or `essential` (map `pro` keeps existing behavior). This ensures the "Your Current Plan" card and the highlighted card in the list reflect the dashboard variant.

Also ensure `plansData` has a `basic` plan entry (verify file `src/components/trainer/dashboard/tabs/settings/membership/plansData.ts`); if not, add one with id `basic`, name `Basic`, price `Free`, and the appropriate feature list. Same for `essential` if missing.

## 4. Client profile — new "Sales" tab (all plans)
Add a new tab between `overview` and `notes` in the client profile dialog, visible to all three plans.

Files:
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/tabs/ClientProfileTabList.tsx` — add `<TabsTrigger value="sales">Sales</TabsTrigger>` between overview and notes (or before notes if programs/packages tabs are present).
- `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/ClientProfileTabContent.tsx` — add a `<TabsContent value="sales">` rendering a new `SalesTab`.
- Create `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/SalesTab.tsx`.

### SalesTab content
- Header with total amount (sum of entries, in €).
- "Add Entry" button → opens `AddSalesEntryDialog`.
- Table/list of entries: date, type (Session / Package / Program / Other), name/description, amount, source badge (Manual / Auto from sale).
- Empty state when no entries.

State: local React state seeded with an empty array per client id, scoped via `useState` keyed by `client.id`. No backend in this change (mock only, consistent with the rest of the demo dashboard data).

### AddSalesEntryDialog
Create `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/sales/AddSalesEntryDialog.tsx`.

Fields (mirror `AddTransactionDialog` minus payment status/method):
- Type: Session | Package | Program | Other (Select)
- Name/description (Input)
- Amount € (Input, number)
- Date (Input, date, default today)
- Notes (Textarea, optional)

No `paymentStatus`, no `paymentMethod`, no installment block.

On submit: append an entry `{ id, type, name, amount, date, notes, source: 'manual' }` to the parent state and close the dialog.

### Plan-aware copy
- On `basic`: section title "Sales — Entries", explanation: "Manually track sales to this client. When you upgrade, sold items flow here automatically and can be converted into invoices."
- On `essential` / `pro`: same UI, but explanation: "Entries created by the system from your sales appear here. Manual entries you add will also appear in Transactions/Business Data so you can invoice them."

The two non-basic plans still allow adding manual entries; the actual wiring of pushed auto-entries from real sales / mirroring into Transactions is out of scope here (we only add the UI surface and the manual-add capability now, per the user's "we will do another thing later").

## Out of scope
- Real persistence (DB schema, RLS).
- Auto-mirroring manual entries into the Transactions tab / Business Data.
- Replacing the "My Goals" widget with a "Clients' Goals" widget — for now, just remove it on Basic.
- Any changes to Pro `/dashboard` behavior beyond the new client Sales tab.

## Verification
- `/dashboard-basic` Overview: no Revenue Trend, no My Goals, no Package Sales, no Expiration Alerts; Performance Metrics still visible.
- `/dashboard-basic` left nav: no Services entry; deep-linking `services` falls back to Overview.
- `/dashboard-basic` Settings → Membership: highlighted card and "Your Current Plan" show "Basic".
- Open any client → new "Sales" tab between Overview and Notes; Add Entry dialog opens, submits, list and total update.
- `/dashboard` (Pro) and `/dashboard-essential` still show all their tabs; the new client Sales tab also appears there.