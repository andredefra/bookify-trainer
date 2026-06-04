## Goal
On the homepage pricing section (both EN and IT), clicking "Upgrade to Essential" or "Go Pro" should open a popup announcing the plan is coming soon, inviting users to start with Basic via a button styled like "Start Free Now" (no navigation for now).

## Changes

### `src/components/pricing/PlanCard.tsx`
- Add local state `comingSoonOpen`.
- For plans with `planType === 'essential'` or `planType === 'pro'`, replace the `<Link>` CTA with a `<Button>` that opens a `<Dialog>` instead of navigating.
- Other plans (Basic, Studio, Gym) keep current behavior.
- Render a shadcn `Dialog` with:
  - Title: translated "Coming Soon"
  - Description: translated message — "This plan is coming soon. In the meantime, you can start using MyPersonal with the Basic account."
  - Primary action button styled identically to the Basic "Start Free Now" CTA, label from translations, `onClick` just closes the dialog (no navigation per request).
- Use translation keys so EN and IT pages share the same component and both get the popup automatically.

### `src/translations/en.ts` and `src/translations/it.ts`
- Add keys under `pricing.comingSoon`:
  - `title` — "Coming Soon" / "Prossimamente"
  - `description` — English & Italian version of the message
  - `cta` — reuse existing `pricing.standard.cta` ("Start Free Now" / equivalent), no new key needed if it already exists.

## Notes
- Single shared component covers both `/` (EN) and `/ita` (IT) pricing sections — no per-page duplication needed.
- Button does not navigate anywhere yet (just closes the dialog), as requested.
