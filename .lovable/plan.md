## Problem

The earlier change updated the wrong files (`MessageTemplateDialog.tsx` and `MessageRuleDialog.tsx`) — those are unused. The actual Templates/Rules UI lives in `src/components/common/MessageAutomationTab.tsx`, so the basic-plan user still sees Package Expiring / Expired / Session Reminder / Program Ending in both the Template Type and Rule Trigger dropdowns.

## Fix

Apply the same basic-plan gating directly in `MessageAutomationTab.tsx`.

### `src/components/common/MessageAutomationTab.tsx`
1. Import `useTrainerPlan` from `@/context/TrainerPlanContext` and compute `const isBasic = useTrainerPlan() === 'basic'`.
2. Adjust initial state when `isBasic`:
   - `newTemplate.template_type` default → `'calendar_invitation_reminder'`
   - `newRule.trigger_type` default → `'calendar_invitation'`
   - `newRule.target_type` default → `'sessions'`
   (and the same in the post-create reset blocks)
3. Template Type `<SelectContent>` (lines 194–201): wrap `package_expiring`, `package_expired`, `session_reminder`, `program_ending` in `{!isBasic && ...}`, and add `<SelectItem value="calendar_invitation_reminder">Calendar Invitation Reminder</SelectItem>` (use existing `t('messageAutomation.types.calendarInvitationReminder')` with a string fallback).
4. Rule Trigger `<SelectContent>` (lines 314–319): wrap `package_expiry`, `session_upcoming`, `program_ending` in `{!isBasic && ...}`, and add `<SelectItem value="calendar_invitation">Calendar Invitation Reminder</SelectItem>`.

### Translations
Add `calendarInvitationReminder` keys under `messageAutomation.types` and `messageAutomation.triggers` in `src/translations/en.ts` (and any other locale files that mirror it) so the new labels render via `t()`. If a locale file isn't present, fall back to inline strings.

### Cleanup
Revert (or leave inert) the earlier basic-plan logic added to `MessageTemplateDialog.tsx` and `MessageRuleDialog.tsx` is not necessary since those components aren't mounted, but for tidiness keep them in sync (no code path renders them, so no user impact).

## Out of scope
No changes to data model, `useMessageAutomation` hook types (already include the new types), or backend.
