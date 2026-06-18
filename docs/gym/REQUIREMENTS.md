# Gym — Requirements

## Overview

A **Gym** is a facility that onboards trainers and manages members. Its business model is
**intermediary**: it sells memberships/packages to members and **requests services**
(programs, sessions) **from trainers**, taking a commission — rather than producing training
content itself. (Contrast with **Studio**, the super-PT model that creates programs directly —
see [`../studio/TECHNICAL.md`](../studio/TECHNICAL.md).)

## Entry & onboarding

- A gym can be created from a **trainer's invite link** (`/gym-onboarding/:token`). The link
  carries the gym's details so the page can pre-fill them.
- Onboarding is a 3-step flow: confirm gym details → optionally upload verification documents →
  create an account. On completion the gym lands in its dashboard in **invited mode**.
- Gyms can also enter via the demo login.

## Invited vs full gym

- An **invited** gym (created from a trainer link) sees a **restricted** dashboard:
  **Trainers Management, Messages, Settings** only. This lets a trainer bring a gym into the
  network for collaboration without exposing the full facility toolset.
- A **full** gym sees all capabilities below.

## Capabilities (full gym)

| Area | Description |
|------|-------------|
| Overview | KPIs: members, sessions, revenue; top trainers; member-expiry alerts |
| Trainers Management | Manage the PT network and gym↔trainer assignments/contracts; generate invite links |
| Group Sessions | Create and schedule gym-wide classes; assign trainers; track participants |
| Availability | Manage trainer shifts/availability |
| Performance | View aggregated trainer ratings and reviews |
| Calendar | Unified calendar of sessions, 1:1s, and sales calls |
| Members | Member directory; status (active/inactive/suspended); assign packages |
| Packages | Define and price member packages; assign to members; renewal campaigns |
| Service Requests | Request programs/packages from trainers; track status and commission |
| Transactions | Billing ledger and receipts |
| Messages | Async messaging with trainers (and members) |
| Analytics | Revenue, membership, and session analytics |
| Settings | Profile, notifications, integrations, invoicing, billing, branding |

## Member connection flow

1. A client requests to connect to the gym (with an optional message).
2. The gym approves or rejects the request.
3. Once approved, the gym assigns packages; the client can use sessions and message the gym.
4. Package usage (sessions used/remaining, expiry) is tracked, and renewal reminders can be
   automated.

## Pricing

The Gym plan is **€119/month** (marketed as Coming Soon). See
[`../pricing-plans/REQUIREMENTS.md`](../pricing-plans/REQUIREMENTS.md).

## As-built limitations

- The invite/onboarding flow is **localStorage-only** (no server persistence).
- Member/package/connection data falls back to demo data when Supabase is empty, and the demo
  gym uses a fixed id — real per-gym isolation requires real authentication (not yet built).
