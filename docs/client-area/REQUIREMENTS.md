# Client Area — Requirements

## Overview

The client area lets an end-user follow the training their trainer assigned, log workouts,
track progress, manage the packages they bought, talk to their trainer (and an AI assistant),
and connect to a gym/studio. AI features are gated by the client's subscription
(`free` vs `pro`).

## Two consumer surfaces

The product ships two consumer dashboards:

1. **Client dashboard** (`/client-dashboard`) — the full client experience including gym
   connection and packages. Entered from `/login` (client persona).
2. **User dashboard** (`/user-dashboard`) — the leaner "MyPersonal AI app" experience
   promoted by the `/user` landing. Entered from `/user-login`.

They are separate flows with separate storage; a user is in one or the other.

## Functional areas

### Overview / progress
Home with fitness progress, body measurements, and recent activity.

### Training program & log
- View the training program assigned by the trainer (exercises, schedule, periodization).
- Log workouts (sets/reps/notes) and mark sessions complete.
- AI can analyze a workout or overall program progress (subject to AI access limits).

### Sessions
- See upcoming and past sessions.
- Respond to a **postponement** proposed by the trainer (accept/decline) via the in-app flow
  or a tokenized email link.

### Packages
- View owned packages, sessions remaining, and validity.
- Pay for / renew a package (cash or digital; installments supported).

### Trainers & gym
- View the client's trainer(s) and their public profile (without the trainer-marketing block).
- Connect to a gym/studio (connection request → approval) and view gym communications.

### Messaging & AI
- Chat with the trainer.
- Use the AI assistant (text and realtime voice). Free plan: limited monthly AI requests; Pro:
  higher daily limit. See [`../billing/REQUIREMENTS`](../billing/TECHNICAL.md).

### Check-ins
- Submit periodic check-ins configured by the trainer; analytics summarize trends.

### Settings
- Profile, health-document upload, subscription management.

## Subscription gating

| Capability | Free | Pro |
|------------|:---:|:---:|
| View/follow program, log workouts | ✓ | ✓ |
| AI assistant requests | 5 / month | 100 / day |
| Advanced AI insights | limited | ✓ |

## i18n

The `/user` landing forces Italian and `/user-en` forces English (see
[`../i18n/TECHNICAL.md`](../i18n/TECHNICAL.md)). The dashboards themselves use
`useLanguage().t(...)`.

## As-built limitations

- No real client authentication; both flows are demo (`demo-user` / `user-app-user`).
- Several client reads/writes target a single shared `DEMO_CLIENT_ID` row, so per-user data
  isolation does not exist yet.
- AI usage in demo mode is hardwired to 4/5 (to showcase the near-limit state).
