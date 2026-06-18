# Studio — Technical Reference

## Overview

The Studio persona is the **boutique "super-PT"** model: a single operator (or small team)
that **creates and assigns training programs directly** and owns the client relationship.
Where a [Gym](../gym/TECHNICAL.md) is an *intermediary* that requests services from external
trainers, a Studio is a *direct provider* with full visibility over its internal trainers,
clients, programs, and revenue.

Entry is via demo login (`demo-user`, `type:'studio'`) at `/studio-dashboard`. Like the other
consumer personas, there is no real auth (see [`../auth/TECHNICAL.md`](../auth/TECHNICAL.md)).

## Files

| File | Purpose |
|------|---------|
| `src/pages/StudioDashboard.tsx` | Route `/studio-dashboard`; reads `demo-user` (defaults `studioName`) |
| `src/components/studio/dashboard/StudioDashboardContainer.tsx` | Layout + tab router |
| `src/components/studio/dashboard/{StudioHeader,StudioSidebar}.tsx` | Chrome |
| `src/components/studio/dashboard/tabs/*` | Studio tabs (see table) |
| `src/components/studio/dashboard/tabs/availability/StudioAvailabilityTab.tsx` | Shift/availability management |

The Studio reuses several trainer/gym components and the shared gym hooks/services where the
domains overlap (sessions, calendar, shifts, analytics).

## Studio vs Gym

| Aspect | Gym | Studio |
|--------|-----|--------|
| Model | Intermediary facility | Direct super-PT |
| Programs | **Requests** from trainers (Service Requests) | **Creates directly** (Programs tab, drag-drop builder) |
| Trainers | External PTs invited via link; own schedules | Internal team; full availability/performance visibility |
| Client relationship | Mediated via packages | Owned directly |
| Commission | Per trainer contract | Per program/package (analytics) |
| Service flow | Async request → trainer | Synchronous direct assignment |

## Tabs

| Tab | Purpose |
|-----|---------|
| Overview | KPIs: clients, trainers, programs, sessions, revenue, retention |
| Trainers Management | Studio trainer roster; performance, availability, commission |
| Clients (CRM) | Direct client directory; trainer assignment, goals, AI chat, analytics |
| Programs | **Create & manage programs directly** (drag-drop exercise builder); assign to clients/trainers; program-sales tracking |
| Packages | Session bundles (e.g. 10/20-session); trainer availability per package |
| Services | Value-add services (nutrition, assessment, mobility); pricing + booking stats |
| Sessions | Session calendar + request-approval workflow (reuses trainer session components) |
| Calendar | Unified calendar across trainers & clients |
| Messages | Internal messaging (studio↔clients, studio↔trainers) |
| Transactions | Revenue, commissions, refunds; commission breakdown |
| Analytics | KPI cards, program sales, trainer performance, revenue trends |
| Trainer Performance | Leaderboard, ratings, reviews, per-trainer stats |
| Availability | Shift management & requests; trainer availability calendar |
| Settings | Profile, branding, integrations, notifications |

## Data layer

Shares the gym data layer where applicable (`services/gym/*`, `hooks/gym/*` for sessions,
calendar, shifts, analytics) plus program/sales hooks (`useProgramSales`, program assignment
hooks) for the direct-program model. As with the other personas, queries fall back to demo
data and use the fixed demo identity.

## Pricing

The Studio plan is **€89/month** (marketed as Coming Soon). See
[`../pricing-plans/REQUIREMENTS.md`](../pricing-plans/REQUIREMENTS.md).

## Gotchas

- **Overlap with Gym & Trainer.** Studio reuses gym hooks/services and trainer session
  components; a change there can affect Studio. Check cross-usage before editing.
- **Demo identity.** Studio is demo-only; no real auth or per-studio isolation yet.
- **Direct-program model** is the defining difference from Gym — keep the Service-Request
  (gym) vs direct-assignment (studio) distinction intact when sharing code.
