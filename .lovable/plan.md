## Goal

When a CRM contact's status is **Client**, the contact's **Value ($)** field is no longer free-form. It is locked and auto-computed from the sum of that client's entries in the **Sales — Entries** section of the Client Profile.

## Approach

Sales entries are currently held in local React state inside `ClientProfileTabs/SalesTab.tsx`, so the CRM contact dialog cannot see them. We will lift that state into a shared, frontend-only store keyed by the client/contact's **email** (the natural shared key between `SalesContact` and the client profile), and bind the CRM Value field to it when status is `client`.

## Changes

### 1. New shared store — `src/context/SalesEntriesContext.tsx`
- React context + provider with `entries: Record<string /*email lowercased*/, SalesEntry[]>`.
- Persists to `localStorage` (`trainer-sales-entries`).
- Exposes:
  - `getEntries(email)` → `SalesEntry[]`
  - `getTotal(email)` → `number`
  - `addEntry(email, entry)` → void
- Mount the provider once inside `TrainerPlanProvider` in `DashboardContainer.tsx`.

### 2. Refactor `src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/SalesTab.tsx`
- Accept an additional `clientEmail` prop.
- Replace local `useState<SalesEntry[]>` with `useSalesEntries()` reads/writes scoped to `clientEmail`.
- `handleAdd` calls `addEntry(clientEmail, entry)`.
- `total` comes from `getTotal(clientEmail)`.

### 3. Pass email through — `ClientProfileTabContent.tsx`
- Forward `client.email` to `<SalesTab clientEmail={client.email} … />`.

### 4. CRM contact dialog — `src/components/trainer/dashboard/tabs/sales/EditableContactDialog.tsx`
- Read `useSalesEntries()`; compute `lockedValue = getTotal(formData.email)`.
- When `formData.status === 'client'`:
  - Render the Value input as `readOnly`, value = `lockedValue.toFixed(2)`, no spinner, muted background.
  - Show a small helper line under the input: "Auto-calculated from this client's Sales — Entries."
  - In the parent `handleSave`/`onChange` path, ensure the persisted `value` for a client is overwritten with `lockedValue` (so the kanban/cards show the real number, not stale typed input).
- When status is not `client`, keep the input editable exactly as today.

### 5. Optional polish (frontend-only)
- In `EditableContactDialog`, when status flips to `client` via the Select, immediately reset the in-memory `formData.value` to `lockedValue` so the UI reflects the lock without waiting for save.

## Out of scope
- No DB / Supabase / migrations / RLS work.
- No changes to how sales entries are displayed in `SalesTab`'s table — only their state location changes.
- No changes to kanban computed metrics beyond reading the corrected `value`.
