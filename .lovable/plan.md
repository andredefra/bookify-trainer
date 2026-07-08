The trainer-side "Body Measurements" card and "Check-in Details" dialog render directly from real DB rows in `check_in_submissions` (fetched by `useCheckInSubmissions`). Two rows for demo client Emma Thompson (`00000000-0000-0000-0000-000000000002`) still hold the old shape (`thighs`, no `chest`), so the trainer UI shows "Thighs" and misses "Chest".

### Fix
Run a data-only Supabase migration that updates those two rows so the JSONB `measurements` includes `chest` and renames `thighs` → `quadriceps`:

- Row `2025-12-02` (weight 77.8): `{ chest: 103, waist: 84, hips: 98, quadriceps: 58, arms: 32.5 }`
- Row `2025-11-25` (weight 78.5): `{ chest: 104, waist: 85, hips: 99, quadriceps: 59, arms: 32 }`

SQL uses `jsonb_set` / rebuild for the two ids. No schema change, no code change — the existing components already render whatever keys are present (and `Object.entries(measurements)` in `CheckInDetailDialog` will now display "Quadriceps" and "Chest" via the capitalize class).

### Verification
Re-open the check-ins modal for Emma Thompson: the Body Measurements card should show Chest + Quadriceps (instead of Thighs); the details dialog should list all 5 fields.
