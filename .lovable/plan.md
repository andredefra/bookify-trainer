## Goal

Add a destructive **Remove Client** action inside the Client Profile modal. Removing a client takes them out of the Clients list and inserts them into the CRM Kanban as a contact with status **Terminated** (so trainers always see why/where they went).

## Approach

Both the Clients list and the CRM contacts list currently live in independent React state. We add a small shared, frontend-only roster store (mirroring the existing `SalesEntriesContext` pattern) that:
- Tracks which `sampleClients` IDs have been removed (so the Clients tab hides them).
- Holds the resulting `SalesContact` records (status `"terminated"`) so the CRM Kanban shows them.
- Persists to `localStorage` so the change survives reloads.

## Changes

### 1. New store — `src/context/ClientRosterContext.tsx`
- State persisted under `trainer-client-roster`:
  ```ts
  { removedClientIds: number[]; terminatedContacts: SalesContact[] }
  ```
- API:
  - `removedIds: Set<number>`
  - `terminatedContacts: SalesContact[]`
  - `removeClient(input: { id: number; name: string; email: string; clientSince?: string; reason?: string })` — adds the id to `removedClientIds` and pushes a `SalesContact` `{ status: 'terminated', clientSince, notes: reason, ... }` into `terminatedContacts`, dedup by email.
- Provider mounted inside `SalesEntriesProvider` in `DashboardContainer.tsx`.

### 2. `src/components/trainer/dashboard/DashboardContainer.tsx`
- Use `useClientRoster()` to compute `visibleClients = sampleClients.filter(c => !removedIds.has(c.id))`.
- Pass `visibleClients` to `<ClientsTab clients>` and `<OverviewTab clients>` instead of `sampleClients`.

### 3. `src/components/trainer/dashboard/tabs/sales/useSalesContacts.ts`
- Read `terminatedContacts` from context.
- Merge them into the returned `contacts` (dedup by email, terminated entries from context take precedence) so the CRM Kanban renders the "Terminated" column with the new entry.

### 4. `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/ProfileDialogFooter.tsx`
- Add optional `onRemove?: () => void` prop.
- When present, render a `destructive`-variant button labeled **Remove Client** (trash icon) on the left side of the footer, before "Close" on the right.

### 5. `src/components/trainer/dashboard/tabs/clients/ClientProfileDialog.tsx`
- Add a local `confirmOpen` state plus an `AlertDialog` ("Remove this client? They will be moved to your CRM as **Terminated**. This cannot be undone here.").
- Pass `onRemove={() => setConfirmOpen(true)}` to `ProfileDialogFooter`.
- On confirm: call `removeClient({ id: client.id, name: client.name, email: mockClientDetails.email, clientSince: mockClientDetails.since })`, close the AlertDialog, then `onOpenChange(false)` to dismiss the profile modal. Toast: "Client moved to CRM as Terminated".

## Out of scope
- No DB / Supabase / migrations.
- No undo flow inside the CRM (trainers can already edit a Terminated contact's status via the existing CRM dialog).
- The Sales — Entries history for that client remains intact (already keyed by email in `SalesEntriesContext`).
