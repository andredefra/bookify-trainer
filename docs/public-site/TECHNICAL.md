# Public Site — Technical Reference

## Overview

The public site is the unauthenticated marketing + discovery layer. It actually serves **two
products**: the **trainer/gym platform** (landing at `/` and `/it`) and the **consumer
"MyPersonal AI app"** (landing at `/user` and `/user-en`), plus the **trainer discovery**
flow (`/find-trainer`, `/trainer/:idOrSlug`) and the legal pages.

Everything here is i18n-driven (`useLanguage().t(...)`) except the consumer landings, whose
copy is largely hardcoded. Trainer discovery mixes Supabase data with mock fallbacks.

## Files

| File | Route | Purpose |
|------|-------|---------|
| `src/pages/Index.tsx` | `/` | Trainer-platform landing (forces EN) |
| `src/pages/IndexIta.tsx` | `/it` | Trainer-platform landing (forces IT) |
| `src/pages/UserLanding.tsx` | `/user` | Consumer landing (hardcoded IT) |
| `src/pages/UserLandingEn.tsx` | `/user-en` | Consumer landing (EN; mostly hardcoded) |
| `src/pages/FindTrainer.tsx` | `/find-trainer` | Trainer marketplace (mock data) |
| `src/pages/TrainerProfile.tsx` | `/trainer/:idOrSlug` | Public trainer profile + booking + AI chat |
| `src/pages/{Privacy,Terms,Cookies}.tsx` | `/privacy` `/terms` `/cookies` | Static legal pages |
| `src/components/{Hero,Features,HowItWorks,PricingSection,RegistrationCTA,GymSection,Footer,Navbar}.tsx` | — | Trainer-landing sections |
| `src/components/{UserNavbar,UserFooter}.tsx` | — | Consumer-landing chrome |
| `src/components/ClientProfile.tsx` | — | Reusable client card (also used in trainer area) |

## Trainer landing (`/`, `/it`)

`Index` / `IndexIta` force language on mount (`setLanguage('en'|'it')`) and compose, in order:

```
<Navbar/> → <Hero/> → <Features/> → <HowItWorks/> → <PricingSection/> → <RegistrationCTA/> → <Footer/>
```

- **`Hero`** — headline + CTA to `/register` + dashboard mockup; 3 info boxes (Smart
  Scheduling, Automated Payments, AI Assistant). i18n-driven; `IntersectionObserver` reveal.
- **`Features`** — 12-feature grid (AI scheduling, Stripe, group sessions, Google Calendar,
  waitlist, messaging, invoicing, reviews, packages, services…) + a video-demo block + a
  trainer-profile preview with a "Find Trainer" CTA.
- **`HowItWorks`** — 3 steps + "Get started for free" button scrolling to `#pricing`.
- **`PricingSection`** — see [`../pricing-plans/TECHNICAL.md`](../pricing-plans/TECHNICAL.md).
- **`RegistrationCTA`** — external Typeform link.
- **`Navbar`** — fixed; `BrandLogo`, `NavLinks` (Features/Pricing/How It Works),
  `LanguageToggle` (EN/IT), `AuthButtons` (Login / Try Demo), `MobileMenu`; adds
  `glass-navbar` on scroll. Also used by `FindTrainer` and `TrainerProfile`.
- **`Footer`** — product anchors (`/#features`, `/#pricing`, `/#how-it-works`) + legal routes
  + cross-link to `/user`.

## Consumer landing (`/user`, `/user-en`)

`UserLanding` (IT) and `UserLandingEn` (EN) use `<UserNavbar/>` + `<UserFooter/>` and a
bespoke section flow (hero, "start your journey" phone mockup, AI-ally cards, analytics,
mission, a consumer pricing block — Free for first 100 users @ €0, then €4.99/mo — and a final
urgency CTA). Copy is largely **hardcoded** rather than dictionary-driven, so IT/EN can drift.
`UserNavbar`'s language toggle navigates between `/user` and `/user-en`. Language forcing for
these routes is in `LanguageContext` (see [`../i18n/TECHNICAL.md`](../i18n/TECHNICAL.md)).

## Trainer discovery

### `FindTrainer` (`/find-trainer`)

`<Navbar/>` + a heading + two search inputs (query, location) + a 3-column grid of trainer
cards (`image`, `name`, `specialty`, `location`, `rating`, `reviews`, `price`,
`availability`) each linking to `/trainer/:id`. **Data is a hardcoded mock array (4 trainers)
and the search inputs do not filter** — discovery is presentational today.

### `TrainerProfile` (`/trainer/:idOrSlug`)

Real-data with mock fallback. Resolution order:

```
1. trainer_profiles.eq('slug', idOrSlug).eq('is_public', true)
2. trainer_profiles.eq('trainer_id', idOrSlug).eq('is_public', true)
3. trainerMockData.getTrainerById(idOrSlug)
4. else → navigate('/404')
```

Composition: `Navbar` → `TrainerHeader` → `TrainerInfo` (booking CTA + message button) →
`TabsSection` (**About / Experience / Reviews / Availability**) → `MarketingSection`
("How MyPersonal helps trainers like …" — **omitted** when viewed from a client's "My
Trainers") → dialogs (`SessionDialogs` for register+booking, `ChatDialog` for AI chat).

Hooks: `useTrainerReviews(trainerId)`, `useTrainerGymAffiliations(trainerId)`. The booking
flow: not-logged-in → register form → booking form → toast confirmation. The AI chat uses
`trainerMockData.aiConversation` as fallback content.

## Legal pages

`Privacy`, `Terms`, `Cookies` are static prose inside `Navbar` + `Footer`. Note **company-name
inconsistencies** in the copy ("MyPersonal ltd" vs "mypersonalai ltd" / "Personal.ai") and a
hardcoded `cookies@mypersonalai.com` contact — worth normalizing.

## i18n key namespaces (public)

`nav.*`, `hero.*`, `features.*`, `howItWorks.*`, `pricing.*`, `footer.*`, `userNav.*`,
`userFooter.*`, `gym.*`, `metrics.*`, `cta.*`.

## Gotchas

- **Discovery is mock + non-filtering.** `/find-trainer` shows 4 hardcoded trainers; inputs
  are inert.
- **Consumer landings are hardcoded.** `/user` (IT) and `/user-en` (EN) can drift; they're not
  fully dictionary-driven.
- **Profile data mix.** `/trainer/:idOrSlug` is real Supabase first, then mock — a profile may
  render from mock data without it being obvious.
- **Assets** come from Unsplash + `lovable-uploads/*` (Lovable CDN).
- **Legal copy** has stale company names/emails.
