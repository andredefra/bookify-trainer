## Goal

On the **Client Management → Client List** cards (Basic and other dashboards), remove the "X sessions • Last: …" line and replace it with the client's **total sales value** pulled from `SalesEntriesContext`, so trainers can quickly compare it to the CRM card value.

## Changes

### 1. `src/components/trainer/dashboard/tabs/clients/ClientCard.tsx`
- Extend `ClientItem` with an optional `email: string`.
- Remove the line `{client.sessions} sessions • Last: {client.lastSession}`.
- Replace with a small row showing `Total sales: €{total}` using `useSalesEntries().getTotal(client.email)`.
  - If `total === 0`, show muted `Total sales: €0` (keeps layout consistent and matches the CRM card which also shows 0 when empty).
- Goal/program/package badges below stay unchanged.

### 2. `src/components/trainer/dashboard/tabs/ClientsTab.tsx` and other places typing `ClientItem`
- Add the optional `email` to the local `ClientItem` interface(s) in `ClientsTab.tsx`, `GoalManagerModal.tsx`, `CheckInManagerModal.tsx`, `RecentClientsCard.tsx` so the new field flows through (purely additive, no behavior change elsewhere).

### 3. `src/components/trainer/dashboard/DashboardContainer.tsx`
- Add an `email` to each `sampleClients` entry so totals can be looked up:
  - Emma Thompson → `emma.thompson@example.com`
  - Michael Chen → `michael.chen@example.com`
  - Sarah Johnson → `sarah.johnson@example.com`

### 4. `src/context/SalesEntriesContext.tsx`
- Add seed entries for the three demo clients above so the Client List shows non-zero, comparable values out of the box (e.g. Emma 1 800€, Michael 1 200€, Sarah 2 700€). These flow into the Sales tab inside the client profile as `auto` entries — exactly like the existing g.verdi / s.esposito seeds.

## Out of scope

- No changes to the CRM `SalesCard` (already shows the same `getTotal` for clients).
- No backend/schema work; mock-data and UI only.
- Sessions/lastSession data stays in the model in case other components rely on it; it just stops being rendered on the card.
