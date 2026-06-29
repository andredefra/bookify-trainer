## Goal
Remove the "AI Assistant" tab inside Client Management for the Basic plan (Andrea's mockup), since AI is not part of the launch. Keep it visible for Essential/Pro.

## Change
In `src/components/trainer/dashboard/tabs/ClientsTab.tsx`:
- Import `useTrainerPlan` from `@/context/TrainerPlanContext`.
- Compute `const plan = useTrainerPlan(); const isBasic = plan === "basic";`.
- Conditionally render the `TabsTrigger` for `ai-assistant` and its corresponding `TabsContent` only when `!isBasic`.
- Safety: if `activeTab === "ai-assistant"` and `isBasic`, fall back to `"clients"`.

No other files affected — Essential/Pro behavior unchanged.
