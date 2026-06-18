# Trainer Dashboard — Requirements

## Overview

The trainer dashboard is the workspace for a personal trainer to run their business: manage
leads/clients, build and assign training programs, schedule sessions, sell packages/services,
take payments, message clients, and read business analytics. Capabilities are **gated by the
trainer's subscription tier** (Basic / Essential / Pro).

## Personas & entry

- A trainer "signs in" via `/login` (persona = trainer). Today this is a demo flow that writes
  a `demo-user` to `localStorage` and resolves the tier (Basic / Essential / Pro), then routes
  to `/dashboard-basic`, `/dashboard-essential`, or `/dashboard` respectively. See
  [`../auth/REQUIREMENTS`](../auth/TECHNICAL.md) for the as-built auth caveats.

## Tier capabilities

The dashboard shows a fixed set of tabs; each tier unlocks a superset of the previous one.

| Capability (tab) | Basic | Essential | Pro |
|------------------|:---:|:---:|:---:|
| Overview (home KPIs) | ✓ | ✓ | ✓ |
| CRM / Sales (leads & clients pipeline) | ✓ | ✓ | ✓ |
| Clients (roster & profiles) | ✓ | ✓ | ✓ |
| Calendar | ✓ | ✓ | ✓ |
| Messages | ✓ | ✓ | ✓ |
| Reviews | ✓ | ✓ | ✓ |
| Settings | ✓ | ✓ | ✓ |
| Programs (build & assign) | — | ✓ | ✓ |
| Sessions (1:1 / group, waitlist) | — | ✓ | ✓ |
| Transactions | — | ✓ | ✓ |
| Business Data / Analytics | — | ✓ | ✓ |
| Services (sell add-on services) | — | — | ✓ |
| Packages (bundle sessions/programs) | — | — | ✓ |

This mirrors the public pricing page — see
[`../pricing-plans/REQUIREMENTS.md`](../pricing-plans/REQUIREMENTS.md) for what each tier sells
and at what price.

## Functional areas

### Overview
Landing KPIs and quick links: upcoming sessions, recent activity, client/revenue summary.

### CRM / Sales
The trainer's lead-and-client pipeline. Tracks sales entries per contact (sessions, packages,
programs) and supports marking contacts as removed/terminated. Backed by
`SalesEntriesContext` and `ClientRosterContext` (localStorage-persisted in the demo).

### Clients
Client roster and 360° profiles (metrics, goals, history). Invitations to clients are created
and tracked here (`clientInvitationService`, `useTrainerInvitations`).

### Programs (Essential+)
Build training programs from an exercise library and assign them to clients; track adherence
and completion. The exercise library supports custom/modified/deleted exercises (stored
locally in the demo). AI can analyze a program's progress.

### Sessions (Essential+)
Create and manage 1:1 and group sessions, availability, and a waitlist. Sessions can be
postponed, which notifies participants by email and lets them accept/decline via a tokenized
link.

### Services & Packages (Pro)
Sell additional services and bundle sessions/programs into priced packages with validity
windows; assign them to clients and track usage.

### Transactions (Essential+)
History of payments/sales. Supports cash and digital payments and installment plans;
installment patterns can be AI-detected.

### Business Data / Analytics (Essential+)
Revenue, sales, and client analytics dashboards.

### Calendar / Messages / Reviews / Settings
Calendar of sessions/availability; in-app messaging with clients; review collection and
management; account/profile/membership settings (including the plan/membership sub-area).

## i18n

All trainer-facing copy goes through `useLanguage().t(...)`. Note the trainer dashboard route
`/dashboard` is **force-set to English** by `LanguageContext` (see
[`../i18n/TECHNICAL.md`](../i18n/TECHNICAL.md)).

## As-built limitations

- Tier is trusted from the route/prop; there is no server-side entitlement enforcement.
- Many areas read demo/mock data (e.g. programs and package sales use a shared
  `DEMO_CLIENT_ID`), so cross-client data is not yet isolated.
