
# Payment History ↔ Trainer Sales Demo Bridge

Connect the client's **Payment History** to the trainer's **Sales / Transactions** for the demo account `andrea.mypersonal.fit@gmail.com` so a single source of truth drives both sides. Future cash/card transactions from Sessions/Programs will auto-populate the same store once those modules launch.

## Goals

1. Trainer adds a transaction in Sales → it appears in the client's Payment History (when the transaction's `client` matches the connected client name).
2. Client clicks **Request Invoice** or **Request Refund** → trainer receives an in-app notification, a chat message, and a (mock) email; the transaction row in Sales gets a red dot + actionable button.
3. Trainer uploads the invoice / approves the refund → client sees **Confirm Receipt** action.
4. Client confirms reception → entry is removed from both Payment History and trainer's Sales list (kept in an archived store for audit).
5. Until Sessions/Programs/etc. ship, all data lives in a shared `localStorage` bridge so both dashboards (opened in different tabs/profiles) stay in sync via the `storage` event.

## Scope

Demo-only wiring on the basic Andrea profile. No backend tables, no Supabase changes. Behavior is gated behind the existing `demo-user` flag so production users are unaffected.

## Plan

### 1. Shared demo store
Create `src/lib/demoTransactionsBridge.ts`:
- Reads/writes `localStorage` key `demo-shared-transactions`.
- API: `getTransactions()`, `upsertTransaction(t)`, `removeTransaction(id)`, `subscribe(cb)` (uses `window.addEventListener('storage', …)` + a custom `demo-tx-changed` event for same-tab updates).
- Seeds with the 3 existing client mock rows (Sarah/Alex) on first load.
- Notification helper `pushDemoNotification({to, type, payload})` writing to `demo-notifications-{trainer|client}` and emitting a toast.

### 2. Trainer side (Sales)
- `TransactionsContext.tsx`: on mount, merge bridge entries into `transactions`; on `addTransaction` / `updateInvoiceStatus`, mirror to the bridge when `client === "Andrea"` (demo).
- `TransactionsTable.tsx`: handle two new statuses already supported via `invoiceRequestedByClient` (existing red dot) and add `refundRequestedByClient`. Reuse the existing Invoice dropdown; for refunds add an "Approve refund" / "Reject" inline action.
- On invoice send or refund approval, push notification to client and update bridge.

### 3. Client side (Payment History)
- `TrainersTab.tsx`: replace the hardcoded `paymentHistory` array with a `useDemoTransactions()` hook that reads from the bridge and filters by the current demo client name.
- `PaymentsTable.tsx`: add a new state cell when trainer has uploaded an invoice or approved the refund → show **Confirm Receipt** button. On click → `removeTransaction(id)` from the bridge (disappears for both sides) and toast "Ricevuta confermata".
- Keep existing Request Invoice / Request Refund dialogs; their submit handlers now write `invoiceRequestedByClient = true` / `refundStatus = 'pending'` into the bridge and push notification to trainer.

### 4. Notifications + messages + email (mocked)
- New helper `notifyDemo(role, message)`:
  - `toast()` on the recipient's session if active.
  - Append a message to the existing demo messaging localStorage thread between trainer and client.
  - Console-log a mock email payload (`[MOCK EMAIL → andrea.mypersonal.fit@gmail.com]`).
- Triggered on: invoice request, refund request, invoice sent, refund approved/rejected, receipt confirmed.

### 5. Future-proofing note
Add a short header comment in `demoTransactionsBridge.ts` explaining that once Sessions/Programs/Packages payments ship, their checkout success handlers should call `upsertTransaction()` to keep the same surface working.

## Files touched

- **New**: `src/lib/demoTransactionsBridge.ts`, `src/hooks/useDemoTransactions.ts`, `src/lib/demoNotify.ts`
- **Edit**: `src/components/client/tabs/TrainersTab.tsx`, `src/components/client/trainers/PaymentsTable.tsx`, `src/components/client/trainers/RequestInvoiceDialog.tsx`, `src/components/client/trainers/RequestRefundDialog.tsx`, `src/components/trainer/dashboard/tabs/transactions/context/TransactionsContext.tsx`, `src/components/trainer/dashboard/tabs/transactions/components/TransactionsTable.tsx`

## Out of scope

- Real email delivery, real notifications table, Supabase schema.
- Non-demo accounts (logic gated by demo flag).
