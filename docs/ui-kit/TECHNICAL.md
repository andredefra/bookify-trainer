# UI Kit — Technical Reference

## Overview

The UI is built on **shadcn/ui** — Radix primitives wrapped as local, editable components in
`src/components/ui/` — styled with **Tailwind CSS** using **CSS-variable theming**. There is
no external component-library dependency to upgrade; the components live in the repo and are
customized in place.

## Configuration

### `components.json` (shadcn config)

```json
{
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": { "config": "tailwind.config.ts", "css": "src/index.css",
                "baseColor": "slate", "cssVariables": true, "prefix": "" },
  "aliases": { "components": "@/components", "utils": "@/lib/utils",
               "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" }
}
```

- Style **default**, base color **slate**, **CSS variables** on, no class prefix.
- `npx shadcn@latest add <component>` will generate into `src/components/ui/` using these
  aliases.

### `src/lib/utils.ts`

```ts
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }
```

`cn()` (clsx + tailwind-merge) is the standard helper for conditional/merged class names —
used throughout, e.g. `cn('px-4', isActive && 'bg-primary')`.

## Components inventory (`src/components/ui/`)

~48 components. Notable groups:

- **Inputs/forms:** `input`, `textarea`, `label`, `checkbox`, `radio-group`, `select`,
  `form`, `switch`, `toggle`, `toggle-group`, `slider`, `input-otp`.
- **Overlays:** `dialog`, `alert-dialog`, `drawer`, `sheet`, `popover`, `hover-card`,
  `tooltip`, `context-menu`, `dropdown-menu`, `command`, `menubar`.
- **Data display:** `card`, `table`, `progress`, `accordion`, `collapsible`, `carousel`,
  `scroll-area`, `skeleton`, `badge`, `alert`, `chart`.
- **Navigation/layout:** `navigation-menu`, `sidebar`, `breadcrumb`, `pagination`, `tabs`,
  `separator`, `resizable`, `aspect-ratio`, `avatar`, `button`.
- **Toasts (two systems):** shadcn `toast` + `toaster` + `use-toast.ts`, **and** `sonner`.
  Both `<Toaster />` (shadcn) and `<Sonner />` are mounted in `App.tsx`.

## Theming

### `tailwind.config.ts`

- **Container:** centered, `2rem` padding; screens up to `2xl: 1400px`.
- **Colors:** semantic tokens mapped to CSS variables — `primary`, `secondary`,
  `destructive`, `muted`, `accent`, `popover`, `card`, `border`, `input`, `ring`,
  `background`, `foreground`, plus `sidebar-*` (8 vars) and `chart-1…5`.
- **Fonts:** `sans` → Inter, `display` → SF Pro Display (headings).
- **Radius:** `lg = var(--radius)` (0.5rem), `md`, `sm` derived.
- **Animations:** `accordion-down/up`, `fade-in/out`, `slide-up/down`, `slide-in-right`,
  `blur-in`. Plugin: `tailwindcss-animate`.

### `src/index.css` (design tokens)

- `@tailwind base/components/utilities`.
- `:root` defines the light-mode HSL tokens (e.g. `--primary: 220 13% 9%` dark gray-blue,
  `--background: 0 0% 100%`, `--radius: 0.5rem`, chart palette). `.dark` overrides for dark
  mode.
- `@layer base` applies `border-border` to all elements and `bg-background text-foreground`
  to `body`.
- Custom utilities: `.scrollbar-hide`, `.line-clamp-{1,2,3}`, `.glass-navbar`
  (`bg-background/90 backdrop-blur-md shadow-sm`).

## Conventions

- Build UI from these primitives; pass styles via `className` + `cn()`.
- Prefer adding a shadcn component (via the CLI with the configured aliases) over introducing
  a new dependency.
- Use semantic color tokens (`bg-primary`, `text-muted-foreground`) rather than hardcoded
  colors so light/dark theming keeps working.
- Be consistent about toasts: shadcn `useToast()` for app toasts; `sonner` is also available
  (both are wired) — match the surrounding tab's choice.

## Gotchas

- **Two toast systems** are mounted simultaneously; don't add a third, and check which one a
  given area already uses.
- shadcn components are **local and may have been edited** — regenerating via the CLI can
  overwrite local tweaks.
- Dark mode tokens exist, but verify a given persona surface actually supports it before
  assuming.
