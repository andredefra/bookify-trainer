## Goal
In the "Add gym or studio manually" dialog: make **City required** and add a new **Partita IVA** required field (11-digit Italian VAT with checksum validation).

## Changes — `src/components/trainer/dashboard/tabs/settings/sections/MyGymsSection.tsx`

1. Add state `manualVat` (string) alongside other manual form fields; reset it in `resetDialog`.
2. UI:
   - Change City label `City (optional)` → `City *` (required).
   - Add a new required `Partita IVA *` input below City. Max length 11, numeric only via `inputMode="numeric"` and `onChange` strip non-digits. Helper text: "11 cifre numeriche".
3. Validation (used in both Continue button + `handleGenerateInvite`):
   - Name, Street, City, VAT all required.
   - VAT must be 11 digits and pass Luhn-style Italian P.IVA checksum (standard algorithm: sum digits at odd positions + double digits at even positions adding digit-sum, then `(10 - sum % 10) % 10` must equal the 11th digit).
   - On failure show specific toast: "Partita IVA non valida".
4. Pass `vat` along in the `createInvite` payload and into `LocalManualAffiliation` so it persists (extend the local type with optional `vat?: string`).

## Supporting type change — `src/utils/mockGymInvites.ts`
- Extend `MockGymInvite` and `createInvite` params to accept optional `vat?: string`.
- Extend `LocalManualAffiliation` similarly.

No backend/migrations — this dialog stores via localStorage utilities.
