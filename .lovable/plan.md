## Goal
Add a "Gym / Studio" field to all CRM contacts, auto-populated from the gym/studio where each client is registered (read-only in the UI), and display it in the trainer's Client Profile detail card, right under the "March 2023" (client-since) row.

## Scope
Mock/demo data only — no DB changes. Every CRM contact gets a gym/studio value; the field is shown as read-only (auto-fetched) in the Add/Edit dialogs, on the Kanban card, and inside the Client Profile dialog.

## Changes

### 1. `src/components/trainer/dashboard/tabs/sales/types.ts`
- Add `gymStudio?: string` to `SalesContact`.

### 2. `src/components/trainer/dashboard/tabs/sales/useSalesContacts.ts`
- Populate `gymStudio` on all 7 `INITIAL_CONTACTS` with realistic mock values (e.g. `"FitLife Gym — Milan"`, `"Urban Fitness Studio — Rome"`, `"MyPersonal Studio"`, etc.) so the pipeline shows a variety.

### 3. `src/components/trainer/dashboard/tabs/sales/EditableContactDialog.tsx`
- Add a new "Gym / Studio" field next to Source (or below Company/Source row), rendered as a read-only `Input` with a `Lock` icon (same treatment as the `Value ($)` when client) and a small helper: "Auto-fetched from the client's registered gym / studio."
- Value bound to `formData.gymStudio`; no `onChange` handler (read-only).

### 4. `src/components/trainer/dashboard/tabs/sales/AddContactDialog.tsx`
- Add a read-only "Gym / Studio" input, defaulting to the demo trainer's studio (e.g. `"MyPersonal Studio"`). Passed through in the `onAdd` payload.

### 5. `src/components/trainer/dashboard/tabs/sales/SalesCard.tsx`
- Under the Company row (or, if no company, near the email/phone block), show a small `Building2` icon + `contact.gymStudio` text, so trainers see each contact's gym at a glance in the Kanban.

### 6. `src/components/ClientProfile.tsx`
- Add optional `gymStudio?: string` prop.
- Render a second badge/pill row directly below the "since" row, using a `Building2` icon and the gym/studio name, styled identically to the "since" pill.

### 7. `src/components/trainer/dashboard/tabs/clients/ClientProfileDialog.tsx`
- Extend `mockClientDetails` with `gymStudio: "FitLife Gym — Milan"` (matches Sarah's row in CRM mocks so data feels consistent).
- Pass `gymStudio={mockClientDetails.gymStudio}` to both `<ClientProfile>` instances (mobile + sidebar).

## Out of scope
- No changes to the client-facing dashboard, Supabase schema, RLS, or edge functions.
- No search-hook update for the new field (can be added later if needed).
- No editing UX for `gymStudio` — it's presented as an automatically-derived value.

## Result
- CRM Kanban cards, Add Contact dialog, and Edit Contact dialog all show a "Gym / Studio" line/field (read-only in dialogs).
- Trainer > Clients > Client Profile shows the client's gym/studio right under "March 2023".
