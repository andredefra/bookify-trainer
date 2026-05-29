## Goal
Remove the trainer plan selector from the login UI and infer the plan from credentials instead.

## Changes (single file: `src/pages/Login.tsx`)

1. Remove the `trainerPlan` state and the entire "Trainer plan" selector block (lines 118–142).
2. Update `getButtonLabel()`: trainer case always returns "Access Trainer Demo".
3. Rewrite `handleSubmit` trainer branch:
   - Define plan-credential map:
     - `andrea.mypersonal.fit@gmail.com` + `@Tr3ggy@` → `basic`
     - `andredefra64@gmail.com` + `@Tr3ggy@` → `essential`
     - Any other email/password → `pro` (no restriction)
   - Compute `resolvedPlan` from the email/password (case-insensitive email match).
   - Persist `plan: resolvedPlan` into `demo-user` (replace the existing `trainerPlan` write).
   - Route: `basic` → `/dashboard-basic`, `essential` → `/dashboard-essential`, otherwise `/dashboard`.
4. Keep Gym/Studio behavior unchanged (still restricted to `andrea.mypersonal.fit@gmail.com` + `@Tr3ggy@`).
5. Keep Client behavior unchanged.

## Out of scope
- No changes to the dashboard pages, routes, or `TrainerPlanContext`.
- No real authentication wiring.

## Verification
- Login as trainer with any random email/password → lands on `/dashboard` (Pro).
- Login as trainer with `andrea.mypersonal.fit@gmail.com` / `@Tr3ggy@` → lands on `/dashboard-basic`.
- Login as trainer with `andredefra64@gmail.com` / `@Tr3ggy@` → lands on `/dashboard-essential`.
- Gym/Studio still gated to the andrea credentials.