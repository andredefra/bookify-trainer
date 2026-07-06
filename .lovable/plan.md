## Problem
On **Find Trainers** (client dashboard), clicking "View Profile" on a marketplace card navigates to `/trainer/:id` — the public marketing page (screenshot 3, "MyPersonal.fit" header, "Failed to load trainer profile"). In **My Trainers** the same action opens the in-dashboard `TrainerProfileDialog` modal. Both should behave the same.

## Fix
Route Marketplace "View Profile" through the same `TrainerProfileDialog` used by `TrainersGrid`, instead of `navigate("/trainer/...")`.

### Changes

**`src/components/client/trainers/MarketplaceTrainerCard.tsx`**
- Add optional prop `onViewProfile?: (id: number, name: string) => void`.
- Replace `handleViewProfile` body with: if `onViewProfile` is provided, call `onViewProfile(trainerId, trainer.name)`; otherwise keep current `navigate` as fallback.
- Drop the now-unneeded `useNavigate` when a handler is passed (keep import for the fallback).

**`src/components/client/trainers/TrainerList.tsx`**
- Add optional `onViewProfile?: (id: number, name: string) => void` prop and forward it to each `MarketplaceTrainerCard`.

**`src/components/client/trainers/TrainerMarketplace.tsx`**
- Add local state `selectedProfile: {id, name} | null` and `showProfileDialog`.
- Add `handleViewProfile(id, name)` that sets state and opens the dialog.
- Pass it into `<TrainerList onViewProfile={handleViewProfile} />`.
- Render `<TrainerProfileDialog open={showProfileDialog} onOpenChange={setShowProfileDialog} trainerId={selectedProfile.id} trainerName={selectedProfile.name} onBookSession={handleBookSession} onSendMessage={…navigate to messages tab…} />` — mirrors `TrainersGrid`.

### Out of scope
- No changes to the public `/trainer/:id` marketing page.
- No changes to My Trainers flow (already correct).
- No changes to "Book Session" behavior on the card.

## Result
"View Profile" on Find Trainers opens the same in-dashboard trainer profile dialog as My Trainers — no more redirect to the marketing page.
