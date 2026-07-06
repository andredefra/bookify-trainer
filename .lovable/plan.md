## Goal
In the client Trainers section, the "My Trainers" tab must show only the trainers of whom the user is actually a client (Sarah Johnson). The "Followed" tab must instead show every trainer the user follows (Sarah + Alex Thompson).

## Changes

### 1. `src/components/client/tabs/TrainersTab.tsx`
- Rename the current `myTrainers` array to `allTrainers` (still contains Sarah + Alex, used as the master trainer catalog for lookups).
- Add a new `myTrainers` array derived from `allTrainers` containing only Sarah Johnson (id 1) — she is the trainer the client is actually a client of.
- Seed `useFollowedTrainers` with `allTrainers` so both trainers appear as followed by default (matches current behavior for Alex + Sarah).
- Update the `useEffect` that initializes `followedTrainers` in localStorage to use `allTrainers` ids (`[1, 2]`) instead of the (now smaller) `myTrainers`.
- Pass both arrays to `TrainersTabContent`: `myTrainers={myTrainers}` (Sarah only) and a new `allTrainers={allTrainers}` prop for the Followed section pool.

### 2. `src/components/client/trainers/TrainersTabContent.tsx`
- Add optional `allTrainers?: Trainer[]` prop (defaults to `myTrainers` when omitted, for backwards safety).
- In the `"followed"` case, pass `allTrainers={allTrainers ?? myTrainers}` to `FollowedTrainersSection` so both Sarah and Alex are resolvable and rendered when followed.
- Keep the `"trainers"` case unchanged — it continues to use `myTrainers` (now Sarah only), so the "My Trainers" grid shows just her.

## Out of scope
- No changes to `useFollowedTrainers`, `FollowedTrainersSection`, `TrainersGrid`, marketplace, or gym-filter logic.
- No DB/backend changes — mock data only, consistent with the rest of `ClientDashboardBasic`.
- No changes to payment history mock (already scoped to Sarah).

## Result
- "My Trainers" tab: 1 card (Sarah Johnson).
- "Followed" tab: 2 cards (Sarah Johnson + Alex Thompson), each unfollowable via the existing toggle.
