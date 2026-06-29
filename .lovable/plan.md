## Goal
Show AI Plus in Settings → AI Features as **"Coming Soon"** instead of an active/purchasable subscription. Keep the section visible as a teaser.

## Change
Edit `src/components/trainer/dashboard/tabs/settings/sections/AIFeaturesSection.tsx`:

- Force the view into a single "coming soon" state regardless of `hasAIAccess` (skip Active and Upgrade branches).
- Replace top-right badge with an amber/purple **"Coming Soon"** badge (Sparkles icon).
- Replace the price/active card with a promotional card:
  - Title: **"AI Plus — Coming Soon"**
  - Subtitle: "Stiamo preparando funzionalità AI potenti per i trainer. Resta sintonizzato."
  - Keep the €1.99/month hint as "Soon from €1.99/month".
- Render the features list as a preview (muted, no green checks, "Coming soon" tag on each).
- Replace the CTA button with a disabled **"Coming Soon"** button (no dialog).
- Remove the `Manage Subscription` and Upgrade dialog usage.

No other files affected. Trainer plan logic untouched — only this settings panel is changed.
