## Changes

### 1. Essential plan — hide Services and Packages tabs
Per earlier spec, Services and Packages are Pro-only. Currently `essential` allows both.

**`src/components/trainer/dashboard/DashboardContainer.tsx`**
- Update `PLAN_ALLOWED_TABS.essential` to remove `"services"` and `"packages"`.

**`src/components/trainer/dashboard/sidebar/SidebarNavigation.tsx`**
- Update `planExcludes.essential` to `["services", "packages"]`.

### 2. Remove Package Sales widget for Essential
Package Sales is tied to package selling (Pro only).

**`src/components/trainer/dashboard/tabs/OverviewTab.tsx`**
- Extend the hidden-widget filter so `essential` also hides `"package-sales"` (keep `"revenue-chart"` and `"expiration-alerts"` for essential — only `package-sales` and `goals` are excluded for essential).

**`src/components/trainer/dashboard/tabs/overview/WidgetSettingsDialog.tsx`**
- Mirror the same filter so the toggle disappears from the settings dialog for essential.

### 3. Remove "My Goals" widget for trainers entirely
User clarified this widget doesn't apply to trainers at all (client goals live elsewhere). Remove for all trainer plans.

**`OverviewTab.tsx`** and **`WidgetSettingsDialog.tsx`**
- Always exclude `"goals"` from `WIDGET_CATALOG`-derived lists and from `enabledWidgets`, regardless of plan.
- Leave `GoalsWidget.tsx` file in place but unused (no deletion needed).

### Implementation detail
Introduce two constants per file:
```
const ALWAYS_HIDDEN = ["goals"];
const PLAN_HIDDEN = {
  basic: ["expiration-alerts", "revenue-chart", "package-sales"],
  essential: ["package-sales"],
  pro: [],
};
```
Filter widgets with `[...ALWAYS_HIDDEN, ...PLAN_HIDDEN[plan]]`.

### Out of scope
- Pro dashboard tabs/widgets remain unchanged.
- No changes to widget storage, GoalsWidget component, or routing.

### Verification
- Log in as `andredefra64@gmail.com` (Essential) → sidebar shows no Services/Packages; Overview has no Package Sales or My Goals widget; settings dialog hides those toggles.
- Log in as Pro → My Goals widget is gone; everything else unchanged.
- Basic plan unchanged from current behavior aside from also losing My Goals.
