## Create the admin auth user automatically

Since Supabase Auth users can't be created via SQL migrations (the `auth.users` table is managed and password hashing requires the Auth API), I'll add a one-shot edge function that uses the service role key to provision the admin user, then call it once.

### Steps

1. **New edge function `mkt-bootstrap-admin`** (public, no JWT verification needed since it's idempotent and gated by a hardcoded allowlist):
   - Uses `SUPABASE_SERVICE_ROLE_KEY` + `supabase.auth.admin.createUser({ email: "andrea.mypersonal.fit@gmail.com", password: "@Tr3ggy@", email_confirm: true })`.
   - If the user already exists (error code `email_exists`), it fetches the existing user and calls `updateUserById` to reset the password to `@Tr3ggy@` and confirm the email — guarantees the credentials always work.
   - Ensures the email is present in `mkt_admins` (insert if missing).
   - Returns `{ ok: true, userId, created|updated }`.
   - Hardcoded to only ever touch `andrea.mypersonal.fit@gmail.com` — no input accepted.

2. **Register the function in `supabase/config.toml`** with `verify_jwt = false`.

3. **Auto-trigger from the admin login page**: On `/admin/login` mount, silently `fetch` the bootstrap function once (guarded by a `sessionStorage` flag so it only runs once per session). This way the user just visits the page and the credentials immediately work — no manual call required.

### Result
User reloads `/admin/login`, types `andrea.mypersonal.fit@gmail.com` / `@Tr3ggy@`, and gets in. No Supabase dashboard interaction required.

### Files
- New: `supabase/functions/mkt-bootstrap-admin/index.ts`
- Edit: `supabase/config.toml` (register function, `verify_jwt = false`)
- Edit: `src/admin/pages/Login.tsx` (trigger bootstrap once on mount)