# MyPersonal — Feature Catalog: Trainer & Client

> Scope: this document covers **Trainer** plans (Basic / Essential / Pro + AI Plus add‑on) and **Client** plans (Free / Pro + AI). **Gym** and **Studio** features are intentionally excluded.
>
> Demo reference: `andrea.mypersonal.fit@gmail.com` runs the **Trainer Basic** experience.

---

## 1. Overview

MyPersonal ships two product surfaces relevant here:

- **Trainer dashboard** — `/dashboard-basic`, `/dashboard-essential`, `/dashboard` (Pro).
- **Client area** — `/client-dashboard` (full client) and `/user-dashboard` (leaner "MyPersonal AI app").

Plans are **stacked**:

```
Trainer Pro  ⊃  Trainer Essential  ⊃  Trainer Basic
Client Pro   ⊃  Client Free
AI Plus (€1.99/mo) is an add-on on top of any Trainer plan.
```

Source of truth for the public plan list: `src/components/pricing/utils/planFeatures.ts` and `src/translations/en.ts` → `pricing.detailedFeatures.*`. Entitlements are not enforced server‑side yet — the active plan is read from the route and the `demo-user` localStorage flag.

---

# PART A — TRAINER

## 2.1 Trainer Basic (free starter — Andrea's account)

Routed to `/dashboard-basic`. Tabs in `src/components/trainer/dashboard/tabs/`.

### Sales Management (basic, no invoicing)
- **What** — Lead → client pipeline with sales entries per contact.
- **Where** — Sales / CRM tab. Backed by `SalesEntriesContext`, `ClientRosterContext` (localStorage in demo).
- **Structure** — Pipeline columns, contact drawer, sales entry rows (sessions / packages / programs).
- **Flow** — Capture lead → log sales entry → convert to client → mark terminated when churned.
- **Limits** — No invoice/receipt issuance, no Stripe checkout, no installment management.

### Personal Page
- **What** — Public trainer profile page consumed by prospects.
- **Where** — `/trainer/:id` (`src/pages/TrainerProfile.tsx`); content edited in Settings → Profile.
- **Structure** — Hero, About, Experience, Availability, Reviews tabs (`components/trainer/*Tab.tsx`).
- **Flow** — Trainer edits profile in Settings → public page renders → leads contact via `BookingForm`.
- **Limits** — No e‑commerce module exposed (sessions/packages booking gated by higher plans).

### Client Management + Client Workouts View
- **What** — 360° roster of clients with profile, metrics, history.
- **Where** — Clients tab; profile in `ClientProfile.tsx`; cards in `ClientCard.tsx`.
- **Structure** — Roster grid → client card → profile drawer (metrics, goals, sessions). The card now exposes a **Dumbbell button** next to the eye icon that opens `ClientWorkoutsDialog`.
- **Flow** — Invite client (`clientInvitationService`) → client appears in roster → trainer opens profile or Workouts dialog to inspect progress.
- **Workouts dialog** — Date presets (7d/30d/3m/All) + custom range, exercise filter, **Month → Day** nested accordions, expand/collapse all, 30 sessions/page, progression deltas (▲/▼) vs the previous occurrence of each exercise. Full spec: [`client-workouts-view.md`](./client-workouts-view.md).
- **Limits** — No program assignment from this view (Essential+).

### Messaging
- **What** — In‑app chat with clients (text + video).
- **Where** — Messages tab; `useMessages`, `useMessageNotifications`; media to `chat-media` bucket (≤10 PDFs / 20 MB).
- **Structure** — Conversation list, message thread, attachment uploader, video thumbnail generator.
- **Flow** — Open thread → type / attach → send → real‑time updates via Supabase channels.

### Calendar
- **What** — Personal availability + appointments overview.
- **Where** — Calendar tab.
- **Structure** — Month/week views, availability blocks, appointment chips.
- **Flow** — Set availability → manual events → see overlap with sessions.
- **Limits** — No Sessions booking engine (that's Essential), no Packages/Services (Pro).

### Reviews (read‑only)
- **What** — Reviews left by clients; surfaced on the public profile.
- **Where** — Reviews tab; `useTrainerReviews`.
- **Structure** — List + aggregate rating.
- **Flow** — Client submits review → appears immediately.
- **Rule** — **Trainers cannot hide or delete reviews** (transparency).

### Analytics (basic)
- **What** — KPI snapshot (active clients, recent activity, revenue summary).
- **Where** — Overview tab.
- **Limits** — No time filters, no aggregated client deep‑dive, no AI assistant (Essential+ / AI Plus).

### Google Calendar sync
- **What** — Two‑way sync of MyPersonal events with Google Calendar.
- **Where** — Settings → Integrations.
- **Flow** — Connect Google account → events mirror both ways.

---

## 2.2 Trainer Essential (everything in Basic + the below)

Routed to `/dashboard-essential`.

| Inherited from Basic |
|---|
| Sales, Personal Page, Clients (+ Workouts View), Messaging, Calendar, Reviews, Basic Analytics, Google Sync |

### Essential‑only features

#### Sessions booking
- 1:1 and group sessions, public or private, with capacity and pricing.
- Tab: Sessions; dialogs in `components/trainer/SessionDialogs.tsx`, `useGymSessions`/postponement hooks.
- Postponement flow with tokenized email links and accept/decline (`handle-session-postponement`, `respond-to-postponement` edge fns).

#### Waitlist
- Fully booked sessions expose a waitlist; promotion when a seat frees up.

#### Programs (build & assign)
- Wizard: general info + Weekly/Daily builder; routines & circuits (snapshot copy into sessions); flexible periodization (master pattern → week overrides → daily overrides with `isOverride` flag).
- Tab: Programs; `useTrainingPrograms`, `useExerciseLibraryManager`.

#### Session analytics & Program analytics
- Adherence, completion, drop‑off, AI program analysis (gated by AI Plus where applicable).

#### Exercise list (read‑only DB) + Exercise management (private DB)
- Central exercise DB with strict linking (no free text), Enum biomechanics/forceType, GIF‑first UI.
- Trainers maintain their **private** library for custom/modified/deleted exercises.

#### Cash payments + confirmation dialog
- Mark a sale as paid in cash; **Cash Confirmation Dialog** (confirm / reject / no‑show).

#### Payment installments
- Split a sale across installments (manual). AI installment detection available via AI Plus.

#### Transactions tab
- History of cash + (later) digital sales for the trainer.

#### Business analytics (mid)
- Revenue and sales summary; richer KPIs than Basic but without Pro's time filters and aggregated client view.

---

## 2.3 Trainer Pro (everything in Essential + the below)

Routed to `/dashboard` (force‑set to English by `LanguageContext`).

| Inherited from Essential (which inherits Basic) |
|---|
| All Essential features above + all Basic features |

### Pro‑only features

#### Packages
- Session‑based **and** duration‑based packages; visibility toggle (`is_public`); sequential program unlock; full package builder + assignment.
- Booking system fully operational (propose / confirm / complete).

#### Services
- Sell ancillary services beyond sessions/packages.

#### Full payments (Stripe e‑commerce)
- Direct e‑commerce checkout via `create-checkout` / `customer-portal` edge functions. Replaces "pending request" flow used in Essential.

#### Pro installments
- Installment plans tied to invoices and Stripe schedules.

#### Invoicing
- Full **draft → sent** invoice workflow, receipts column on payment history, sync between trainer and client invoice views.

#### Transactions (extended)
- Stripe + cash + installments unified; refunds and receipt management.

#### Business dashboard
- Pro‑level Overview with deeper KPIs and quick links.

#### Advanced analytics
- Dynamic **time filters** on revenue.
- **All Clients aggregated view** (aggregated stats only, no individual leak).
- **Context‑aware AI assistant** for client and trainer analytics (chat anchored to current view).
- Last‑month KPI with dynamic % comparison; revenue comparison vs previous period.

#### Priority support
- Faster human support SLA.

---

## 2.4 Trainer AI — AI Plus add‑on (€1.99/mo)

Add‑on on top of any Trainer plan. Activated via `TrainerAIUpgradeDialog` (mock activation in demo). Hook: `useTrainerAISubscription`.

| Capability | Notes |
|---|---|
| AI Business Insights | Performance, retention, goal metrics on the analytics surface. |
| AI Chat Assistant | Ask questions about the trainer's business; context‑aware on Pro analytics. |
| AI Client Analytics | Deep dive on a single client's progress and trends. |
| Smart Recommendations | Personalized training/engagement suggestions. |
| AI Installment Detection | Suggests installment splits on transactions (`detect-installment` edge fn). |
| AI Program Assistant | Chatbot + Word/PDF upload for program creation (`analyze-program-document`, `analyze-training-program`). |
| AI Workout Analysis | Inline contextual results beneath a workout log (`analyze-workout`). |

All AI calls route through Lovable AI Gateway / OpenAI edge functions (`openai-chat`, `openai-realtime`, `openai-trainer-chat`).

---

## 2.5 Trainer feature matrix

| Feature | Basic | Essential | Pro | AI Plus |
|---|:-:|:-:|:-:|:-:|
| Sales (basic) | ✓ | ✓ | ✓ | — |
| Personal Page | ✓ | ✓ | ✓ | — |
| Clients + Workouts View | ✓ | ✓ | ✓ | — |
| Messaging (text + video) | ✓ | ✓ | ✓ | — |
| Calendar | ✓ | ✓ | ✓ | — |
| Reviews (read‑only) | ✓ | ✓ | ✓ | — |
| Basic Analytics | ✓ | ✓ | ✓ | — |
| Google Calendar Sync | ✓ | ✓ | ✓ | — |
| Sessions + Waitlist | — | ✓ | ✓ | — |
| Programs + Exercise DB | — | ✓ | ✓ | — |
| Session/Program Analytics | — | ✓ | ✓ | — |
| Cash payments + installments | — | ✓ | ✓ | — |
| Transactions | — | ✓ | ✓ | — |
| Packages | — | — | ✓ | — |
| Services | — | — | ✓ | — |
| Full payments (Stripe) | — | — | ✓ | — |
| Invoicing (draft → sent) | — | — | ✓ | — |
| Advanced analytics + time filters | — | — | ✓ | — |
| Aggregated clients view | — | — | ✓ | — |
| Context‑aware AI on analytics | — | — | ✓ | Required |
| AI Business Insights / Chat / Recs | — | — | — | ✓ |
| AI Program Assistant + doc upload | — | — | — | ✓ |
| AI Installment Detection | — | — | — | ✓ |
| Priority support | — | — | ✓ | — |

---

# PART B — CLIENT

Two consumer surfaces:
- `/client-dashboard` — full client experience.
- `/user-dashboard` — leaner "MyPersonal AI app" promoted by `/user` landing.

In demo, both flows share a `DEMO_CLIENT_ID` row, so per‑user isolation is not yet enforced.

## 3.1 Client Free

### Overview / Progress
- Fitness progress, body measurements (WHtR / WHR with status badges), recent activity.
- `useUserProfile`, `useCheckInAnalytics`, body measurements components.

### Training Program & Workout Log
- Read program assigned by trainer (exercises, schedule, periodization, routines, circuits).
- Log workouts (sets / reps / notes), mark complete; `useWorkoutLogs`, `useExerciseTracking`.
- Activity logging supports cardio (indoor/outdoor), MET‑based calorie calc, goal linkage.

### Sessions
- Upcoming + past sessions; postponement accept/decline (in‑app or tokenized email link via `respond-to-postponement`).
- Client‑side **session proposal** (bidirectional date negotiation).
- Past sessions show recap and disable ratings.

### Packages
- View owned packages, sessions remaining, validity.
- Purchase / renew (cash, digital, installments). Browse only `is_public` packages. View full history of past memberships.

### Trainers
- View connected trainer(s) and their public profile (trainer marketing block stripped).

### Messaging
- Chat with trainer (text + video + attachments to `chat-media`).

### Check‑ins
- HubFit‑inspired weight / mood / photos / notes.
- Distinguishes Personal goals vs Trainer goals.
- Standalone modal entry (flag icon) with Micro/Macro analytics.

### Settings & Health Documents
- Profile (height, gender, DOB).
- Upload up to **10 PDFs / 20 MB** to `health-documents` bucket.
- Subscription management (`useUserSubscription`).

### Calendar
- `My Calendar` tab with react‑day‑picker; side‑by‑side daily view.
- Distinguishes **Training Day** (local entry) vs **Trainer Session** (requires request).

## 3.2 Client Pro

Same surface as Free, with elevated capability gates:

| Capability | Free | Pro |
|---|:-:|:-:|
| View program & log workouts | ✓ | ✓ |
| Sessions / Postponement | ✓ | ✓ |
| Packages purchase + history | ✓ | ✓ |
| Messaging with trainer | ✓ | ✓ |
| Check‑ins + analytics | ✓ | ✓ |
| AI assistant requests | **5 / month** | **100 / day** |
| Advanced AI insights | limited | ✓ |
| AI Form Analysis (OpenAI Vision) | — | ✓ |

Hook: `useAIAccess`, `useClientSubscription`. Demo mode is hardwired to 4/5 to showcase the near‑limit state.

## 3.3 Client AI features

All AI is gated by tier above. Surfaced where the client already works (program, log, chat).

| Feature | What it does | Where | Notes |
|---|---|---|---|
| AI Workout Coach (contextual chat) | FAB during a workout; chat anchored to the current session. | Workout log | Personalized advice via system prompt with workout context. |
| Multi‑modal I/O | Inputs: text / photo / video. Outputs: text / image / YouTube embed. | Chat | `openai-chat` edge fn. |
| AI Visual Demos | Generates exercise setup images on demand. | Exercise detail | Gemini flash image generation. |
| AI Form Analysis | Upload a video/photo of a rep → technique feedback. | Workout log | OpenAI Vision. **Pro only**. |
| AI Workout Analysis (inline) | Post‑workout analysis rendered inline beneath the log. | Workout log | `analyze-workout` edge fn. |
| Realtime Voice Assistant | Voice chat with the AI coach. | Chat | `openai-realtime` + `useRealtimeVoice`. |
| Program Progress Analysis | AI analyses overall program adherence/progression. | Program view | Limited on Free, full on Pro. |

## 3.4 Client matrix

| Area | Free | Pro |
|---|:-:|:-:|
| Overview / progress | ✓ | ✓ |
| Program view + workout log | ✓ | ✓ |
| Sessions + postponement | ✓ | ✓ |
| Packages (browse, buy, history) | ✓ | ✓ |
| Trainers view | ✓ | ✓ |
| Messaging (text + video) | ✓ | ✓ |
| Check‑ins + analytics | ✓ | ✓ |
| Health documents (10 × 20 MB) | ✓ | ✓ |
| Calendar (Training Day + Trainer Session) | ✓ | ✓ |
| AI requests | 5/mo | 100/day |
| AI Workout Coach contextual chat | limited | ✓ |
| AI Visual Demos | limited | ✓ |
| AI Workout Analysis inline | limited | ✓ |
| AI Form Analysis (OpenAI Vision) | — | ✓ |
| Realtime Voice Assistant | limited | ✓ |
| Advanced AI insights | limited | ✓ |

---

## 4. Demo account quick reference

- **Trainer demo**: `andrea.mypersonal.fit@gmail.com` — Trainer **Basic**.
- Hardcoded demo UUID: `00000000-0000-0000-0000-000000000002`.
- Preserve `demo-user` flag in `localStorage` — RLS and demo logic depend on it.
- "Upgrade to Essential" / "Go Pro" buttons on the public pricing page open a **Coming Soon** popup (`src/components/pricing/PlanCard.tsx`) that redirects users back to start with Basic.

## 5. Related docs

- [`client-workouts-view.md`](./client-workouts-view.md) — Workouts dialog detailed spec.
- [`REQUIREMENTS.md`](./REQUIREMENTS.md) — Trainer dashboard requirements.
- [`TECHNICAL.md`](./TECHNICAL.md) — Trainer dashboard technical notes.
- [`../client-area/REQUIREMENTS.md`](../client-area/REQUIREMENTS.md) — Client area requirements.
- [`../client-area/TECHNICAL.md`](../client-area/TECHNICAL.md) — Client area technical notes.
- [`../pricing-plans/REQUIREMENTS.md`](../pricing-plans/REQUIREMENTS.md) — Plan pricing & positioning.
- [`../ai/TECHNICAL.md`](../ai/TECHNICAL.md) — AI gateway, models, edge functions.
- [`../billing/TECHNICAL.md`](../billing/TECHNICAL.md) — Subscriptions, Stripe, AI usage limits.
