Change the bottom CTA button inside the AI features popup (`AIFeatureDialog.tsx`) from "Learn More" to "Coming Soon" and disable it, in both AI Plan (client) and AI Plus (trainer) variants.

## Changes

1. **`src/components/pricing/AIFeatureDialog.tsx`**
   - Replace the bottom `<Button>` label `t('aiPricing.client.cta' | 'aiPricing.trainer.cta')` with a new translation key `t('aiPricing.comingSoon')`.
   - Add `disabled` to the button and `cursor-not-allowed opacity-70` styling so it visually reads as inactive (keeps the amber/violet color identity).
   - Keep the outer card "Learn More" button on the pricing section untouched — that button opens the popup and should still say "Learn More".

2. **`src/translations/en.ts`**
   - Add `aiPricing.comingSoon: "Coming Soon"`.

3. **`src/translations/it.ts`**
   - Add `aiPricing.comingSoon: "Prossimamente"`.

No other UI, business logic, or pricing copy is changed.