# i18n — Technical Reference

## Overview

The app has **two unrelated i18n systems**:

1. **App-wide** — `LanguageContext` + dictionaries in `src/translations/` (English/Italian),
   consumed via `useLanguage().t(key)`. Covers the public site and all consumer dashboards.
2. **Admin module** — a standalone Italian-only string map in `src/admin/i18n/it.ts`. The
   admin sub-app does **not** use `LanguageContext` at all.

This document covers the app-wide system; the admin map is described in
[`../admin-marketing/TECHNICAL.md`](../admin-marketing/TECHNICAL.md).

## Files

| File | Purpose |
|------|---------|
| `src/context/LanguageContext.tsx` | Provider + `useLanguage()` hook + `t()` |
| `src/translations/index.ts` | `Language` type, `translations` registry |
| `src/translations/en.ts` | English dictionary (**429 keys**) |
| `src/translations/it.ts` | Italian dictionary (**429 keys**) |
| `src/admin/i18n/it.ts` | Separate admin-only Italian strings |

`en` and `it` are key-for-key balanced (429 each).

## `LanguageContext`

```ts
interface LanguageContextType {
  language: Language;                 // 'en' | 'it'
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}
```

Mounted at the **app root** in `App.tsx` (wraps `BrowserRouter`'s children), so `useLanguage()`
is available everywhere in the consumer app.

### `t(key)` behaviour

```ts
const t = (key: string): string => {
  if (!translations[language]) { console.warn(`Missing translations for language: ${language}`); return key; }
  const translation = translations[language][key as keyof ...];
  if (key === 'footer.copyright') return translation?.replace('{year}', new Date().getFullYear().toString()) || key;
  return translation || key;
};
```

- Missing keys **fall back to the key string itself** (no throw).
- `footer.copyright` is the one key with interpolation (`{year}` → current year).
- There is no pluralization or parameterized-interpolation system beyond that special case.

## Language resolution & the route-forcing rule

This is the non-obvious part. Language is **not** purely a user preference — it is
**overridden by route**. Resolution order:

1. **Route override (highest priority).** On init and on every `location.pathname` change:
   - `/user`     → force `it`
   - `/user-en`  → force `en`
   - `/dashboard` (trainer) → force `en`
2. **Saved preference.** Otherwise read `localStorage('language')` if it's `'en'`/`'it'`.
3. **Default.** Otherwise `'en'`.

```ts
useEffect(() => {
  const p = location.pathname;
  if (p === '/user' && language !== 'it') setLanguageState('it');
  else if (p === '/user-en' && language !== 'en') setLanguageState('en');
  else if (p === '/dashboard' && language !== 'en') setLanguageState('en');
}, [location.pathname, language]);
```

The selected language is persisted to `localStorage('language')` whenever it changes. So a
user's manual switch sticks **except** on the three forced routes, which re-assert their
language on navigation.

> **Implication for new localized routes:** if you add a route that must be IT or EN
> regardless of preference, add it to the override block in `LanguageContext`. If you rely on
> the saved preference, do nothing — but be aware the forced routes will overwrite the stored
> value when visited.

## Adding / changing translations

1. Add the key to **both** `src/translations/en.ts` and `src/translations/it.ts` (keep them
   balanced — currently 429 each).
2. Consume via `const { t } = useLanguage(); t('your.key')`.
3. For the public site, prefer reusing existing key namespaces (e.g. `pricing.*`,
   `footer.*`) — see [`../pricing-plans/TECHNICAL.md`](../pricing-plans/TECHNICAL.md) for the
   pricing key layout.

## Known limitations (as-built)

- **EN landing is partly a separate page.** `/user-en` (`UserLandingEn`) exists as its own
  component rather than the IT landing rendered through the dictionary, so the two can drift.
- **No i18n for transactional emails.** Edge-function emails (`send-marketing-email`,
  `send-contact-email`, postponement notifications) are not wired to this system.
- **Admin is IT-only** and uses a separate map.
- Missing keys render the raw key string in the UI (silent fallback), so untranslated keys are
  easy to miss without a lint/coverage check.
