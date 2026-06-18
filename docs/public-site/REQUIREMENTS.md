# Public Site — Requirements

## Overview

The public site acquires two audiences and routes them appropriately:

- **Trainers & gyms** → the platform landing (`/`, `/it`), pricing, and registration.
- **Clients/end-users** → the consumer "MyPersonal AI app" landing (`/user`, `/user-en`) and
  trainer discovery (`/find-trainer`, public trainer profiles).

All public pages must be available in **English and Italian** with a language switcher.

## Pages & behaviour

### Trainer landing (`/`, `/it`)
A marketing page that introduces the platform and drives trainers to register. Sections:
hero (headline + "Try the demo"/register CTA), feature highlights, an "everything you need"
feature grid, a how-it-works 3-step flow, the pricing tables, a gym spotlight, and a
registration CTA. `/` defaults to English, `/it` to Italian.

### Consumer landing (`/user`, `/user-en`)
Promotes the AI-trainer app to end-users: hero, "start your journey", AI-ally explanation,
progress/analytics, mission, and a consumer pricing block (free for the first 100 users, then
€4.99/mo) with an urgency CTA. `/user` is Italian, `/user-en` is English.

### Find a trainer (`/find-trainer`)
Lets a prospective client browse trainers by search term and location and open a trainer's
profile. Each card shows photo, name, specialty, location, rating + review count, price per
session, and availability. *(As-built: list is sample data and the filters are not yet
functional.)*

### Trainer profile (`/trainer/:idOrSlug`)
Public profile for a trainer: header (photo, name, rating, status, next slot, verification
badges, key stats, specialties, price), tabs for **About / Experience / Reviews /
Availability**, and CTAs to **book a session** and **message**. An AI chat assists when the
trainer is unavailable. When the same profile is opened from a client's "My Trainers", the
trainer-marketing section is hidden.

#### Booking flow
1. Visitor taps "Book a session".
2. If not registered, a registration form is shown first.
3. After registering, the booking form opens.
4. On submit, a confirmation toast shows the chosen date/time.

### Legal
`/privacy`, `/terms`, `/cookies` present GDPR-oriented static content.

## Internationalization

- A persistent language switcher is available in the header.
- `/`, `/find-trainer`, `/trainer/*` follow the saved/EN default; `/it`, `/user`, `/user-en`
  force their language (see [`../i18n/TECHNICAL.md`](../i18n/TECHNICAL.md)).

## As-built limitations

- Trainer discovery uses sample data and inert search filters.
- Consumer landings are largely hardcoded (not dictionary-driven), risking IT/EN drift.
- Legal pages contain inconsistent company names/contact emails to be normalized before
  go-live.
