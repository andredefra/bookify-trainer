Move the Preferences tab content into the Account section, merging it under the existing "Fitness Preferences" card. Remove the separate Preferences tab from the settings sidebar.

## Changes

**1. `src/components/client/tabs/settings/AccountSection.tsx`**
- Inside the existing "Fitness Preferences" card (lines 429-488), add above the Experience Level / Preferred Workout Time grid:
  - A "Fitness Goals" subsection — 6 checkboxes (Weight loss, Muscle tone, Flexibility, Cardiovascular health, Strength building, Athletic performance) wired to local state initialized from a new `goals` prop.
  - A "Language & Region" subsection — Language select (English/Spanish/French/German) and Measurement Units select (Metric / Imperial).
- A single "Save Preferences" button at the bottom of the card now saves goals, language, units, experience level, and preferred workout time together (goals/language/units stored in local state + toast for now, matching current PreferencesSection behavior).
- Add `goals?: string[]` to `AccountSectionProps`.

**2. `src/components/client/tabs/settings/SettingsTabContent.tsx`**
- Remove the "Preferences" sidebar button and its content branch.
- Remove the `PreferencesSection` import.
- Pass `goals` to `<AccountSection />`.
- Remove the "preferences" entries from the header title/description switch.

**3. `src/components/client/tabs/settings/PreferencesSection.tsx`**
- Delete the file (no longer referenced).

No changes to trainer/gym/studio settings — this only affects the client settings UI.
