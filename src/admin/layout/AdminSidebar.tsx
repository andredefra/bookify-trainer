import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Calendar, Workflow, Palette, Settings, LogOut } from "lucide-react";
import { it } from "../i18n/it";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const items = [
  { to: "/admin", label: it.nav.dashboard, icon: LayoutDashboard, end: true },
  { to: "/admin/branding", label: it.nav.branding, icon: Palette },
  { to: "/admin/content-plan", label: it.nav.contentPlan, icon: Workflow },
  { to: "/admin/calendar", label: it.nav.calendar, icon: Calendar },
  { to: "/admin/settings", label: it.nav.settings, icon: Settings },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <aside className="w-60 shrink-0 border-r bg-card flex flex-col">
      <div className="p-5 border-b">
        <p className="text-sm font-semibold tracking-tight">{it.appName}</p>
        <p className="text-xs text-muted-foreground">{it.subtitle}</p>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )
            }
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          navigate("/admin/login", { replace: true });
        }}
        className="m-3 flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
      >
        <LogOut className="h-4 w-4" />
        {it.nav.logout}
      </button>
    </aside>
  );
}
