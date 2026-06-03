## Goal

The CRM "Client" column should show the trainer's actual clients (Emma Thompson, Michael Chen, Sarah Johnson) — the same people listed in Client Management — instead of the unrelated mock contacts Giovanni Verdi and Sofia Esposito.

## Changes

### 1. `src/components/trainer/dashboard/tabs/sales/useSalesContacts.ts`
Replace the two mock `client` entries (Giovanni Verdi, Sofia Esposito) with three new entries matching the Client Management roster:

- **Emma Thompson** — `emma.thompson@example.com`, status `client`, clientSince ~Feb 2023, source "Website", notes "Personal training — 10-session package"
- **Michael Chen** — `michael.chen@example.com`, status `client`, clientSince ~Mar 2023, source "Referral", notes "Single PT sessions, weight-loss focus"
- **Sarah Johnson** — `sarah.johnson@example.com`, status `client`, clientSince ~Jan 2023, source "Instagram", notes "12-week training program"

Keep the non-client mock contacts (Marco Rossi lead, Laura Bianchi prospect, Francesca Neri lost, Antonio Russo terminated) as-is so the other pipeline columns are still populated.

The `value` field on each new client is irrelevant for display (the card already pulls `getTotal(email)` from `SalesEntriesContext` for clients), but set it to match the seeded total for consistency: Emma 1800, Michael 1200, Sarah 2700.

### 2. `src/context/SalesEntriesContext.tsx`
Remove the now-unused seeds for `g.verdi@example.com` and `s.esposito@example.com` so the CRM/Sales-Entries data is consistent with the new roster. Keep the Antonio Russo seed (he's the Terminated card).

## Out of scope

- No change to Client Management cards — they already use the same emails.
- No DB / backend work.

## Note

Users who already opened the app once have a cached `trainer-sales-entries` in localStorage with the old seeds. The existing merge logic only **adds** missing entries; it won't remove g.verdi / s.esposito entries from cache. That's fine — those emails no longer appear in any CRM contact, so the orphaned entries are invisible. No cache reset needed.
