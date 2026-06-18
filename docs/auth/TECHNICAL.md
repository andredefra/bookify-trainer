# Authentication — Technical Reference

## Overview

There are **two completely separate authentication realities** in this app, and the
distinction is the single most important thing to understand before working on anything
that touches user identity:

1. **Admin module (`/admin/*`)** — real Supabase Auth (email/password) + an `mkt_admins`
   allowlist. This is the only genuinely authenticated area.
2. **Everything else (trainer / client / user / gym / studio)** — a **demo identity stored
   in `localStorage`**. No Supabase Auth session, no route guards, no per-user isolation.
   Supabase queries from these areas run as the **anon role**, often against a single
   hardcoded demo identity.

## Consumer-side: demo auth

### How "login" works

`Login.tsx` (`/login`) is a **persona selector**, not an auth form against Supabase. The user
picks a persona (`trainer | client | gym | studio`); the page resolves a target dashboard and
writes a `demo-user` object to `localStorage`, then navigates. Trainer tier today is resolved
by **hardcoded credential checks**:

```ts
let resolvedPlan: 'basic' | 'essential' | 'pro' = 'pro';
if (email === 'andrea.mypersonal.fit@gmail.com' && password === '@Tr3ggy@') resolvedPlan = 'basic';
else if (email === 'andredefra64@gmail.com'      && password === '@Tr3ggy@') resolvedPlan = 'essential';
// → /dashboard-basic | /dashboard-essential | /dashboard (pro)
```

`/user-login` is the analogous entry point for the `/user-dashboard` flow and writes a
**different** key.

### The two demo-identity keys

| `localStorage` key | Used by | Shape |
|--------------------|---------|-------|
| `demo-user` | trainer, client, gym, studio | `{ id, name, email, type, plan?, profileImage?, source?, gymName?, studioName? }` |
| `user-app-user` | `/user-dashboard` only | same shape |

### No guards — per-page redirect

Dashboards are **not** wrapped in any guard. Each page runs an effect on mount:

```ts
useEffect(() => {
  const user = localStorage.getItem('demo-user');       // or 'user-app-user'
  if (!user) { navigate('/login'); return; }
  const data = JSON.parse(user);
  if (data.type === 'client') navigate('/client-dashboard'); // persona correction
}, [navigate]);
```

This is **presence-only**: any value under the key grants access. There is no token, no
expiry, no server validation.

### Demo identities (`src/utils/demoUserUtils.ts`)

Well-known demo accounts map to fixed UUIDs; arbitrary emails get a hash-derived UUID
(`generateDemoUserId(email)`).

```
gym       11111111-1111-1111-1111-111111111111
trainer1  22222222-2222-2222-2222-222222222222
trainer2  33333333-3333-3333-3333-333333333333
client1   44444444-4444-4444-4444-444444444444
client2   55555555-5555-5555-5555-555555555555
client3   66666666-6666-6666-6666-666666666666
```

`GymDashboard` normalizes a non-invited demo gym's id to the fixed gym UUID and writes it back
to `localStorage`.

### The hardcoded `DEMO_CLIENT_ID`

Independently of the demo-user object, several **client-side Supabase queries hardcode** the
client row they read/write:

```ts
const DEMO_CLIENT_ID = '00000000-0000-0000-0000-000000000002';
```

Locations: `src/components/client/ClientHeader.tsx`,
`src/components/client/tabs/packages/PackagePaymentDialog.tsx`,
`src/components/client/tabs/packages/payment/usePackagePayment.ts`,
`src/hooks/useClientPackages.ts`, `src/hooks/useTrainingPrograms.ts`. (A separate
`'demo-client-id'` string also appears in `useGymConnection.ts`.)

**Consequence:** the client area hits a real Supabase database, but every "client" reads and
writes the **same shared row**. There is no per-client data isolation today.

## Admin-side: real auth

`/admin/*` uses Supabase Auth properly. Full detail in
[`../admin-marketing/TECHNICAL.md`](../admin-marketing/TECHNICAL.md); summary:

- `useAdminSession()` subscribes to `supabase.auth.onAuthStateChange` and calls
  `getSession()`, then checks the signed-in email against `mkt_admins`
  (`ilike` — case-insensitive).
- `AdminGuard`:
  ```
  loading            → splash
  no session         → /admin/login
  session, !isAdmin  → /            (kick non-admins to the public site)
  session, isAdmin   → render
  ```
- Backend `mkt-*` edge functions re-check the allowlist server-side (`is_mkt_admin()`), since
  they run with `verify_jwt = false`.

## Relationship to RLS

The database has 292 RLS policies keyed on `auth.uid()` (see
[`../supabase/TECHNICAL.md`](../supabase/TECHNICAL.md)). Because the consumer side has **no
Supabase Auth session**, `auth.uid()` is null there and those ownership policies don't enforce
real isolation — the anon role plus a shared `DEMO_CLIENT_ID` is what's actually in play. The
policy infrastructure is ready for real per-user auth; the wiring (real sign-up/sign-in for
trainers and clients, replacing the demo identity) is not yet built.

## Gotchas

- **"Logged in" means a localStorage key exists.** Clearing site data logs the consumer out;
  setting the key by hand logs them in.
- **Two demo keys.** Don't assume `/user-dashboard` and `/client-dashboard` share state — they
  read different keys (`user-app-user` vs `demo-user`).
- **Shared client row.** Any consumer-side write goes to `DEMO_CLIENT_ID`. Don't treat
  client-area data as per-user.
- **Only admin is real.** Any feature that needs a true authenticated user must either live
  under `/admin` or introduce real Supabase Auth for the consumer side first.
