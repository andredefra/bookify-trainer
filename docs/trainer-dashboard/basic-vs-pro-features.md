# Trainer Plans — Basic vs Pro Feature Reference

This document is the canonical, detailed reference of every feature exposed by
the trainer side of MyPersonal, broken down per plan tier. It covers:

1. The **Basic plan** — the plan the demo account
   `andrea.mypersonal.fit@gmail.com` is on.
2. The **Pro plan** — the full business tier (inherits Essential + Basic).

Essential is documented as part of Pro (since Pro = Basic + Essential + Pro‑only).
Source of truth for the feature list: `src/components/pricing/utils/planFeatures.ts`
and the strings under `pricing.detailedFeatures.*` in `src/translations/en.ts`
and `src/translations/it.ts`.

> Related docs:
> - `docs/trainer-dashboard/REQUIREMENTS.md` — functional requirements
> - `docs/trainer-dashboard/TECHNICAL.md` — technical reference
> - `docs/trainer-dashboard/client-workouts-view.md` — Workouts modal (Basic feature)
> - `docs/pricing-plans/REQUIREMENTS.md` — pricing and plans

---

## 1. Overview

| Plan       | Positioning                                   | Stacks on top of |
| ---------- | --------------------------------------------- | ---------------- |
| Basic      | Free starter — trainer presence + CRM         | —                |
| Essential  | Paid mid — operations & client delivery       | Basic            |
| Pro        | Full business — payments, invoicing, growth   | Essential        |

**Add‑ons (apply to any plan):**

| Add‑on   | Price       | What it unlocks                                                   |
| -------- | ----------- | ----------------------------------------------------------------- |
| AI Plus  | €1.99 / mo  | Advanced AI features (form analysis, advanced insights, etc.)     |
| Studio   | €89 / mo    | Multi‑trainer Studio operator dashboard (service / PT entity)     |

**Plan‑switching UX.** On the public landing page, the *Upgrade to Essential*
and *Go Pro* buttons currently open a "Coming Soon" popup that funnels the user
back into the Basic flow (`src/components/pricing/PlanCard.tsx`).

---

## 2. Basic plan — full feature catalog

Everything documented in this section is available to the demo account
`andrea.mypersonal.fit@gmail.com`. All features live in the trainer dashboard
under `src/components/trainer/dashboard/` and are mounted on `/dashboard`.

### 2.1 Sales Management (CRM)

- **What it is.** Integrated CRM with a visual sales pipeline. Tracks leads from
  first contact to conversion, supports follow‑up reminders, surfaces
  conversion reporting, and keeps an activity timeline per potential client.
- **Where it lives.** `Sales` tab → `tabs/SalesTab.tsx` (+ `tabs/sales/`).
- **Structure.**
  - Pipeline columns (lead → contacted → qualified → won/lost).
  - Lead detail drawer with timeline, notes, contact info.
  - KPI strip on top (new leads, conversion rate, expected revenue).
- **Flow.**
  1. Lead enters from public profile / manual add.
  2. Trainer drags through pipeline stages.
  3. Activities, notes, reminders are logged on the lead card.
  4. Conversion marks lead as client (creates client record).
- **Notes / limits.** Basic has the pipeline and reporting; the **Business
  Dashboard** (Kanban scoring, automated sales sequences, advanced analytics)
  is Pro‑only.

### 2.2 Personal Trainer Page

- **What it is.** A public trainer profile at a custom URL
  (`personal.ai/<yourname>`), with bio, photos, certifications, before/after
  results, integrated reviews, social links and local SEO.
- **Where it lives.** Public route + `Settings` → Public profile section.
- **Structure.** Hero, About, Certifications, Results gallery, Reviews carousel,
  Contact / Book CTA, Social proof footer.
- **Flow.**
  1. Trainer fills profile fields in Settings.
  2. Public URL is generated.
  3. Visitors land, browse, and use the contact CTA which feeds the CRM.
- **Notes / limits.** Booking via this page (real session sales) requires
  Essential (sessions) or Pro (packages).

### 2.3 Client Management

- **What it is.** Complete client database with rich profiles (goals, medical
  limitations, preferences), unlimited clients, private trainer‑only notes,
  emergency contact info, plus a quick view of every workout the client has
  logged.
- **Where it lives.** `Clients` tab → `tabs/ClientsTab.tsx` and
  `tabs/clients/*`.
- **Structure.**
  - Client list with search / segment chips.
  - Each `ClientCard` exposes three actions:
    - **View** (eye icon) — full profile drawer.
    - **Workouts** (dumbbell icon) — opens
      `ClientWorkoutsDialog.tsx` (see §2.3.1).
    - **Message** — opens the chat (uses Messaging system).
  - Profile drawer tabs: Info, Goals, Medical, Notes, History.
- **Flow.**
  1. Trainer adds client (manual or via lead conversion).
  2. Fills goals + medical profile (height/gender etc. — DB fields documented
     in memory `user-profiles-height-gender`).
  3. Opens Workouts dialog to monitor adherence to the plan they sent.
- **Notes / limits.** Reviews **cannot be hidden or deleted** by the trainer
  (transparency rule). Workout view is read‑only.

#### 2.3.1 Client Workouts View (Dumbbell button)

Detailed in `docs/trainer-dashboard/client-workouts-view.md`. Summary:

- Two‑level collapsible accordion: **Month → Day**.
- Per‑set delta vs the previous time the same exercise was performed
  (▲ green / ▼ red / = grey).
- Per‑exercise summary line: "+X kg avg, +Y reps avg vs last time".
- Toolbar: date presets (7 d / 30 d / 3 m / All), custom From–To range,
  exercise filter, Expand all / Collapse all, pagination (30 sessions / page).
- Default state: latest month expanded, most recent session expanded.
- Data source: `src/data/training/demoWorkoutLogs.ts` (demo) or live
  `workout_logs` table.

### 2.4 Client Messaging System

- **What it is.** Real‑time trainer ↔ client chat with photo & video sharing
  (for form checking), automatic session‑reminder messages, push notifications.
  **Unlimited** messaging for all clients.
- **Where it lives.** `Messages` tab → `tabs/MessagesTab.tsx`
  (+ `tabs/messages/`). Backed by the messaging system documented in
  memory `features/messaging/full-system-with-video`.
- **Structure.** Conversation list (left), thread view (right), media uploader,
  video thumbnail generator, attachment preview.
- **Flow.**
  1. Trainer or client opens a thread.
  2. Messages, photos, videos, voice notes are exchanged in real time.
  3. Media is stored in the `chat-media` bucket (≤10 MB each, see project
     memory).
- **Notes / limits.** AI form analysis on uploaded videos is a Pro / AI Plus
  feature (OpenAI Vision).

### 2.5 Basic Calendar

- **What it is.** Integrated calendar with event management, availability
  management and basic scheduling.
- **Where it lives.** `Calendar` tab → `tabs/CalendarTab.tsx`.
- **Structure.** Month / week / day views, availability blocks, event detail
  popovers.
- **Flow.**
  1. Trainer defines weekly availability.
  2. Manual events can be created (consult, meetings).
  3. Conflicts are surfaced visually.
- **Notes / limits.** Full session booking flows (waitlist, postpone, group
  sessions) are Essential.

### 2.6 Reviews Management

- **What it is.** Collect reviews, display them on the trainer page, respond,
  monitor reputation, analyze feedback.
- **Where it lives.** `Reviews` tab → `tabs/ReviewsTab.tsx`
  (+ `tabs/reviews/`).
- **Structure.** Review list with rating filters, response composer, KPI
  strip (avg rating, response rate, sentiment).
- **Flow.**
  1. Client leaves review post‑session / post‑package.
  2. Trainer replies publicly.
  3. Reputation metrics roll up to Analytics.
- **Notes / limits.** **Reviews cannot be hidden or deleted** (project‑wide
  transparency rule).

### 2.7 Basic Analytics

- **What it is.** Essential performance metrics, client progress tracking,
  basic session statistics, simple reporting dashboard.
- **Where it lives.** `Analytics` tab → `tabs/AnalyticsTab.tsx`
  (+ `tabs/analytics/`).
- **Structure.** KPI cards (active clients, new clients this period, retention,
  reviews avg), simple time‑series charts.
- **Flow.** Trainer selects period filter → cards/charts refresh.
- **Notes / limits.** Advanced segmentation, LTV, seasonality, benchmarking,
  context‑aware AI assistant on analytics are **Pro‑only** (see §3.10).

### 2.8 Google Calendar Integration

- **What it is.** Bidirectional sync with Google Calendar — schedule conflicts
  surfaced, busy slots auto‑blocked, Google reminders mirrored, unified agenda
  view.
- **Where it lives.** `Settings` → Integrations.
- **Flow.** Trainer authenticates with Google → calendars are linked → events
  flow both ways.

---

## 3. Pro plan — full feature catalog

Pro inherits everything from Basic (§2) and Essential (§3.1–3.5). Pro‑specific
features start at §3.6.

### Quick recap of inherited tiers

**Everything in Basic.** CRM, Personal Page, Client Management (+ Workouts
view), Messaging, Calendar, Reviews, Basic Analytics, Google Calendar.

**Everything in Essential.** Sessions, Waitlist, Programs, Session & Program
Analytics, Exercise List + Management, Cash Payments, Payment Installments.

---

### 3.1 Sessions Management (Essential)

- **What it is.** Create individual and group sessions, dynamic calendar with
  real‑time availability, direct client booking, flexible cancellation,
  postponement with automatic notifications.
- **Where it lives.** `Sessions` tab → `tabs/SessionsTab.tsx`
  (+ `tabs/sessions/`).
- **Structure.** Session creator (1:1 / group), availability matrix, booking
  log, cancellation policy editor, postponement queue.
- **Flow.**
  1. Trainer defines session templates and slots.
  2. Clients book from the public page or app.
  3. Cancellations / postponements trigger automated notifications.
  4. Past sessions show a recap (per memory `past-sessions-recap`) and disable
     rating after the window.
- **Related features.** Client‑side session proposal (bidirectional date
  negotiation), invited sessions payment flow for Pro trainers.

### 3.2 Waitlist Management (Essential)

- **What it is.** Auto‑fill released slots, prioritize by client history,
  notify immediately, manage confirmation deadlines, analyze released/occupied
  spots.
- **Where it lives.** `Sessions` tab → Waitlist drawer per fully‑booked
  session.
- **Flow.** Slot frees → next in line is notified → confirmation window →
  promote or skip → re‑open if expired.

### 3.3 Custom Training Programs (Essential)

- **What it is.** Drag‑and‑drop workout builder, exercise library with
  demonstration GIFs, periodized + progressive programming, per‑client
  assignment, adherence & completion tracking.
- **Where it lives.** `Programs` tab → `tabs/ProgramsTab.tsx`
  (+ `tabs/programs/`, `tabs/routines/`).
- **Structure.**
  - **2‑step wizard**: general info → Weekly/Daily builder.
  - **Routines & Circuits** — exercise clusters and rounds/rest groups.
  - **Flexible periodization** — master pattern + week overrides + daily
    overrides (`isOverride` flag).
  - **Routine snapshot logic** — routines are copied as snapshots into
    sessions so later edits don't mutate history.
  - **Sequential packages** — programs unlock sequentially in packages.
  - **Manual session editing** — trainers can edit sessions in Manage Program.
- **Flow.**
  1. Trainer creates / picks a template.
  2. Builds weeks → days → routines → exercises (strict link to central
     exercise DB).
  3. Assigns to client(s) — snapshot is copied per client.
  4. Adherence is tracked from client workout logs and surfaced in Programs
     Analytics + Client Workouts view.

### 3.4 Exercise List & Exercise Management (Essential)

- **What it is.** Extensive exercise database (with biomechanics, force type,
  mechanics enums, GIF‑first UI) plus the ability to create/modify private
  exercises, organize categories, add notes/videos, manage variations.
- **Where it lives.** Exercise library shared inside Programs and Client
  personal library (read‑only trainer DB + editable private DB).
- **Notes.** Exercises **strictly link to the central DB** — no free text.

### 3.5 Cash Payments & Payment Installments (Essential)

- **Cash Payments.** Accept and track cash with a manual confirmation dialog
  (Received / Rejected / No‑show), receipt management, payment history,
  offline flexibility for in‑person sessions.
- **Payment Installments.** Split large payments, due‑date tracking,
  reminders, installment progress monitoring, **AI‑powered installment
  detection** that suggests installment structure from a transaction.
- **Where they live.** `Sales` and `Programs` checkout flows; cash
  confirmation dialog is shared. Essential plans get **cash + installments
  only**; Stripe e‑commerce checkout is Pro.

### 3.6 Package Management (Pro)

- **What it is.** Build packages of sessions or durations, set flexible
  pricing and validity, assign to clients, track usage.
- **Where it lives.** `Packages` tab → `tabs/PackagesTab.tsx`
  (+ `tabs/packages/`).
- **Structure.**
  - Package builder (sessions count or duration, price, validity, visibility).
  - **`is_public` toggle** controls whether clients can browse the package.
  - Integrated payments inside Manage Package.
  - History detail view for past memberships on client side.
- **Flow.**
  1. Trainer creates package and toggles `is_public`.
  2. Client browses public packages and purchases (e‑commerce checkout, see
     §3.8).
  3. Usage decremented per booked session; analytics rolled up.

### 3.7 Additional Services (Pro)

- **What it is.** Custom services beyond training (nutrition consult, fitness
  assessment, specialty offerings), with pricing and booking.
- **Where it lives.** `Services` tab → `tabs/ServicesTab.tsx`
  (+ `tabs/services/`).

### 3.8 Digital & Cash Payments (Pro)

- **What it is.** Full Stripe integration: pre‑authorization before sessions,
  automatic post‑session billing, cash tracking, no‑show protection with
  customizable policies. Direct e‑commerce checkout replaces the pending
  request flow used by Essential.
- **Essential vs Pro distinction.** Essential = cash + manual confirmation.
  Pro = full Stripe + invoice + receipts.
- **Where it lives.** Checkout flows across Sales / Packages / Programs;
  Stripe edge functions (`create-checkout`, `customer-portal`,
  `check-subscription`).

### 3.9 Pay in 3 Installments / Electronic Invoicing / Transactions (Pro)

- **Pay in 3.** Automatic installment scheduling, reminders, partial payment
  tracking, debt recovery hooks, collection reports.
- **Electronic Invoicing.** Full invoice workflow (draft → sent), tax
  compliance, customizable templates, digital receipts. Receipts column for
  invoice/refund requests in Payment History.
- **Transactions Tab.** `Transactions` tab → `tabs/TransactionsTab.tsx`
  (+ `tabs/transactions/`). Complete financial tracking, reconciliation,
  revenue reporting, expense management, P&L view, AI‑suggested installment
  detection per transaction.

### 3.10 Business Dashboard & Advanced Analytics (Pro)

- **Business Dashboard.** Kanban sales pipeline (richer than Basic CRM), lead
  scoring & qualification, automated sales sequences, conversion analytics,
  sales performance, growth metrics.
- **Advanced Analytics.** Detailed performance dashboard, growth metrics
  (new clients, retention, **LTV**), seasonality / trend analysis, automatic
  financial reports, **industry benchmarking**, data export.
- **Extras.**
  - **Time filters** for revenue analytics (dynamic comparison vs previous
    period).
  - **Sales last‑month KPI** with dynamic % change.
  - **All‑clients aggregated view** that hides per‑individual data.
  - **Context‑aware AI Assistant** on analytics — consults a system prompt
    seeded with the current client/trainer context (memory
    `context-aware-ai-assistant`).
  - **Program Sales Analytics** is available on Essential **and** Pro.
- **Where it lives.** `Analytics` tab → `tabs/AnalyticsTab.tsx`
  (+ `tabs/analytics/`), plus dashboards inside `tabs/sales/` and
  `tabs/transactions/`.

### 3.11 Priority Support (Pro)

- 24‑hour response SLA, dedicated channel, specialized technical assistance,
  exclusive training webinars, monthly business‑strategy consultation.

---

## 4. Cross‑plan feature matrix

Legend: ✓ included · — not included · ➕ add‑on · ◐ partial

| Feature                                  | Basic | Essential | Pro |
| ---------------------------------------- | :---: | :-------: | :-: |
| Sales Management (CRM)                   |   ✓   |     ✓     |  ✓  |
| Personal Trainer Page                    |   ✓   |     ✓     |  ✓  |
| Client Management                        |   ✓   |     ✓     |  ✓  |
| Client Workouts View (Dumbbell button)   |   ✓   |     ✓     |  ✓  |
| Messaging (text + media)                 |   ✓   |     ✓     |  ✓  |
| Basic Calendar                           |   ✓   |     ✓     |  ✓  |
| Reviews Management                       |   ✓   |     ✓     |  ✓  |
| Basic Analytics                          |   ✓   |     ✓     |  ✓  |
| Google Calendar Integration              |   ✓   |     ✓     |  ✓  |
| Sessions Management                      |   —   |     ✓     |  ✓  |
| Waitlist                                 |   —   |     ✓     |  ✓  |
| Custom Training Programs                 |   —   |     ✓     |  ✓  |
| Session Analytics                        |   —   |     ✓     |  ✓  |
| Program Analytics                        |   —   |     ✓     |  ✓  |
| Exercise List / Management               |   —   |     ✓     |  ✓  |
| Cash Payments + Confirmation             |   —   |     ✓     |  ✓  |
| Payment Installments                     |   —   |     ✓     |  ✓  |
| Program Sales Analytics                  |   —   |     ✓     |  ✓  |
| Package Management                       |   —   |     —     |  ✓  |
| Additional Services                      |   —   |     —     |  ✓  |
| Stripe Digital Payments (e‑commerce)     |   —   |     —     |  ✓  |
| Pay in 3 Installments (Pro automation)   |   —   |     —     |  ✓  |
| Electronic Invoicing (draft → sent)      |   —   |     —     |  ✓  |
| Transactions Tab                         |   —   |     —     |  ✓  |
| Business Dashboard                       |   —   |     —     |  ✓  |
| Advanced Analytics (LTV, benchmarks)     |   —   |     —     |  ✓  |
| Context‑aware AI on Analytics            |   —   |     —     |  ✓  |
| Priority Support                         |   —   |     —     |  ✓  |
| AI Plus features (form analysis, etc.)   |   ➕   |     ➕     |  ➕  |
| Studio operator (multi‑trainer)          |   ➕   |     ➕     |  ➕  |

---

## 5. Add‑ons

### 5.1 AI Plus — €1.99 / month

Unlocks advanced AI features on top of any plan:

- **Contextual AI Chat** during workouts (FAB).
- **Multi‑modal** input (text / photo / video) and output (text / image / YT).
- **AI‑generated visual demos** (Gemini flash image generation).
- **AI Form Analysis** (OpenAI Vision) on uploaded technique videos.
- **Personalized advice** seeded with workout context.
- **AI Program Assistant** — chatbot + Word/PDF doc upload & automation.
- **Inline Workout Analysis** rendered beneath the workout log.
- **Context‑aware AI Assistant** on analytics (also unlocked at Pro tier).
- **Client AI Plan** integration — Workout Coach, Exercise Demos, Advanced
  Insights (Pro tier unlimited; Free tier 5 requests/month).

### 5.2 Studio — €89 / month

Transforms the account into a **Studio operator** (a distinct business entity
from Gym infra — see memory `gym-studio-separation-entities`). Adds:

- Studio dashboard with trainer performance leaderboard and reviews.
- **Multi‑trainer packages & programs** — primary + assigned trainers, swap
  sessions across trainers.
- Source tracking (Direct / Gym / Studio) on revenue.
- Transactions tab filtered per trainer.
- Availability & shift management with overlap finder.
- Comprehensive clients system with aggregated stats and AI context.
- **White‑label branding** via `custom_css` (logos + colors).
- Facility type selector (PT Studio vs Fitness Center).

---

## 6. Demo account quick reference

| Field            | Value                                                |
| ---------------- | ---------------------------------------------------- |
| Email            | `andrea.mypersonal.fit@gmail.com`                    |
| Plan             | Basic                                                |
| Demo user UUID   | `00000000-0000-0000-0000-000000000002` (DB / RLS)    |
| LocalStorage     | Must preserve `demo-user` flag                       |
| Upgrade buttons  | Open "Coming Soon" dialog (`PlanCard.tsx`)           |
| Workouts modal   | `src/components/trainer/dashboard/tabs/clients/ClientWorkoutsDialog.tsx` |
| Workout mock data| `src/data/training/demoWorkoutLogs.ts`               |

---

## 7. Related docs

- `docs/trainer-dashboard/client-workouts-view.md`
- `docs/trainer-dashboard/REQUIREMENTS.md`
- `docs/trainer-dashboard/TECHNICAL.md`
- `docs/pricing-plans/REQUIREMENTS.md`
- `docs/pricing-plans/TECHNICAL.md`
- `docs/admin-marketing/` (internal staff tooling — separate module)
