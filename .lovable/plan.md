Reframe the rule: **Packages and Services are Pro-only modules**. Anywhere they appear must be gated to `plan === "pro"`. Programs remain available in Essential.

## Changes

### 1. Mobile sidebar (`src/components/trainer/dashboard/sidebar/MobileSidebar.tsx`)
Currently `essential: []` lets Packages through. Update:
```ts
planExcludes = {
  basic: ["programs", "sessions", "packages", "transactions", "analytics"],
  essential: ["packages"],   // services not in this list
  pro: [],
}
```

### 2. Client profile sub-tabs (`src/components/trainer/dashboard/tabs/clients/ClientProfileTabs/tabs/ClientProfileTabList.tsx`)
Currently `showProgramsPackages = plan !== "basic"` — shows Packages tab in Essential. Split:
- `showPrograms = plan !== "basic"` (Essential + Pro)
- `showPackages = plan === "pro"` (Pro only)

Apply each gate to its corresponding `TabsTrigger`.

### 3. Business Data / Analytics (`src/components/trainer/dashboard/tabs/AnalyticsTab.tsx`)
Hide the "Packages" inner tab + its `TabsContent` when `plan !== "pro"`. Adjust the `TabsList` grid columns dynamically (`grid-cols-3` vs `grid-cols-4`). Read plan via `useTrainerPlan`.

### Already correct (no change needed)
- `DashboardContainer.PLAN_ALLOWED_TABS` — essential already excludes services/packages.
- Desktop `SidebarNavigation` — essential already excludes services/packages.
- Overview Package Sales widget — already hidden for basic + essential.
- Quick Actions "Create Package" — already gated.

### Out of scope
- Pro behavior unchanged.
- No changes to underlying package/service data, hooks, or files in `tabs/packages/` and `tabs/services/`.

### Verification
Login as `andredefra64@gmail.com` (Essential):
- Mobile sidebar: no Packages entry.
- Client profile: no Packages tab; Programs tab still visible.
- Business Data: no Packages inner tab; remaining 3 tabs fill the row.
Login as Pro: all package/service surfaces still present.
