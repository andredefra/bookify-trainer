# Client Workouts View — Feature Description

## Overview

**Plan:** Basic (also visible on Essential and Pro)  
**Location:** Trainer Dashboard → Clients tab → "Workouts" button on each client card

The Client Workouts View lets a personal trainer see every daily workout their client has logged — whether from an assigned training program or from free workouts — and immediately understand how the client is progressing compared to previous sessions.

---

## What it shows

A scrollable modal that lists **all logged workout sessions** for the selected client. Each session displays:

- **Date & name** — e.g. "Mon, Jun 23 · Upper Body Strength"
- **Duration** — how long the workout took
- **Exercise-by-exercise breakdown** — every set, with weight, reps, and completion status

---

## Progression tracking

For every exercise, the system automatically finds the **previous time that same exercise was performed** and compares the two sessions:

- **Per-set delta** — each set shows a badge:
  - ▲ green — improved (more weight, more reps, or both)
  - ▼ red — declined (less weight, fewer reps, or both)
  - = grey — same as last time
- **Per-exercise summary** — an average delta across all sets:
  - e.g. "+2.5 kg avg · +1 reps avg vs last time"
  - or "First time logged" when no prior history exists

This works across the **entire history**, not just the current page, so the comparison is always meaningful even when filters are active.

---

## Filters & navigation

Trainers can narrow the view with:

| Filter | Options |
|--------|---------|
| **Date preset** | Last 7 days / Last 30 days / Last 3 months / All time |
| **Custom date range** | From / To date pickers |
| **Exercise** | Dropdown of every exercise ever logged |

A "Reset" button clears all active filters instantly.

---

## Grouping & layout

Sessions are grouped hierarchically for easy scanning:

1. **Month** — collapsible section (e.g. "June 2026")
2. **Day / Session** — collapsible inside the month

- The first month and first session are expanded by default.
- "Expand all" / "Collapse all" buttons control every section at once.

---

## Pagination

Long histories are paginated (30 sessions per page). The footer shows:

- "Showing X of Y sessions"
- Previous / Next page controls

Progression comparisons still reference the **full un-paginated history**.

---

## Why it matters

Without leaving the client list, a trainer can:

- Verify the client is actually following the assigned program
- Spot stagnation or regression early
- See concrete improvement over time (weight lifted, reps completed)
- Use real data to adjust the next program phase

---

## Files involved

| File | Role |
|------|------|
| `src/components/trainer/dashboard/tabs/clients/ClientWorkoutsDialog.tsx` | Main dialog UI: filters, grouping, pagination, progression logic |
| `src/components/trainer/dashboard/tabs/clients/ClientCard.tsx` | Adds the "Workouts" button (Dumbbell icon) |
| `src/data/training/demoWorkoutLogs.ts` | Demo data spanning multiple months for demonstration |
