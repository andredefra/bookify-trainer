
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard,
  Users,
  Dumbbell,
  Calendar,
  MessageSquare,
  Settings,
  CreditCard,
  LineChart,
  FolderKanban,
  Package,
  CalendarDays,
  Wrench,
  Star
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-mobile";
import { useTrainerPlan } from "@/context/TrainerPlanContext";

interface SidebarNavigationProps {
  activeTab: string;
  handleTabClick: (tab: string) => void;
}

export function SidebarNavigation({ activeTab, handleTabClick }: SidebarNavigationProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const plan = useTrainerPlan();

  const allItems = [
    { title: "Overview", icon: LayoutDashboard, href: "overview" },
    { title: "CRM", icon: FolderKanban, href: "sales" },
    { title: "Clients", icon: Users, href: "clients" },
    { title: "Programs", icon: Dumbbell, href: "programs" },
    { title: "Sessions", icon: Calendar, href: "sessions" },
    { title: "Services", icon: Wrench, href: "services" },
    { title: "Packages", icon: Package, href: "packages" },
    { title: "Calendar", icon: CalendarDays, href: "calendar" },
    { title: "Messages", icon: MessageSquare, href: "messages", badge: 3 },
    { title: "Transactions", icon: CreditCard, href: "transactions" },
    { title: "Business Data", icon: LineChart, href: "analytics" },
    { title: "Reviews", icon: Star, href: "reviews", badge: 1 },
    { title: "Settings", icon: Settings, href: "settings" },
  ];

  const planExcludes: Record<string, string[]> = {
    basic: ["programs", "sessions", "services", "packages", "transactions", "analytics"],
    essential: ["services", "packages"],
    pro: [],
  };
  const excluded = planExcludes[plan] || [];
  const navigationItems = allItems.filter((i) => !excluded.includes(i.href));

  return (
    <div className="flex flex-col space-y-1 p-2">
      {navigationItems.map((item) => (
        <Button
          key={item.href}
          variant={activeTab === item.href ? "default" : "ghost"}
          className={cn(
            "justify-start relative transition-all duration-200",
            // Tablet: center icons, Desktop: full layout
            isTablet && "justify-center w-12 h-12 p-0",
            isDesktop && "justify-start",
            !isDesktop && !isTablet && "justify-center md:justify-start"
          )}
          onClick={() => handleTabClick(item.href)}
          type="button" 
          tabIndex={0}
          data-lpignore="true"
        >
          <item.icon className={cn(
            "w-5 h-5",
            isDesktop && "lg:mr-2",
            !isTablet && "md:mr-2"
          )} />
          <span className={cn(
            "truncate",
            isTablet ? "hidden" : "hidden lg:inline-flex"
          )}>
            {item.title}
          </span>
          {item.badge && isDesktop && (
            <Badge className="ml-auto">{item.badge}</Badge>
          )}
        </Button>
      ))}
    </div>
  );
}
